import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const contentRoot = new URL('../public/', import.meta.url);
const maxBodyBytes = 512;
const port = Number(process.env.CONSOLE_PORT || 4180);
const origins = new Set(process.env.CONSOLE_ORIGIN
  ? [process.env.CONSOLE_ORIGIN]
  : ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:4177']);

async function articleNames() {
  const files = JSON.parse(await readFile(new URL('blog/index.json', contentRoot), 'utf8'));
  return files.map((file) => file.replace(/\.md$/, ''));
}

async function projectPaths() {
  const sitemap = await readFile(new URL('sitemap.xml', contentRoot), 'utf8');
  return [...sitemap.matchAll(/<loc>https:\/\/kappino\.me(\/projects\/[^<]+)<\/loc>/g)].map((match) => match[1]);
}

const commands = new Map([
  ['help', () => 'status       Live service status\nprojects     Project links\narticles     Article slugs\nwhoami       Portfolio owner\nls           List virtual files\ncat about.txt\nclear        Clear your terminal'],
  ['status', async () => {
    const [projects, articles] = await Promise.all([projectPaths(), articleNames()]);
    return `Console service: online\nProjects in sitemap: ${projects.length}\nArticles in index: ${articles.length}`;
  }],
  ['projects', async () => (await projectPaths()).join('\n')],
  ['articles', async () => (await articleNames()).join('\n')],
  ['whoami', () => 'Crescenzo Esposito · Engineering & Research'],
  ['ls', () => 'about.txt'],
  ['ls -a', () => 'about.txt\n.signal'],
  ['cat about.txt', () => 'This console reads the portfolio index and a small virtual filesystem.'],
  ['cat .signal', () => 'Signal found. The smallest packet still made it through.'],
]);

commands.set('?', commands.get('help'));
commands.set('ls -la', commands.get('ls -a'));
commands.set('ls -al', commands.get('ls -a'));

function send(response, status, result) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(result));
}

async function handle(request, response) {
  const origin = request.headers.origin;
  if (origin && !origins.has(origin)) {
    return send(response, 403, { error: 'Origin not allowed.' });
  }
  if (origin) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }
  if (request.url !== '/api/console') return send(response, 404, { error: 'Not found.' });
  if (request.method === 'OPTIONS') {
    response.writeHead(204, { 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' });
    return response.end();
  }
  if (request.method !== 'POST') return send(response, 405, { error: 'Use POST.' });
  if (request.headers['content-type']?.split(';')[0].trim() !== 'application/json') {
    return send(response, 415, { error: 'Use JSON.' });
  }

  const chunks = [];
  let length = 0;
  for await (const chunk of request) {
    length += chunk.length;
    if (length > maxBodyBytes) {
      response.setHeader('Connection', 'close');
      return send(response, 413, { error: 'Command is too long.' });
    }
    chunks.push(chunk);
  }

  let command;
  try {
    command = JSON.parse(Buffer.concat(chunks).toString('utf8'))?.command;
  } catch {
    return send(response, 400, { error: 'Malformed JSON.' });
  }
  if (typeof command !== 'string' || !command.trim()) {
    return send(response, 400, { error: 'Enter a command.' });
  }
  const handler = commands.get(command.trim().toLowerCase());
  if (!handler) return send(response, 400, { error: 'Command not found. Try help.' });
  return send(response, 200, { output: await handler() });
}

const server = createServer({ requestTimeout: 5000, headersTimeout: 5000, keepAliveTimeout: 3000 }, (request, response) => {
  void handle(request, response).catch(() => {
    if (!response.headersSent) send(response, 500, { error: 'Console service could not read the portfolio.' });
  });
});

server.maxConnections = 24;
server.listen(port, '127.0.0.1', () => {
  process.stdout.write(`Portfolio console listening on http://127.0.0.1:${port}\n`);
});
