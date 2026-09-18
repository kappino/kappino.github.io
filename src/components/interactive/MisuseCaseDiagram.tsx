import { useState } from 'react';
import { ShieldCheck, UserX, Lock, Cpu, Database, CheckCircle2 } from 'lucide-react';
import { MisuseCase } from '@/types';

interface MisuseCaseDiagramProps {
  cases: MisuseCase[];
}

export const MisuseCaseDiagram: React.FC<MisuseCaseDiagramProps> = ({ cases }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');
  const [viewMode, setViewMode] = useState<'diagram' | 'matrix'>('diagram');

  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  if (!cases || cases.length === 0) return null;

  const getLayerIcon = (layer: string) => {
    switch (layer) {
      case 'Perception':
        return <Cpu className="h-3.5 w-3.5 text-amber-400" />;
      case 'Transport':
        return <Lock className="h-3.5 w-3.5 text-sky-400" />;
      case 'Storage':
        return <Database className="h-3.5 w-3.5 text-purple-400" />;
      default:
        return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />;
    }
  };

  return (
    <section className="mb-12 rounded-xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 shadow-xl">
      {/* Header with Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-sky-400 font-bold">
              Security Specification
            </span>
            <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[10px] font-mono text-red-400 font-semibold">
              Misuse Case Model
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Threat Modeling &amp; Architectural Countermeasures
          </h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
          <button
            onClick={() => setViewMode('diagram')}
            aria-pressed={viewMode === 'diagram'}
            className={`px-3 py-1 rounded transition-colors ${
              viewMode === 'diagram'
                ? 'bg-sky-500 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Misuse Diagram
          </button>
          <button
            onClick={() => setViewMode('matrix')}
            aria-pressed={viewMode === 'matrix'}
            className={`px-3 py-1 rounded transition-colors ${
              viewMode === 'matrix'
                ? 'bg-sky-500 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Matrix Table
          </button>
        </div>
      </div>

      {viewMode === 'diagram' ? (
        <div>
          {/* Visual Misuse Case Map */}
          <p className="text-xs text-zinc-400 mb-4">
            Click on a threat vector below to trace how the hardened architecture intercepts and neutralizes the attack:
          </p>

          <div className="space-y-3 mb-4">
            {cases.map((item) => {
              const isSelected = item.id === activeCase.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedCaseId(item.id)}
                  className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-zinc-900/90 border-sky-500 shadow-md ring-1 ring-sky-500/40'
                      : 'bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    {/* Threat Source & Vector */}
                    <div className="flex items-center gap-2.5 min-w-[240px]">
                      <div className="p-1.5 rounded-lg bg-red-950/50 border border-red-900/60 text-red-400 shrink-0">
                        <UserX className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-red-300">
                            {item.threatName}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                            {item.mitreId}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-500">
                          Attacker: {item.threatActor}
                        </span>
                      </div>
                    </div>

                    {/* Arrow / Attack target */}
                    <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 px-2 py-1 rounded bg-zinc-950/80 border border-zinc-800/60 shrink-0">
                      <span className="text-red-400">threatens ➔</span>
                      <span className="text-zinc-200">{item.targetUseCase}</span>
                      <span className="text-zinc-500">({item.layer})</span>
                    </div>

                    {/* Countermeasure */}
                    <div className="flex items-center gap-2 text-right">
                      <div className="p-1.5 rounded-lg bg-emerald-950/50 border border-emerald-900/60 text-emerald-400 shrink-0">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-300 block">
                          {item.countermeasure}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400/80">
                          {item.verifiedOutcome}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Misuse Case Inspector Strip */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-zinc-800/80 font-mono">
              <div className="flex items-center gap-2">
                {getLayerIcon(activeCase.layer)}
                <span className="font-semibold text-zinc-200">
                  Target: {activeCase.targetUseCase} ({activeCase.layer} Layer)
                </span>
              </div>
              <span className="text-[11px] text-sky-400 font-semibold">
                Mitigation Mechanism: {activeCase.countermeasure}
              </span>
            </div>
            <p className="text-zinc-300 leading-relaxed font-mono text-[11px]">
              <strong className="text-emerald-400">Technical Enforcement:</strong> {activeCase.countermeasureDetail}
            </p>
          </div>
        </div>
      ) : (
        /* Compact Matrix Table View */
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 text-[10px] uppercase">
                <th className="py-2.5 px-3">Threat Vector &amp; MITRE</th>
                <th className="py-2.5 px-3">Target Layer</th>
                <th className="py-2.5 px-3">Countermeasure</th>
                <th className="py-2.5 px-3">Defensive Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {cases.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-900/30">
                  <td className="py-3 px-3">
                    <span className="font-bold text-red-300 block">{c.threatName}</span>
                    <span className="text-[10px] text-sky-400">{c.mitreId}</span>
                  </td>
                  <td className="py-3 px-3 text-zinc-300">
                    <span className="font-semibold block">{c.targetUseCase}</span>
                    <span className="text-[10px] text-zinc-500">{c.layer}</span>
                  </td>
                  <td className="py-3 px-3 text-emerald-300 font-semibold">
                    {c.countermeasure}
                  </td>
                  <td className="py-3 px-3 text-zinc-300 text-[11px]">
                    {c.verifiedOutcome}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MisuseCaseDiagram;
