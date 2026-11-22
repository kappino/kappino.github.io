import { ExperienceItem } from '../types';

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-parthenope-ageit',
    role: 'Research Fellow & Software Developer (Research Grant)',
    organization: "Università degli Studi di Napoli 'Parthenope' · with Protom Robotics",
    location: 'Naples, Italy',
    period: 'Mar 2025 — Oct 2025 (8 months)',
    badge: 'PNRR Age-IT · CARE Project',
    type: 'research',
    description:
      'Selected wearable devices and biomedical sensors for a home-assistance robot, wrote technical documentation, tested the demonstrator, and designed and built the Python ROS 2 care_planner node from scratch.',
    highlights: [
      'Built the first decision engine in durable_rules and migrated it to GoRules (JDM) visual tables so clinical staff could inspect and review care policies directly.',
      'Implemented priority arbitration (medication reminders and health measurements ahead of cognitive exercises) with snooze, retries, and caregiver escalation.',
      'In parallel lab work, modernized the Pepper robot PC client to Python 3.12 and ROS 2 over Wi-Fi/NAOqi, removing legacy Python 2.7 dependencies and subprocess-launched ML scripts.',
    ],
    relatedLink: { label: 'CARE case study & architecture', href: '/projects/proj-care-decision-planner' },
    technologies: ['Python', 'ROS 2', 'GoRules (JDM)', 'durable_rules', 'REST APIs', 'NAOqi', 'Wearable Sensors'],
  },
  {
    id: 'exp-tnes',
    role: 'Backend & Cisco CML Integration · The Big Hack 2026',
    organization: 'Team 0’PACKET · Challenge Partner: Consorzio Clara',
    location: 'Naples, Italy',
    period: 'Nov 2026',
    badge: '1st Place · Hack the Route',
    type: 'hackathon',
    description:
      'Co-developed the FastAPI backend for TNES, a 3D networking and cybersecurity simulator game built in Unreal Engine 5 and backed by live Cisco Modeling Labs (CML) topologies.',
    highlights: [
      'Mapped in-game devices and ports to virtual CML interfaces via REST APIs and reviewed the Unreal-to-backend integration.',
      'Authored backend-side CML connectivity tests verifying that disconnecting and reconnecting virtual links changes real ping reachability inside the lab.',
    ],
    technologies: ['Python', 'FastAPI', 'Cisco CML', 'Unreal Engine 5'],
    relatedLink: { label: 'TNES case study', href: '/projects/proj-tnes' },
  },
  {
    id: 'exp-neapolis-stm32',
    role: 'Embedded Firmware & Edge AI Team Lead (SortEdge Bin)',
    organization: 'NeaPolis Innovation Summer Campus · STMicroelectronics',
    location: 'Arzano (Naples), Italy',
    period: 'Sep 2026',
    badge: '10-Day Intensive Campus',
    type: 'training',
    description:
      'Led an 8-person team over 10 days to design and demonstrate SortEdge Bin, a smart waste-sorting prototype running RTOS firmware and on-device CNN inference.',
    highlights: [
      'Developed C/ChibiOS firmware on STM32G474RE (Cortex-M4) coordinating sensors, PWM servo actuation, SPI uGFX display, and ~13 ms on-device CNN inference.',
      'Implemented ESP32-CAM to STM32 UART frame transfer with CRC-32 error detection and packet retransmission, adapting the ESP32 firmware.',
    ],
    relatedLink: { label: 'SortEdge Bin architecture', href: '/projects/proj-munnisc-cestinno' },
    technologies: ['C', 'STM32G474RE', 'ChibiOS RTOS', 'ESP32-CAM', 'UART / CRC-32', 'SPI (uGFX)', 'PWM', 'Edge AI'],
  },
  {
    id: 'exp-ios-foundation',
    role: 'iOS Foundation Essentials & Advanced',
    organization: 'Apple Developer Academy Network & UniParthenope',
    location: 'Naples, Italy',
    period: '2022 — 2023',
    badge: 'Best App Award “Alfredo Petrosino”',
    type: 'training',
    description:
      'Completed native iOS and watchOS training (Swift, SwiftUI) and co-built Virtual Pong: an Apple Watch motion controller paired with a local peer-to-peer iPhone table-tennis game.',
    highlights: [
      'Captured wrist accelerometer/gyroscope streams via CoreMotion and classified swings on-device with Core ML, streaming events over WatchConnectivity and MultipeerConnectivity.',
    ],
    relatedLink: { label: 'Virtual Pong case study', href: '/projects/proj-virtual-pong' },
    technologies: ['Swift', 'SwiftUI', 'CoreMotion', 'Core ML', 'WatchConnectivity', 'MultipeerConnectivity'],
  },
  {
    id: 'exp-civil-service',
    role: 'Front Office & IT Support',
    organization: 'Servizio Civile Universale · Comune di Casamicciola Terme',
    location: 'Casamicciola Terme (NA), Italy',
    period: 'Jul 2021 — Jul 2022 (1 year)',
    type: 'industry',
    description:
      'Provided front-office public assistance (including in English) and hands-on technical support for municipal office workstations and the local area network.',
    highlights: [],
    technologies: ['IT Support', 'Local Networking', 'Bilingual Communication'],
  },
];
