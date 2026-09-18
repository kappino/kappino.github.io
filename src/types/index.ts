export interface ThreatMatrixItem {
  vector: string;
  scenario: string;
  mitreRef?: string;
  legacyImpact: string;
  defenseMechanism: string;
}

export interface VerificationLogTab {
  id: string;
  label: string;
  command?: string;
  description?: string;
  output: string;
}

export interface VerificationTerminal {
  title: string;
  description?: string;
  tabs: VerificationLogTab[];
}

export interface MisuseCase {
  id: string;
  threatName: string;
  threatActor: string;
  mitreId: string;
  targetUseCase: string;
  layer: 'Perception' | 'Transport' | 'Storage' | 'Application';
  countermeasure: string;
  countermeasureDetail: string;
  verifiedOutcome: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'security' | 'robotics' | 'embedded' | 'research' | 'systems';
  tagline: string;
  shortDescription?: string;
  description: string;
  problemStatement: string;
  threatModelOrChallenge?: string;
  securityStandards?: string[];
  threatMatrix?: ThreatMatrixItem[];
  misuseCases?: MisuseCase[];
  verificationTerminal?: VerificationTerminal;
  architectureDiagram?: string;
  architectureSpecs: string[];
  keyResults: string[];
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  date: string; // YYYY-MM
  featured: boolean;
  metrics?: { label: string; value: string }[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  conference: string;
  series: string;
  isbn?: string;
  year: number;
  status: string;
  statusNote: string;
  abstract: string;
  bibtex: string;
  metrics: { label: string; value: string; detail?: string }[];
  doiUrl?: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  badge?: string;
  description: string;
  highlights: string[];
  technologies: string[];
  type: 'research' | 'industry' | 'training';
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  thesis?: {
    title: string;
    focus: string;
  };
  highlights?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface HomelabNode {
  name: string;
  role: string;
  specs: string;
  software: string[];
}

export interface PersonalInfo {
  name: string;
  handle: string;
  title: string;
  affiliations: {
    role: string;
    org: string;
    detail: string;
  }[];
  email: string;
  location: string;
  available: boolean;
  statusNote: string;
  intro: string;
  philosophy: string;
  socials: {
    github: string;
    linkedin: string;
  };
  homelab: HomelabNode[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  readTime: number;
  content: string;
}
