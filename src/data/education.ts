import { EducationItem, Certification, AwardItem } from '../types';

export const education: EducationItem[] = [
  {
    id: 'edu-magistrale-cybersecurity',
    degree: 'M.Sc. in Computer Science (LM-18) · Cybersecurity Curriculum',
    institution: 'University of Salerno',
    location: 'Fisciano (SA), Italy',
    period: 'Feb 2025 — Expected 2027',
    highlights: [
      'Core coursework: IoT Security, Network Security, Applied Cryptography, Malware Analysis, and Distributed Systems.',
      'Applied work focused on authenticated embedded telemetry (HMAC-SHA256, mTLS / TLS 1.3, X.509 ACLs), network threat modeling, and segmented infrastructure.',
    ],
  },
  {
    id: 'edu-triennale-informatica',
    degree: 'B.Sc. in Computer Science (L-31) · 108/110',
    institution: "University of Naples 'Parthenope'",
    location: 'Naples, Italy',
    period: 'Sep 2020 — Feb 2025',
    thesis: {
      title: 'Wearable EEG Signal Processing & Machine Learning for Emotion Recognition in Schizophrenia (SPECTRA)',
      focus: 'Compared three MATLAB/EEGLAB (PICARD-ICA) artifact-rejection pipelines on 14-channel wireless EEG (21 participants) and evaluated Python/scikit-learn classifiers.',
    },
    highlights: [
      'Key exams: Computer Architecture (30L), Software Engineering (30L), Algorithms (30), Parallel Computing (30).',
      'Experimental thesis (Prof. M. Staffa) resulted in a first-author paper published in Springer LNNS and selected as a Best Student Paper Award finalist at IAS-19.',
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert-ios-advanced',
    name: 'iOS Foundation Advanced',
    issuer: 'Apple Developer Academy Network & University of Naples Parthenope',
    date: '2023',
  },
  {
    id: 'cert-ios-essentials',
    name: 'iOS Foundation Essentials',
    issuer: 'Apple Developer Academy Network & University of Naples Parthenope',
    date: '2022',
  },
];

export const awards: AwardItem[] = [
  {
    id: 'award-tnes',
    title: '1st Place · Hack the Route Challenge',
    issuer: 'The Big Hack 2026 · Challenge Partner: Consorzio Clara (Team 0’PACKET)',
    date: '2026',
    description: 'Won Challenge 04 with TNES, a 3D networking and cybersecurity simulator in Unreal Engine 5 connected to live Cisco Modeling Labs topologies via FastAPI.',
  },
  {
    id: 'award-ias19-finalist',
    title: 'Finalist · Best Student Paper Award',
    issuer: '19th International Conference on Intelligent Autonomous Systems (IAS-19) · Springer Nature LNNS',
    date: '2025',
    description: 'First-author research on 14-channel wearable EEG preprocessing and emotion-recognition classification across clinical schizophrenia groups.',
  },
  {
    id: 'award-petrosino',
    title: 'Best App Award “Alfredo Petrosino”',
    issuer: 'Apple Developer Academy Network & University of Naples Parthenope',
    date: '2023',
    description: 'Awarded for Virtual Pong, an Apple Watch + iPhone peer-to-peer multiplayer game driven by CoreMotion and on-device Core ML swing classification.',
  },
];
