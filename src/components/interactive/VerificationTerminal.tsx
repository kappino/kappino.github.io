import { useState, useRef, useEffect } from 'react';
import { Terminal, Copy, Check, ShieldAlert, Cpu, CheckCircle2, ChevronDown, ChevronUp, X } from 'lucide-react';
import { VerificationTerminal as VerificationTerminalType } from '@/types';

interface VerificationTerminalProps {
  terminal: VerificationTerminalType;
}

export const VerificationTerminal: React.FC<VerificationTerminalProps> = ({ terminal }) => {
  const [activeTabId, setActiveTabId] = useState<string>(terminal.tabs[0]?.id || '');
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => { if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current); }, []);

  const activeTab = terminal.tabs.find((t) => t.id === activeTabId) || terminal.tabs[0];

  const handleCopy = () => {
    if (!activeTab) return;
    const textToCopy = activeTab.command
      ? `$ ${activeTab.command}\n\n${activeTab.output}`
      : activeTab.output;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    }).catch(() => { /* clipboard access denied */ });
  };

  if (!activeTab) return null;

  // Determine an icon based on tab type
  const getTabIcon = (id: string) => {
    if (id.includes('evil') || id.includes('vulnerable') || id.includes('attacker')) {
      return <ShieldAlert className="h-3 w-3 text-red-400" />;
    }
    if (id.includes('hardened') || id.includes('audit') || id.includes('valgrind') || id.includes('defense')) {
      return <CheckCircle2 className="h-3 w-3 text-emerald-400" />;
    }
    return <Cpu className="h-3 w-3 text-sky-400" />;
  };

  return (
    <section className="mb-12 rounded-2xl border border-white/10 bg-zinc-950/75 backdrop-blur-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.65)] ring-1 ring-white/5">
      {/* Modern KDE Plasma / Konsole Window Titlebar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 border-b border-white/5 bg-zinc-900/60 backdrop-blur-md select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-800/80 border border-white/10 text-xs text-zinc-200 shadow-sm">
            <Terminal className="h-3.5 w-3.5 text-sky-400" />
            <span className="font-semibold text-[11px] font-mono">{terminal.title}</span>
          </div>
          <span className="hidden md:inline text-[11px] text-zinc-500 font-sans">Konsole</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-[11px] font-mono transition-colors border border-white/5"
            title="Copy command and terminal output"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Modern Circular Window Controls: Arrow Down, Arrow Up, Close with hover red */}
          <div className="flex items-center gap-1.5 ml-1 sm:ml-2 pl-2 border-l border-white/10">
            <span
              className="w-5 h-5 rounded-full bg-zinc-800/80 text-zinc-400 flex items-center justify-center border border-white/10 shadow-sm"
              title="Minimize"
            >
              <ChevronDown className="h-3 w-3" />
            </span>
            <span
              className="w-5 h-5 rounded-full bg-zinc-800/80 text-zinc-400 flex items-center justify-center border border-white/10 shadow-sm"
              title="Maximize"
            >
              <ChevronUp className="h-3 w-3" />
            </span>
            <span
              className="group/close w-5 h-5 rounded-full bg-zinc-800/80 hover:bg-[#da4453] text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-150 border border-white/10 hover:border-red-500/50 shadow-sm"
              title="Close"
            >
              <X className="h-3 w-3 transition-transform group-hover/close:scale-110" />
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div role="tablist" className="flex items-center gap-1 px-3 py-2 border-b border-zinc-800/80 bg-zinc-950/70 overflow-x-auto">
        {terminal.tabs.map((tab) => {
          const isActive = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTabId(tab.id)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-zinc-800 text-sky-300 font-semibold border border-zinc-700 shadow-inner'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
              }`}
            >
              {getTabIcon(tab.id)}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Context / Description Banner */}
      {activeTab.description && (
        <div className="px-4 py-2 bg-zinc-900/40 border-b border-zinc-800/50 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
          <span>// {activeTab.description}</span>
        </div>
      )}

      {/* Terminal Screen */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-zinc-200 bg-zinc-950">
        {/* Command Line if specified */}
        {activeTab.command && (
          <div className="flex items-start gap-2 mb-3 pb-3 border-b border-zinc-800/60 text-sky-400 font-semibold">
            <span className="text-emerald-400 select-none">$</span>
            <span className="text-zinc-100">{activeTab.command}</span>
          </div>
        )}

        {/* Console Output with syntax cues */}
        <pre className="whitespace-pre-wrap break-all text-zinc-300 font-mono">
          {activeTab.output.split('\n').map((line, idx) => {
            let lineClass = 'text-zinc-300';
            if (line.includes('[ALERT]') || line.includes('CRITICAL') || line.includes('FAILED') || line.includes('WARNING') || line.includes('Vulnerability')) {
              lineClass = 'text-red-400 font-semibold';
            } else if (line.includes('[SEC] Packet rejected') || line.includes('BAD_HMAC')) {
              lineClass = 'text-amber-400 font-semibold';
            } else if (line.includes('[OK]') || line.includes('PASSED') || line.includes('PASSED.') || line.includes('INTEGRITY CONFIRMED') || line.includes('0 errors') || line.includes('VALID HEALTH CERT')) {
              lineClass = 'text-emerald-400 font-semibold';
            } else if (line.includes('===') || line.includes('---')) {
              lineClass = 'text-zinc-500';
            } else if (line.includes('[SYS]') || line.includes('[NET]') || line.includes('[TLS]') || line.includes('[ServerV]')) {
              lineClass = 'text-sky-400';
            } else if (line.startsWith('#') || line.startsWith('//') || line.startsWith('->')) {
              lineClass = 'text-cyan-300/80';
            }
            return (
              <span key={idx} className={`block ${lineClass}`}>
                {line}
              </span>
            );
          })}
        </pre>
      </div>
    </section>
  );
};
