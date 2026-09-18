import { ExperienceItem } from '../types';

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-parthenope-ageit',
    role: 'Graduate Research Assistant',
    organization: "Università degli Studi di Napoli 'Parthenope'",
    location: 'Naples, Italy',
    period: 'Mar 2025 — Oct 2025 (8 months)',
    badge: 'PNRR Age-IT · Concluded',
    type: 'research',
    description:
      'Graduate research appointment under PNRR "Age-IT" focused on event-driven decision runtimes and ROS2 robotic coordination for the CARE assistive healthcare robot.',
    highlights: [
      'Developed the event-driven decision engine for the CARE assistive robot (PNRR "Age-IT"), transitioning rule logic from durable_rules (Rete algorithm) to GoRules (JDM decision tables) for clinical auditability.',
      'Implemented the Priority Resolver module for medication workflows (snooze, retries, caregiver escalation) and authored the ROS2 care_planner package for robot coordination.',
      'Processed clinical 14-channel wireless EEG data in MATLAB (PICARD ICA artifact removal) and developed Scikit-learn classifiers (MLP, Random Forest) for emotion recognition in schizophrenia patients.',
      'First author of the research paper presented at IAS-19, selected as a Best Student Paper Award Finalist (in press with Springer Nature LNNS).',
    ],
    technologies: ['ROS2', 'Python', 'GoRules (JDM)', 'durable_rules', 'Docker', 'MATLAB', 'Scikit-learn', 'AAL Robotics'],
  },
  {
    id: 'exp-civil-service',
    role: 'Front Office Operator & Digital Support',
    organization: 'Servizio Civile Nazionale',
    location: 'Casamicciola Terme (Naples), Italy',
    period: 'Jul 2021 — Jul 2022 (1 year 1 month)',
    badge: 'National Service',
    type: 'industry',
    description:
      'Public relations, operational IT workstation troubleshooting, and community digital communication for local municipality administration.',
    highlights: [
      'Front Office & Public Relations: Handled daily visitor reception and information services for residents and international tourists in Italian and English.',
      'Operational IT Support: Provided day-to-day troubleshooting for office workstations, peripheral devices, and local office LAN connectivity.',
      'Digital Communication: Managed the drafting and delivery of the official municipal community newsletter.',
    ],
    technologies: ['IT Support', 'LAN Administration', 'Workstation Troubleshooting', 'Digital Identity (SPID/CIE)'],
  },
  {
    id: 'exp-neapolis-stm32',
    role: 'Embedded & Edge AI Fellow',
    organization: 'STMicroelectronics & NeaPolis Innovation',
    location: 'Arzano (Naples), Italy',
    period: 'Sep 2026',
    badge: 'Industrial Campus',
    type: 'training',
    description:
      'Intensive hardware-software engineering program focusing on low-level development on 32-bit ARM Cortex-M microcontrollers and edge sensing.',
    highlights: [
      'Engineered low-level C/C++ firmware using STM32CubeIDE and ESP-IDF across STM32 and ESP32 platforms.',
      'Prototyped MUNNISC: an autonomous smart bin sorting waste via real-time edge computer vision, proximity detection, and servomotor deflection.',
      'Implemented deterministic multi-task scheduling with FreeRTOS and serial telemetry over I2C and SPI.',
    ],
    technologies: ['STM32', 'ESP32', 'FreeRTOS', 'C/C++', 'STM32CubeIDE', 'Edge AI', 'I2C/SPI'],
  },
  {
    id: 'exp-ios-foundation',
    role: 'iOS Advanced & Essential Course',
    organization: 'Apple iOS Foundation and UniParthenope',
    location: 'Naples, Italy',
    period: '2022 — 2023',
    badge: 'Best App Award "A. Petrosino"',
    type: 'training',
    description:
      'Specialized mobile engineering curriculum focused on native Swift architecture, human interface guidelines, and inertial hardware integration.',
    highlights: [
      'Developed Virtual Pong: a motion-based multiplayer game leveraging high-frequency CoreMotion sensor fusion to capture paddle angles and swing torque.',
      'Awarded Best App Award (May 2023) among cohort prototypes for responsive motion tracking and clean codebase.',
    ],
    technologies: ['Swift', 'iOS SDK', 'CoreMotion', 'SpriteKit', 'Sensor Fusion'],
  },
];
