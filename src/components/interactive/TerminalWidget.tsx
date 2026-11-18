import { useState, useEffect, useRef, useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal as TerminalIcon, CornerDownLeft, Trash2, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { consoleEndpoint, terminalIsLive } from '@/utils/consoleEndpoint';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

const projectCommands = [
  { command: 'open gateway', alias: 'gateway', path: '/projects/proj-mtls-iot-gateway', description: 'Follow a sensor reading from Bluetooth to the MQTT broker, and see where the ESP32 checks it.' },
  { command: 'open tnes', alias: 'tns', path: '/projects/proj-tnes', description: 'Plug in a virtual cable in Unreal and see how Cisco Modeling Labs checks the connection.', award: 'Winner · Hack the Route, The Big Hack 2026' },
] as const;

const COMMAND_OUTPUTS: Record<string, React.ReactNode> = {
  status: <p>This demo shows sample responses. Live status checks the portfolio console API and its content indexes.</p>,
  agy: <p>Outbound HTTPS long polling, no inbound port required. Prompts go into a local tmux buffer and updates come from the transcript.</p>,
  mtls: <p>In the gateway prototype, MQTT topic permissions are tied to the client certificate. The ESP32 checks the payload HMAC before forwarding.</p>,
  ros2: <p>In a reconstructed CARE cycle, an exercise can wait for feedback while the planner publishes a medication reminder request to the coordinator.</p>,
  spectra: <p>The IAS-19 abstract reports up to 95% group classification accuracy. The exploratory study included 21 participants.</p>,
  homelab: <p>Portfolio testbed examples include Proxmox VE and STM32 and ESP32 development boards.</p>,
  cv: <a className="text-sky-300 underline" href="/crescenzo_esposito_cv.pdf">Open CV PDF</a>,
  bio: (
    <div className="space-y-1.5 text-zinc-300 text-xs font-mono">
      <p><span className="text-sky-400">[EMAIL]</span> crescenzo.esposito@outlook.it</p>
      <p><span className="text-zinc-500">[LOC]</span>   Naples, Italy · Remote &amp; Hybrid</p>
      <p><span className="text-zinc-500">[ACAD]</span>  M.Sc. Cybersecurity @ UNISA (2025-2027) · B.Sc. Parthenope (2020-2025)</p>
      <p className="text-zinc-400 text-[11px] mt-1.5 pt-1 border-t border-zinc-900">
        Skills: Cybersecurity, C++, Python · Certs: iOS Essentials, iOS Advanced
      </p>
    </div>
  ),
  help: (
    <div className="font-mono text-xs space-y-1 text-zinc-300">
      <p className="text-zinc-400 font-semibold mb-1">Available Commands:</p>
      <p><span className="text-sky-400 font-bold">status</span>   :: Example diagnostic output.</p>
      <p><span className="text-sky-400 font-bold">cv</span>       :: Fetch and download Curriculum Vitae via curl.</p>
      <p><span className="text-sky-400 font-bold">agy</span>      :: agy-telegram mobile agent cockpit &amp; gateway.</p>
      <p><span className="text-sky-400 font-bold">mtls</span>     :: Simulate X.509 handshake verification and certificate checking.</p>
      <p><span className="text-sky-400 font-bold">ros2</span>     :: Inspect healthcare telemetry packet and priority override.</p>
      <p><span className="text-sky-400 font-bold">spectra</span>  :: Display EEG machine learning benchmark and paper award.</p>
      <p><span className="text-sky-400 font-bold">homelab</span>  :: Physical testbed, Proxmox host, and hardware bench.</p>
      <p><span className="text-sky-400 font-bold">bio</span>      :: Contact, credentials, and certifications.</p>
      <p><span className="text-sky-400 font-bold">clear</span>    :: Reset and clear the terminal buffer.</p>
    </div>
  ),
};

export const TerminalWidget = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const terminalBodyId = useId();
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [activeCommand, setActiveCommand] = useState<string>('status');
  const [inputVal, setInputVal] = useState('');
  const [pending, setPending] = useState(false);
  const [viewState, setViewState] = useState<'normal' | 'collapsed' | 'expanded'>('normal');
  const cvTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const terminalBufferRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (cvTimeoutRef.current) clearTimeout(cvTimeoutRef.current);
      requestRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (terminalBufferRef.current) {
      terminalBufferRef.current.scrollTo({
        top: terminalBufferRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history]);

  const clearHistory = () => {
    requestRef.current?.abort();
    requestRef.current = null;
    setPending(false);
    setHistory([]);
    setInputVal('');
  };

  async function runLiveCommand(command: string) {
    if (requestRef.current) return;
    const controller = new AbortController();
    requestRef.current = controller;
    setPending(true);
    const timeout = setTimeout(() => controller.abort('timeout'), 4000);
    let output: string;
    try {
      const response = await fetch(consoleEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (response.ok && typeof result.output === 'string') {
        output = command.toLowerCase() === 'status'
          ? 'Live check: portfolio console API responded and read the sitemap and blog index.\n' + result.output
          : result.output;
      } else {
        output = typeof result.error === 'string' ? result.error : 'Unexpected console response.';
        if (command.toLowerCase() === 'status') output = 'Status check failed. ' + output;
      }
    } catch {
      output = controller.signal.reason === 'timeout'
        ? 'Console request timed out. Try again.'
        : 'Console service unavailable. Try again later.';
      if (command.toLowerCase() === 'status') output = 'Status check failed. ' + output;
    } finally {
      clearTimeout(timeout);
    }
    if (requestRef.current !== controller) return;
    requestRef.current = null;
    setPending(false);
    setHistory((previous) => [...previous.slice(-49), { command, output: <pre className="whitespace-pre-wrap break-words">{output}</pre> }]);
  }

  function runCommand(cmd: string) {
    const normalized = cmd.trim().toLowerCase().replace(/\s+/g, ' ');
    const project = projectCommands.find(({ command, alias }) => command === normalized || alias === normalized);
    if (project) {
      navigate(project.path);
      return;
    }
    if (terminalIsLive) {
      const command = cmd.trim();
      if (!command) return;
      if (/^(clear|cls)$/i.test(command)) {
        clearHistory();
        return;
      }
      if (requestRef.current) return;
      setInputVal('');
      setActiveCommand(command.toLowerCase());
      void runLiveCommand(command);
      return;
    }
    // Strip query strings or trailing args for clean command routing (e.g. "cv?t=123" -> "cv")
    const cleanCmd = cmd.trim() === '?' ? '?' : cmd.split('?')[0].trim();
    const raw = cleanCmd.toLowerCase();
    if (!raw) return;

    if (raw === 'clear' || raw === 'cls') {
      clearHistory();
      return;
    }

    let resolvedKey: string | null = null;
    if (raw === 'status' || raw.includes('diag') || raw.includes('health') || raw.includes('sys')) {
      resolvedKey = 'status';
    } else if (raw === 'cv' || raw.includes('curl') || raw.includes('resume') || raw.includes('download')) {
      resolvedKey = 'cv';
      // Automatically open CV PDF in a new tab when explicitly invoked via terminal
      cvTimeoutRef.current = setTimeout(() => {
        window.open('/crescenzo_esposito_cv.pdf', '_blank', 'noopener,noreferrer');
      }, 1800);
    } else if (raw === 'agy' || raw.includes('telegram') || raw.includes('cockpit') || raw.includes('agent')) {
      resolvedKey = 'agy';
    } else if (raw === 'bio' || raw.includes('kappino') || raw.includes('whoami')) {
      resolvedKey = 'bio';
    } else if (raw === 'mtls' || raw.includes('openssl') || raw.includes('cert') || raw.includes('security')) {
      resolvedKey = 'mtls';
    } else if (raw === 'ros2' || raw.includes('robot') || raw.includes('care') || raw.includes('telemetry')) {
      resolvedKey = 'ros2';
    } else if (raw === 'spectra' || raw.includes('eeg') || raw.includes('ml') || raw.includes('paper') || raw.includes('accuracy')) {
      resolvedKey = 'spectra';
    } else if (raw === 'homelab' || raw.includes('server') || raw.includes('proxmox') || raw.includes('lab')) {
      resolvedKey = 'homelab';
    } else if (raw === 'help' || raw === 'h' || raw === '?') {
      resolvedKey = 'help';
    }

    let out: React.ReactNode;
    if (resolvedKey && COMMAND_OUTPUTS[resolvedKey]) {
      out = COMMAND_OUTPUTS[resolvedKey];
      setActiveCommand(resolvedKey);
    } else {
      out = (
        <div className="text-xs text-rose-400 font-mono">
          bash: {cleanCmd}: command not found. Type <button type="button" className="text-sky-400 underline cursor-pointer bg-transparent border-none p-0 font-mono text-xs" onClick={() => runCommand('help')}>help</button> or select a command below.
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: cleanCmd, output: out }]);
    setInputVal('');
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-zinc-950/75 backdrop-blur-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.65)] ring-1 ring-white/5 font-mono">
      <div className="flex min-w-0 items-center justify-between gap-2 border-b border-sky-300/10 bg-zinc-900/90 px-3 py-2 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <TerminalIcon className="h-4 w-4 shrink-0 text-sky-300" aria-hidden="true" />
          <span className="truncate text-xs font-semibold text-zinc-100">{terminalIsLive ? 'kappino@portfolio' : 'Portfolio demo'}</span>
        </div>
        <button type="button" className="min-h-9 shrink-0 px-2 text-xs text-sky-300 sm:hidden" aria-expanded={mobileOpen} aria-controls={terminalBodyId} onClick={() => setMobileOpen((open) => !open)}>
          {mobileOpen ? 'Close terminal' : 'Open terminal'}
        </button>
        <div className={mobileOpen ? 'flex shrink-0 items-center gap-0.5' : 'hidden shrink-0 items-center gap-0.5 sm:flex'}>
          <button type="button" onClick={() => { if (viewState === 'collapsed') setViewState('normal'); runCommand('help'); }} className="terminal-control" aria-label="Help" title="Help">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={clearHistory} className="terminal-control" aria-label="Clear" title="Clear history">
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setViewState(viewState === 'expanded' ? 'normal' : 'expanded')} className="terminal-control" aria-label={viewState === 'expanded' ? 'Restore size' : 'Expand output'} aria-pressed={viewState === 'expanded'} title={viewState === 'expanded' ? 'Restore size' : 'Expand output'}>
            <ChevronUp className={viewState === 'expanded' ? 'h-4 w-4 rotate-180' : 'h-4 w-4'} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setViewState(viewState === 'collapsed' ? 'normal' : 'collapsed')} className="terminal-control" aria-label={viewState === 'collapsed' ? 'Restore terminal' : 'Minimize terminal'} aria-expanded={viewState !== 'collapsed'} title={viewState === 'collapsed' ? 'Restore terminal' : 'Minimize terminal'}>
            <ChevronDown className={viewState === 'collapsed' ? 'h-4 w-4 rotate-180' : 'h-4 w-4'} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id={terminalBodyId} className={mobileOpen ? undefined : 'hidden sm:block'}>
      {/* Terminal Screen / Buffer */}
      {viewState !== 'collapsed' ? (
        <>
        <div
          ref={terminalBufferRef}
          className={`px-3 py-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-4 overflow-auto break-words bg-black/40 ${
            viewState === 'expanded' ? 'h-[clamp(17rem,58dvh,36rem)]' : history.length === 0 ? 'min-h-[15rem]' : 'h-[clamp(11rem,29dvh,20rem)]'
          }`}
        >
          {history.length === 0 && (
            <div className="space-y-4 text-zinc-300">
              <div className="flex items-center gap-3 sm:gap-4">
                <pre aria-hidden="true" className="shrink-0 select-none text-[0.7rem] leading-none text-sky-300">{`+------+
| >_   |
+------+`}</pre>
                <div className="min-w-0">
                  <p className="font-semibold tracking-wide text-zinc-100">kappino.me</p>
                  <p className="mt-0.5 text-xs text-zinc-400">{terminalIsLive ? 'Portfolio terminal' : 'Terminal demo'}</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400">Type a command or pick a project to explore.</p>
              <ul aria-label="Projects to explore" className="divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-zinc-900/50">
                {projectCommands.map((project) => (
                  <li key={project.command}>
                    <Link className="group block px-3 py-2.5 hover:bg-sky-300/5 focus-visible:outline focus-visible:outline-sky-300" to={project.path}>
                      <span className="block text-xs font-semibold text-sky-200 group-hover:underline">
                        <span aria-hidden="true" className="mr-2 text-sky-400">$</span>{project.command}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-zinc-300">{project.description}</span>
                      {'award' in project && <span className="mt-1 block text-xs text-amber-200">{project.award}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {history.map((item, idx) => (
            <div key={`${item.command}-${idx}`} className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-emerald-400 font-bold">kappino@portfolio</span>
                <span className="text-zinc-500">:</span>
                <span className="text-sky-400 font-semibold">~</span>
                <span className="text-zinc-400">$</span>
                <span className="min-w-0 break-all text-zinc-100 font-medium ml-1">{item.command}</span>
              </div>
              <div className="pl-3.5 border-l-2 border-zinc-800/80 text-zinc-300">
                {!terminalIsLive && <p className="mb-1 text-xs font-semibold text-sky-300">Example output</p>}
                {item.output}
              </div>
            </div>
          ))}
          {pending && <p role="status" className="text-zinc-400">Waiting for the console service…</p>}

        </div>

          {/* Terminal prompt */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runCommand(inputVal);
            }}
            className="flex items-center gap-2 border-t border-zinc-800/80 bg-black/40 px-3 py-2 sm:px-5"
          >
            <span className="hidden text-xs font-semibold text-emerald-400 sm:inline" aria-hidden="true">kappino@portfolio:~</span>
            <span className="font-semibold text-sky-300" aria-hidden="true">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={terminalIsLive ? 'help, status, projects…' : 'status, mtls, ros2, homelab, bio…'}
              maxLength={100}
              aria-label="Terminal command input"
              className="min-w-0 flex-1 bg-transparent text-white placeholder-zinc-600 focus:outline-none text-base sm:text-sm font-mono"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              disabled={pending}
              className="terminal-control bg-sky-300/10 text-sky-200 disabled:opacity-50"
              title="Execute"
              aria-label="Execute"
            >
              <CornerDownLeft className="h-3 w-3" />
            </button>
          </form>
        </>
      ) : (
        <div className="px-4 py-2.5 bg-black/40 border-b border-white/5 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
          <span>Terminal minimized. Click any command below or arrow to expand.</span>
          <button
            type="button"
            onClick={() => setViewState('normal')}
            className="text-sky-400 hover:text-sky-300 text-xs underline"
          >
            Expand ↗
          </button>
        </div>
      )}

      {/* Quick Interactive Command Pills */}
      <div className="px-3.5 py-2 bg-zinc-900/40 backdrop-blur-md border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mr-1 hidden sm:inline">
            Run:
          </span>
          {(terminalIsLive ? ['status', 'projects', 'articles', 'whoami', 'ls'].map((id) => ({ id, label: id })) : [
            { id: 'status', label: 'status' },
            { id: 'cv', label: 'curl cv.pdf' },
            { id: 'agy', label: 'agy' },
            { id: 'mtls', label: 'mtls' },
            { id: 'ros2', label: 'ros2' },
            { id: 'spectra', label: 'spectra' },
            { id: 'homelab', label: 'homelab' },
          ]).map(({ id, label }) => (
            <button
              key={id}
              disabled={pending}
              onClick={() => {
                if (viewState === 'collapsed') setViewState('normal');
                runCommand(id);
              }}
              className={`min-h-8 px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                activeCommand === id && history.length > 0 && history[history.length - 1]?.command.toLowerCase().includes(id)
                  ? 'bg-sky-500/25 text-sky-300 border border-sky-400/40 font-semibold shadow-sm'
                  : 'bg-zinc-800/50 text-zinc-400 border border-white/5 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={clearHistory}
          className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          type 'clear' to reset
        </button>
      </div>
      </div>
    </div>
  );
};
