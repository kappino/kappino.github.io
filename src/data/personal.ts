import { PersonalInfo } from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Crescenzo Esposito',
  handle: 'kappino',
  title: 'Systems & Security Engineer | Embedded, Robotics & Applied Cryptography',
  affiliations: [
    {
      role: 'Graduate Student (M.Sc. Cybersecurity)',
      org: 'University of Salerno',
      detail: 'Feb 2025 — Mar 2027 · Focus on Cryptographic Hardening, Network Threat Modeling, and IoT Security',
    },
    {
      role: 'Graduate Research Assistant (PNRR Age-IT - Concluded)',
      org: 'University of Naples Parthenope',
      detail: 'Mar 2025 — Oct 2025 · Decision-making engines (GoRules JDM) & ROS2 for CARE assistive robot',
    },
  ],
  email: 'crescenzo.esposito@outlook.it',
  location: 'Naples, Italy · Available for Remote & Hybrid',
  available: true,
  statusNote: 'Open for R&D opportunities, security engineering, and systems research',
  intro:
    'MSc student in Computer Science (Cybersecurity) at the University of Salerno. Former Graduate Researcher at UniParthenope (PNRR Age-IT project) focused on rule-based decision engines and ROS2 for assistive robotics. Research background in clinical biomedical signal processing (IAS-19) and embedded IoT security (mTLS, HMAC). Core focus sits at the intersection of embedded systems, security, and autonomous runtimes.',
  philosophy:
    "I prefer working close to the machine. Whether it's verifying an mTLS 1.3 handshake on bare-metal ESP32, inspecting memory boundaries in POSIX C, or tuning an artifact-rejection pipeline for EEG clinical data, my work focuses on measurable security and deterministic execution over marketing abstractions.",
  socials: {
    github: 'https://github.com/kappino',
    linkedin: 'https://www.linkedin.com/in/crescenzo-esposito',
  },
  homelab: [
    {
      name: 'pve-host',
      role: 'Hypervisor & Isolated Virtualization Lab',
      specs: 'Proxmox VE on Debian 12 kernel, KVM/LXC virtualization, GPU passthrough testbed, Tailscale WireGuard mesh node',
      software: ['Proxmox VE', 'KVM', 'LXC', 'Tailscale WireGuard', 'GPU Passthrough'],
    },
    {
      name: 'ingress-gateway',
      role: 'Zero-Expose Ingress Gateway',
      specs: 'Centralized HTTPS reverse proxy, automated SSL/TLS certificates, internal TLS routing without open WAN ports',
      software: ['Nginx Proxy Manager', 'Certbot', 'OpenResty', 'Let\'s Encrypt'],
    },
    {
      name: 'dns-telemetry-sinkhole',
      role: 'Internal Split-DNS & Telemetry Sinkhole',
      specs: 'LXC container, split-horizon DNS, query logging, and local network ad/telemetry sinkholing',
      software: ['Pi-hole', 'FTL DNS Engine', 'Unbound', 'Custom DNS Rewrites'],
    },
    {
      name: 'service-bus-runtime',
      role: 'Asynchronous Service Bus & Daemon Testbed',
      specs: 'FastAPI async runtime, SQLite in WAL mode, systemd daemon isolation for background workers',
      software: ['Python 3.11', 'FastAPI', 'Uvicorn', 'SQLite (WAL Mode)', 'Systemd Timers'],
    },
    {
      name: 'compute-storage-node',
      role: 'Local Vector & Machine Learning Compute',
      specs: 'Debian 12 LXC container, pgvector indexing, Redis caching, GPU-assisted local model evaluation',
      software: ['PostgreSQL (pgvector)', 'Redis', 'Machine Learning Microservices', 'Hardware Transcoding'],
    },
    {
      name: 'iot-automation-hub',
      role: 'Embedded Devices & Telemetry Gateway',
      specs: 'Home Assistant OS VM, local MQTT broker integration, WebSocket API for embedded node coordination',
      software: ['Home Assistant OS', 'Mosquitto MQTT', 'WebSocket API', 'Matter/Zigbee'],
    },
  ],
};
