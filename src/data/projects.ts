import { Project } from '../types';

export const PROJECT_CATEGORIES: Record<Project['category'], string> = {
  security: 'Security',
  infrastructure: 'Homelab & Infra',
  robotics: 'Robotics',
  embedded: 'Embedded',
  research: 'Research',
  systems: 'Systems',
};

export const projects: Project[] = [
  {
    id: 'proj-proxmox-homelab',
    title: 'Proxmox VE Homelab: Self-Hosted Infrastructure, SOC & Local AI',
    displayTitle: 'Proxmox VE Homelab',
    articleSlug: 'proxmox-homelab-architecture',
    category: 'infrastructure',
    recognition: '14 Workloads · 16 GB RAM · Shared GTX 1070 CUDA',
    tagline: 'Turning a recycled gaming laptop into a 24/7 segmented Proxmox VE 9.1 lab with Splunk SIEM, shared-GPU local AI, and agentic SRE automation.',
    contribution:
      'Architected and operate a 24/7 bare-metal Proxmox VE 9.1 homelab running 12 LXC containers and 2 KVM VMs inside 16 GB of RAM — combining network segmentation, zero-open-port ingress, Splunk SIEM observability, multi-LXC CUDA GPU sharing, and automated snapshot-guarded maintenance.',
    description:
      'A personal infrastructure, cybersecurity, self-hosting, and local AI laboratory built by sustainably repurposing a retired ASUS gaming laptop (i7-7700HQ, 16 GB RAM, NVIDIA GTX 1070 Mobile) with a custom battery charge-limiting script acting as an integrated UPS.',
    problemStatement:
      'Commercial cloud services trade privacy and observability for convenience, while enterprise infrastructure patterns — network segmentation, SIEM log analysis, immutable-style snapshot backups, and zero-open-port ingress — are hard to internalize without operating real daily workloads under strict hardware limits.',
    threatModelOrChallenge:
      'Fitting 14 active workloads (including Splunk SIEM, CUDA-accelerated photo ML, local LLMs, Nextcloud, Home Assistant, and custom bots) into 16 GB of RAM without sacrificing isolation required choosing lightweight LXC containers over full VMs wherever possible, keeping KVM strictly for Home Assistant OS and an isolated firewalled Portfolio Console VM, and eliminating inbound WAN ports via Cloudflare Tunnels and Tailscale.',
    architectureSpecs: [
      'Sustainable bare-metal host: recycled ASUS gaming laptop running Proxmox VE 9.1 (Linux 6.17) 24/7 with an Intel Core i7-7700HQ (4C/8T), 16 GB RAM, NVIDIA GTX 1070 Mobile, and a custom battery charge-limiting script preserving battery health as a built-in UPS.',
      'Three-tier storage architecture: 256 GB SSD (LVM-thin) for the hypervisor and VM/LXC root disks; 1 TB SSD for fast media and AI datastores (Immich); 2 TB HDD for shared Nextcloud/Samba storage and automated daily 03:00 vzdump snapshot backups with zstd compression.',
      'Segmented virtual networking: two virtual bridges — vmbr0 (physical LAN) and vmbr1 (isolated private NAT/masquerade subnet for application containers) — with controlled dual-homing for Nginx Proxy Manager and Aegis Core, plus a dedicated Pi-hole LXC for local DNS and ad/tracker filtering.',
      'Zero-open-port remote access & SOC observability: Tailscale for private admin access, Nginx Proxy Manager for internal HTTPS routing, Cloudflare Tunnels for selective public web exposure without router port-forwarding, paired with Splunk SIEM, Uptime Kuma, and Homepage.',
      'Multi-LXC GTX 1070 GPU sharing: a single mobile GPU shared concurrently across Immich ML (Docker stack with PostgreSQL pgvectors/vectorchord and Valkey/Redis), Ollama, and Faster-Whisper (INT8) for offline voice transcription and local receipt/document analysis.',
      'Aegis Core, Agentic SRE & production bots: async FastAPI + SQLite WAL personal platform with an AI Sysadmin/SRE agent (enforcing preventive Proxmox snapshots and rollback, querying Splunk SIEM, controlled from Telegram), alongside Social Video Bot (aiogram 3 + local Bot API up to 2 GB zero-copy, anti-SSRF/anti-DoS), Fuorisede (deterministic price analysis, Ollama receipt scanner, Web GUI & MCP JSON-RPC 2.0 server), an isolated Portfolio Console KVM VM, and Python/ML (GBM) test sandboxes.',
    ],
    keyResults: [
      'Consolidated 12 LXC containers and 2 KVM VMs inside a 16 GB RAM envelope while running daily self-hosted cloud, smart-home, SIEM, and local CUDA workloads.',
      'Eliminated router port-forwarding completely through Tailscale private admin access and Cloudflare Tunnels for selective public web apps.',
      'Automated daily 03:00 vzdump snapshot backups (zstd) to dedicated 2 TB HDD storage and enforced snapshot-before-change guardrails in the Agentic SRE workflow.',
      'Replaced cloud photo, drive, and voice/document assistants with privacy-first local alternatives (Immich CUDA, Nextcloud/Samba, Ollama, Faster-Whisper INT8).',
    ],
    technologies: [
      'Proxmox VE 9.1',
      'LXC & KVM',
      'Linux 6.17',
      'Tailscale',
      'Cloudflare Tunnels',
      'Nginx Proxy Manager',
      'Pi-hole',
      'Splunk SIEM',
      'Uptime Kuma',
      'Docker',
      'NVIDIA CUDA',
      'Ollama',
      'Faster-Whisper',
      'FastAPI',
      'SQLite WAL',
      'MCP (JSON-RPC 2.0)',
    ],
    date: '2026-11',
    featured: true,
    metrics: [
      { label: 'Workload Density', value: '12 LXC + 2 KVM VMs' },
      { label: 'Host Envelope', value: 'i7-7700HQ · 16 GB · GTX 1070' },
      { label: 'Backup Policy', value: 'Daily 03:00 vzdump (zstd)' },
    ],
  },
  {
    id: 'proj-mtls-iot-gateway',
    title: 'Secure IoT Gateway for Healthcare Telemetry',
    displayTitle: 'Secure IoT Gateway',
    articleSlug: 'zero-trust-mtls-constrained-iot-esp32',
    category: 'security',
    tagline: 'Authenticating BLE sensor payloads on ESP32, enforcing mTLS + X.509 MQTT ACLs, and anchoring digests for tamper detection.',
    contribution:
      'Analyzed the unauthenticated BLE/MQTT pipeline of CARE, reproduced a rogue-ESP32 spoofing attack in the lab, developed the C++/mbedTLS ESP32 HMAC-SHA256 verification firmware, configured Dockerized Mosquitto with mTLS (TLS 1.3) and X.509 topic ACLs, and added a Python/SQLite + local Ganache Solidity audit bridge.',
    description:
      'A university IoT Security prototype that hardens biomedical telemetry across three explicit boundaries: BLE payload ingestion on ESP32, mutually authenticated MQTT transport, and post-storage tamper detection.',
    problemStatement:
      'The original CARE gateway collected biomedical readings over BLE and published them over plaintext MQTT without client credentials. Sensors were trusted solely by configured addresses, allowing an impersonating device in our lab demo to inject plausible but forged health readings straight into the backend.',
    threatModelOrChallenge:
      'Verifying HMAC-SHA256 on the ESP32 before forwarding requires a programmable BLE sender capable of attaching an authenticated tag — a concrete compatibility trade-off with off-the-shelf medical wearables. Separately, mTLS authenticates the gateway connection to Mosquitto, while digest anchoring on local Ganache detects post-hoc SQLite tampering rather than preventing bad data at the source.',
    architectureDiagram: `Programmable BLE sender
  | Payload + HMAC-SHA256
  v
ESP32 gateway (C++/mbedTLS) -- MQTT over mTLS (TLS 1.3) --> Mosquitto (X.509 ACLs)
                                                              |
                                                              v
                                                         Python bridge
                                                           |       |
                                                           v       v
                                                         SQLite   Solidity digest (Ganache)`,
    architectureSpecs: [
      'ESP32 edge firmware (C++, PlatformIO, mbedTLS) validates the HMAC-SHA256 tag on incoming BLE payloads and drops forged frames before they reach the MQTT client.',
      'Dockerized Mosquitto enforces mutual TLS (TLS 1.3) with distinct client certificates for the gateway and ingestion bridge, binding X.509 certificate identities to granular MQTT topic ACLs.',
      'The Python ingestion bridge validates payloads, stores raw clinical readings in SQLite, and anchors SHA-256 digests plus criticality metadata into a Solidity smart contract on a local Ganache chain.',
      'Auditors can later recompute record hashes from SQLite and verify them against the anchored contract digests to detect unauthorized database modifications.',
    ],
    keyResults: [
      {
        text: 'Reproduced a live BLE/MQTT spoofing attack with a rogue ESP32 against the original unauthenticated CARE gateway, injecting falsified telemetry accepted by the pipeline.',
        evidence: {
          label: 'Lab spoofing demo & architecture slides',
          href: 'https://github.com/kappino/IOT_SEC_CARE_Gateway/blob/003057b4fae5a957fcde55ab63aad4cb25229a36/docs/CARE_IoT_Security_Architecture.pdf',
        },
      },
      {
        text: 'Implemented on-device HMAC-SHA256 verification on ESP32, X.509-bound topic isolation on Mosquitto (TLS 1.3), and digest-based tamper detection on local Ganache.',
        evidence: {
          label: 'ESP32 verification firmware',
          href: 'https://github.com/kappino/IOT_SEC_CARE_Gateway/blob/003057b4fae5a957fcde55ab63aad4cb25229a36/firmware/src/main.cpp',
        },
      },
    ],
    technologies: ['C++', 'ESP32', 'PlatformIO', 'mbedTLS', 'OpenSSL', 'Mosquitto MQTT', 'mTLS (TLS 1.3)', 'X.509 ACLs', 'Docker', 'Python', 'SQLite', 'Solidity'],
    githubUrl: 'https://github.com/kappino/IOT_SEC_CARE_Gateway',
    githubLabel: 'Gateway firmware & services',
    date: '2026-02',
    featured: true,
    metrics: [
      { label: 'BLE Edge Check', value: 'HMAC-SHA256 (mbedTLS)' },
      { label: 'Broker Transport', value: 'mTLS (TLS 1.3) + X.509 ACL' },
      { label: 'Tamper Detection', value: 'SQLite + Ganache Solidity' },
    ],
  },
  {
    id: 'proj-tnes',
    title: 'TNES · Hack the Route (1st Place Hackathon)',
    displayTitle: 'TNES · Hack the Route',
    category: 'systems',
    tagline: 'FastAPI gateway bridging a 3D networking & cybersecurity simulator game in Unreal Engine 5 to live Cisco Modeling Labs.',
    contribution:
      'Co-developed the Python FastAPI backend bridging an Unreal Engine 5 3D office simulator to Cisco Modeling Labs (CML), reviewed the Unreal-to-backend API integration, and wrote backend connectivity tests verifying real network impact inside the Cisco lab.',
    recognition: '1st Place · Hack the Route · The Big Hack 2026 (Consorzio Clara)',
    description:
      'A 3D networking and cybersecurity training simulator game built by Team 0’PACKET in Unreal Engine 5 for Challenge 04 (Hack the Route, Challenge Partner: Consorzio Clara) at The Big Hack 2026.',
    problemStatement:
      'In a 3D training game where players physically plug and unplug cables between virtual racks and workstations, faking success locally breaks realism. Whenever a player connects or disconnects two ports in Unreal Engine 5, the backend needs to map that action to a live Cisco Modeling Labs topology and report whether the underlying network actually changed.',
    threatModelOrChallenge:
      'The gateway translates game device/port identifiers into CML nodes and interfaces over HTTPS while avoiding stale state during rapid clicks. Crucially, the Unreal client distinguishes a confirmed CML link response (carrying a real link ID) from a legacy rack echo, falling back to an IOS administrative state readback rather than falsely claiming a rewire occurred.',
    architectureSpecs: [
      'Unreal Engine 5 sends player-selected devices and ports over HTTPS to the Python FastAPI gateway, coalescing rapid updates to the latest pending state per port.',
      'FastAPI resolves in-game port identifiers against live Cisco Modeling Labs (CML) APIs to inspect topology state, toggle links, synchronize scenario startup, and bridge console sessions to virtual devices.',
      'The Unreal client requires a confirmed CML link ID before marking a link rewired; on legacy rack responses without a link ID, it reads back IOS interface administrative state separately.',
      'Backend-side automated CML tests exercise the cable endpoint directly, disconnecting and reconnecting a workstation link and verifying that real ping reachability drops and recovers inside the lab.',
    ],
    keyResults: [
      'Won 1st Place in Challenge 04 (Hack the Route, Challenge Partner: Consorzio Clara) at The Big Hack 2026 with Team 0’PACKET.',
      {
        text: 'Automated backend-side CML connectivity test confirms that disconnecting a workstation link breaks ping inside the Cisco lab and reconnecting restores reachability.',
        evidence: {
          label: 'CML backend connectivity test',
          href: 'https://github.com/kappino/cisco-cyber-office/blob/cf54f981e48b766e85fcd82ceb571b8b5a1e97e5/tests/cml/e2e_cml.py#L86-L98',
        },
      },
    ],
    technologies: ['Python', 'FastAPI', 'Cisco Modeling Labs (CML)', 'REST APIs', 'Unreal Engine 5'],
    githubUrl: 'https://github.com/kappino/cisco-cyber-office',
    githubLabel: 'FastAPI / CML backend',
    clientUrl: 'https://github.com/FeroneAntonio/clara-unreal',
    walkthrough: {
      title: 'From a virtual cable click in Unreal to verified reachability in CML',
      steps: [
        {
          title: 'Map game ports to CML interfaces',
          detail: 'Unreal verifies that the office lab is ready and maps the selected 3D port to a gateway identifier. If another update is already in flight, the client retains only the latest pending state for that port.',
        },
        {
          title: 'Confirm live CML state instead of assuming success',
          detail: 'The client accepts a confirmed CML link only when the live response matches the target node/state and returns a valid link ID. When the legacy rack endpoint echoes a request without a link ID, the client performs a separate IOS administrative-state readback instead of misreporting a rewire.',
        },
        {
          title: 'Verify real network impact in the Cisco lab',
          detail: 'The backend test suite calls the cable endpoint directly to disconnect and reconnect a workstation link, asserting that ICMP ping inside CML fails on disconnect and recovers after reconnection. Unreal confirmation logic is verified separately in client source.',
        },
      ],
    },
    referenceLinks: [
      { label: 'CML integration documentation', href: 'https://github.com/kappino/cisco-cyber-office/blob/main/docs/CML_INTEGRAZIONE.md' },
      { label: 'Unreal link confirmation & IOS readback', href: 'https://github.com/FeroneAntonio/clara-unreal/blob/main/Source/ClaraDayOne/ClaraStoryGateway.cpp#L168-L263' },
      { label: 'Legacy rack endpoint response handling', href: 'https://github.com/kappino/cisco-cyber-office/blob/main/backend/main.py#L335-L352' },
      { label: 'Lab connectivity tests & scope', href: 'https://github.com/kappino/cisco-cyber-office/tree/main/tests/cml' },
      { label: 'Team 0’PACKET write-up & credits', href: 'https://antonioferone.it/journal/tnes-big-hack-2026/' },
    ],
    demoUrl: 'https://www.youtube.com/watch?v=Fb0JmIhDriw',
    date: '2026-11',
    featured: true,
    metrics: [
      { label: 'Outcome', value: '1st Place · Hack the Route' },
      { label: 'Challenge Partner', value: 'Consorzio Clara' },
      { label: 'Integration Path', value: 'UE5 ↔ FastAPI ↔ Cisco CML' },
    ],
  },
  {
    id: 'proj-care-decision-planner',
    title: 'CARE: ROS 2 Decision Planner for Assistive Robotics',
    displayTitle: 'CARE Decision Planner',
    articleSlug: 'deterministic-life-safety-arbitration-ros2-gorules',
    category: 'robotics',
    recognition: 'PNRR Age-IT (Spoke 3) · with Protom Robotics',
    tagline: 'From wearable sensor selection to a Python ROS 2 planner translating GoRules decision tables into prioritized robot actions.',
    contribution:
      'Selected wearable devices and biomedical sensors, wrote technical documentation and ran demonstrator tests, and designed and built the Python ROS 2 care_planner node from scratch (first in durable_rules, then migrated to GoRules JDM visual tables) — plus modernized the lab Pepper PC client to Python 3.12 and ROS 2.',
    description:
      'CARE (Companion for Aging with Resilience and Evaluation) is a PNRR Age-IT research demonstrator for home assistance built with Protom Robotics, uniting biomedical wearables, a social robot, tablet cognitive exercises, and a clinical monitoring dashboard.',
    problemStatement:
      'Older adults managing frailty, diabetes, and cognitive decline face overlapping daily routines: scheduled medication reminders, biometric measurements, and optional tablet exercises. A home robot needs deterministic arbitration so clinical reminders always take precedence over optional exercises — and escalate to a caregiver if repeatedly missed — while keeping rules readable for clinicians.',
    threatModelOrChallenge:
      'I built the first care_planner engine from scratch using durable_rules (Rete), then transferred the policy into GoRules JSON Decision Model (JDM) tables so clinical and non-technical stakeholders could inspect and revise rules visually without touching Python or ROS 2 code. For the demonstrator, the planner loads a fixed JDM graph and hydrates it dynamically from backend REST APIs.',
    architectureDiagram: `Biomedical wearables & sensors
  | BLE
  v
Sensor gateway -- MQTT --> CARE backend --> Clinical dashboard
                                  |
                                  | REST APIs
                                  v
                           ROS 2 care_planner (Python)
                           [GoRules JDM tables]
                                  |
                                  | decision_output
                                  v
                           Robot coordinator`,
    architectureSpecs: [
      'Hardware & research groundwork: evaluated wearable devices and biomedical sensors for domestic deployment, produced technical documentation, and tested end-to-end demonstrator scenarios.',
      'Backend-integrated ROS 2 node: care_planner queries REST APIs for therapy schedules, measurement plans, and active cognitive sessions, evaluating separate GoRules JDM branches for health alerts, measurements, medications, and optional tasks.',
      'Priority arbitration & escalation: implements precedence of medication reminders and measurements over cognitive exercises, managing snooze windows, retry counters, and caregiver escalation requests published on the ROS 2 decision_output topic.',
      'Parallel lab modernization (Pepper): updated the Pepper robot PC client to Python 3.12 and ROS 2 over Wi-Fi/NAOqi, eliminating legacy Python 2.7 dependencies and subprocess-invoked ML scripts.',
    ],
    keyResults: [
      {
        text: 'Reconstructed planner trace confirms that within a single cycle, an ongoing exercise evaluates to WAIT while a due medication emits REMIND_FARMACO and is published on decision_output to the ROS 2 coordinator.',
        evidence: { label: 'Reconstructed decision scenario', href: '#care-decision-scenario' },
      },
      'Migrated rule logic from durable_rules to visual GoRules JDM tables, adding snooze offsets, retry handling, and caregiver escalation paths.',
      'Documented in the PNRR Age-IT D3.3 deliverable alongside sensor ingestion, cognitive interaction, and the clinical dashboard.',
    ],
    technologies: ['Python', 'ROS 2', 'GoRules (JDM)', 'durable_rules', 'REST APIs', 'NAOqi', 'Wearable Sensors'],
    date: '2025-09',
    featured: true,
    metrics: [
      { label: 'Program', value: 'PNRR Age-IT · Protom Robotics' },
      { label: 'Rule Engine', value: 'durable_rules → GoRules JDM' },
      { label: 'Lab Side-Task', value: 'Pepper PC → Python 3.12 / ROS 2' },
    ],
  },
  {
    id: 'proj-munnisc-cestinno',
    title: 'SortEdge Bin: Smart Waste Sorting with STM32 RTOS & Edge AI',
    displayTitle: 'SortEdge Bin',
    category: 'embedded',
    recognition: 'STMicroelectronics NeaPolis Summer Campus · Team Lead (8 people)',
    tagline: 'Led an 8-person team in 10 days to build an STM32G474RE smart waste sorter with ChibiOS RTOS, ~13 ms on-device CNN inference, and CRC-32 UART vision.',
    contribution:
      'Led an 8-person multidisciplinary team over a 10-day sprint, developed the C/ChibiOS RTOS firmware on STM32G474RE (sensors, PWM servo actuation, SPI uGFX display, ~13 ms on-device CNN inference), and implemented CRC-32 UART image transfer with error retransmission from ESP32-CAM.',
    description:
      'Prototyped during the intensive 10-day STMicroelectronics NeaPolis Innovation Summer Campus (Arzano, Naples), combining real-time embedded control on an ARM Cortex-M4 MCU with edge image classification and reliable inter-board serial framing.',
    problemStatement:
      'Automated waste sorting on low-power microcontrollers has to coordinate physical sensors, user feedback, mechanical flap actuation, and neural-network inference inside tight RAM and timing budgets — without corrupting image frames transferred over noisy wired links between a camera board and the main MCU.',
    threatModelOrChallenge:
      'Splitting vision capture and control across two MCUs kept memory manageable: the ESP32-CAM captures raw frames and streams them over UART, while the STM32G474RE runs the ChibiOS state machine and executes the ~13 ms on-device CNN. Adding CRC-32 checksums and packet-level retransmission prevented corrupted frames from triggering misclassifications.',
    architectureSpecs: [
      'STM32G474RE (ARM Cortex-M4) firmware in C on ChibiOS RTOS orchestrates concurrent threads for sensor polling, deterministic state transitions, PWM servomotor flap actuation, and SPI uGFX status rendering.',
      'On-device CNN inference executes directly on the STM32G474RE in approximately 13 ms per classification, removing any cloud or Wi-Fi dependency at sorting time.',
      'Custom inter-board UART protocol between ESP32-CAM and STM32 splits captured frames into framed packets protected by CRC-32 error detection and automatic retransmission on checksum mismatch.',
      'Coordinated firmware, hardware interfacing, and integration milestones across an 8-person team from concept to live HackFest demonstration in 10 days.',
    ],
    keyResults: [
      'Delivered a working, live-demonstrated smart waste-sorting prototype in 10 days leading an 8-person team at STMicroelectronics Arzano.',
      'Achieved ~13 ms on-device CNN classification directly on STM32G474RE alongside concurrent ChibiOS sensor, PWM, and SPI uGFX tasks.',
      'Eliminated silent frame corruption on the ESP32-CAM → STM32 UART link through CRC-32 verification and packet retransmission.',
    ],
    technologies: ['C', 'STM32G474RE', 'ChibiOS RTOS', 'ESP32-CAM', 'UART + CRC-32', 'SPI (uGFX)', 'PWM', 'On-Device CNN'],
    date: '2026-09',
    featured: true,
    metrics: [
      { label: 'Leadership', value: '8-person team · 10 days' },
      { label: 'On-Device AI', value: '~13 ms CNN on STM32G474RE' },
      { label: 'Inter-MCU Link', value: 'ESP32-CAM UART + CRC-32' },
    ],
  },
  {
    id: 'proj-spectra-eeg',
    title: 'SPECTRA: Wearable EEG Signal Processing & Emotion Classification',
    displayTitle: 'SPECTRA · Wearable EEG',
    articleSlug: 'eeg-emotion-recognition-schizophrenia-ias19',
    category: 'research',
    recognition: 'First Author · IAS-19 Best Student Paper Award Finalist (Springer LNNS)',
    tagline: 'Comparing three MATLAB/EEGLAB artifact-rejection pipelines and scikit-learn classifiers on 14-channel clinical wearable EEG.',
    contribution:
      'For my B.Sc. thesis (Prof. M. Staffa) with Psychiatry at Federico II, I compared three MATLAB/EEGLAB (PICARD-ICA) preprocessing pipelines, extracted spectral and frontal asymmetry features in Python, benchmarked scikit-learn classifiers, and authored the resulting first-author IAS-19 Springer LNNS paper.',
    description:
      'An exploratory clinical study investigating whether a 14-channel wireless wearable EEG headset (Emotiv EPOC X, 256 Hz) can distinguish emotional and group-level neural signatures across 21 participants on the schizophrenia spectrum.',
    problemStatement:
      'Consumer-grade wearable EEG lowers barriers for clinical studies, but raw recordings are heavily contaminated by baseline drift, eye blinks, and muscle artifacts. Without disciplined cleaning and honest validation boundaries, spectral features can easily reflect noise rather than neural activity.',
    threatModelOrChallenge:
      'With 21 participants (7 healthy controls, 6 treatment-responsive, 8 treatment-resistant) and overlapping 4-second EEG windows, validation methodology is critical. While the paper reports stratified five-fold validation reaching up to 95% in the abstract (97.2% best MLP in Table 3), participant-level fold grouping is unspecified — making subject-independent holdout the essential next step before clinical generalization.',
    architectureDiagram: `14-ch Wearable EEG (256 Hz) → MATLAB/EEGLAB (PICARD-ICA) → Python Spectral Features → scikit-learn Benchmark`,
    architectureSpecs: [
      'Experimental protocol: 30-second baseline, a memory task, and three two-minute emotional video clips recorded on a 14-channel Emotiv EPOC X at 256 Hz across 21 participants.',
      'MATLAB & EEGLAB preprocessing: event-marker segmentation, baseline correction, 1–45 Hz bandpass + 50 Hz notch filtering, and automated artifact rejection via PICARD-ICA and ICLabel across three comparative pipelines.',
      'Python feature extraction: Welch power spectral density (PSD), alpha/beta band power, and frontal hemispheric asymmetry computed over 4-second windows with 50% overlap.',
      'Model evaluation: benchmarked MLP, Random Forest, SVM (RBF, linear, polynomial, sigmoid), k-NN, and Decision Tree in scikit-learn across both 3-group and 3-clip classification tasks.',
    ],
    keyResults: [
      'First-author paper accepted at IAS-19 (Genoa 2025), selected as a Best Student Paper Award Finalist, and published in Springer Lecture Notes in Networks and Systems (Sep 2026).',
      'Reported up to 95% accuracy in the IAS-19 abstract (best MLP 97.2% group / 84.6% clip in Table 3–4 stratified five-fold evaluation on the exploratory 21-participant cohort).',
      'Demonstrated how systematic PICARD-ICA cleaning removes DC drift and ocular spikes prior to spectral feature extraction.',
    ],
    referenceLinks: [
      { label: 'Published paper on Springer LNNS (DOI)', href: 'https://doi.org/10.1007/978-3-032-33874-7_13' },
      { label: 'Wearable EEG acquisition protocol (GitHub)', href: 'https://github.com/kappino/SpectraProtocol' },
    ],
    technologies: ['MATLAB', 'EEGLAB', 'PICARD-ICA', 'Python', 'scikit-learn', 'Wearable EEG (14-ch)'],
    date: '2025-05',
    featured: true,
    metrics: [
      { label: 'Publication', value: 'Springer LNNS · First Author' },
      { label: 'Cohort & Hardware', value: '21 participants · 14-ch @ 256 Hz' },
      { label: 'Exploratory Result', value: 'Up to 95% (IAS-19 abstract)' },
    ],
  },
  {
    id: 'proj-agy-telegram',
    title: 'agy-telegram: Outbound Mobile Cockpit for Local Coding Agents',
    displayTitle: 'agy-telegram',
    articleSlug: 'agy-telegram-mobile-cockpit',
    category: 'systems',
    tagline: 'Operate local tmux coding sessions from Telegram over outbound HTTPS long polling — zero open ports, JSONL transcript tracking, and Unix socket alerts.',
    contribution:
      'Designed and built an open-source asynchronous Python Telegram bridge for local coding agents, combining outbound-only HTTPS long polling, account allowlisting, atomic tmux buffer injection, JSONL transcript streaming, and Unix domain socket notifications.',
    description:
      'An open-source mobile interface for supervising and approving local coding-agent sessions without opening firewall ports, exposing SSH, or abandoning an active tmux workspace.',
    problemStatement:
      'Checking on long-running local coding or sysadmin agent sessions from mobile usually meant wrestling with tiny SSH terminals, opening inbound firewall ports, or losing interactive human-in-the-loop approvals.',
    threatModelOrChallenge:
      'Outbound HTTPS long polling eliminates inbound attack surface and NAT port-forwarding, while a strict Telegram user ID allowlist gates command execution. Reading structured append-only JSONL transcripts replaced fragile tmux ANSI screen scraping, though Telegram itself remains part of the message-transport trust boundary.',
    securityStandards: [
      'Outbound-only HTTPS long polling (no listening WAN port or NAT forwarding)',
      'Strict Telegram User ID allowlisting before command dispatch',
      'Local Unix Domain Socket IPC with filesystem permission controls',
      'HTML sanitization and tag-boundary chunking for safe Telegram message rendering',
    ],
    architectureSpecs: [
      'Asynchronous Python bridge (AsyncIO, python-telegram-bot v21+) polling Telegram over outbound HTTPS without moving processes out of their existing tmux session.',
      'Atomic multiline prompt injection via tmux paste buffers, separating text insertion from Enter submission to prevent broken keystroke sequences.',
      'Structured JSONL transcript watcher replacing ANSI terminal scraping to track intermediate tool status in a single live-edited message and deliver clean final replies.',
      'Local Unix domain socket IPC allowing external hooks and background daemons to push proactive mobile alerts and inline human-in-the-loop approval buttons.',
    ],
    keyResults: [
      'Enabled reliable mobile monitoring and inline approvals for local agent sessions with zero inbound ports.',
      'Replaced brittle ANSI terminal scraping with deterministic event-driven JSONL transcript parsing.',
    ],
    technologies: ['Python', 'AsyncIO', 'Telegram Bot API', 'tmux', 'JSONL', 'Unix Domain Sockets', 'Linux / systemd'],
    githubUrl: 'https://github.com/kappino/agy-telegram',
    githubLabel: 'Open-source repository',
    date: '2026-09',
    featured: true,
    metrics: [
      { label: 'Network Exposure', value: 'Zero inbound ports' },
      { label: 'Event Source', value: 'Structured JSONL transcript' },
      { label: 'Local IPC', value: 'tmux buffer + Unix socket' },
    ],
  },
  {
    id: 'proj-unireviews',
    title: 'UniReviews: Verified Post-Exam Course Reviews & Quality Dashboard',
    displayTitle: 'UniReviews',
    articleSlug: 'unireviews-beyond-course-surveys',
    category: 'systems',
    tagline: 'Post-exam course reviews verified against Esse3 exam records, backed by MongoDB aggregation pipelines and compound-indexed catalogue search.',
    contribution:
      'Designed the 5-collection MongoDB schema, Flask backend, Esse3 exam-verification workflow, Waterloo-to-Salerno IDF demo ETL, and hierarchical department/degree/course analytics dashboard.',
    description:
      'Built for the graduate Database Systems II course at UNISA, evolving from ParthenoAnswer (an undergraduate Web Technologies project co-built with Riccardo Aiello and Aniello Genovese) into a structured post-exam review platform and academic quality dashboard.',
    problemStatement:
      'Standard university course surveys happen before the exam — when students cannot yet evaluate syllabus alignment, real study load, or which materials actually prepared them for the test.',
    threatModelOrChallenge:
      'Precomputing review aggregates inside each course document makes catalogue browsing fast, but writing a review and updating its summary in separate operations introduces an eventual-consistency window if a write fails mid-flight.',
    architectureSpecs: [
      'Esse3 API integration synchronizes passed exams into a subset of each student document so reviews matching a completed course code receive a verification badge.',
      'Course feeds combine cursor-based pagination with MongoDB lookups for threaded replies and moderation queues.',
      'MongoDB aggregation pipelines power a drill-down analytics dashboard from department to degree programme to individual course score distributions.',
      'Demo ETL imports public University of Waterloo course review text, matching titles to Salerno courses via an IDF-weighted inverted word index with synthetic authors.',
    ],
    keyResults: [
      'Cut local catalogue query examination from 3,570 documents down to 18 (99.5% reduction, 198× fewer docs scanned) using a compound MongoDB index.',
      'Delivered end-to-end verified review flows, threaded discussions, moderation controls, and academic quality drill-down analytics.',
    ],
    technologies: ['Python', 'Flask', 'MongoDB', 'PyMongo', 'Aggregation Pipelines', 'Chart.js', 'Esse3 APIs'],
    referenceLinks: [
      { label: 'University of Waterloo Course Reviews dataset (Kaggle)', href: 'https://www.kaggle.com/datasets/anthonysusevski/course-reviews-university-of-waterloo' },
    ],
    metrics: [
      { label: 'Data Model', value: '5 MongoDB collections' },
      { label: 'Index Speedup', value: '3,570 → 18 docs (198×)' },
      { label: 'Verification', value: 'Esse3 passed-exam match' },
    ],
    date: '2026-11',
    featured: false,
  },
  {
    id: 'proj-posix-sockets',
    title: 'Concurrent TCP Services in C11',
    displayTitle: 'Concurrent TCP Services',
    category: 'systems',
    tagline: 'Multi-service C11 TCP simulation using POSIX sockets, forked worker processes, full-I/O framing loops, and flock-coordinated binary storage.',
    contribution:
      'Implemented three cooperating C11 TCP services handling partial socket reads/writes, concurrent forked client workers, and flock-synchronized updates to a shared binary record file.',
    description:
      'A systems-programming networking project modeling certificate issuance, status verification, and status updates across cooperating TCP daemons in standard C11 on POSIX.',
    problemStatement:
      'TCP is a byte stream rather than a message protocol: a single send can arrive fragmented across multiple read calls. Meanwhile, concurrent forked workers writing to a shared binary datastore will corrupt records without explicit locking.',
    threatModelOrChallenge:
      'Enforcing deterministic full-read and full-write loops at every socket boundary eliminates short-read truncation bugs, while advisory flock locks serialize concurrent record mutations across cooperating processes.',
    architectureSpecs: [
      'Separated registration and verification clients connect to dedicated TCP services that relay fixed-size binary frames to a central record daemon.',
      'Server processes fork per-connection workers and wrap POSIX socket I/O in full-read / full-write loops to handle partial TCP stream delivery cleanly.',
      'Shared binary datastore coordinates concurrent reads and writes across worker processes using POSIX flock advisory file locking.',
    ],
    keyResults: [
      'Implemented certificate issuance, verification, and status-update workflows across cooperating C11 daemons.',
      'Eliminated partial-read framing errors and concurrent datastore race conditions under parallel client connections.',
    ],
    technologies: ['C11', 'POSIX Sockets', 'TCP/IP', 'fork()', 'flock()', 'GNU Make'],
    githubUrl: 'https://github.com/kappino/computer_network_green_pass',
    githubLabel: 'C11 source code',
    date: '2022-02',
    featured: false,
    metrics: [
      { label: 'Framing', value: 'Full-read / full-write TCP' },
      { label: 'Concurrency', value: 'Forked POSIX workers' },
      { label: 'Storage Safety', value: 'Advisory flock() locking' },
    ],
  },
  {
    id: 'proj-virtual-pong',
    title: 'Virtual Pong: Apple Watch Motion-Controlled Table Tennis',
    displayTitle: 'Virtual Pong',
    recognition: 'Winner · Best App Award “Alfredo Petrosino” (2023)',
    category: 'systems',
    tagline: 'Turning Apple Watch accelerometer & gyroscope streams into on-device Core ML swing classification for peer-to-peer iPhone multiplayer.',
    contribution:
      'Co-developed the watchOS/iOS native Swift app during Apple Developer Academy iOS Foundation & Advanced, combining CoreMotion sensor capture, on-device Core ML gesture classification, WatchConnectivity, and MultipeerConnectivity.',
    description:
      'An Apple Developer Academy Network & UniParthenope team project that transforms an Apple Watch into a real-time motion paddle controller for local peer-to-peer iPhone table tennis.',
    problemStatement:
      'Mapping human wrist swings into low-latency game inputs requires filtering noisy high-frequency IMU signals directly on the watch and synchronizing state seamlessly across both Watch-to-iPhone and iPhone-to-iPhone links.',
    architectureSpecs: [
      'Apple Watch samples accelerometer and gyroscope telemetry via CoreMotion and classifies forehand/backhand swings on-device with a Core ML model.',
      'WatchConnectivity relays classified swing events to the paired iPhone with minimal latency.',
      'MultipeerConnectivity synchronizes match state directly between nearby iPhones for local peer-to-peer multiplayer without an external game server.',
    ],
    keyResults: [
      'Won the Best App Award “Alfredo Petrosino” (May 2023) at Apple Developer Academy Network & UniParthenope.',
      'Delivered a responsive local multiplayer demo driven entirely by on-device watchOS motion classification.',
    ],
    technologies: ['Swift', 'SwiftUI', 'CoreMotion', 'Core ML', 'WatchConnectivity', 'MultipeerConnectivity'],
    githubUrl: 'https://github.com/kappino/Ios_A1_TeamC_Virtual_Pong',
    githubLabel: 'iOS & watchOS source',
    date: '2023-05',
    featured: false,
    metrics: [
      { label: 'Recognition', value: 'Best App Award (2023)' },
      { label: 'On-Watch AI', value: 'CoreMotion + Core ML' },
      { label: 'Multiplayer', value: 'Local P2P Multipeer' },
    ],
  },
  {
    id: 'proj-pepper-icsr',
    title: 'Pepper Interactive Demo at ICSR 2025',
    displayTitle: 'Pepper @ ICSR 2025',
    category: 'robotics',
    tagline: 'WebSocket bridge connecting a tablet infotainment interface to Pepper’s NAOqi runtime for live conference demonstrations.',
    contribution:
      'Built the Python WebSocket bridge connecting a responsive tablet UI to Pepper’s NAOqi qi runtime for live interactive scenes at the International Conference on Social Robotics (ICSR 2025).',
    description:
      'An interactive infotainment platform deployed on the Pepper humanoid robot at ICSR 2025, pairing synchronized robot speech with multimedia tablet scenes and audience Q&A.',
    problemStatement:
      'Running live conference demonstrations on a humanoid robot requires decoupling the responsive front-end interface on a tablet from Pepper’s NAOqi runtime so operators can trigger scenes reliably without stalling speech or UI state.',
    architectureSpecs: [
      'Python WebSocket backend bridges browser-based tablet controls to Pepper’s NAOqi runtime via the qi library.',
      'Predefined interactive scenes synchronize robot speech synthesis, multimedia slides, and multiple-choice audience feedback.',
      'Complements parallel lab work modernizing Pepper’s PC client stack from legacy Python 2.7 to Python 3.12 and ROS 2 over Wi-Fi/NAOqi.',
    ],
    keyResults: [
      'Operated live during demonstrations at the International Conference on Social Robotics (ICSR 2025).',
    ],
    technologies: ['Python', 'NAOqi (qi)', 'WebSockets', 'HTML / CSS / JS', 'Social Robotics'],
    githubUrl: 'https://github.com/kappino/pepper_icsr2025',
    githubLabel: 'ICSR demo source',
    referenceLinks: [
      { label: 'Related · RESTART adaptive Pepper controller (ROS 1)', href: 'https://github.com/kappino/RESTART_Pepper_ROS1' },
    ],
    date: '2025-10',
    featured: false,
    metrics: [
      { label: 'Venue', value: 'ICSR 2025 Live Demo' },
      { label: 'Bridge', value: 'Python WebSocket ↔ NAOqi' },
      { label: 'Interface', value: 'Tablet UI + Synchronized Speech' },
    ],
  },
];

const projectPriority = [
  'proj-mtls-iot-gateway',
  'proj-proxmox-homelab',
  'proj-tnes',
  'proj-care-decision-planner',
  'proj-munnisc-cestinno',
  'proj-spectra-eeg',
  'proj-agy-telegram',
  'proj-unireviews',
];

export const orderedProjects = [
  ...projectPriority
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => project !== undefined),
  ...projects.filter((project) => !projectPriority.includes(project.id)),
];
