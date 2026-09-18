import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  Cpu,
  Bot,
  Database,
  Activity,
  Radio,
  FileCode2,
  CheckCircle2,
  Layers,
  ArrowRight,
  Shield,
} from 'lucide-react';

interface PipelineStep {
  id: string;
  stepNum: string;
  name: string;
  shortDesc: string;
  tech: string;
  status: string;
  icon: React.ComponentType<{ className?: string }>;
  details: string[];
}

interface FlowData {
  id: 'mtls' | 'ros2' | 'spectra';
  tabName: string;
  projectId: string;
  projectTitle: string;
  summaryProblem: string;
  summarySolution: string;
  metricBadge: string;
  steps: PipelineStep[];
}

const FLOWS_DATA: Record<'mtls' | 'ros2' | 'spectra', FlowData> = {
  mtls: {
    id: 'mtls',
    tabName: 'IoT Zero-Trust (mTLS)',
    projectId: 'proj-mtls-iot-gateway',
    projectTitle: 'Zero-Trust IoT Gateway & Blockchain Notary',
    summaryProblem: 'Evil ESP32 clones victim sensor MAC to inject forged tachycardia vitals.',
    summarySolution: 'Bidirectional mTLS v1.3 drops unauthenticated packets at the physical edge before broker ingest.',
    metricBadge: '100% Drop on Spoof',
    steps: [
      {
        id: 'step-esp32',
        stepNum: '01',
        name: 'ESP32 Edge Node',
        shortDesc: 'Patient telemetry source',
        tech: 'C++ / mbedTLS 3.x',
        status: 'HMAC-SHA256 Signed',
        icon: Cpu,
        details: ['Bare-metal ESP32-S3 firmware', 'Pre-shared HMAC-SHA256 digest', 'Fits within 320KB RAM constraint', 'Client X.509 certificate loaded'],
      },
      {
        id: 'step-tls',
        stepNum: '02',
        name: 'mTLS v1.3 Barrier',
        shortDesc: 'Mutual certificate verification',
        tech: 'TLS_AES_256_GCM_SHA384',
        status: 'Handshake < 210ms',
        icon: Lock,
        details: ['4096-bit offline Root CA', 'Bidirectional clientAuth challenge', 'Drops spoofed packets with no private key', 'Prevents MITM on untrusted Wi-Fi'],
      },
      {
        id: 'step-broker',
        stepNum: '03',
        name: 'Mosquitto Broker',
        shortDesc: 'Access control & routing',
        tech: 'Port 8883 / Docker',
        status: 'Strict ACL Enforced',
        icon: Radio,
        details: ['require_certificate true enabled', 'ACL strictly mapped to client CN', 'Zero plaintext TCP listeners', 'Isolated Docker container network'],
      },
      {
        id: 'step-notary',
        stepNum: '04',
        name: 'EVM Smart Contract',
        shortDesc: 'Immutable proof of existence',
        tech: 'Solidity 0.8.19',
        status: 'Proof Anchored',
        icon: Database,
        details: ['HealthNotary.sol contract', 'SHA-256 telemetry digest on-chain', 'Anti-replay hash check (dataHashUsed)', 'GDPR compliant: zero cleartext PII'],
      },
    ],
  },
  ros2: {
    id: 'ros2',
    tabName: 'ROS2 CARE Planner',
    projectId: 'proj-care-decision-planner',
    projectTitle: 'CARE Decision Planner: ROS2 Priority Engine',
    summaryProblem: 'Eldercare robot handles competing medication reminders vs patrol with deadlock risks.',
    summarySolution: 'Microsecond GoRules JDM tables enforce deterministic overrides: health emergencies supersede patrol.',
    metricBadge: 'Zero Deadlocks',
    steps: [
      {
        id: 'step-sensor-data',
        stepNum: '01',
        name: 'Patient Telemetry',
        shortDesc: 'Vitals & timed medication',
        tech: 'Real-Time Ingestion',
        status: 'Streams Active',
        icon: Activity,
        details: ['Continuous pulse & SpO2 input', 'Timed medication reminder triggers', 'Battery monitor & patrol telemetry', 'Normalized JSON payload format'],
      },
      {
        id: 'step-planner',
        stepNum: '02',
        name: 'care_planner Node',
        shortDesc: 'ROS2 orchestration package',
        tech: 'Python / ROS2 Humble',
        status: 'Lifecycle Active',
        icon: Bot,
        details: ['Custom ROS2 package in Python', 'Decoupled event serialization', 'Asynchronous action dispatching', 'Topic bridge to robot chassis'],
      },
      {
        id: 'step-jdm',
        stepNum: '03',
        name: 'GoRules JDM Tables',
        shortDesc: 'Auditable clinical decision matrices',
        tech: 'JDM Engine (< 2ms)',
        status: 'Deterministic',
        icon: Layers,
        details: ['Replaces non-deterministic Rete rules', 'Microsecond table evaluation', 'Auditable logs for medical staff', 'Explainable state transitions'],
      },
      {
        id: 'step-resolver',
        stepNum: '04',
        name: 'Priority Resolver',
        shortDesc: 'Life-safety action dispatcher',
        tech: 'Finite State Machine',
        status: 'Emergency Lock',
        icon: CheckCircle2,
        details: ['Medical Alert > Routine Navigation', 'Caregiver phone/SMS escalation', 'Configurable patient snooze matrix', 'Tested against 50 concurrent loads'],
      },
    ],
  },
  spectra: {
    id: 'spectra',
    tabName: 'SPECTRA EEG ML',
    projectId: 'proj-spectra-eeg',
    projectTitle: 'SPECTRA: Clinical EEG Signal Processing & ML',
    summaryProblem: 'Wearable EEG is corrupted by eye blinks, muscle artifacts, and 50Hz electrical hum.',
    summarySolution: 'Chained Butterworth filtering and PICARD-ICA isolate clean psychiatric emotion frequency bands.',
    metricBadge: '97.2% Accuracy',
    steps: [
      {
        id: 'step-eeg-acq',
        stepNum: '01',
        name: '14-Ch EEG Telemetry',
        shortDesc: 'Wireless electrode telemetry',
        tech: 'Emotiv Epoc X @ 256Hz',
        status: '21 Subjects',
        icon: Activity,
        details: ['14 wireless wet electrodes', '256 Hz continuous sampling', 'Auditory & visual stimuli protocol', 'Schizophrenia spectrum clinical cohort'],
      },
      {
        id: 'step-filtering',
        stepNum: '02',
        name: 'PICARD-ICA Filter',
        shortDesc: 'Artifact rejection pipeline',
        tech: 'Butterworth + Notch',
        status: 'SNR Maximized',
        icon: Shield,
        details: ['1-45 Hz Butterworth 4th-order bandpass', '50 Hz notch power-line attenuation', 'PICARD Independent Component Analysis', 'Removes ocular and cranial EMG noise'],
      },
      {
        id: 'step-spectral',
        stepNum: '03',
        name: 'Spectral Features',
        shortDesc: 'Power spectral density & FBA',
        tech: 'Welch PSD Bands',
        status: 'Vectors Built',
        icon: Layers,
        details: ['Theta (4-8Hz), Alpha (8-12Hz), Beta (12-30Hz)', 'Frontal Brain Asymmetry (FBA) ratio', 'Dimensionally reduced feature vectors', 'Stratified cross-validation prep'],
      },
      {
        id: 'step-classifier',
        stepNum: '04',
        name: 'MLP Classifier',
        shortDesc: 'Supervised psychiatric model',
        tech: 'Scikit-Learn MLP',
        status: 'IAS-19 Finalist',
        icon: FileCode2,
        details: ['97.2% test accuracy (MLP)', 'Random Forest benchmark: 95.6%', 'Best Student Paper Finalist (IAS-19)', 'Published in Springer LNNS series'],
      },
    ],
  },
};

export const ArchitectureFlow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mtls' | 'ros2' | 'spectra'>('mtls');
  const flow = FLOWS_DATA[activeTab];
  const [selectedStepId, setSelectedStepId] = useState<string>(flow.steps[0].id);

  const handleTabChange = (key: 'mtls' | 'ros2' | 'spectra') => {
    setActiveTab(key);
    setSelectedStepId(FLOWS_DATA[key].steps[0].id);
  };

  const selectedStep = flow.steps.find((s) => s.id === selectedStepId) || flow.steps[0];
  const StepIcon = selectedStep.icon;

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 shadow-xl">
      {/* 1. Header: Compact Tabs + Direct Project Link */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-800/80">
        <div role="tablist" className="flex items-center gap-1.5">
          {(['mtls', 'ros2', 'spectra'] as const).map((key) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(key)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-sky-500 text-zinc-950 font-bold shadow-sm'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {FLOWS_DATA[key].tabName}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold">
            {flow.metricBadge}
          </span>
          <Link
            to={`/projects/${flow.projectId}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-sky-500/30 hover:border-sky-400 text-xs font-mono text-sky-300 hover:text-white transition-colors"
          >
            <span>Project Details &amp; Logs</span>
            <ArrowRight className="h-3 w-3 text-sky-400" />
          </Link>
        </div>
      </div>

      {/* 2. Context: The Problem & The Hardened Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 text-xs mb-4">
        <div className="flex items-start gap-2">
          <span className="px-1.5 py-0.5 rounded bg-red-950/60 border border-red-900/50 text-[10px] font-mono text-red-400 font-bold shrink-0 mt-0.5">
            PROBLEM
          </span>
          <p className="text-zinc-300 text-xs leading-relaxed">
            {flow.summaryProblem}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-900/50 text-[10px] font-mono text-emerald-400 font-bold shrink-0 mt-0.5">
            SOLUTION
          </span>
          <p className="text-zinc-300 text-xs leading-relaxed">
            {flow.summarySolution}
          </p>
        </div>
      </div>

      {/* 3. The Visual Linear Flow Pipeline (Horizontal with real directional connectors) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 relative mb-3">
        {flow.steps.map((step, idx) => {
          const isSelected = step.id === selectedStep.id;
          const IconComponent = step.icon;
          return (
            <div key={step.id} className="relative flex items-center">
              <button
                onClick={() => setSelectedStepId(step.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-zinc-900 border-sky-500/90 shadow-md ring-1 ring-sky-500/40'
                    : 'bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="font-mono text-[10px] text-zinc-500 font-bold">
                    STEP {step.stepNum}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 font-semibold truncate">
                    {step.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`p-1.5 rounded ${
                      isSelected ? 'bg-sky-500 text-zinc-950' : 'bg-zinc-800 text-sky-400'
                    }`}
                  >
                    <IconComponent className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold text-white truncate leading-tight">
                    {step.name}
                  </span>
                </div>

                <div className="text-[11px] text-zinc-400 truncate">
                  {step.shortDesc}
                </div>
                <div className="font-mono text-[10px] text-sky-400/80 mt-1 truncate">
                  {step.tech}
                </div>
              </button>

              {/* Directional Connector Arrow between stages on desktop */}
              {idx < flow.steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-zinc-600 pointer-events-none">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Compact Step Inspector Strip */}
      <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <StepIcon className="h-4 w-4 text-sky-400 shrink-0" />
          <span className="font-mono text-zinc-400 shrink-0 font-semibold">
            {selectedStep.name}:
          </span>
          <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-zinc-300">
            {selectedStep.details.map((d, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="text-sky-400 select-none">▹</span>
                <span>{d}</span>
              </span>
            ))}
          </div>
        </div>

        <Link
          to={`/projects/${flow.projectId}`}
          className="font-mono text-[11px] text-sky-400 hover:text-sky-300 font-semibold shrink-0 inline-flex items-center gap-1"
        >
          <span>Deep Dive</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};
