import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { orderedProjects, PROJECT_CATEGORIES } from '@/data/projects';
import { ProjectCard } from '@/components/cards/ProjectCard';
import type { Project } from '@/types';

type CategoryFilter = 'all' | Project['category'];
const categories = Object.entries(PROJECT_CATEGORIES) as [Project['category'], string][];
const filters: [CategoryFilter, string][] = [['all', 'All'], ...categories];

const gatewayFlow = [
  { title: 'ESP32 (C++ / mbedTLS)', detail: 'Verifies BLE payload HMAC-SHA256 before forwarding' },
  { title: 'Mosquitto (mTLS · TLS 1.3)', detail: 'Authenticates client X.509 cert & enforces topic ACLs' },
  { title: 'SQLite + Ganache Solidity', detail: 'Stores clinical readings & anchors SHA-256 digests' },
];

const stories = [
  {
    id: 'proj-proxmox-homelab',
    name: 'Proxmox VE 9.1 Homelab',
    title: 'How do 14 segmented workloads fit inside 16 GB of RAM?',
    detail: 'I repurposed a retired ASUS gaming laptop into a 24/7 Proxmox lab with Splunk SIEM, shared GTX 1070 CUDA AI, daily zstd snapshots, and zero open WAN ports.',
    flow: ['vmbr0 / vmbr1', '12 LXC + 2 VMs', 'Splunk & CUDA'],
    evidence: '14 Workloads · Zero Open Router Ports',
    action: 'Explore the homelab blueprint',
  },
  {
    id: 'proj-tnes',
    name: 'TNES · Hack the Route',
    title: 'Did that virtual cable actually break the Cisco network?',
    detail: 'I co-built the FastAPI gateway connecting a 3D Unreal Engine 5 cybersecurity simulator to Cisco Modeling Labs, verified with live link IDs and backend ping tests.',
    flow: ['Unreal Engine 5', 'FastAPI', 'Cisco CML'],
    evidence: '1st Place · The Big Hack 2026 (Consorzio Clara)',
    action: 'Follow the CML verification',
  },
  {
    id: 'proj-care-decision-planner',
    name: 'CARE Decision Planner',
    title: 'What should an assistive robot prioritize first?',
    detail: 'Built the Python ROS 2 care_planner from scratch (durable_rules → GoRules JDM) so medication reminders override cognitive exercises and escalate when missed.',
    flow: ['REST APIs', 'GoRules JDM', 'ROS 2 Coordinator'],
    evidence: 'PNRR Age-IT · with Protom Robotics',
    action: 'See how CARE arbitrates',
  },
  {
    id: 'proj-spectra-eeg',
    name: 'SPECTRA · Wearable EEG',
    title: 'What can 14-channel wearable EEG reveal after artifact cleaning?',
    detail: 'Compared three MATLAB/EEGLAB (PICARD-ICA) cleaning pipelines and benchmarked scikit-learn classifiers across 21 clinical participants.',
    flow: ['14-ch EEG', 'PICARD-ICA', 'scikit-learn'],
    evidence: 'First Author · Springer LNNS (IAS-19 Finalist)',
    action: 'Inspect the study & figures',
  },
];

export default function Projects() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const matches = category === 'all' ? orderedProjects : orderedProjects.filter((project) => project.category === category);

  return (
    <div className="site-shell editorial-page">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 sm:mb-8">
        <div>
          <h1 className="editorial-title">Projects</h1>
          <p className="editorial-intro">Hardware-close engineering across IoT security, self-hosted infrastructure, robotics, embedded RTOS, and clinical ML.</p>
        </div>
        <a href="#catalog" className="editorial-link min-h-10">Browse all {orderedProjects.length} projects <ArrowDown size={16} aria-hidden="true" /></a>
      </header>

      <section aria-label="Featured case studies" className="space-y-4">
        <article className="grid gap-6 overflow-hidden rounded-2xl border border-sky-300/25 bg-zinc-950/95 p-5 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="flex min-w-0 flex-col justify-center">
            <p className="editorial-label mb-3">Featured Case Study · IoT Security</p>
            <h2 className="max-w-[20ch] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">How does a broker know it can trust an ESP32?</h2>
            <p className="mt-4 max-w-[53ch] text-sm leading-relaxed text-zinc-300 sm:text-base">After spoofing CARE’s original BLE/MQTT pipeline with a rogue ESP32, I built HMAC-SHA256 verification firmware, mTLS (TLS 1.3) X.509 ACLs on Mosquitto, and a local Solidity digest audit.</p>
            <Link to="/projects/proj-mtls-iot-gateway" className="editorial-button editorial-button-primary mt-6 self-start">
              See how every trust boundary works <ArrowRight size={16} className="shrink-0" aria-hidden="true" />
            </Link>
          </div>
          <div className="min-w-0 rounded-xl border border-sky-300/15 bg-sky-950/25 p-4 sm:p-5">
            <ol aria-label="Telemetry path" className="divide-y divide-sky-300/15">
              {gatewayFlow.map(({ title, detail }, index) => (
                <li key={title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-sky-300/25 font-mono text-xs text-sky-200">{index + 1}</span>
                  <div>
                    <p className="font-mono text-sm font-semibold text-sky-100">{title}</p>
                    <p className="mt-0.5 text-sm text-zinc-400">{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 rounded-md border border-zinc-700 bg-zinc-950/75 px-3 py-2 font-mono text-xs leading-relaxed text-zinc-300">
              <span className="text-amber-200">Dropped</span> · Forged BLE HMAC or unauthorized X.509 topic
            </p>
          </div>
        </article>

        <div className="grid gap-4 md:grid-cols-2">
          {stories.map((story) => (
            <article key={story.id} className="editorial-card flex min-w-0 flex-col gap-4 p-5 sm:p-6">
              <div>
                <p className="editorial-label mb-2">{story.name}</p>
                <h2 className="text-xl font-semibold leading-snug tracking-tight text-white">{story.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{story.detail}</p>
              </div>
              <ol aria-label="Project flow" className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-zinc-800 bg-zinc-950/70 p-3 font-mono text-xs leading-relaxed text-sky-200">
                {story.flow.map((step, index) => (
                  <li key={step} className="inline-flex items-center gap-2">
                    {index > 0 && <ArrowRight size={12} className="shrink-0 text-zinc-500" aria-hidden="true" />}
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-auto">
                {story.evidence && <p className="mb-2 text-xs text-zinc-400">{story.evidence}</p>}
                <Link to={'/projects/' + story.id} className="editorial-link min-h-10">
                  {story.action} <ArrowUpRight size={16} className="shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="catalog" className="mt-12 scroll-mt-24 border-t border-zinc-800 pt-8 sm:mt-16" aria-labelledby="catalog-title">
        <h2 id="catalog-title" className="editorial-section-title mb-5">All projects</h2>
        <div aria-label="Filter projects by category" role="group" className="editorial-filters">
          {filters.map(([id, label]) => (
            <button key={id} type="button" aria-pressed={id === category} onClick={() => setCategory(id)} className="editorial-filter">
              {label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{matches.length} projects</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </section>
    </div>
  );
}
