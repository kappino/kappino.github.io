import { PersonalInfo } from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Crescenzo Esposito',
  handle: 'kappino',
  title: 'MSc in Computer Science | Cybersecurity | @UNISA',
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
    'MSc student in Computer Science (Cybersecurity) at the University of Salerno. Former Graduate Researcher at UniParthenope (Age-IT project) focused on rule-based decision engines and ROS2 integration for the CARE assistive robot. In parallel, designed an IoT security architecture for medical telemetry, mitigating sensor spoofing through mTLS, HMAC, and an Ethereum smart contract for data immutability. Core focus sits at the intersection of embedded systems, security, and robotics.',
  philosophy:
    "I prefer working close to the machine. Whether it's verifying an mTLS 1.3 handshake on bare-metal ESP32, inspecting memory boundaries in POSIX C, or tuning an artifact-rejection pipeline for EEG clinical data, my work focuses on measurable security and deterministic execution over marketing abstractions.",
  socials: {
    github: 'https://github.com/kappino',
    linkedin: 'https://www.linkedin.com/in/crescenzo-esposito',
  },
  homelab: [
    {
      name: 'pve-host',
      role: 'Bare-Metal Proxmox VE Hypervisor',
      specs: 'Debian 12 kernel, GTX 1070 8GB GPU passthrough, Tailscale WireGuard Exit Node',
      software: ['Proxmox VE', 'KVM', 'LXC', 'Tailscale WireGuard', 'GPU Passthrough'],
    },
    {
      name: 'npm-reverse-proxy',
      role: 'Zero-Expose Ingress Gateway',
      specs: 'Centralized HTTPS reverse proxy, Let\'s Encrypt SSL, Tailscale Serve',
      software: ['Nginx Proxy Manager', 'Certbot', 'OpenResty', 'DuckDNS'],
    },
    {
      name: 'ct105-pihole',
      role: 'Internal DNS & Telemetry Sinkhole',
      specs: 'LXC Debian container, local split-DNS and ad-blocking sinkhole',
      software: ['Pi-hole', 'FTL DNS Engine', 'Unbound', 'Custom DNS Rewrites'],
    },
    {
      name: 'ct107-aegis-core',
      role: 'Proactive AI Engine & Service Bus',
      specs: 'FastAPI async layer, SQLite in WAL mode, 24/7 Systemd timers',
      software: ['Python 3.11', 'FastAPI', 'Uvicorn', 'SQLite (WAL Mode)', 'Systemd Timers'],
    },
    {
      name: 'home-assistant-vm',
      role: 'Smart Home & LLM Assist Hub',
      specs: 'Home Assistant OS VM, Gemini Tool Calling integration, local automation',
      software: ['Home Assistant OS', 'Google Generative AI (Gemini)', 'WebSocket API', 'Matter/Zigbee'],
    },
  ],
};
