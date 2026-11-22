import { ArrowDown, ArrowRight, Cpu, HardDrive, ShieldCheck, Layers, Server, Terminal } from 'lucide-react';
import type { Flow } from '@/data/projectFigures';

export function SourceFigure({ file, alt, caption, italian = false }: { file: string; alt: string; caption: string; italian?: boolean }) {
  const src = import.meta.env.BASE_URL + 'project-figures/' + file;
  return (
    <figure className="my-6 overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/60">
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        className="block bg-white focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-400"
        aria-label={italian ? 'Apri figura a dimensione originale: ' + alt : 'Open full-size figure: ' + alt}
      >
        <img src={src} alt={alt} className="mx-auto block h-auto max-h-[42rem] max-w-full object-contain" loading="lazy" decoding="async" />
      </a>
      <figcaption className="px-4 py-3 text-sm leading-relaxed text-zinc-300">{caption}</figcaption>
    </figure>
  );
}

export function SpectraCohortFigure({ italian = false }: { italian?: boolean }) {
  const groups = [
    { label: italian ? 'Controlli sani' : 'Healthy controls', count: 7, color: '#38bdf8' },
    { label: italian ? 'Schizofrenia responsiva al trattamento' : 'Treatment-responsive schizophrenia', count: 6, color: '#a78bfa' },
    { label: italian ? 'Schizofrenia resistente al trattamento' : 'Treatment-resistant schizophrenia', count: 8, color: '#fbbf24' },
  ];
  const total = groups.reduce((sum, group) => sum + group.count, 0);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  const segments = groups.reduce<{ offset: number; items: (typeof groups[number] & { dash: number; startOffset: number; pct: number })[] }>(
    (acc, group) => {
      const fraction = group.count / total;
      const dash = fraction * circumference;
      acc.items.push({ ...group, dash, startOffset: acc.offset, pct: Math.round(fraction * 100) });
      acc.offset += dash;
      return acc;
    },
    { offset: 0, items: [] }
  ).items;

  return (
    <figure className="my-6 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-5 sm:p-6">
      <figcaption className="mb-4 text-sm font-semibold text-zinc-100">
        {italian ? 'Composizione del campione clinico · 21 partecipanti' : 'Clinical study cohort · 21 participants'}
      </figcaption>
      <div className="grid items-center gap-6 sm:grid-cols-[9rem_minmax(0,1fr)]">
        <div className="relative mx-auto h-36 w-36">
          <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="64" cy="64" r={radius} fill="none" stroke="#27272a" strokeWidth="14" />
            {segments.map(({ label, color, dash, startOffset }) => (
              <circle
                key={label}
                cx="64"
                cy="64"
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth="14"
                strokeDasharray={`${Math.max(0, dash - 2.5)} ${circumference}`}
                strokeDashoffset={-startOffset}
              />
            ))}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-2xl font-bold leading-none text-white">{total}</span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              {italian ? 'soggetti' : 'subjects'}
            </span>
          </div>
        </div>
        <ul className="space-y-3 text-sm text-zinc-200">
          {segments.map(({ label, count, color, pct }) => (
            <li key={label} className="flex items-center gap-3 rounded-lg border border-zinc-800/80 bg-zinc-950/60 px-3 py-2">
              <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
              <span className="grow text-zinc-200">{label}</span>
              <span className="font-mono text-xs text-zinc-400">{pct}%</span>
              <span className="font-mono text-sm font-semibold tabular-nums text-white">{count}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-xs text-zinc-400">
        {italian ? 'Fonte: paper IAS-19 (Springer LNNS), sezione 2 · acquisizione EEG a 14 canali (256 Hz).' : 'Source: IAS-19 paper (Springer LNNS), Section 2 · 14-channel wearable EEG @ 256 Hz.'}
      </p>
    </figure>
  );
}

export function SpectraCleaningFigure({ italian = false }: { italian?: boolean }) {
  const flow = italian
    ? {
        title: 'Pipeline di pulizia EEG (MATLAB / EEGLAB)',
        steps: [
          ['Segmentazione', 'Allineamento ai marker e correzione della baseline'],
          ['Filtraggio', 'Banda 1–45 Hz e filtro notch a 50 Hz'],
          ['Artefatti', 'Pulizia automatica, PICARD-ICA e ICLabel'],
          ['Controllo finale', 'Scarto segmenti ad alta varianza e interpolazione'],
        ],
      } as const
    : {
        title: 'EEG cleaning pipeline (MATLAB / EEGLAB)',
        steps: [
          ['Segmentation', 'Event alignment and baseline correction'],
          ['Filtering', '1–45 Hz bandpass and 50 Hz notch'],
          ['Artifact handling', 'Automatic cleaning, PICARD-ICA and ICLabel'],
          ['Final checks', 'Reject high-variance segments and interpolate when needed'],
        ],
      } as const;

  return (
    <>
      <FlowFigure flow={flow} />
      <SourceFigure
        file="spectra-f3-preprocessing.png"
        italian={italian}
        alt={italian ? 'Quattro tracce del canale EEG F3, dal segnale grezzo a quello elaborato' : 'Four EEG traces for channel F3, from raw to processed'}
        caption={italian ? 'Tesi, figura 3.4. Esempio sul canale F3: la scala verticale varia tra i pannelli man mano che DC offset e artefatti oculari vengono rimossi.' : 'Thesis, Figure 3.4. Channel F3 trace across stages: vertical scales differ as DC offset and ocular artifacts are removed.'}
      />
    </>
  );
}

export function FlowFigure({ flow }: { flow: Flow }) {
  return (
    <figure className="my-6 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
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
            <div className="min-w-0 flex-1 rounded-xl border border-sky-300/20 bg-sky-300/[0.05] p-3.5">
              <p className="m-0 font-mono text-xs font-semibold text-sky-200">{label}</p>
              <p className="m-0 mt-1.5 text-xs leading-relaxed text-zinc-300">{detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function CareDecisionFigure({ italian = false }: { italian?: boolean }) {
  const paths = italian
    ? [
        {
          input: 'Esercizio cognitivo attivo',
          token: 'WAIT',
          output: 'Il planner attende il feedback e sospende nuove attività opzionali.',
          accent: 'border-zinc-700 bg-zinc-950/60',
          badge: 'bg-zinc-800 text-zinc-200',
        },
        {
          input: 'Promemoria farmaco in scadenza',
          token: 'REMIND_FARMACO',
          output: 'Imposta lo snooze e pubblica la richiesta prioritaria su decision_output.',
          accent: 'border-sky-300/35 bg-sky-300/[0.06]',
          badge: 'bg-sky-400/15 text-sky-200',
        },
        {
          input: 'Scadenza superata senza conferma',
          token: 'ESCALATE',
          output: 'Inoltra una richiesta di escalation indirizzata all’integrazione caregiver.',
          accent: 'border-amber-300/35 bg-amber-300/[0.05]',
          badge: 'bg-amber-400/15 text-amber-200',
        },
      ]
    : [
        {
          input: 'Cognitive exercise active',
          token: 'WAIT',
          output: 'Planner awaits feedback and holds optional tasks.',
          accent: 'border-zinc-700 bg-zinc-950/60',
          badge: 'bg-zinc-800 text-zinc-200',
        },
        {
          input: 'Medication reminder due',
          token: 'REMIND_FARMACO',
          output: 'Sets snooze offset and publishes the priority command on decision_output.',
          accent: 'border-sky-300/35 bg-sky-300/[0.06]',
          badge: 'bg-sky-400/15 text-sky-200',
        },
        {
          input: 'Deadline elapsed while pending',
          token: 'ESCALATE',
          output: 'Emits an escalation command routed to the caregiver integration.',
          accent: 'border-amber-300/35 bg-amber-300/[0.05]',
          badge: 'bg-amber-400/15 text-amber-200',
        },
      ];

  return (
    <figure id="care-decision-scenario" className="my-6 scroll-mt-24 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 text-sm font-semibold text-zinc-100">
        {italian ? 'Arbitraggio decisionale GoRules → ROS 2 (care_planner)' : 'GoRules → ROS 2 decision arbitration (care_planner)'}
      </figcaption>
      <div className="grid gap-3 md:grid-cols-3">
        {paths.map(({ input, token, output, accent, badge }) => (
          <div key={token} className={`flex flex-col rounded-xl border p-4 ${accent}`}>
            <h3 className="text-sm font-semibold text-zinc-100">{input}</h3>
            <span className={`mt-2.5 inline-flex self-start rounded px-2 py-0.5 font-mono text-[11px] font-semibold ${badge}`}>{token}</span>
            <ArrowDown size={15} aria-hidden="true" className="my-2.5 text-sky-300" />
            <p className="text-xs leading-relaxed text-zinc-200">{output}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-zinc-400">
        {italian ? 'Scenario ricostruito dal grafo medicine9.json e dal nodo Python care_planner.' : 'Scenario reconstructed from the medicine9.json JDM graph and Python care_planner node.'}
      </p>
    </figure>
  );
}

export function GatewayChecksFigure({ italian = false }: { italian?: boolean }) {
  const checks = italian
    ? [
        {
          stage: '1. Ingresso BLE',
          control: 'HMAC-SHA256 (mbedTLS)',
          legacy: 'Accettava letture da qualsiasi ESP32 che impersonava l’indirizzo del sensore.',
          hardened: 'L’ESP32 verifica il tag HMAC prima di inoltrare; i frame non validi vengono scartati.',
        },
        {
          stage: '2. Trasporto MQTT',
          control: 'mTLS (TLS 1.3) + ACL X.509',
          legacy: 'Pubblicazione in chiaro senza certificati client né permessi per topic.',
          hardened: 'Mosquitto autentica gateway e bridge con certificati distinti legati alle ACL sui topic.',
        },
        {
          stage: '3. Storico dati',
          control: 'SQLite + Digest Solidity',
          legacy: 'Modifiche successive al database locale non lasciavano prove verificabili.',
          hardened: 'I digest SHA-256 ancorati su Ganache locale permettono di rilevare alterazioni del DB.',
        },
      ]
    : [
        {
          stage: '1. BLE Edge',
          control: 'HMAC-SHA256 (mbedTLS)',
          legacy: 'Original gateway accepted readings from a rogue ESP32 impersonating a known sensor.',
          hardened: 'ESP32 firmware verifies the HMAC tag before forwarding and drops forged payloads.',
        },
        {
          stage: '2. MQTT Broker',
          control: 'mTLS (TLS 1.3) + X.509 ACLs',
          legacy: 'Plaintext MQTT with no client certificates or topic-level authorization.',
          hardened: 'Mosquitto requires distinct client certificates and enforces X.509-bound topic ACLs.',
        },
        {
          stage: '3. Stored History',
          control: 'SQLite + Solidity Digest',
          legacy: 'Post-storage database edits left no independent integrity reference.',
          hardened: 'SHA-256 digests anchored on local Ganache let auditors detect SQLite tampering.',
        },
      ];

  return (
    <figure className="my-6 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 text-sm font-semibold text-zinc-100">
        {italian ? 'Confronto per strato: pipeline originale vs gateway protetto' : 'Layer-by-layer hardening: original pipeline vs. hardened gateway'}
      </figcaption>
      <div className="space-y-3">
        {checks.map(({ stage, control, legacy, hardened }) => (
          <div key={stage} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold text-white">{stage}</span>
              <span className="rounded bg-sky-400/10 px-2 py-0.5 font-mono text-[11px] font-medium text-sky-200">{control}</span>
            </div>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/[0.04] p-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-amber-300">{italian ? 'Prima (Originale)' : 'Before (Original)'}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-300">{legacy}</p>
              </div>
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] p-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-300">{italian ? 'Dopo (Prototipo)' : 'After (Prototype)'}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-200">{hardened}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function SortEdgeArchitectureFigure({ italian = false }: { italian?: boolean }) {
  return (
    <figure className="my-6 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 text-sm font-semibold text-zinc-100">
        {italian ? 'Architettura dual-MCU di SortEdge Bin (ESP32-CAM → STM32G474RE)' : 'SortEdge Bin dual-MCU architecture (ESP32-CAM → STM32G474RE)'}
      </figcaption>
      <div className="grid items-stretch gap-3 lg:grid-cols-[0.95fr_auto_1.35fr]">
        <div className="rounded-xl border border-zinc-700 bg-zinc-950/70 p-4">
          <div className="flex items-center gap-2 text-sky-300">
            <Cpu size={16} aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider">ESP32-CAM</span>
          </div>
          <p className="mt-2 text-sm font-semibold text-white">{italian ? 'Acquisizione immagini' : 'Vision Capture Node'}</p>
          <ul className="mt-2.5 space-y-1.5 text-xs text-zinc-300">
            <li>• {italian ? 'Cattura frame su trigger sensore' : 'Captures raw image frames on trigger'}</li>
            <li>• {italian ? 'Pacchettizzazione frame con checksum CRC-32' : 'Packetizes frames with CRC-32 checksums'}</li>
            <li>• {italian ? 'Ritrasmissione automatica su errore UART' : 'Retransmits corrupted packets over UART'}</li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 py-1 text-center font-mono text-[11px] text-sky-200">
          <ArrowDown size={16} aria-hidden="true" className="text-sky-300 lg:hidden" />
          <ArrowRight size={16} aria-hidden="true" className="hidden text-sky-300 lg:block" />
          <span className="rounded border border-sky-300/25 bg-sky-300/10 px-2 py-0.5">UART + CRC-32</span>
        </div>

        <div className="rounded-xl border border-sky-300/30 bg-sky-300/[0.045] p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sky-300">
              <Cpu size={16} aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider">STM32G474RE · ChibiOS RTOS</span>
            </div>
            <span className="rounded bg-emerald-400/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-300">~13 ms CNN</span>
          </div>
          <p className="mt-2 text-sm font-semibold text-white">{italian ? 'Controllo real-time & inferenza Edge AI' : 'Real-Time Control & On-Device Edge AI'}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-2.5">
              <p className="font-mono text-[11px] font-semibold text-sky-200">On-Device CNN</p>
              <p className="mt-1 text-[11px] text-zinc-300">{italian ? 'Classificazione locale (~13 ms)' : 'Local classification (~13 ms)'}</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-2.5">
              <p className="font-mono text-[11px] font-semibold text-sky-200">SPI · uGFX</p>
              <p className="mt-1 text-[11px] text-zinc-300">{italian ? 'Stato e feedback su display' : 'Live status & display UI'}</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-2.5">
              <p className="font-mono text-[11px] font-semibold text-sky-200">Sensors & PWM</p>
              <p className="mt-1 text-[11px] text-zinc-300">{italian ? 'Trigger e attuazione flap' : 'Triggers & servo flap actuation'}</p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

export function TnesArchitectureFigure({ italian = false }: { italian?: boolean }) {
  return (
    <figure className="my-6 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 text-sm font-semibold text-zinc-100">
        {italian ? 'Confini di verifica TNES: Unreal Engine 5 ↔ FastAPI ↔ Cisco Modeling Labs' : 'TNES verification boundaries: Unreal Engine 5 ↔ FastAPI ↔ Cisco Modeling Labs'}
      </figcaption>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-700 bg-zinc-950/70 p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-sky-300">1. Client 3D</p>
          <h3 className="mt-1 text-sm font-semibold text-white">Unreal Engine 5</h3>
          <p className="mt-2 text-xs leading-relaxed text-zinc-300">
            {italian
              ? 'Invia le azioni sui cavi virtuali via HTTPS e accetta lo stato solo con link ID confermato o readback IOS.'
              : 'Sends virtual cable actions over HTTPS and confirms state only on live link ID or IOS readback.'}
          </p>
        </div>
        <div className="rounded-xl border border-sky-300/30 bg-sky-300/[0.05] p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-sky-300">2. Backend Gateway</p>
          <h3 className="mt-1 text-sm font-semibold text-white">Python FastAPI</h3>
          <p className="mt-2 text-xs leading-relaxed text-zinc-300">
            {italian
              ? 'Mappa le porte di gioco sulle interfacce CML, sincronizza gli scenari e fa da bridge per le sessioni console.'
              : 'Maps game ports to live CML node interfaces, syncs scenario startup, and bridges console sessions.'}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/[0.04] p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-300">3. Lab Network</p>
          <h3 className="mt-1 text-sm font-semibold text-white">Cisco Modeling Labs</h3>
          <p className="mt-2 text-xs leading-relaxed text-zinc-300">
            {italian
              ? 'Test lato backend confermano che scollegare e ricollegare il cavo interrompe e ripristina il ping reale nel lab.'
              : 'Backend tests confirm disconnecting and reconnecting the link drops and restores real ICMP ping in the lab.'}
          </p>
        </div>
      </div>
    </figure>
  );
}

export function HomelabTopologyFigure({ italian = false }: { italian?: boolean }) {
  const storageTiers = italian
    ? [
        { size: '256 GB SSD', role: 'LVM-thin · Hypervisor & root VM/LXC', pct: 18, color: 'bg-sky-300' },
        { size: '1 TB SSD', role: 'Datastore veloce media & AI (Immich)', pct: 34, color: 'bg-violet-300' },
        { size: '2 TB HDD', role: 'Nextcloud / Samba + backup vzdump zstd (03:00)', pct: 48, color: 'bg-emerald-300' },
      ]
    : [
        { size: '256 GB SSD', role: 'LVM-thin · Hypervisor & VM/LXC root disks', pct: 18, color: 'bg-sky-300' },
        { size: '1 TB SSD', role: 'Fast media & AI datastore (Immich)', pct: 34, color: 'bg-violet-300' },
        { size: '2 TB HDD', role: 'Nextcloud / Samba + daily 03:00 vzdump zstd backups', pct: 48, color: 'bg-emerald-300' },
      ];

  return (
    <figure className="my-6 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-zinc-100">
        <span>{italian ? 'Architettura Homelab Proxmox VE 9.1 · 12 LXC + 2 VM KVM in 16 GB RAM' : 'Proxmox VE 9.1 Homelab Blueprint · 12 LXC + 2 KVM VMs in 16 GB RAM'}</span>
        <span className="rounded bg-sky-400/15 px-2 py-0.5 font-mono text-[11px] font-medium text-sky-200">Linux 6.17 · Zero WAN Ports</span>
      </figcaption>

      {/* Hardware & UPS Banner */}
      <div className="mb-4 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="inline-flex items-center gap-2 font-mono font-semibold text-white">
            <Server size={14} className="text-sky-300" aria-hidden="true" />
            {italian ? 'Host bare-metal: Laptop ASUS riciclato (24/7)' : 'Bare-metal host: Recycled ASUS Gaming Laptop (24/7)'}
          </span>
          <span className="font-mono text-zinc-400">i7-7700HQ (4C/8T) · 16 GB RAM · GTX 1070 Mobile · Battery-as-UPS Script</span>
        </div>
      </div>

      {/* Network Segmentation & Ingress */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-sky-300/25 bg-sky-300/[0.045] p-3.5">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-sky-300">
            <ShieldCheck size={14} aria-hidden="true" />
            {italian ? 'Ingress & Zero-Port' : 'Zero-Port Ingress'}
          </div>
          <ul className="mt-2 space-y-1.5 text-xs text-zinc-200">
            <li>• <strong>Tailscale</strong> — {italian ? 'accesso admin privato Zero-Trust' : 'private Zero-Trust admin access'}</li>
            <li>• <strong>Cloudflare Tunnels</strong> — {italian ? 'web app pubbliche senza port-forwarding' : 'selective web apps, zero router ports'}</li>
            <li>• <strong>Nginx Proxy Manager</strong> — {italian ? 'routing HTTPS interno (dual-homed)' : 'internal HTTPS routing (dual-homed)'}</li>
          </ul>
        </div>

        <div className="rounded-xl border border-zinc-700 bg-zinc-950/70 p-3.5">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-violet-300">
            <Layers size={14} aria-hidden="true" />
            vmbr0 (LAN) vs vmbr1 (NAT)
          </div>
          <ul className="mt-2 space-y-1.5 text-xs text-zinc-200">
            <li>• <strong>vmbr0</strong> — {italian ? 'LAN fisica, Home Assistant VM, Storage Hub & Pi-hole DNS' : 'physical LAN, Home Assistant VM, Storage Hub & Pi-hole DNS'}</li>
            <li>• <strong>vmbr1</strong> — {italian ? 'subnet privata isolata dietro NAT/masquerade per container app' : 'isolated private NAT/masquerade subnet for app containers'}</li>
            <li>• <strong>Dual-homing</strong> — {italian ? 'controllato su Reverse Proxy e nodo Aegis Core' : 'controlled bridge on Reverse Proxy & Aegis Core'}</li>
          </ul>
        </div>

        <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/[0.04] p-3.5">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
            <Terminal size={14} aria-hidden="true" />
            {italian ? 'SOC & Osservabilità' : 'SOC & Observability'}
          </div>
          <ul className="mt-2 space-y-1.5 text-xs text-zinc-200">
            <li>• <strong>Splunk SIEM</strong> — {italian ? 'raccolta log centralizzata e analisi sicurezza' : 'centralized log ingestion & security analysis'}</li>
            <li>• <strong>Uptime Kuma</strong> — {italian ? 'monitoring continuo e alerting' : 'continuous availability monitoring & alerting'}</li>
            <li>• <strong>Homepage</strong> — {italian ? 'dashboard unificata di stato e servizi' : 'unified service & health dashboard'}</li>
          </ul>
        </div>
      </div>

      {/* 3-Tier Storage */}
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/75 p-4">
        <div className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
          <HardDrive size={14} className="text-sky-300" aria-hidden="true" />
          {italian ? 'Storage a 3 livelli & Disaster Recovery' : '3-Tier Storage & Automated Backups'}
        </div>
        <div className="mb-3 flex h-2.5 overflow-hidden rounded-full bg-zinc-800" aria-hidden="true">
          {storageTiers.map(({ size, pct, color }) => (
            <div key={size} className={color} style={{ width: `${pct}%` }} />
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {storageTiers.map(({ size, role, color }) => (
            <div key={size} className="flex items-start gap-2 text-xs">
              <span aria-hidden="true" className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${color}`} />
              <div>
                <p className="font-mono font-semibold text-zinc-100">{size}</p>
                <p className="text-zinc-400">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

export function HomelabGpuOpsFigure({ italian = false }: { italian?: boolean }) {
  return (
    <figure className="my-6 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 text-sm font-semibold text-zinc-100">
        {italian ? 'Condivisione GPU GTX 1070 multi-LXC & Ciclo Agentic SRE' : 'Multi-LXC GTX 1070 GPU Sharing & Agentic SRE Loop'}
      </figcaption>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-violet-300/25 bg-violet-300/[0.045] p-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-violet-300">
            {italian ? 'AI Locale & GPU Sharing (GTX 1070 Mobile)' : 'Local AI & GPU Sharing (GTX 1070 Mobile)'}
          </p>
          <p className="mt-1.5 text-xs text-zinc-300">
            {italian
              ? 'Una sola GPU dedicata condivisa contemporaneamente da più container LXC:'
              : 'A single dedicated mobile GPU shared concurrently across multiple LXC containers:'}
          </p>
          <ul className="mt-3 space-y-2 text-xs text-zinc-200">
            <li className="rounded-lg border border-zinc-800 bg-zinc-950/75 px-3 py-2">
              <strong className="text-white">Immich ML (CUDA)</strong> — {italian ? 'indicizzazione foto, pgvectors/vectorchord & Valkey/Redis' : 'photo ML indexing, pgvectors/vectorchord & Valkey/Redis'}
            </li>
            <li className="rounded-lg border border-zinc-800 bg-zinc-950/75 px-3 py-2">
              <strong className="text-white">Ollama (Local LLM)</strong> — {italian ? 'analisi documenti offline & scanner scontrini (Fuorisede)' : 'offline document parsing & receipt scanner (Fuorisede)'}
            </li>
            <li className="rounded-lg border border-zinc-800 bg-zinc-950/75 px-3 py-2">
              <strong className="text-white">Faster-Whisper (INT8)</strong> — {italian ? 'trascrizione vocale privacy-first senza cloud' : 'privacy-first offline voice transcription'}
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-sky-300/25 bg-sky-300/[0.045] p-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-sky-300">
            {italian ? 'Aegis Core & Agentic Sysadmin / SRE' : 'Aegis Core & Agentic Sysadmin / SRE'}
          </p>
          <p className="mt-1.5 text-xs text-zinc-300">
            {italian
              ? 'Automazione operativa controllata da mobile con guardrail di sicurezza:'
              : 'Mobile-controlled infrastructure automation with mandatory safety guardrails:'}
          </p>
          <ol className="mt-3 space-y-2 text-xs text-zinc-200">
            <li className="rounded-lg border border-zinc-800 bg-zinc-950/75 px-3 py-2">
              <strong className="text-sky-200">1. Trigger</strong> — {italian ? 'Comando da Telegram → Aegis Core (FastAPI + SQLite WAL)' : 'Telegram command → Aegis Core (FastAPI + SQLite WAL)'}
            </li>
            <li className="rounded-lg border border-zinc-800 bg-zinc-950/75 px-3 py-2">
              <strong className="text-amber-200">2. Guardrail</strong> — {italian ? 'Snapshot preventivo Proxmox obbligatorio prima di ogni modifica' : 'Mandatory preventive Proxmox snapshot before any mutation'}
            </li>
            <li className="rounded-lg border border-zinc-800 bg-zinc-950/75 px-3 py-2">
              <strong className="text-emerald-200">3. Verify & SIEM</strong> — {italian ? 'Query su Splunk SIEM per troubleshooting e rollback immediato se serve' : 'Splunk SIEM log queries for verification & instant rollback if needed'}
            </li>
          </ol>
        </div>
      </div>
    </figure>
  );
}

export function TranscriptComparisonFigure({ italian = false }: { italian?: boolean }) {
  const columns = italian
    ? [
        ['Schermata del terminale', 'Righe visibili', 'Il testo può andare a capo alla larghezza del pannello.', 'Il bridge deduce se il turno è terminato.'],
        ['Trascrizione JSONL', 'Record in ordine di scrittura', 'Il testo arriva come valore di un campo.', 'Il tipo di evento separa gli aggiornamenti dalla risposta.'],
      ]
    : [
        ['Terminal snapshot', 'Visible terminal rows', 'Text can wrap at the pane width.', 'The bridge infers whether a turn has ended.'],
        ['JSONL transcript', 'Records in write order', 'Text arrives as a field value.', 'The event type separates progress from the reply.'],
      ];
  const labels = italian ? ['Unità di lettura', 'Testo', 'Stato del turno'] : ['Read unit', 'Text layout', 'Turn status'];

  return (
    <figure className="my-6 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 text-sm font-semibold text-zinc-100">{italian ? 'Cosa riceve il bridge' : 'What the bridge receives'}</figcaption>
      <div className="grid gap-3 sm:grid-cols-2">
        {columns.map(([title, ...points], colIndex) => (
          <div
            key={title}
            className={
              colIndex === 1
                ? 'rounded-xl border border-sky-300/30 bg-sky-300/[0.045] p-3.5 sm:p-4'
                : 'rounded-xl border border-zinc-700 bg-zinc-950/60 p-3.5 sm:p-4'
            }
          >
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
  { model: 'MLP', groups: 97.2, clips: 84.6, best: true },
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
  const groupsLabel = italian ? 'Gruppi clinici' : 'Clinical groups';
  const clipsLabel = italian ? 'Clip video' : 'Video clips';
  return (
    <figure className="my-6 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-zinc-100">
        <span>{italian ? 'Accuratezza per classificatore e compito' : 'Classification accuracy by model and task'}</span>
        <span className="rounded bg-sky-400/10 px-2 py-0.5 font-mono text-[11px] font-medium text-sky-200">
          {italian ? 'Abstract IAS-19: fino al 95%' : 'IAS-19 abstract: up to 95%'}
        </span>
      </figcaption>
      <table className="w-full table-fixed border-collapse text-left text-xs text-zinc-200">
        <thead>
          <tr className="border-b border-zinc-700 text-zinc-400">
            <th scope="col" className="w-[36%] pb-2 pr-2">{italian ? 'Modello' : 'Model'}</th>
            <th scope="col" className="pb-2 pr-3">{groupsLabel}</th>
            <th scope="col" className="pb-2">{clipsLabel}</th>
          </tr>
        </thead>
        <tbody>
          {spectraResults.map(({ model, groups, clips, best }) => (
            <tr key={model} className={best ? 'border-b border-zinc-800 bg-sky-300/[0.05]' : 'border-b border-zinc-800'}>
              <th scope="row" className="break-words py-2.5 pr-2 font-medium text-zinc-100">
                {model}
                {best && <span className="ml-1.5 rounded bg-sky-300/20 px-1.5 py-0.5 font-mono text-[10px] text-sky-200">TOP</span>}
              </th>
              <td className="py-2.5 pr-3"><AccuracyBar value={groups} label={format.format(groups / 100)} color="bg-sky-300" /></td>
              <td className="py-2.5"><AccuracyBar value={clips} label={format.format(clips / 100)} color="bg-violet-300" /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mb-0 mt-4 text-xs leading-relaxed text-zinc-400">
        {italian
          ? 'Scala 0–100%. Paper IAS-19, tabelle 3 e 4 (21 partecipanti, validazione stratificata 5-fold; l’abstract riassume prudentemente fino al 95%). Il raggruppamento per soggetto tra i fold non è specificato.'
          : 'Scale 0–100%. IAS-19 paper, Tables 3–4 (21 participants, stratified 5-fold validation; abstract conservatively summarizes up to 95%). Participant-level fold grouping is unspecified.'}
      </p>
    </figure>
  );
}

export function UniReviewsIndexFigure() {
  const measurements = [
    { label: 'Before indexing (full collection scan)', count: 3570, color: 'bg-amber-300/80' },
    { label: 'With compound index (degree + credits)', count: 18, color: 'bg-emerald-300' },
  ];
  return (
    <figure className="my-6 rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-4 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-zinc-100">
        <span>Documents examined by the catalogue query</span>
        <span className="rounded bg-emerald-400/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-300">
          −99.5% · 198× fewer docs
        </span>
      </figcaption>
      <dl className="space-y-4">
        {measurements.map(({ label, count, color }) => (
          <div key={label}>
            <dt className="text-xs text-zinc-300">{label}</dt>
            <dd className="mt-1">
              <AccuracyBar value={(count / 3570) * 100} label={count.toLocaleString('en') + ' docs'} color={color} minWidthPx={10} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-zinc-400">
        Local MongoDB benchmark reported in the Database Systems II final report (Table 3). Query filters by degree programme and ECTS credits.
      </p>
    </figure>
  );
}

function AccuracyBar({
  value,
  label,
  color,
  minWidthPx = 4,
}: {
  value: number;
  label: string;
  color: string;
  minWidthPx?: number;
}) {
  return (
    <>
      <span className="font-mono text-xs tabular-nums text-zinc-100">{label}</span>
      <div aria-hidden="true" className="mt-1 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={'h-full rounded-full ' + color}
          style={{ width: `${value}%`, minWidth: value > 0 ? `${minWidthPx}px` : undefined }}
        />
      </div>
    </>
  );
}
