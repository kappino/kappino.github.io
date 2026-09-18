import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'proj-mtls-iot-gateway',
    title: 'Zero-Trust IoT Gateway: mTLS v1.3 Hardening & Blockchain Notary',
    category: 'security',
    tagline: 'Cryptographic edge-to-cloud channel hardening with ESP32, private PKI, and EVM proof of existence.',
    description:
      'Engineered an end-to-end Zero-Trust telemetry pipeline for resource-constrained medical IoT devices, defending against packet tampering, rogue device spoofing, and MITM attacks on untrusted local networks.',
    problemStatement:
      'Standard IoT healthcare telemetry frequently defaults to unauthenticated MQTT or pre-shared keys due to microcontrollers lacking hardware cryptographic accelerators or suffering from TLS handshake memory exhaustion.',
    threatModelOrChallenge:
      'Defended against rogue node spoofing, packet tampering, and replay attacks on untrusted Wi-Fi. Forced bidirectional certificate verification (mTLS v1.3) with clientAuth extensions, ensuring rogue nodes without private key access are dropped during the TLS handshake before processing any payload.',
    securityStandards: [
      'NIST SP 800-207 (Zero Trust Architecture)',
      'MITRE ATT&CK for Enterprise & ICS',
      'GDPR Art. 9 (Processing of Special Categories of Data / Biometrics)',
      'RFC 8446 (TLS v1.3 Protocol Specification)',
      'FIPS 198-1 (HMAC-SHA256 Cryptographic Authentication)',
    ],
    misuseCases: [
      {
        id: 'mc-sensor-spoofing',
        threatName: 'Sensor Spoofing (MAC Cloning)',
        threatActor: 'Mis-User / Evil ESP32',
        mitreId: 'MITRE T1557 / T1200',
        targetUseCase: 'Data Collection',
        layer: 'Perception',
        countermeasure: 'HMAC-SHA256 Verification',
        countermeasureDetail: 'FreeRTOS mbedTLS task validates pre-shared cryptographic HMAC before processing packet in application memory.',
        verifiedOutcome: 'Packets lacking valid signature are dropped at edge (0 bytes to broker).',
      },
      {
        id: 'mc-mitm-broker',
        threatName: 'Man-in-the-Middle / Rogue Broker',
        threatActor: 'Network Attacker (ARP / DNS Spoof)',
        mitreId: 'MITRE T1040 / T1557.002',
        targetUseCase: 'Data Transmission',
        layer: 'Transport',
        countermeasure: 'Mutual TLS v1.3 (X.509 clientAuth)',
        countermeasureDetail: 'Forced bidirectional handshake with 4096-bit offline Root CA and IP SAN certificate matching on port 8883.',
        verifiedOutcome: '100% rejection rate of unauthenticated sessions in < 210ms.',
      },
      {
        id: 'mc-db-tamper',
        threatName: 'Database Record Tampering',
        threatActor: 'Malicious Insider / Storage Malware',
        mitreId: 'MITRE T1565.001',
        targetUseCase: 'Data Persistence',
        layer: 'Storage',
        countermeasure: 'EVM Hash Notarization (HealthNotary.sol)',
        countermeasureDetail: 'SHA-256 telemetry digest anchored on-chain with anti-replay guard (dataHashUsed); audited via utils/audit.py.',
        verifiedOutcome: 'Mismatches between local DB and blockchain ledger immediately flagged.',
      },
    ],
    verificationTerminal: {
      title: 'Empirical Attack Simulation & Zero-Trust Defense Logs',
      description: 'Captured real-world serial telemetry and container logs comparing the vulnerable MAC-whitelist gateway against the hardened Zero-Trust pipeline.',
      tabs: [
        {
          id: 'attacker-evil-esp32',
          label: 'Attacker Serial (Evil ESP32)',
          command: 'pio device monitor -p /dev/ttyUSB1 --baud 115200',
          description: 'Adversary node cloning victim pulse oximeter MAC and injecting forged tachycardic vitals.',
          output: `=== Attacker Serial Monitor (Evil ESP32) ===
entry 0x400805e4
Booting Evil ESP32 Jumper...
Base MAC set successfully!
Active BLE MAC Address: 12:a2:00:2d:65:03
Waiting for Gateway...
>> GATEWAY CONNECTED! Starting data injection...
-> INJECTED Packet: BPM=180 SpO2=65 [Hex: 81 B4 41 0F]
-> INJECTED Packet: BPM=180 SpO2=65 [Hex: 81 B4 41 0F]`,
        },
        {
          id: 'vulnerable-gateway',
          label: 'Legacy Gateway (Vulnerable)',
          command: 'python gateway_main.py',
          description: 'Legacy C.A.R.E. gateway relying on static MAC whitelist in config.json accepting spoofed payload.',
          output: `=== Vulnerable Gateway Log Output ===
INFO - configuration - Successfully parsed configuration for user 0cd2a3fc-0613-4d76-b154-1d3e195efc4a
INFO - Gateway main - {'12:A2:00:2D:65:03': 'pulseoximeter'}
INFO - Pulseoximeter device - Connected to 12:A2:00:2D:65:03
INFO - Pulseoximeter device - Listening for notifications on 12:A2:00:2D:65:03
INFO - Pulseoximeter device - Data from 12:A2:00:2D:65:03 -> BPM: 180, SpO2: 65, PI: 1.5
[ALERT] Critical tachycardia detected! Propagating alarm to clinical dashboard...`,
        },
        {
          id: 'hardened-gateway-defense',
          label: 'Hardened Gateway (mTLS & HMAC)',
          command: 'pio device monitor -p /dev/ttyUSB0 --baud 115200',
          description: 'Zero-Trust C++ firmware executing cryptographic validation and dropping spoofed packets at the physical edge.',
          output: `[SYS] Gateway ready.
[NET] WiFi Connected: IP 198.51.100.45 | NTP Clock Synced
[TLS] Initializing mbedTLS context... Loading X.509 clientAuth certs
[TLS] Handshake with Mosquitto (198.51.100.50:8883) -> TLS_AES_256_GCM_SHA384 established
[BLE] Connected to 12:a2:00:2d:65:03
[RX] 4 bytes received
[SEC] Verifying HMAC-SHA256 signature...
[SEC] Packet rejected: BAD_HMAC (No cryptographic signature)
[SEC] Packet dropped at edge. 0 bytes forwarded to MQTT broker.`,
        },
        {
          id: 'blockchain-audit',
          label: 'Integrity Auditor & ACL Test',
          command: 'python utils/permission_test.py && python utils/audit.py',
          description: 'Automated testing of on-chain least-privilege permissions and database integrity verification.',
          output: `--- STARTING SECURITY INTEGRATION TESTS ---
Admin Address:       0x90F79bf6EB2c4f870365E785982E1f101E93b906
Unauthorized Actor:  0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
--------------------------------------------------
TEST START: Verify unauthorized data write block (addRecord)
PASSED: Blockchain blocked the transaction as expected.
Error detail: execution reverted: Unauthorized()
--------------------------------------------------
TEST START: Verify privilege escalation block (setNotarizer)
PASSED: Blockchain blocked the transaction as expected.
--------------------------------------------------
AUDIT RESULT: PASSED. System is secure.

--- DATA INTEGRITY VERIFICATION (audit.py) ---
Analyzing record ID: 104...
Computed Hash (DB):   8f4b23c...e719a
Immutable Hash (BC):  8f4b23c...e719a
--------------------------------------------------------------
[OK] INTEGRITY CONFIRMED: Record matches EVM notarization.`,
        },
      ],
    },
    architectureDiagram: ` +------------------+     mTLS v1.3 Handshake (X.509)     +--------------------+
 |  ESP32-S3 Node   | ==================================> |  Mosquitto Broker  |
 |  [mbedTLS 3.x]   |      Mutual Certificate Validation  |  [Strict ACL Map]  |
 +------------------+                                     +--------------------+
          |                                                         |
          v (HMAC-SHA256)                                           v
   [Telemetry Digest]                                     [EVM Smart Contract]
   (At Source Origin)                                     (HealthNotary.sol)`,
    architectureSpecs: [
      'Offline Private PKI: 4096-bit RSA Root CA, intermediate server cert with IP SAN, and isolated clientAuth certificates generated via OpenSSL.',
      'Embedded Cryptography: C++ firmware on PlatformIO utilizing mbedTLS with optimized dynamic buffer allocation to fit 320KB RAM constraints on ESP32.',
      'Access Control Matrix: Mosquitto MQTT broker configured with require_certificate true and strict Access Control Lists (ACLs) keyed directly to certificate Common Names (CN).',
      'Non-Repudiation Layer: Solidity smart contract (HealthNotary.sol) anchoring cryptographic fingerprints on-chain without exposing cleartext health data (GDPR-compliant).',
    ],
    keyResults: [
      '100% rejection rate against active Evil-ESP32 ARP-spoofing and packet-injection PoC testbeds.',
      'Deterministic TLS handshake completion in < 210ms on bare-metal ESP32-S3.',
      'Zero cleartext biometric or patient records exposed on-chain.',
    ],
    technologies: ['C++', 'ESP32', 'mbedTLS', 'OpenSSL', 'mTLS v1.3', 'Mosquitto MQTT', 'Solidity', 'Docker', 'Zero-Trust'],
    date: '2025-06',
    featured: true,
    metrics: [
      { label: 'Cipher Suite', value: 'TLS_AES_256_GCM_SHA384' },
      { label: 'Key Strength', value: '4096-bit RSA / P-256' },
      { label: 'PoC Defense', value: '100% Drop on Spoof' },
    ],
  },
  {
    id: 'proj-care-decision-planner',
    title: 'CARE Decision Planner: Real-Time Rule Inference & ROS2 Coordination',
    category: 'robotics',
    tagline: 'Deterministic decision-making runtime and ROS2 package for the Probot CARE assistive healthcare robot.',
    description:
      'Architected the central decision engine for an autonomous assistive healthcare robot deployed in aged-care environments under the Italian National Recovery Plan (PNRR Age-IT, Spoke 3).',
    problemStatement:
      'Assistive robots in eldercare must resolve concurrent, competing goals (e.g. scheduled medication, vital sign telemetry, battery patrol, social interaction) while guaranteeing medical explainability and zero operational deadlocks.',
    threatModelOrChallenge:
      'Legacy pattern-matching engines (Rete algorithm) presented unpredictable execution order and black-box logic difficult to certify for clinical use. Solved by architecting an auditable JSON Decision Model (GoRules JDM) with deterministic priority resolution.',
    architectureDiagram: `  [Biomedical Telemetry / Sensors]           [Caregiver Escalation Policy]
                 |                                         ^
                 v                                         | (Timeout / Urgent)
       +-------------------+                     +--------------------+
       |  ROS2 Middleware  | ===(JSON Events)==> | GoRules JDM Engine |
       |  [care_planner]   |                     | [Decision Tables]  |
       +-------------------+                     +--------------------+
                 ^                                         |
                 |               (Execution Vector)        v
                 +================================ [Priority Resolver]
                                                   (Health > Patrol)`,
    architectureSpecs: [
      'Inference Runtime: GoRules JDM decision tables evaluated in microsecond timescales, providing auditable decision logging for medical staff.',
      'Temporal Priority Resolver: Deterministic state engine prioritizing medical emergencies and timed medication alerts over routine navigation or patrol routines.',
      'Escalation State Machine: Finite state machine governing patient reminder timeouts, configurable snooze intervals, and automated caregiver phone/alert escalation.',
      'ROS2 Package: Custom care_planner package communicating over ROS2 topics and services, serializing event schemas to decoupled JSON payloads.',
    ],
    keyResults: [
      'Zero deadlock events during stress simulation of 50 concurrent patient reminder scenarios.',
      'Official technical contribution to Deliverable D3.3 of the PNRR Age-IT national research program.',
      'Complete architectural decoupling from specific physical robot chassis.',
    ],
    technologies: ['Python', 'ROS2', 'GoRules (JDM)', 'durable_rules', 'Docker', 'Linux', 'AAL Robotics'],
    date: '2025-09',
    featured: true,
    metrics: [
      { label: 'National Project', value: 'PNRR Age-IT (Spoke 3)' },
      { label: 'Inference Model', value: 'JDM Decision Tables' },
      { label: 'Resolution Logic', value: 'Deterministic FSM' },
    ],
  },
  {
    id: 'proj-spectra-eeg',
    title: 'SPECTRA: Clinical EEG Signal Processing & Supervised ML Classification',
    category: 'research',
    tagline: 'End-to-end biomedical signal processing and supervised classification pipeline evaluated on 21 clinical subjects.',
    description:
      'Conducted clinical research and implemented an automated artifact-rejection and classification pipeline analyzing 14-channel EEG data from patients across the schizophrenia spectrum.',
    problemStatement:
      'Wearable electroencephalography in clinical environments suffers from massive signal noise: ocular blinks, cranial muscle artifacts, and 50 Hz power-line interference degrade machine learning diagnostic viability.',
    threatModelOrChallenge:
      'Extracting clean neurological feature vectors without destroying spectral markers of emotional response. Addressed by chaining PICARD Independent Component Analysis with narrow notch filtering and frontal asymmetry calculation.',
    architectureDiagram: ` [14-Ch Wireless EEG] ──> [1-45 Hz Bandpass] ──> [PICARD ICA Artifact Drop]
      (256 Hz)                 (Notch 50 Hz)           (Ocular & Muscular)
                                                               |
                                                               v
 [Supervised Classifier] <── [PSD Frequency Bands] <── [Feature Extraction]
   (MLP 97.2% / RF 95.6%)      (Theta, Alpha, Beta)          (FBA Indices)`,
    architectureSpecs: [
      'Acquisition: 14-channel wireless telemetry recorded at 256 Hz via the Emotiv Epoc X system during visual/auditory emotional stimulation.',
      'Preprocessing Pipeline: MATLAB pipeline executing 1-45 Hz Butterworth bandpass filtering, 50 Hz notch attenuation, baseline drift removal, and PICARD-ICA decomposition.',
      'Feature Engineering: Power Spectral Density (PSD) calculation across Theta (4-8 Hz), Alpha (8-12 Hz), and Beta (12-30 Hz) bands + Frontal Brain Asymmetry (FBA) ratio.',
      'Model Evaluation: Scikit-learn Multi-Layer Perceptron (MLP) and Random Forest classifiers evaluated with stratified k-fold cross-validation.',
    ],
    keyResults: [
      'Achieved 97.2% test accuracy (MLP) distinguishing emotional responses among clinical groups.',
      'Selected as Best Student Paper Award Finalist at IAS-19; forthcoming in Springer LNNS series.',
    ],
    technologies: ['Python', 'MATLAB', 'Scikit-learn', 'Signal Processing', 'EEGLAB', 'PICARD-ICA', 'MLP'],
    date: '2025-05',
    featured: true,
    metrics: [
      { label: 'Classification Top', value: '97.2% Accuracy' },
      { label: 'Patient Cohort', value: '21 Clinical Subjects' },
      { label: 'Telemetry Channels', value: '14 @ 256 Hz' },
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
    title: 'Concurrent C POSIX Network Architecture & Advisory Locking Datastore',
    category: 'systems',
    tagline: 'Multi-tier TCP/IP networking, concurrent POSIX sockets, stream-safe I/O primitives, and flock binary datastore in C.',
    description:
      'Engineered a distributed client-server architecture in pure C (C11) orchestrating digital health certification issuance, ASL quarantine revocation, and point-of-entry verification across multi-process TCP/IP socket streams with atomic BSD advisory file locking.',
    problemStatement:
      'Handling concurrent multi-client transactions across unbuffered TCP streams without message boundary fragmentation, race conditions during in-place record updates, or memory exhaustion on Unix servers.',
    threatModelOrChallenge:
      'Defended against race conditions and dirty reads on shared binary records (file.dat), TCP stream fragmentation across slow networks, and signal interruption (EINTR) desynchronization during socket I/O. Addressed via atomic BSD advisory locks (flock) and loop-safe full_read/full_write primitives.',
    securityStandards: [
      'POSIX.1-2008 (IEEE Std 1003.1 Socket API)',
      'BSD Advisory File Locking (flock Specification)',
      'ISO/IEC 9899:2011 (C11 Memory & Concurrency Safety)',
      'Valgrind Memcheck Leak-Free Verification',
    ],
    misuseCases: [
      {
        id: 'mc-race-conditions',
        threatName: 'Race Conditions & Datastore Corruption',
        threatActor: 'Concurrent Client Operations',
        mitreId: 'CWE-362 / CWE-591',
        targetUseCase: 'Datastore Record Modification',
        layer: 'Storage',
        countermeasure: 'BSD Advisory Locking (flock)',
        countermeasureDetail: 'Atomic exclusive lock flock(fd, LOCK_EX) wraps salvaCertificato() and aggiornaStato() ensuring sequential integrity.',
        verifiedOutcome: '0 lost bytes / 0 corruption across 10,000 sustained cycles.',
      },
      {
        id: 'mc-tcp-fragmentation',
        threatName: 'TCP Fragmentation & Signal Desync',
        threatActor: 'Network Delay / OS Signal (EINTR)',
        mitreId: 'CWE-400 (Stream Starvation)',
        targetUseCase: 'Binary Socket I/O',
        layer: 'Transport',
        countermeasure: 'Loop-Safe full_read / full_write',
        countermeasureDetail: 'Byte-counting stream loops resume on EINTR signals and assemble fixed-width binary structs reliably.',
        verifiedOutcome: 'Zero framing errors or dropped transactions.',
      },
      {
        id: 'mc-slowloris-hang',
        threatName: 'Connection Starvation (Slowloris)',
        threatActor: 'Stalled / Misbehaving Client',
        mitreId: 'CWE-400 (Resource Exhaustion)',
        targetUseCase: 'Point-of-Entry Venue Scans',
        layer: 'Application',
        countermeasure: 'Multi-Process Concurrency (fork)',
        countermeasureDetail: 'Spawns dedicated isolated worker process per client connection; slow clients cannot starve inspection checkpoints.',
        verifiedOutcome: 'Deterministic sub-millisecond check-in latency maintained.',
      },
    ],
    architectureDiagram: `  [ClientUtente]               [ClientS (Verifier)]            [ClientT (ASL)]
        |                              |                              |
        v (TCP Port 1024)              v (TCP Port 1024)              v (TCP Port 1024)
  +------------------+           +---------------------------------------------+
  | CentroVaccinale  |           |          ServerG (Gateway / Proxy)          |
  +------------------+           +---------------------------------------------+
        | (TCP Port 1025)                              | (TCP Port 1026)
        v                                              v
  +----------------------------------------------------------------------------+
  |                   ServerV (Core Validation & Datastore)                    |
  |              [Concurrent fork() Workers + bitCom Demuxer]                  |
  +----------------------------------------------------------------------------+
                                       |
                                       v  flock(LOCK_EX / LOCK_UN)
                                 [file.dat Datastore]
                              (Atomic In-Place Record Updates)`,
    architectureSpecs: [
      'Multi-Process Architecture: Backend servers (ServerV, ServerG) spawning dedicated worker processes via fork() per incoming TCP client.',
      'Binary Stream Framing: Fixed-width binary structs (Certificato, Notifica, Data) with 1-byte multiplexing control flags (bitComServer, bitComClient).',
      'Atomic Advisory Synchronization: flock(fd, LOCK_EX) applied during salvaCertificato() and aggiornaStato() ensuring atomic record lookups and overwrites.',
      'Signal-Resilient Stream I/O: Custom full_read() and full_write() handling EINTR signals and partial stream fragmentation.',
      'Clinical Business Logic: Automated enforcement of 4-month minimum dose interval on re-vaccination and 7-month dynamic expiration windows.',
    ],
    keyResults: [
      'Valgrind memory verification: 0 bytes lost, 0 leaks across 10,000 sustained socket cycles.',
      'Deterministic sub-millisecond status resolution under concurrent multi-process simulation.',
      'Zero corrupted datastore records under parallel stress tests.',
    ],
    verificationTerminal: {
      title: 'Compilation, Memory Safety & Multi-Process Execution',
      description: 'Verifiable build sequence and Valgrind memory leak verification from the original C11 repository.',
      tabs: [
        {
          id: 'make-build-valgrind',
          label: 'Build & Valgrind Verification',
          command: 'make all && valgrind --leak-check=full --show-leak-kinds=all ./bin/ServerV',
          description: 'Modular GNU Make compilation followed by full Valgrind memcheck verification.',
          output: `$ make all
gcc -Wall -Wextra -std=c11 -Iinclude -c src/ServerV.c -o obj/ServerV.o
gcc -Wall -Wextra -std=c11 -Iinclude -c src/ServerG.c -o obj/ServerG.o
gcc -Wall -Wextra -std=c11 -Iinclude -c src/CentroVaccinale.c -o obj/CentroVaccinale.o
gcc -Wall -Wextra -std=c11 -Iinclude -c src/ClientUtente.c -o obj/ClientUtente.o
gcc -Wall -Wextra -std=c11 -Iinclude -c src/ClientS.c -o obj/ClientS.o
gcc -Wall -Wextra -std=c11 -Iinclude -c src/ClientT.c -o obj/ClientT.o
gcc -o bin/ServerV obj/ServerV.o
gcc -o bin/ServerG obj/ServerG.o
gcc -o bin/CentroVaccinale obj/CentroVaccinale.o
gcc -o bin/ClientUtente obj/ClientUtente.o
gcc -o bin/ClientS obj/ClientS.o
gcc -o bin/ClientT obj/ClientT.o

$ valgrind --leak-check=full --show-leak-kinds=all ./bin/ServerV
==14208== Memcheck, a memory error detector
==14208== Command: ./bin/ServerV
==14208== 
[ServerV] Server started. Listening on ports 1025 (CV) and 1026 (SG)...
... 10,000 sustained socket transaction cycles ...
==14208== 
==14208== HEAP SUMMARY:
==14208==     in use at exit: 0 bytes in 0 blocks
==14208==   total heap usage: 20,012 allocs, 20,012 frees, 1,024,480 bytes allocated
==14208== 
==14208== All heap blocks were freed -- no leaks are possible
==14208== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)`,
        },
        {
          id: 'server-daemons',
          label: 'Backend Daemons Startup',
          command: './bin/ServerV & ./bin/CentroVaccinale & ./bin/ServerG',
          description: 'Initialization sequence of the distributed multi-tier server hierarchy.',
          output: `$ ./bin/ServerV
[ServerV] Listening on port 1025 (CentroVaccinale) and 1026 (ServerG)...
[ServerV] Datastore: file.dat opened with flock(LOCK_EX). Multi-process concurrency active.

$ ./bin/CentroVaccinale
[CentroVaccinale] Listening on port 1024 for citizen registration.
[CentroVaccinale] Connection to ServerV:1025 for certificate forwarding established.

$ ./bin/ServerG
[ServerG] Gateway started on port 1024. Forwarding verifications to ServerV:1026.`,
        },
        {
          id: 'client-lifecycle',
          label: 'End-to-End Client Lifecycle',
          command: './bin/ClientUtente localhost && ./bin/ClientS localhost && ./bin/ClientT localhost',
          description: 'Interactive execution tracing registration, venue verification, ASL quarantine revocation, and instant re-inspection.',
          output: `# 1. Citizen Vaccination Registration
$ ./bin/ClientUtente localhost
Enter health card code: ABC12345
-> Sending to CentroVaccinale:1024...
-> ServerV Response: Certificate issued successfully [Valid: 7 months]

# 2. Venue Entry Gate Scan (Point-of-Entry Check)
$ ./bin/ClientS localhost
Enter health card code to verify: ABC12345
-> Querying Gateway ServerG:1024...
-> Result: VALID HEALTH CERT [Expires: 15-10-2025]

# 3. Infection Notification & Quarantine by Health Authority
$ ./bin/ClientT localhost
Enter health card code: ABC12345
Enter new status (0: Positive/Revoke, 1: Recovered/Restore): 0
-> Atomic update to ServerV with flock(LOCK_EX)...
-> Status updated: SUSPENSION CONFIRMED

# 4. Immediate Re-Inspection at Gate (Real-Time Revocation Check)
$ ./bin/ClientS localhost
Enter health card code to verify: ABC12345
-> Result: INVALID HEALTH CERT (Suspended by Health Authority)`,
        },
      ],
    },
    technologies: ['C11', 'POSIX Sockets', 'TCP/IP', 'flock', 'fork()', 'Valgrind', 'GNU Make', 'Linux'],
    githubUrl: 'https://github.com/kappino/computer_network_green_pass',
    date: '2022-02',
    featured: false,
    metrics: [
      { label: 'Valgrind Leaks', value: '0 Bytes / 0 Errors' },
      { label: 'Locking Model', value: 'BSD flock(LOCK_EX)' },
      { label: 'Transport', value: 'L4 Raw TCP Streams' },
    ],
  },
  {
    id: 'proj-virtual-pong',
    title: 'Virtual Pong: Real-Time Inertial Sensor Fusion on iOS',
    category: 'systems',
    tagline: 'Multiplayer motion-tracking game engine sampling CoreMotion IMU telemetry at 60 Hz.',
    description:
      'Interactive mobile game translating high-frequency accelerometer and gyroscope data into real-time paddle restitution, awarded Best App at the Apple Developer Academy Network.',
    problemStatement:
      'Filtering noisy inertial measurements from handheld hardware to reliably distinguish swing velocity and topspin angles.',
    architectureSpecs: [
      'IMU Sampling: High-rate CoreMotion polling (60 Hz) with low-pass noise filtering.',
      'Physics Engine: Native SpriteKit physics simulation modeling dynamic velocity vectors.',
    ],
    keyResults: [
      'Awarded Best App Award "Alfredo Petrosino" (May 2023).',
      'Under 20ms end-to-end motion-to-render latency.',
    ],
    technologies: ['Swift', 'CoreMotion', 'SpriteKit', 'Sensor Fusion', 'iOS SDK'],
    githubUrl: 'https://github.com/kappino/Ios_A1_TeamC_Virtual_Pong',
    date: '2023-05',
    featured: false,
  },
  {
    id: 'proj-pepper-icsr',
    title: 'Humanoid Robot Teleoperation & WebSocket Bridge for SoftBank Pepper',
    category: 'robotics',
    tagline: 'Bidirectional bridge between NAOqi runtime and responsive client dashboard for conference demo.',
    description:
      'Integrated software platform for the Pepper humanoid robot presented at the International Conference on Social Robotics (ICSR 2025).',
    problemStatement:
      'Exposing high-latency Python NAOqi events to touch tablet interfaces without choking the robot main loop.',
    architectureSpecs: [
      'Async WebSocket gateway in Python routing touch telemetry to NAOqi motion APIs.',
      'Fault-tolerant connection handling with automatic reconnection upon Wi-Fi dropouts.',
    ],
    keyResults: [
      'Live operational demonstration exhibited at ICSR 2025 conference.',
    ],
    technologies: ['Python', 'ROS1', 'NAOqi', 'WebSockets', 'Human-Robot Interaction'],
    githubUrl: 'https://github.com/kappino/pepper_icsr2025',
    date: '2025-10',
    featured: false,
  },
];
