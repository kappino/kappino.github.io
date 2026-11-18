import { ArrowDown, ArrowRight } from 'lucide-react';
import type { Flow } from '@/data/projectFigures';

export function SourceFigure({ file, alt, caption, italian = false }: { file: string; alt: string; caption: string; italian?: boolean }) {
  const src = import.meta.env.BASE_URL + 'project-figures/' + file;
  return (
    <figure className="my-5 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900/60">
      <a href={src} target="_blank" rel="noreferrer" className="block bg-white focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-400" aria-label={italian ? 'Apri figura a dimensione originale: ' + alt : 'Open full-size figure: ' + alt}>
        <img src={src} alt={alt} className="mx-auto block h-auto max-h-[42rem] max-w-full object-contain" loading="lazy" decoding="async" />
      </a>
      <figcaption className="px-4 py-3 text-sm leading-relaxed text-zinc-300">{caption}</figcaption>
    </figure>
  );
}

export function SpectraCohortFigure({ italian = false }: { italian?: boolean }) {
  const groups = [
    { label: italian ? 'Controlli sani' : 'Healthy controls', count: 7, color: '#7dd3fc' },
    { label: italian ? 'Schizofrenia responsiva al trattamento' : 'Treatment-responsive schizophrenia', count: 6, color: '#c4b5fd' },
    { label: italian ? 'Schizofrenia resistente al trattamento' : 'Treatment-resistant schizophrenia', count: 8, color: '#fcd34d' },
  ];
  const total = groups.reduce((sum, group) => sum + group.count, 0);
  const stops = groups.map(({ color, count }, index) => {
    const start = groups.slice(0, index).reduce((sum, group) => sum + group.count, 0);
    return color + ' ' + (100 * start / total) + '% ' + (100 * (start + count) / total) + '%';
  });
  return (
    <figure className="my-5 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 text-sm font-semibold text-zinc-100">
        {italian ? 'Composizione del campione · 21 partecipanti' : 'Study cohort · 21 participants'}
      </figcaption>
      <div className="grid items-center gap-5 sm:grid-cols-[8rem_minmax(0,1fr)]">
        <div aria-hidden="true" className="mx-auto aspect-square w-32 rounded-full" style={{ background: 'conic-gradient(' + stops.join(', ') + ')' }} />
        <ul className="space-y-2 text-sm text-zinc-200">
          {groups.map(({ label, count, color }) => (
            <li key={label} className="flex items-start gap-2">
              <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
              <span className="grow">{label}</span>
              <span className="font-mono tabular-nums">{count}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-xs text-zinc-400">{italian ? 'Fonte: paper IAS-19, sezione 2.' : 'Source: IAS-19 paper, Section 2.'}</p>
    </figure>
  );
}

export function SpectraCleaningFigure({ italian = false }: { italian?: boolean }) {
  const flow = italian
    ? { title: 'Pipeline di pulizia EEG', steps: [['Segmentazione', 'Allineamento ai marker e correzione della baseline'], ['Filtraggio', 'Banda 1–45 Hz e notch a 50 Hz'], ['Artefatti', 'Pulizia automatica, PICARD ICA e ICLabel'], ['Controllo finale', 'Esclusione dei segmenti anomali e interpolazione se necessaria']] } as const
    : { title: 'EEG cleaning pipeline', steps: [['Segmentation', 'Event alignment and baseline correction'], ['Filtering', '1–45 Hz bandpass and 50 Hz notch'], ['Artifact handling', 'Automatic cleaning, PICARD ICA and ICLabel'], ['Final checks', 'Reject high-variance segments and interpolate when needed']] } as const;

  return (
    <>
      <FlowFigure flow={flow} />
      <SourceFigure
        file="spectra-f3-preprocessing.png"
        italian={italian}
        alt={italian ? 'Quattro tracce del canale EEG F3, dal segnale grezzo a quello elaborato' : 'Four EEG traces for channel F3, from raw to processed'}
        caption={italian ? 'Tesi, figura 3.4. Esempio sul canale F3. Le scale verticali differiscono tra i pannelli.' : 'Thesis, Figure 3.4. Example trace from channel F3. The vertical scale differs across panels.'}
      />
    </>
  );
}

export function FlowFigure({ flow }: { flow: Flow }) {
  return (
    <figure className="my-5 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 text-sm font-semibold text-zinc-100">{flow.title}</figcaption>
      <ol className="m-0 grid list-none gap-2 p-0 md:auto-cols-fr md:grid-flow-col md:gap-3">
        {flow.steps.map(([label, detail], index) => (
          <li key={label} className="m-0 flex min-w-0 flex-col gap-2 p-0 md:flex-row md:items-stretch">
            {index > 0 && (
              <>
                <ArrowDown aria-hidden="true" size={16} className="ml-4 text-sky-300 md:hidden" />
                <ArrowRight aria-hidden="true" size={16} className="hidden shrink-0 self-center text-sky-300 md:block" />
              </>
            )}
            <div className="min-w-0 flex-1 rounded-lg border border-sky-300/20 bg-sky-300/[0.055] p-3">
              <p className="m-0 text-sm font-semibold text-sky-200">{label}</p>
              <p className="m-0 mt-1 text-xs leading-relaxed text-zinc-300">{detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function CareDecisionFigure({ italian = false }: { italian?: boolean }) {
  const paths = italian
    ? [['Sessione cognitiva', 'Attende il feedback', 'Nessuna nuova azione per l’esercizio'], ['Promemoria farmacologico', 'Valutato separatamente', 'Il coordinatore riceve la richiesta']]
    : [['Cognitive session', 'Waits for feedback', 'No new exercise action'], ['Medication reminder', 'Evaluated independently', 'The coordinator receives the request']];

  return (
    <figure className="my-5 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 text-sm font-semibold text-zinc-100">
        {italian ? 'Due rami decisionali nello stesso ciclo' : 'Two decision paths in the same evaluation cycle'}
      </figcaption>
      <div className="grid gap-3 sm:grid-cols-2">
        {paths.map(([input, condition, output], index) => (
          <div key={input} className={index === 0 ? 'rounded-xl border border-zinc-700 p-4' : 'rounded-xl border border-sky-300/30 bg-sky-300/[0.06] p-4'}>
            <h3 className="text-sm font-semibold text-zinc-100">{input}</h3>
            <p className="mt-2 text-xs text-zinc-300">{condition}</p>
            <ArrowDown size={16} aria-hidden="true" className="my-2 text-sky-300" />
            <p className="text-sm font-medium text-zinc-100">{output}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-zinc-400">{italian ? 'Scenario ricostruito dal codice del planner.' : 'Scenario reconstructed from the planner implementation.'}</p>
    </figure>
  );
}

export function GatewayChecksFigure({ italian = false }: { italian?: boolean }) {
  const checks = italian
    ? [['Ingresso BLE', 'HMAC', 'Il gateway inoltra soltanto payload che superano la verifica.'], ['Accesso MQTT', 'mTLS e ACL', 'Il broker lega i permessi sui topic al certificato del client.'], ['Dati archiviati', 'Digest', 'L’audit confronta il record SQLite con il digest registrato.']]
    : [['BLE input', 'HMAC', 'The gateway forwards payloads that pass verification.'], ['MQTT access', 'mTLS and ACLs', 'The broker binds topic permissions to the client certificate.'], ['Stored records', 'Digest', 'The audit compares the SQLite record with the registered digest.']];

  return (
    <figure className="my-5 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 text-sm font-semibold text-zinc-100">{italian ? 'Tre controlli lungo il percorso dei dati' : 'Three checks along the telemetry path'}</figcaption>
      <dl className="divide-y divide-zinc-700/70">
        {checks.map(([stage, check, result]) => (
          <div key={stage} className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-3">
            <dt className="text-sm font-semibold text-zinc-100">{stage}</dt>
            <dd className="text-sm leading-relaxed text-zinc-300"><span className="mr-2 font-mono text-xs text-sky-200">{check}</span>{result}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}

export function TranscriptComparisonFigure({ italian = false }: { italian?: boolean }) {
  const columns = italian
    ? [['Schermata del terminale', 'Righe visibili', 'Il testo può andare a capo alla larghezza del pannello.', 'Il bridge deduce se il turno è terminato.'], ['Trascrizione JSONL', 'Record in ordine di scrittura', 'Il testo arriva come valore di un campo.', 'Il tipo di evento separa gli aggiornamenti dalla risposta.']]
    : [['Terminal snapshot', 'Visible terminal rows', 'Text can wrap at the pane width.', 'The bridge infers whether a turn has ended.'], ['JSONL transcript', 'Records in write order', 'Text arrives as a field value.', 'The event type separates progress from the reply.']];
  const labels = italian ? ['Unità di lettura', 'Testo', 'Stato del turno'] : ['Read unit', 'Text layout', 'Turn status'];

  return (
    <figure className="my-5 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 text-sm font-semibold text-zinc-100">{italian ? 'Cosa riceve il bridge' : 'What the bridge receives'}</figcaption>
      <div className="grid gap-3 sm:grid-cols-2">
        {columns.map(([title, ...points]) => (
          <div key={title} className="rounded-xl border border-zinc-700 p-3 sm:p-4">
            <h3 className="text-sm font-semibold text-sky-200">{title}</h3>
            <dl className="mt-2 divide-y divide-zinc-700/70">
              {points.map((point, index) => (
                <div key={point} className="py-2 last:pb-0">
                  <dt className="text-xs text-zinc-400">{labels[index]}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-zinc-100">{point}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </figure>
  );
}

// IAS-19, Tables 3–4. Best reported configuration per model and task.
const spectraResults = [
  { model: 'MLP', groups: 97.2, clips: 84.6 },
  { model: 'Random Forest', groups: 95.6, clips: 81.9 },
  { model: 'SVM (RBF)', groups: 94.7, clips: 80.1 },
  { model: 'k-NN', groups: 94.5, clips: 78.6 },
  { model: 'SVM (polynomial)', groups: 90.5, clips: 54.7 },
  { model: 'SVM (linear)', groups: 90.1, clips: 64.4 },
  { model: 'Decision Tree', groups: 83, clips: 71.9 },
  { model: 'SVM (sigmoid)', groups: 48.7, clips: 44.1 },
];

export function SpectraResultsFigure({ italian = false }: { italian?: boolean }) {
  const format = new Intl.NumberFormat(italian ? 'it-IT' : 'en', {
    style: 'percent',
    maximumFractionDigits: 1,
  });
  const groupsLabel = italian ? 'Gruppi' : 'Groups';
  const clipsLabel = italian ? 'Clip video' : 'Video clips';
  return (
    <figure className="my-5 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 text-sm font-semibold text-zinc-100">
        {italian ? 'Accuratezza per classificatore e compito' : 'Classification accuracy by model and task'}
      </figcaption>
      <table className="w-full table-fixed border-collapse text-left text-xs text-zinc-200">
        <thead>
          <tr className="border-b border-zinc-700 text-zinc-400">
            <th scope="col" className="w-[34%] pb-2 pr-2">{italian ? 'Modello' : 'Model'}</th>
            <th scope="col" className="pb-2 pr-2">{groupsLabel}</th>
            <th scope="col" className="pb-2">{clipsLabel}</th>
          </tr>
        </thead>
        <tbody>
          {spectraResults.map(({ model, groups, clips }) => (
            <tr key={model} className="border-b border-zinc-800">
              <th scope="row" className="break-words py-2 pr-2 font-medium">{model}</th>
              <td className="py-2 pr-2"><AccuracyBar value={groups} label={format.format(groups / 100)} color="bg-sky-300" /></td>
              <td className="py-2"><AccuracyBar value={clips} label={format.format(clips / 100)} color="bg-violet-300" /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mb-0 mt-4 text-xs leading-relaxed text-zinc-400">
        {italian ? 'Scala 0–100%. Paper IAS-19, tabelle 3 e 4. 21 partecipanti, validazione stratificata a cinque fold. Il raggruppamento per partecipante non è specificato.' : 'Scale 0–100%. IAS-19 paper, Tables 3 and 4. 21 participants, stratified five-fold validation. Participant grouping across folds is unspecified.'}
      </p>
    </figure>
  );
}

export function UniReviewsIndexFigure() {
  const measurements = [{ label: 'Before indexing', count: 3570 }, { label: 'With compound index', count: 18 }];
  return (
    <figure className="my-5 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 text-sm font-semibold text-zinc-100">Documents examined by the catalogue query</figcaption>
      <dl className="space-y-3">
        {measurements.map(({ label, count }) => (
          <div key={label}>
            <dt className="text-sm text-zinc-300">{label}</dt>
            <dd><AccuracyBar value={count / 3570 * 100} label={count.toLocaleString('en')} color="bg-sky-300" /></dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-zinc-400">Local benchmark reported in the Database Systems II final report, Table 3. The query filters by degree programme and credits.</p>
    </figure>
  );
}

function AccuracyBar({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <>
      <span className="font-mono tabular-nums">{label}</span>
      <div aria-hidden="true" className="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-700">
        <div className={'h-full rounded-full ' + color} style={{ width: value + '%' }} />
      </div>
    </>
  );
}
