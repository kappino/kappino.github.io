export type Flow = {
  title: string;
  steps: readonly (readonly [label: string, detail: string])[];
};

export const projectFlows: Record<string, Flow> = {
  'proj-proxmox-homelab': {
    title: 'Zero-open-port ingress & segmented workload path',
    steps: [
      ['Edge Access', 'Tailscale (admin) or Cloudflare Tunnels (public apps)'],
      ['Segmented Bridges', 'vmbr0 LAN & vmbr1 isolated NAT + Pi-hole DNS'],
      ['14 Workloads', '12 LXC + 2 KVM VMs sharing GTX 1070 CUDA'],
      ['SOC & Recovery', 'Splunk SIEM, Uptime Kuma & daily 03:00 zstd snapshots'],
    ],
  },
  'proj-tnes': {
    title: 'From 3D game action to verified network reachability',
    steps: [
      ['Unreal Engine 5', 'Player connects or disconnects two virtual ports'],
      ['FastAPI Gateway', 'Maps game ports to live CML node interfaces'],
      ['Cisco Modeling Labs', 'Updates virtual topology & returns link confirmation'],
      ['Readback & Proof', 'Link ID check, IOS state readback & backend ping tests'],
    ],
  },
  'proj-agy-telegram': {
    title: 'Outbound-only mobile control loop',
    steps: [
      ['Telegram (Allowlisted)', 'Send prompt or inline approval over outbound HTTPS'],
      ['Python Async Bridge', 'Polls updates with zero open inbound ports'],
      ['tmux & Unix Socket', 'Atomic paste buffer + proactive daemon notifications'],
      ['JSONL Transcript', 'Streams structured turn state back to one edited message'],
    ],
  },
  'proj-mtls-iot-gateway': {
    title: 'Three trust boundaries along the telemetry path',
    steps: [
      ['BLE Edge', 'ESP32 validates HMAC-SHA256 (mbedTLS) before forwarding'],
      ['MQTT Transport', 'Mosquitto enforces mTLS (TLS 1.3) & X.509 topic ACLs'],
      ['Persistence', 'Python bridge stores validated readings in SQLite'],
      ['Tamper Audit', 'SHA-256 digests anchored on local Ganache Solidity contract'],
    ],
  },
  'proj-care-decision-planner': {
    title: 'From clinical context to prioritized robot actions',
    steps: [
      ['CARE Backend APIs', 'Therapies, biometric readings & active exercise state'],
      ['GoRules JDM', 'Visual decision tables evaluate eligibility per branch'],
      ['ROS 2 care_planner', 'Applies priority, snooze offsets & escalation policy'],
      ['Robot Coordinator', 'Receives commands on decision_output topic'],
    ],
  },
  'proj-spectra-eeg': {
    title: 'From wearable EEG acquisition to classifier benchmark',
    steps: [
      ['Emotiv EPOC X', '14-ch wireless EEG @ 256 Hz across 21 participants'],
      ['MATLAB & EEGLAB', '1–45 Hz filter, 50 Hz notch, PICARD-ICA & ICLabel'],
      ['Python Features', 'Welch PSD, band power & frontal asymmetry (4 s / 50%)'],
      ['scikit-learn', 'MLP, RF, SVM & k-NN benchmark (groups & video clips)'],
    ],
  },
  'proj-unireviews': {
    title: 'From verified exam record to academic analytics',
    steps: [
      ['Esse3 APIs', 'Synchronizes student passed-exam records'],
      ['Review Service', 'Awards verification badge on course-code match'],
      ['MongoDB Catalogue', 'Compound-indexed search (3,570 → 18 docs scanned)'],
      ['Quality Dashboard', 'Aggregates distributions by department, degree & course'],
    ],
  },
  'proj-munnisc-cestinno': {
    title: 'Dual-MCU vision capture & real-time sorting loop',
    steps: [
      ['ESP32-CAM', 'Captures frame & streams framed UART packets with CRC-32'],
      ['STM32G474RE (ChibiOS)', 'Verifies CRC-32, re-requests errors & polls sensors'],
      ['On-Device CNN', 'Classifies waste locally in ~13 ms with SPI uGFX status'],
      ['PWM Actuation', 'Drives servomotor flap into the matching bin compartment'],
    ],
  },
  'proj-posix-sockets': {
    title: 'Framed TCP stream & lock-safe binary storage',
    steps: [
      ['Client Process', 'Requests certificate issuance, check, or status update'],
      ['TCP Service', 'Full-read / full-write loops handle fragmented streams'],
      ['Forked Worker', 'Isolates concurrent client connections per process'],
      ['Shared Datastore', 'Advisory flock() serializes binary file mutations'],
    ],
  },
  'proj-virtual-pong': {
    title: 'From wrist IMU telemetry to peer-to-peer match state',
    steps: [
      ['Apple Watch', 'CoreMotion samples IMU & Core ML classifies swings locally'],
      ['WatchConnectivity', 'Streams recognized gestures to the paired iPhone'],
      ['iPhone Engine', 'Applies paddle physics and rally state in SwiftUI'],
      ['Nearby Peer', 'Syncs match state over local MultipeerConnectivity'],
    ],
  },
  'proj-pepper-icsr': {
    title: 'Decoupled tablet control for live humanoid demos',
    steps: [
      ['Tablet Interface', 'Operator triggers interactive scene or audience Q&A'],
      ['WebSocket Backend', 'Python service coordinates dialogue & multimedia state'],
      ['Pepper (NAOqi)', 'Executes synchronized speech & gestures via qi runtime'],
    ],
  },
};

export const articleFlows: Record<string, { en: Flow; it: Flow }> = {
  'proxmox-homelab-architecture': {
    en: projectFlows['proj-proxmox-homelab'],
    it: {
      title: 'Ingress senza porte esposte e segmentazione dei workload',
      steps: [
        ['Accesso edge', 'Tailscale (admin) o Cloudflare Tunnels (app pubbliche)'],
        ['Bridge segmentati', 'vmbr0 LAN e vmbr1 NAT isolata + DNS Pi-hole'],
        ['14 workload', '12 LXC + 2 VM KVM con GTX 1070 CUDA condivisa'],
        ['SOC e recovery', 'Splunk SIEM, Uptime Kuma e snapshot zstd alle 03:00'],
      ],
    },
  },
  'unireviews-beyond-course-surveys': {
    en: projectFlows['proj-unireviews'],
    it: {
      title: 'Dal libretto Esse3 al cruscotto per l’ateneo',
      steps: [
        ['API Esse3', 'Sincronizza gli esami superati dello studente'],
        ['Servizio recensioni', 'Assegna il badge se il codice corso corrisponde'],
        ['Catalogo MongoDB', 'Indice composto (3.570 → 18 documenti letti)'],
        ['Cruscotto qualità', 'Aggrega distribuzioni per dipartimento, CdS e corso'],
      ],
    },
  },
  'agy-telegram-mobile-cockpit': {
    en: projectFlows['proj-agy-telegram'],
    it: {
      title: 'Controllo mobile solo in uscita',
      steps: [
        ['Telegram (allowlist)', 'Invia prompt o approvazioni via HTTPS in uscita'],
        ['Bridge Python', 'Riceve aggiornamenti senza porte aperte sul firewall'],
        ['tmux e Unix socket', 'Buffer atomico per prompt + notifiche locali'],
        ['Trascrizione JSONL', 'Aggiorna un solo messaggio di stato fino alla risposta'],
      ],
    },
  },
  'ansi-scraping-vs-structured-jsonl': {
    en: {
      title: 'Reading structured agent events as they are written',
      steps: [
        ['Agent Transcript', 'Append-only JSONL event log'],
        ['Async Watcher', 'Tails new records without terminal width coupling'],
        ['Telegram UI', 'Edits one live status card and posts the clean reply'],
      ],
    },
    it: {
      title: 'Leggere gli eventi strutturati mentre vengono scritti',
      steps: [
        ['Trascrizione agente', 'Log JSONL append-only degli eventi'],
        ['Watcher asincrono', 'Legge i nuovi record senza dipendere dal terminale'],
        ['UI Telegram', 'Aggiorna un solo stato live e invia la risposta pulita'],
      ],
    },
  },
};
