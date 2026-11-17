import { EducationItem, Certification, AwardItem } from '../types';

export const education: EducationItem[] = [
  {
    id: 'edu-magistrale-cybersecurity',
    degree: 'M.Sc. in Computer Science (Cybersecurity)',
    institution: 'University of Salerno',
    location: 'Fisciano (SA), Italy',
    period: 'Feb 2025 — Mar 2027 (Expected)',
    highlights: [
      'Advanced curriculum in Network & IoT Security, Cryptography & PKI, Cloud Security, Threat Modeling, and Secure Software Design.',
      'Research focus on cryptographic edge-to-cloud hardening, mutual authentication (mTLS v1.3), and zero-trust protocol verification.',
    ],
  },
  {
    id: 'edu-triennale-informatica',
    degree: 'B.Sc. in Computer Science & Technologies',
    institution: "University of Naples 'Parthenope'",
    location: 'Naples, Italy',
    period: 'Sep 2020 — Feb 2025',
    thesis: {
      title: 'Multimodal Machine Learning & Wearable EEG Signal Processing in Precision Medicine',
      focus: 'Processed clinical 14-channel wireless EEG data in MATLAB (PICARD ICA) and developed Scikit-learn classifiers (MLP, Random Forest) for emotion recognition in schizophrenia patients.',
    },
    highlights: [
      'Thesis research resulted in a first-author paper published by Springer LNNS and selected as a Best Student Paper Award finalist at IAS-19.',
      'Solid foundations in Operating Systems, Concurrent Programming (C POSIX), Algorithms & Data Structures, and Computer Networks.',
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert-ios-advanced',
    name: 'iOS Advanced Course',
    issuer: 'Apple Developer Academy Network / UniParthenope',
    date: '2023',
  },
  {
    id: 'cert-ios-essentials',
    name: 'iOS Essentials',
    issuer: 'Apple Developer Academy Network / UniParthenope',
    date: '2022',
  },
];

export const awards: AwardItem[] = [
  {
    id: 'award-tnes',
    title: 'Winner · Hack the Route',
    issuer: 'Consorzio CLARA · The Big Hack 2026',
    date: '2026',
    description: 'Team 0’PACKET won Challenge 04 with TNES, a networking and cybersecurity training prototype.',
  },
  {
    id: 'award-ias19-finalist',
    title: 'Finalist - Best Student Paper Award',
    issuer: '19th International Conference on Intelligent Autonomous Systems (IAS-19) / Springer Nature LNNS',
    date: '2025',
    description: 'Selected as Best Student Paper Award Finalist for the 1st-author research on wireless EEG emotion classification.',
  },
  {
    id: 'award-petrosino',
    title: 'Best App Award "Alfredo Petrosino"',
    issuer: 'Apple Developer Academy Network & UniParthenope',
    date: '2023',
    description: 'Awarded for Virtual Pong: a motion-based multiplayer game leveraging high-frequency CoreMotion sensor fusion.',
  },
];
