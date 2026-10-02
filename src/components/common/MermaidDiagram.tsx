import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { Eye, Code, Copy, Check, GitFork, Loader2 } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
}

// Initialize mermaid once with dark cybersecurity theme
mermaid.initialize({
  startOnLoad: false,
  suppressErrorRendering: true,
  theme: 'dark',
  securityLevel: 'loose',
  themeVariables: {
    darkMode: true,
    background: '#09090b',
    mainBkg: '#121215',
    nodeBorder: '#38bdf8',
    clusterBkg: '#18181c',
    clusterBorder: '#27272a',
    titleColor: '#38bdf8',
    edgeLabelBackground: '#09090b',
    actorBorder: '#38bdf8',
    actorBkg: '#121215',
    actorTextColor: '#f8fafc',
    actorLineColor: '#38bdf8',
    signalColor: '#38bdf8',
    signalTextColor: '#f8fafc',
    labelBoxBkgColor: '#121215',
    labelBoxBorderColor: '#38bdf8',
    labelTextColor: '#f8fafc',
    loopTextColor: '#f8fafc',
    noteBorderColor: '#0284c7',
    noteBkgColor: '#0c4a6e',
    noteTextColor: '#f8fafc',
    lineColor: '#38bdf8',
  },
  fontFamily: 'JetBrains Mono, monospace',
});

function sanitizeMermaid(code: string): string {
  let cleaned = code.trim();
  // Ensure declaration has trailing newline
  cleaned = cleaned.replace(/^(flowchart|graph)\s+([A-Z]+)\s+/i, '$1 $2\n');
  return cleaned;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'diagram' | 'source'>('diagram');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const cleanChart = sanitizeMermaid(chart);

    if (!cleanChart) {
      return;
    }

    const uniqueId = `mermaid_diag_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;

    mermaid
      .render(uniqueId, cleanChart)
      .then(({ svg }) => {
        if (isMounted) {
          setSvgContent(svg);
          setError(null);
          setLoading(false);
          setViewMode('diagram');
        }
      })
      .catch((err) => {
        if (isMounted) {
          // Clean up any error element injected into DOM by mermaid
          const errEl = document.getElementById(`d${uniqueId}`);
          if (errEl) errEl.remove();

          setError(err?.message || 'Failed to render architecture diagram');
          setLoading(false);
          setViewMode('source');
        }
      });

    return () => {
      isMounted = false;
      const errEl = document.getElementById(`d${uniqueId}`);
      if (errEl) errEl.remove();
    };
  }, [chart]);

  const handleCopy = () => {
    navigator.clipboard.writeText(chart).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="my-8 rounded-xl border border-zinc-800 bg-zinc-950/90 shadow-2xl overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-xs font-mono select-none">
        <div className="flex items-center gap-2 text-sky-400 font-medium">
          <GitFork className="h-3.5 w-3.5 text-sky-400" />
          <span>Interactive Architecture Diagram</span>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-zinc-950 rounded-lg p-0.5 border border-zinc-800">
            <button
              type="button"
              onClick={() => setViewMode('diagram')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                viewMode === 'diagram'
                  ? 'bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Eye className="h-3 w-3" />
              <span>Diagram</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('source')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                viewMode === 'source'
                  ? 'bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Code className="h-3 w-3" />
              <span>Source</span>
            </button>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-[11px] font-mono"
            title="Copy diagram source"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-zinc-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'diagram' ? (
        loading ? (
          <div className="p-12 flex flex-col items-center justify-center min-h-[220px] text-zinc-500 gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-sky-400" />
            <span className="font-mono text-xs">Rendering SVG diagram...</span>
          </div>
        ) : svgContent ? (
          <div
            className="p-6 overflow-x-auto flex items-center justify-center bg-zinc-950/60 min-h-[220px] [&>svg]:max-w-full [&>svg]:h-auto"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : null
      ) : (
        <div className="p-4 bg-zinc-950/80 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
          {error && (
            <div className="mb-3 px-3 py-2 rounded bg-rose-950/40 border border-rose-900/50 text-rose-300 text-xs">
              Diagram preview unavailable. Showing raw Mermaid definition below.
            </div>
          )}
          <pre className="text-zinc-300">{chart}</pre>
        </div>
      )}
    </div>
  );
};

export default MermaidDiagram;
