import { PersonalInfo } from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Crescenzo Esposito',
  handle: 'kappino',
  title: 'Junior Embedded & IoT Security Engineer | Firmware, Robotics & Infrastructure',
  cvUrl: '/crescenzo_esposito_cv.pdf',
  affiliations: [
    {
      role: 'M.Sc. Student in Computer Science (Cybersecurity)',
      org: 'University of Salerno',
      detail: 'Feb 2025 — Expected 2027 · IoT Security, Network Security, Applied Cryptography, Malware Analysis & Distributed Systems',
    },
    {
      role: 'Research Fellow & Software Developer (PNRR Age-IT · Concluded)',
      org: 'University of Naples Parthenope · with Protom Robotics',
      detail: 'Mar 2025 — Oct 2025 · Sensor selection, ROS 2 care_planner (durable_rules → GoRules JDM), and Pepper PC client modernization',
    },
  ],
  email: 'crescenzo.esposito@outlook.it',
  location: 'Naples, Italy · Available for Remote & Hybrid',
  available: true,
  statusNote: 'Open to junior embedded, IoT security, robotics, and systems engineering roles',
  intro:
    'Computer Science graduate (108/110) and M.Sc. Cybersecurity student at the University of Salerno. I work close to the hardware — from STM32/ESP32 firmware and authenticated IoT pipelines to ROS 2 decision engines and self-hosted Proxmox infrastructure. First author on Springer LNNS (IAS-19) and 1st place at Hack the Route (The Big Hack 2026).',
  philosophy:
    'I like systems where every boundary can be verified: checking an HMAC-SHA256 tag on an ESP32 before a packet hits MQTT, tracing a GoRules decision into a ROS 2 topic, or running 14 segmented workloads on a recycled laptop with daily snapshot backups and a local SIEM.',
  socials: {
    github: 'https://github.com/kappino',
    linkedin: 'https://www.linkedin.com/in/crescenzo-esposito',
  },
  homelab: [
    {
      name: 'pve-host',
      role: 'Bare-Metal Hypervisor & Built-in UPS',
      specs: 'Recycled ASUS gaming laptop running 24/7 on Proxmox VE 9.1 (Linux 6.17), Intel Core i7-7700HQ, 16 GB RAM, GTX 1070 Mobile, and custom battery charge-limiting script acting as an integrated UPS',
      software: ['Proxmox VE 9.1', 'Linux 6.17', 'LVM-thin', 'vzdump (zstd)'],
    },
    {
      name: 'network-ingress',
      role: 'Segmented Bridges & Zero-Open-Port Ingress',
      specs: 'Dual virtual bridges (vmbr0 physical LAN + vmbr1 isolated NAT subnet) with controlled dual-homing, Pi-hole DNS filtering, Tailscale admin access, Nginx Proxy Manager, and Cloudflare Tunnels',
      software: ['Tailscale', 'Cloudflare Tunnels', 'Nginx Proxy Manager', 'Pi-hole'],
    },
    {
      name: 'soc-observability',
      role: 'SIEM, Availability Monitoring & Dashboard',
      specs: 'Dedicated Splunk SIEM container for centralized log ingestion and security analysis, continuous service health checks via Uptime Kuma, and unified status overview on Homepage',
      software: ['Splunk SIEM', 'Uptime Kuma', 'Homepage'],
    },
    {
      name: 'local-ai-gpu',
      role: 'Shared GTX 1070 CUDA Inference',
      specs: 'Single NVIDIA GTX 1070 Mobile shared across multiple LXC containers for offline LLM inference, INT8 voice transcription, receipt parsing, and photo ML indexing',
      software: ['Ollama', 'Faster-Whisper (INT8)', 'Immich ML (CUDA)', 'pgvectors / vectorchord'],
    },
    {
      name: 'aegis-agentic-ops',
      role: 'Aegis Core & Agentic Sysadmin / SRE',
      specs: 'Async FastAPI + SQLite WAL personal platform paired with an AI SRE agent automating Proxmox maintenance (preventive snapshots & rollback) and Splunk SIEM troubleshooting via Telegram',
      software: ['FastAPI', 'SQLite WAL', 'Proxmox Snapshots', 'Telegram Bot'],
    },
    {
      name: 'cloud-domotics-apps',
      role: 'Self-Hosted Cloud, Smart Home & Custom Bots',
      specs: 'Home Assistant OS KVM VM, Nextcloud + Samba on 2 TB shared storage, Immich on 1 TB SSD, Social Video Bot (aiogram 3 + local Bot API), Fuorisede (+ MCP JSON-RPC 2.0), and isolated Portfolio Console VM',
      software: ['Home Assistant OS', 'Immich', 'Nextcloud & Samba', 'aiogram 3', 'MCP JSON-RPC 2.0'],
    },
  ],
};
