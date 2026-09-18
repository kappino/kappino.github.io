import { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Trash2, HelpCircle, ChevronDown, ChevronUp, X, Plus } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

const COMMAND_OUTPUTS: Record<string, React.ReactNode> = {
  status: (
    <div className="font-mono text-xs space-y-1.5 text-zinc-300">
      <p className="text-zinc-500">Executing: testbed --diagnostics --all</p>
      <div className="space-y-1 pl-2 border-l border-zinc-800 text-[11px]">
        <p><span className="text-emerald-400 font-bold">[OK]</span> <span className="text-white font-semibold">mTLS 1.3 Engine:</span> X.509 clientAuth ready (208ms handshake)</p>
        <p><span className="text-emerald-400 font-bold">[OK]</span> <span className="text-white font-semibold">ROS2 Decision Core:</span> GoRules JDM runtime evaluated (1.4ms)</p>
        <p><span className="text-emerald-400 font-bold">[OK]</span> <span className="text-white font-semibold">EEG Signal ML:</span> 97.2% classification accuracy (IAS-19)</p>
        <p><span className="text-emerald-400 font-bold">[OK]</span> <span className="text-white font-semibold">Physical Nodes:</span> Proxmox host &amp; STM32/ESP32 bench online</p>
      </div>
      <p className="text-sky-400 text-[10px] pt-0.5">:: Click a pill below or type commands to inspect live packets and logs.</p>
    </div>
  ),
  mtls: (
    <div className="font-mono space-y-1 text-xs">
      <p className="text-zinc-500">Executing: openssl verify -CAfile rootCA.pem -untrusted serverSAN.pem esp32_client.crt</p>
      <p className="text-zinc-400">|-- [Root CA] 4096-bit RSA (Offline HSM)</p>
      <p className="text-zinc-400">|-- [Server Intermediate] IP SAN: 203.0.113.1 (TLS_AES_256_GCM_SHA384)</p>
      <p className="text-zinc-400">`-- [Client Cert] esp32_client.crt (clientAuth extension: verified)</p>
      <p className="text-emerald-400 font-bold mt-1">[OK] esp32_client.crt: VERIFICATION SUCCESSFUL (Handshake: 208ms)</p>
      <p className="text-zinc-500 text-[11px]">Result: All unauthorized packets dropped at TLS layer before application memory.</p>
    </div>
  ),
  ros2: (
    <div className="font-mono text-xs space-y-1 text-zinc-300">
      <p className="text-zinc-500">Executing: ros2 topic echo /care/priority_alert --once</p>
      <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-sky-300">
        <p>{'{'}</p>
        <p className="pl-4">"header": {'{"stamp": "2026-09-18T16:00:00Z", "frame_id": "care_base"}'},</p>
        <p className="pl-4">"source": "patient_vital_monitor",</p>
        <p className="pl-4">"event": "URGENT_MEDICATION_ALERT",</p>
        <p className="pl-4">"priority": 1, <span className="text-emerald-400">// Level 1: Medical Override Active</span></p>
        <p className="pl-4">"override_action": "CANCEL_PATROL_AND_NAVIGATE_BEDSIDE"</p>
        <p>{'}'}</p>
      </div>
      <p className="text-emerald-400 text-[11px]">[OK] GoRules JDM Decision Table evaluated in 1.4ms. Zero operational deadlock.</p>
    </div>
  ),
  spectra: (
    <div className="font-mono text-xs space-y-1.5 text-zinc-300">
      <p className="text-zinc-500">Executing: python evaluate_spectra_model.py --dataset clinical_21_subjects</p>
      <div className="p-3 rounded bg-zinc-900 border border-zinc-800 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span>Multi-Layer Perceptron (MLP) Accuracy:</span>
          <span className="text-emerald-400 font-bold font-mono">97.2%</span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-2">
          <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '97.2%' }}></div>
        </div>
        <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
          <span>Random Forest Baseline: 95.6%</span>
          <span>14 EEG Channels @ 256 Hz</span>
        </div>
      </div>
      <p className="text-amber-400 font-semibold text-xs">[AWARD] Best Student Paper Award Finalist · IAS-19 (Springer LNNS Series)</p>
    </div>
  ),
  homelab: (
    <div className="font-mono text-xs space-y-2 text-zinc-300">
      <p className="text-zinc-500">Executing: tailscale status | grep -E "pve|npm|pihole|ct107"</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
        <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between text-emerald-400 font-bold">
            <span>pve-host</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">ONLINE</span>
          </div>
          <div className="text-zinc-300 text-[11px] mt-0.5">Proxmox VE (Debian 12)</div>
          <div className="text-zinc-500 text-[10px]">GTX 1070 Passthrough · Exit Node</div>
        </div>
        <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between text-emerald-400 font-bold">
            <span>nginx-proxy</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">ACTIVE</span>
          </div>
          <div className="text-zinc-300 text-[11px] mt-0.5">NPM + Let's Encrypt</div>
          <div className="text-zinc-500 text-[10px]">Zero-Expose WAN · SSL Termination</div>
        </div>
        <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between text-sky-400 font-bold">
            <span>ct105-pihole</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono">RESOLVING</span>
          </div>
          <div className="text-zinc-300 text-[11px] mt-0.5">FTL DNS Engine</div>
          <div className="text-zinc-500 text-[10px]">Split-DNS &amp; Telemetry Sinkhole</div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-1.5 text-zinc-400 border-t border-zinc-800/80">
        <span><strong className="text-emerald-400">Core Services:</strong> CT107 (FastAPI WAL), Home Assistant (Gemini LLM), Immich</span>
        <span className="text-sky-400 font-semibold">Mesh Security: 0 Open WAN Ports</span>
      </div>
    </div>
  ),
  cv: (
    <div className="font-mono text-xs space-y-2 text-zinc-300">
      <p className="text-zinc-500">Executing: curl -sSL -O https://kappino.github.io/esposito_crescenzo_cv.pdf</p>
      <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-1.5 text-[11px]">
        <div className="flex items-center justify-between text-zinc-400">
          <span>% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current</span>
        </div>
        <div className="flex items-center justify-between text-emerald-400 font-bold">
          <span>100  328k  100  328k    0     0   2.4M      0 --:--:-- --:--:-- --:--:--  2.4M</span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden mt-1">
          <div className="bg-emerald-400 h-1.5 rounded-full w-full animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2 pt-1 text-zinc-300">
          <span className="text-emerald-400 font-bold">[HTTP/2 200 OK]</span>
          <span>Content-Type: application/pdf (esposito_crescenzo_cv.pdf)</span>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-0.5 text-sky-400 text-xs font-mono">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping" />
        <span>Opening Curriculum Vitae in a new tab in 2 seconds...</span>
      </div>
    </div>
  ),
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
      <p><span className="text-sky-400 font-bold">status</span>   :: Diagnostics &amp; live testbed health.</p>
      <p><span className="text-sky-400 font-bold">cv</span>       :: Fetch and download Curriculum Vitae via curl.</p>
      <p><span className="text-sky-400 font-bold">mtls</span>     :: Simulate X.509 handshake verification and certificate checking.</p>
      <p><span className="text-sky-400 font-bold">ros2</span>     :: Inspect healthcare telemetry packet and priority override.</p>
      <p><span className="text-sky-400 font-bold">spectra</span>  :: Display EEG machine learning benchmark and paper award.</p>
      <p><span className="text-sky-400 font-bold">homelab</span>  :: Physical testbed, Proxmox host, and hardware bench.</p>
      <p><span className="text-sky-400 font-bold">bio</span>      :: Contact, credentials, and certifications.</p>
      <p><span className="text-sky-400 font-bold">clear</span>    :: Reset and clear the terminal buffer.</p>
    </div>
  ),
};

interface TerminalWidgetProps {
  externalTriggerCommand?: string | null;
}

export const TerminalWidget = ({ externalTriggerCommand }: TerminalWidgetProps) => {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'status',
      output: COMMAND_OUTPUTS.status,
    },
  ]);
  const [activeCommand, setActiveCommand] = useState<string>('status');
  const [inputVal, setInputVal] = useState('');
  const cvTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const terminalBufferRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (cvTimeoutRef.current) clearTimeout(cvTimeoutRef.current);
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
    setHistory([]);
    setInputVal('');
  };

  const runCommand = (cmd: string) => {
    // Strip query strings or trailing args for clean command routing (e.g. "cv?t=123" -> "cv")
    const cleanCmd = cmd.split('?')[0].trim();
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
      // Automatically open CV PDF in a new tab after 2 seconds
      cvTimeoutRef.current = setTimeout(() => {
        window.open('/esposito_crescenzo_cv.pdf', '_blank', 'noopener,noreferrer');
      }, 2000);
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
  };

  useEffect(() => {
    if (externalTriggerCommand) {
      runCommand(externalTriggerCommand);
    }
  }, [externalTriggerCommand]);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-zinc-950/75 backdrop-blur-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.65)] ring-1 ring-white/5 font-mono">
      {/* Modern KDE Plasma / Konsole Window Titlebar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-900/60 backdrop-blur-md border-b border-white/5 select-none">
        {/* Left: Tab with add button & session pill */}
        <div className="flex items-center gap-2">
          {/* Active Konsole Tab */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-800/80 border border-white/10 text-xs text-zinc-200 shadow-sm">
            <TerminalIcon className="h-3.5 w-3.5 text-sky-400" />
            <span className="font-semibold text-[11px] tracking-wide">kappino@portfolio: ~</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          </div>

          <button
            type="button"
            onClick={() => runCommand('help')}
            className="p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors hidden sm:flex items-center justify-center"
            title="New tab / Help"
            aria-label="New tab / Help"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Center / Ambient Title */}
        <div className="hidden md:flex items-center gap-1.5 text-[11px] text-zinc-400 font-sans">
          <span className="font-semibold text-zinc-300">Konsole</span>
          <span className="text-zinc-600">—</span>
          <span className="text-zinc-500 font-mono text-[10px]">bash 5.2</span>
        </div>

        {/* Right: Actions & Modern Window Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => runCommand('help')}
            className="p-1.5 rounded-md text-zinc-400 hover:text-sky-400 hover:bg-white/5 transition-colors"
            title="Help"
            aria-label="Help"
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={clearHistory}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-colors text-[11px] border border-white/5"
            title="Clear buffer"
          >
            <Trash2 className="h-3 w-3" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          {/* Modern Circular Window Controls: Arrow Down, Arrow Up, Close with hover red */}
          <div className="flex items-center gap-1.5 ml-1 sm:ml-2 pl-2 border-l border-white/10">
            {/* Minimize: Decorative */}
            <div
              className="w-5 h-5 rounded-full bg-zinc-800/80 text-zinc-400 flex items-center justify-center border border-white/10 shadow-sm"
              aria-hidden="true"
            >
              <ChevronDown className="h-3 w-3" />
            </div>

            {/* Maximize: Decorative */}
            <div
              className="w-5 h-5 rounded-full bg-zinc-800/80 text-zinc-400 flex items-center justify-center border border-white/10 shadow-sm"
              aria-hidden="true"
            >
              <ChevronUp className="h-3 w-3" />
            </div>

            {/* Close: Circular button with white icon, turning red on hover */}
            <button
              onClick={clearHistory}
              className="group/close w-5 h-5 rounded-full bg-zinc-800/80 hover:bg-[#da4453] text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-150 border border-white/10 hover:border-red-500/50 shadow-sm"
              title="Close / Reset Buffer"
            >
              <X className="h-3 w-3 transition-transform group-hover/close:scale-110" />
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Screen / Buffer */}
      <div
        ref={terminalBufferRef}
        className="p-4 sm:p-5 text-xs space-y-4 min-h-[220px] max-h-[360px] overflow-y-auto bg-black/40 backdrop-blur-md"
      >
        {history.length === 0 && (
          <div className="text-zinc-600 text-xs italic">
            Session reset. Type 'help' or click a command below to inspect live modules.
          </div>
        )}

        {history.map((item, idx) => (
          <div key={`${item.command}-${idx}`} className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-emerald-400 font-bold">kappino@portfolio</span>
              <span className="text-zinc-500">:</span>
              <span className="text-sky-400 font-semibold">~</span>
              <span className="text-zinc-400">$</span>
              <span className="text-zinc-100 font-medium ml-1">{item.command}</span>
            </div>
            <div className="pl-3.5 border-l-2 border-zinc-800/80 text-zinc-300">
              {item.output}
            </div>
          </div>
        ))}

        {/* Linux Bash Input line */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runCommand(inputVal);
          }}
          className="flex items-center gap-1.5 pt-2 border-t border-zinc-800/60"
        >
          <span className="text-emerald-400 font-bold text-xs">kappino@portfolio</span>
          <span className="text-zinc-500">:</span>
          <span className="text-sky-400 font-semibold text-xs">~</span>
          <span className="text-zinc-400 font-bold">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="status, mtls, ros2, homelab, bio..."
            aria-label="Terminal command input"
            className="flex-1 bg-transparent text-white placeholder-zinc-600 focus:outline-none text-xs ml-1 font-mono"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            type="submit"
            className="p-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
            title="Execute"
          >
            <CornerDownLeft className="h-3 w-3" />
          </button>
        </form>
      </div>

      {/* Quick Interactive Command Pills */}
      <div className="px-3.5 py-2 bg-zinc-900/40 backdrop-blur-md border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mr-1 hidden sm:inline">
            Run:
          </span>
          {[
            { id: 'status', label: 'status' },
            { id: 'cv', label: 'curl cv.pdf' },
            { id: 'mtls', label: 'mtls' },
            { id: 'ros2', label: 'ros2' },
            { id: 'spectra', label: 'spectra' },
            { id: 'homelab', label: 'homelab' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => runCommand(id)}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono transition-all ${
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
  );
};
