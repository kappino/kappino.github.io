import { Project } from '../types';

export const PROJECT_CATEGORIES: Record<Project['category'], string> = {
  security: 'Security',
  robotics: 'Robotics',
  embedded: 'Embedded',
  research: 'Research',
  systems: 'Systems',
};

export const projects: Project[] = [
  {
    id: 'proj-tnes',
    title: 'TNES · Hack the Route',
    category: 'systems',
    tagline: 'A gateway between an Unreal Engine training game and Cisco Modeling Labs.',
    contribution: 'Co-developed the FastAPI gateway integration with Cisco Modeling Labs and reviewed the API connections between Unreal and the lab.',
    recognition: 'Winner · Hack the Route · The Big Hack 2026',
    description: 'A networking and cybersecurity training prototype built by team 0’PACKET in Unreal Engine 5.',
    problemStatement: 'When a player connected two ports in the 3D office, the game needed to tell whether the corresponding connection worked in the Cisco lab.',
    threatModelOrChallenge: 'The gateway maps game identifiers to CML nodes and interfaces. Unreal distinguishes a local simulation response from a connection confirmed by the remote lab.',
    architectureSpecs: [
      'Unreal sends the selected devices and ports to the Python gateway over HTTPS.',
      'FastAPI resolves the identifiers and uses the CML API to read lab topology and confirm the connection.',
      'The gateway bridges console sessions to virtual devices and synchronizes lab startup with the selected scenario.',
    ],
    keyResults: [
      'Team 0’PACKET won Challenge 04, Hack the Route, at The Big Hack 2026.',
      'The backend repository records 14 of 14 room checks passing across three lab scenarios.',
    ],
    technologies: ['Python', 'FastAPI', 'Cisco CML', 'Unreal Engine 5'],
    githubUrl: 'https://github.com/kappino/cisco-cyber-office',
    githubLabel: 'FastAPI / CML backend',
    clientUrl: 'https://github.com/FeroneAntonio/clara-unreal',
    walkthrough: {
      title: 'From a click in Unreal to proof in CML',
      steps: [
        {
          title: 'Map the selected port',
          detail: 'Unreal checks that the office lab is ready and that the selected game port maps to a lab interface. While an update is in progress, it keeps only the latest pending state for that port.',
        },
        {
          title: 'Check what the gateway actually confirmed',
          detail: 'The client accepts a confirmed CML link only when a live response matches the expected node and connection state and includes a link ID. The legacy rack endpoint can echo the requested state without supplying that ID. The client then checks the IOS administrative state with a separate readback and reports that outcome without claiming the CML link was rewired.',
        },
        {
          title: 'Check the effect on connectivity',
          detail: 'The backend end-to-end test exercises the cable endpoint directly. It disconnects and reconnects the workstation link and checks that ping fails and then recovers. This covers the lab effect. The Unreal confirmation logic is visible separately in the client source.',
        },
      ],
    },
    referenceLinks: [
      { label: 'CML integration notes', href: 'https://github.com/kappino/cisco-cyber-office/blob/main/docs/CML_INTEGRAZIONE.md' },
      { label: 'Unreal link confirmation and IOS readback', href: 'https://github.com/FeroneAntonio/clara-unreal/blob/main/Source/ClaraDayOne/ClaraStoryGateway.cpp#L168-L263' },
      { label: 'Legacy rack endpoint response', href: 'https://github.com/kappino/cisco-cyber-office/blob/main/backend/main.py#L335-L352' },
      { label: 'End-to-end cable and connectivity check', href: 'https://github.com/kappino/cisco-cyber-office/blob/main/tests/cml/e2e_cml.py#L86-L98' },
      { label: 'Lab checks and test scope', href: 'https://github.com/kappino/cisco-cyber-office/tree/main/tests/cml' },
      { label: 'Team credits and demo walkthrough', href: 'https://antonioferone.it/journal/tnes-big-hack-2026/' },
    ],
    demoUrl: 'https://www.youtube.com/watch?v=Fb0JmIhDriw',
    date: '2026-11',
    featured: true,
  },
  {
    id: 'proj-agy-telegram',
    title: 'agy-telegram: Asynchronous Mobile Gateway & Cockpit for AI Agents',
    displayTitle: 'agy-telegram',
    articleSlug: 'agy-telegram-mobile-cockpit',
    contribution: 'Built an open-source Telegram client for local coding agents, with mobile approvals and an outbound-only connection.',
    category: 'systems',
    tagline: 'Outbound-only mobile bridge in Python and tmux: zero exposed listening ports, Unix domain sockets, and instant tmux buffer injection.',
    description:
      'An open-source asynchronous mobile cockpit connecting Telegram to local AI coding agents running in Linux/Proxmox environments. Operates via outbound long-polling with zero inbound listening ports, local Unix domain socket IPC, and prompt injection directly into tmux buffers.',
    problemStatement:
      'Operating privileged coding and sysadmin agents remotely from mobile devices typically required fragile SSH shells, open firewall ports, or sacrificing interactive Human-in-the-Loop approvals.',
    threatModelOrChallenge:
      'Eliminated exposed external attack surfaces by relying exclusively on HTTPS outbound long-polling (no open ports or NAT forwarding). Enforced security boundaries via local user ID whitelisting, Unix socket permissions, and sanitization of raw ANSI escape sequences.',
    securityStandards: [
      'Outbound Long-Polling Architecture (Zero Inbound Listening Ports)',
      'Least Privilege Execution & User ID Whitelisting',
      'Unix Domain Socket IPC File Permissions (/tmp/agy-sentinel.sock)',
      'Input Sanitization & Telegram HTML Escaping',
    ],
    architectureSpecs: [
      'Pure Asynchronous Python (AsyncIO, python-telegram-bot v21+)',
      'Sub-Millisecond Input Injection via Tmux Internal Buffers (set-buffer & paste-buffer)',
      'Structured Telemetry Streaming from Antigravity audit logs (transcript.jsonl)',
      'Interactive Inline Telegram Keyboards with State Persistence Guards',
      'Local Unix Domain Socket IPC for Proactive Notifications (/tmp/agy-sentinel.sock)',
      'Robust HTML Sanitizer with Syntax-Highlighted Code Blocks and Tag-Boundary Splitting',
    ],
    keyResults: [
      'Zero Inbound Listening Ports: No NAT traversal or open firewall ports required.',
      'Sub-Millisecond Input Injection: Instant tmux buffer paste for large terminal commands.',
      'Human-in-the-Loop Controls: Interactive inline approval callbacks directly from mobile.',
      'Zero Markdown Parse Crashes: Resilient Telegram HTML conversion across thousands of agent turns.',
    ],
    technologies: [
      'Python',
      'Google Antigravity',
      'Telegram API',
      'Tmux',
      'AsyncIO',
      'Linux / Proxmox VE',
      'Systemd',
    ],
    githubUrl: 'https://github.com/kappino/agy-telegram',
    date: '2026-09',
    featured: true,
    metrics: [
      { label: 'Inbound Ports', value: '0 (Outbound Only)' },
      { label: 'Approval UX', value: '1-Tap Inline' },
      { label: 'Transport', value: 'Long-Polling' },
    ],
  },
  {
    id: 'proj-mtls-iot-gateway',
    title: 'Secure IoT Gateway for CARE',
    displayTitle: 'Secure IoT gateway',
    articleSlug: 'zero-trust-mtls-constrained-iot-esp32',
    contribution: 'I built ESP32 firmware and configured certificate-based MQTT access for a university security prototype based on the CARE telemetry pipeline.',
    category: 'security',
    tagline: 'Authenticating sensor payloads and MQTT clients, with a separate audit trail for stored readings.',
    description: 'A university prototype for securing biomedical telemetry at the sensor, broker, and storage boundaries.',
    problemStatement:
      'The original CARE gateway collected biomedical readings over BLE and sent them to the backend over MQTT. It identified sensors by configured addresses, and the MQTT publishing code supplied neither TLS options nor client credentials. Downstream services therefore had limited evidence about where a reading came from.',
    threatModelOrChallenge:
      'A valid gateway certificate authenticates the connection to the broker. The prototype also needs a way to check who produced a reading before forwarding it, and a way to detect changes after it is stored.',
    architectureDiagram: `Programmable BLE sender
  | Payload + HMAC
  v
ESP32 gateway -- MQTT over mTLS --> Mosquitto
                                      |
                                      v
                                 Python bridge
                                   |       |
                                   v       v
                                 SQLite   EVM audit record`,
    architectureSpecs: [
      'The ESP32 verifies HMAC-SHA256 before it forwards a message. This path requires a sender that can produce the authenticated payload format.',
      'Mosquitto requires client certificates and maps certificate identities to MQTT topic permissions. The broker is configured for TLS 1.3.',
      'The Python bridge checks the payload and stores readings in SQLite. The Solidity contract records a digest and audit metadata, including a criticality flag. Raw readings stay in SQLite.',
    ],
    keyResults: [
      'The project presentation documents a controlled lab demonstration in which the original gateway accepted a reading from an impersonated sensor.',
      'The prototype code checks payload authenticity before forwarding, applies certificate-based topic permissions, and provides a utility for comparing stored readings with their on-chain digests.',
    ],
    technologies: ['C++', 'ESP32', 'PlatformIO', 'mbedTLS', 'OpenSSL', 'Mosquitto MQTT', 'Docker', 'Python', 'SQLite', 'Solidity'],
    githubUrl: 'https://github.com/kappino/IOT_SEC_CARE_Gateway',
    githubLabel: 'Gateway firmware and services',
    date: '2025-06',
    featured: true,
    metrics: [
      { label: 'Transport', value: 'MQTT over mTLS' },
      { label: 'Payload Check', value: 'HMAC-SHA256' },
      { label: 'Project Stage', value: 'University prototype' },
    ],
  },
  {
    id: 'proj-care-decision-planner',
    title: 'CARE: Decision Planning for an Assistive Robot',
    displayTitle: 'CARE Decision Planner',
    articleSlug: 'deterministic-life-safety-arbitration-ros2-gorules',
    contribution: 'I developed the ROS2 decision planner for CARE, an assistive robotics demonstrator under PNRR Age-IT. My work covered decision tables, backend integration, and how the planner handles competing activities.',
    category: 'robotics',
    tagline: 'A ROS2 planner that turns care schedules, sensor readings, and session state into actions for a social robot.',
    description:
      'CARE (Companion for Aging with Resilience and Evaluation) is a PNRR Age-IT research demonstrator for home assistance. It brings together biomedical sensors, a social robot, and a monitoring dashboard.',
    problemStatement:
      'CARE explored home assistance for older adults living with frailty and multiple conditions, with diabetes and cognitive decline as pilot use cases. The wider system combines biomedical monitoring, voice interaction, tablet-based cognitive exercises, and a dashboard for clinicians and caregivers. The planner decides which activity to request when reminders, measurements, and optional exercises overlap.',
    threatModelOrChallenge:
      'The first planner used durable_rules (Rete). I moved the policy into GoRules decision tables with the goal of letting clinical and other non-technical staff review and edit it visually. For the demo, we used a fixed JDM graph and populated its decision inputs from the backend APIs.',
    architectureDiagram: `Biomedical sensors
  | BLE
  v
Sensor gateway -- MQTT --> CARE backend --> Monitoring dashboard
                                  |
                                  | REST APIs
                                  v
                           ROS2 CARE planner
                           [GoRules JDM graph]
                                  |
                                  | decision_output
                                  v
                           Robot coordinator`,
    architectureSpecs: [
      'The CARE backend exposes REST APIs for therapy schedules, measurement plans and readings, and cognitive session state. The same platform provides role-based dashboard views.',
      'The planner gathers that context and evaluates a GoRules JSON Decision Model. Separate branches cover health alerts, measurements, medication reminders, and optional activities.',
      'The Python planner converts decisions into action requests and publishes them on the ROS2 decision_output topic for the robot coordinator.',
    ],
    keyResults: [
      'Implemented a planner path in which an exercise can wait for feedback while a due medication reminder still produces an action request.',
      'Implemented snooze handling and a caregiver escalation request in the planner prototype.',
      'The Age-IT D3.3 design deliverable documents the planner alongside sensor ingestion, cognitive interaction, and the clinical dashboard.',
    ],
    technologies: ['Python', 'ROS2', 'GoRules (JDM)', 'REST APIs'],
    date: '2025-09',
    featured: true,
    metrics: [
      { label: 'National Project', value: 'PNRR Age-IT (Spoke 3)' },
      { label: 'Inference Model', value: 'JDM Decision Tables' },
      { label: 'Project Stage', value: 'Research demonstrator' },
    ],
  },
  {
    id: 'proj-spectra-eeg',
    title: 'SPECTRA: Clinical EEG Signal Processing & Supervised ML Classification',
    displayTitle: 'SPECTRA · Wearable EEG',
    articleSlug: 'eeg-emotion-recognition-schizophrenia-ias19',
    contribution: 'For my bachelor’s thesis, I compared three EEG preprocessing pipelines and worked on feature extraction and classifier evaluation. I am first author of the IAS-19 paper based on this study.',
    category: 'research',
    tagline: 'Wearable EEG preprocessing and feature extraction for an exploratory study of emotional responses.',
    description:
      'Conducted clinical research and implemented an automated artifact-rejection and classification pipeline analyzing 14-channel EEG data from patients across the schizophrenia spectrum.',
    problemStatement:
      'SPECTRA explored whether wearable EEG captured different responses across participant groups and emotional stimuli. The exploratory study involved 21 participants: 7 healthy controls, 6 participants with treatment-responsive schizophrenia, and 8 with treatment-resistant schizophrenia.',
    threatModelOrChallenge:
      'The pipeline had to reduce eye and muscle artifacts while retaining spectral features aligned with the experimental phases.',
    architectureDiagram: `Wearable EEG → MATLAB preprocessing → Python feature extraction → Group classification`,
    architectureSpecs: [
      'Protocol: a 30-second baseline, a memory game, and three two-minute clips. EEG was recorded with a 14-channel Emotiv EPOC X at 256 Hz. The classification experiments used EEG features.',
      'Preprocessing in MATLAB and EEGLAB: align segments with event markers, correct baseline and filter the signal, then identify artifacts with PICARD ICA and ICLabel.',
      'Feature extraction in Python: Welch spectral estimates, band power, and frontal asymmetry features from four-second windows with 50% overlap.',
    ],
    keyResults: [
      'In the full paper, the best MLP achieved 97.2% accuracy for group classification and 84.6% for clip classification in the reported cross-validation. The abstract summarizes group accuracy as up to 95%.',
      'The paper describes stratified five-fold validation. It leaves participant grouping across folds unspecified, so performance on unseen participants remains unverified.',
      'Selected as a Best Student Paper Award finalist at IAS-19 and published in Springer’s Lecture Notes in Networks and Systems.',
    ],
    referenceLinks: [
      { label: 'Published abstract and results', href: 'https://link.springer.com/chapter/10.1007/978-3-032-33874-7_13#Abs1' },
      { label: 'EEG and wearable acquisition protocol (Italian)', href: 'https://github.com/kappino/SpectraProtocol' },
    ],
    technologies: ['Python', 'scikit-learn', 'MATLAB', 'EEGLAB', 'PICARD ICA', 'Wearable EEG'],
    date: '2025-05',
    featured: true,
    metrics: [
      { label: 'Participants', value: '21 across 3 groups' },
      { label: 'EEG acquisition', value: '14 channels at 256 Hz' },
    ],
  },
  {
    id: 'proj-munnisc-cestinno',
    title: 'MUNNISC: Embedded Waste Sorter & Sensor Interfacing Prototype',
    category: 'embedded',
    tagline: '10-day HackFest embedded prototype using STM32, ChibiOS RTOS, and sensor interfacing at NeaPolis Summer Campus.',
    description:
      'Prototyped during the intensive 10-day STMicroelectronics NeaPolis Summer Campus, exploring electronics fundamentals, sensor circuit interfacing, and servomotor actuation on 32-bit STM32 microcontrollers.',
    problemStatement:
      'Prototyping an automated waste-sorting receptacle combining electronic sensor triggers and PWM mechanical deflection in a rapid 10-day hands-on sprint.',
    architectureSpecs: [
      'Microcontroller Core: Bare-metal C on STM32 utilizing the ChibiOS RTOS real-time kernel (developed by ST Senior Engineer Giovanni Di Sirio).',
      'Electronics & Circuit Interfacing: Hands-on breadboard wiring, pull-up/down resistor configurations, and signal routing for analog and digital peripherals.',
      'Actuation & Sensing: Ultrasonic distance measurement, capacitive proximity triggers, and PWM-driven servomotor deflection routing waste flaps.',
    ],
    keyResults: [
      'Designed, built, and demonstrated during the final HackFest at STMicroelectronics Arzano campus.',
      'Multi-threaded execution on ChibiOS coordinating periodic sensor polling and motor actuation.',
    ],
    technologies: ['STM32', 'ChibiOS RTOS', 'C', 'Electronics Fundamentals', 'PWM Actuation', 'Sensor Interfacing'],
    date: '2026-09',
    featured: false,
    metrics: [
      { label: 'Hardware Platform', value: 'STM32 ARM Cortex-M' },
      { label: 'RTOS Kernel', value: 'ChibiOS (G. Di Sirio)' },
      { label: 'Program Duration', value: '10-Day Campus' },
    ],
  },
  {
    id: 'proj-posix-sockets',
    title: 'Concurrent TCP Services in C',
    displayTitle: 'Concurrent TCP services',
    category: 'systems',
    tagline: 'A coursework simulation using POSIX sockets, worker processes, and a shared binary datastore.',
    description: 'A C11 networking project that models issuing, checking, and updating a certificate record across cooperating TCP services.',
    problemStatement: 'TCP can deliver a message in several reads. The system also needs to coordinate access when separate workers read or update the same file.',
    threatModelOrChallenge: 'The implementation uses full-read and full-write loops at the connection boundary and advisory file locks around shared record updates.',
    architectureSpecs: [
      'The registration and verification clients connect to separate services, which forward requests to the central record server.',
      'The C server uses forked workers to handle TCP clients and fixed-size binary messages to exchange requests.',
      'The shared datastore uses flock to coordinate workers that follow the same locking protocol.',
    ],
    keyResults: [
      'Implemented certificate issuance, status checks, and status updates as separate workflows in the simulation.',
      'Handled partial socket I/O and coordinated updates to the shared file across worker processes.',
    ],
    technologies: ['C11', 'POSIX sockets', 'TCP/IP', 'flock', 'fork', 'GNU Make'],
    githubUrl: 'https://github.com/kappino/computer_network_green_pass',
    date: '2022-02',
    featured: false,
    metrics: [
      { label: 'Transport', value: 'TCP byte streams' },
      { label: 'Concurrency', value: 'Forked workers' },
      { label: 'Storage coordination', value: 'Advisory file locks' },
    ],
  },
  {
    id: 'proj-virtual-pong',
    title: 'Virtual Pong: Motion-Controlled Table Tennis',
    displayTitle: 'Virtual Pong',
    recognition: 'Winner · Best App Award “Alfredo Petrosino”',
    category: 'systems',
    tagline: 'An Apple Watch motion controller and an iPhone game with local peer-to-peer multiplayer.',
    description:
      'An Apple Developer Academy team project that turns Apple Watch swings into inputs for a table-tennis game on iPhone.',
    problemStatement:
      'Recognize swings from wrist motion and pass the resulting input from watchOS to the game running on iPhone.',
    architectureSpecs: [
      'The Apple Watch collects accelerometer and gyroscope readings with CoreMotion and classifies gestures on-device with Core ML.',
      'WatchConnectivity links the watch to the iPhone, and MultipeerConnectivity exchanges game state between nearby iPhones.',
    ],
    keyResults: [
      'Awarded Best App Award "Alfredo Petrosino" (May 2023).',
      'Built a local multiplayer prototype that uses wrist gestures as game input.',
    ],
    technologies: ['Swift', 'SwiftUI', 'CoreMotion', 'Core ML', 'WatchConnectivity', 'MultipeerConnectivity'],
    githubUrl: 'https://github.com/kappino/Ios_A1_TeamC_Virtual_Pong',
    githubLabel: 'iOS and watchOS app',
    date: '2023-05',
    featured: false,
  },
  {
    id: 'proj-pepper-icsr',
    title: 'Pepper Infotainment at ICSR 2025',
    category: 'robotics',
    tagline: 'Bidirectional bridge between NAOqi runtime and responsive client dashboard for conference demo.',
    description:
      'Integrated software platform for the Pepper humanoid robot presented at the International Conference on Social Robotics (ICSR 2025).',
    problemStatement:
      'Connect a touch interface on a tablet to Pepper’s NAOqi runtime during a live demo.',
    architectureSpecs: [
      'A Python WebSocket backend connects the web interface to Pepper through the qi library.',
      'Predefined scenes combine robot speech, multimedia and multiple-choice questions with feedback.',
    ],
    keyResults: [
      'Live operational demonstration exhibited at ICSR 2025 conference.',
    ],
    technologies: ['Python', 'NAOqi', 'WebSockets', 'HTML', 'JavaScript', 'CSS'],
    githubUrl: 'https://github.com/kappino/pepper_icsr2025',
    githubLabel: 'ICSR demo source',
    referenceLinks: [
      { label: 'Related project · RESTART adaptive Pepper controller (ROS1)', href: 'https://github.com/kappino/RESTART_Pepper_ROS1' },
    ],
    date: '2025-10',
    featured: false,
  },
];

const projectPriority = ['proj-mtls-iot-gateway', 'proj-tnes', 'proj-care-decision-planner', 'proj-spectra-eeg'];

export const orderedProjects = [
  ...projectPriority.map((id) => projects.find((project) => project.id === id)).filter((project) => project !== undefined),
  ...projects.filter((project) => !projectPriority.includes(project.id)),
];
