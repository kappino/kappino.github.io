export const consoleEndpoint = import.meta.env.VITE_CONSOLE_API || (import.meta.env.DEV ? '/api/console' : '');
export const terminalIsLive = Boolean(consoleEndpoint);
