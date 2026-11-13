import { useState, useRef, useEffect } from 'react';
import { Mail, Copy, Check, Send, ShieldCheck, MapPin, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/common/Icons';
import { personalInfo } from '@/data/personal';

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email).then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formState.subject || 'Engineering Inquiry'
    )}&body=${encodeURIComponent(
      `From: ${formState.name} (${formState.email})\n\nMessage:\n${formState.message}`
    )}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-sky-400 font-semibold mb-2 block">
            Direct Communications &amp; Inquiries
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
            Open for R&amp;D opportunities, systems security engineering, robotics research, and technical collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Channels & Cryptographic Posture (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Availability Status Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Status &amp; Availability
                </h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                Available for engineering appointments, technical consultations, and research collaborations.
              </p>
              <div className="space-y-1.5 pt-3 border-t border-zinc-800/80">
                <div className="text-[11px] font-mono text-zinc-500 uppercase">Core Focus Areas:</div>
                <div className="text-xs text-zinc-300 space-y-1 font-mono">
                  <div>▹ Embedded Security &amp; Applied PKI (mTLS v1.3)</div>
                  <div>▹ Robotics &amp; Deterministic Runtimes (ROS2 / C++)</div>
                  <div>▹ Systems Programming, Daemons &amp; Concurrency (POSIX C)</div>
                </div>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Direct Channels
              </h3>

              {/* Email with copy */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="h-4 w-4 text-sky-400 flex-shrink-0" />
                  <span className="font-mono text-xs text-zinc-300 truncate">
                    {personalInfo.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 font-mono">
                <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>{personalInfo.location} · Remote &amp; Hybrid</span>
              </div>

              {/* Socials */}
              <div className="pt-1 flex items-center gap-3">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-colors font-mono"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-sky-400 transition-colors font-mono"
                >
                  <LinkedinIcon className="h-3.5 w-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Security & Verification Notice */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Security &amp; Verification</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Signed Commits
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Source code repositories, firmware releases, and git commits are cryptographically signed. Technical communications or inquiries regarding testbed access can be routed via direct email.
              </p>

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span className="text-[11px] font-mono text-zinc-500">Transmission Security</span>
                <span className="text-emerald-400 font-mono text-[11px]">TLS 1.3 Strict</span>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-400 flex items-start gap-3">
              <ShieldCheck className="h-4 w-4 text-sky-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-white block font-medium mb-0.5">Privacy-First Architecture</strong>
                This site operates with strict client-side privacy: zero analytics pixels, zero third-party tracking cookies, and no telemetry trackers.
              </div>
            </div>
          </div>

          {/* Right Column: Direct Mail Composer (7 cols) */}
          <div className="lg:col-span-7 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider mb-2">
              <Terminal className="h-3.5 w-3.5" />
              <span>Direct Dispatch Composer</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Send an Engineering Inquiry</h2>
            <p className="text-xs text-zinc-400 mb-6">
              Compose parameters below to open a pre-filled draft in your default email client.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Email client triggered with parameters. Looking forward to connecting!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-mono text-[11px] text-zinc-400 uppercase mb-1">
                    Your Name / Organization *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Dr. Jane Doe / Lab Name"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-[11px] text-zinc-400 uppercase mb-1">
                    Your Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane.doe@organization.org"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block font-mono text-[11px] text-zinc-400 uppercase mb-1">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="e.g. Research Collaboration / Systems Security Role"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-[11px] text-zinc-400 uppercase mb-1">
                  Message Details *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Briefly describe project requirements, research scope, or technical agenda..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-sky-500 transition-colors font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold text-sm transition-colors shadow-sm"
              >
                <Send className="h-4 w-4" />
                <span>Send via Mail Client ({personalInfo.email})</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
