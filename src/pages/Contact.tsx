import { useState, useRef, useEffect } from 'react';
import { Mail, Copy, Check, Send, ShieldCheck, MapPin } from 'lucide-react';
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
  useEffect(() => () => { if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current); }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email).then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2500);
    }).catch(() => { /* clipboard access denied */ });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Safe client-side mailto trigger without exposing secrets
    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formState.subject || 'Portfolio Inquiry'
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
            Direct Communications
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Open for research partnerships, engineering consultations, and technical roles in Cybersecurity, Embedded IoT, and Robotics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Security Posture (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Availability Status Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Availability Status
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Available for full-time engineering appointments, systems security roles, and technical project collaborations.
              </p>
              <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-500 uppercase">Target Specializations:</div>
                <div className="text-xs text-slate-300 space-y-1 font-mono">
                  <div>▹ Cybersecurity &amp; Zero-Trust PKI</div>
                  <div>▹ Robotics &amp; ROS2 Development</div>
                  <div>▹ Embedded Systems (STM32 / ESP32)</div>
                </div>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Direct Channels
              </h3>

              {/* Email with copy */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="h-4 w-4 text-sky-400 flex-shrink-0" />
                  <span className="font-mono text-xs text-slate-300 truncate">
                    {personalInfo.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400">
                <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </div>

              {/* Socials */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-sky-400 transition-colors"
                >
                  <LinkedinIcon className="h-3.5 w-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Zero-Trust Notice */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
              <ShieldCheck className="h-4 w-4 text-sky-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-white block font-medium mb-0.5">Secure-by-Design Channel</strong>
                Direct communications adhere to Zero-Trust principles. No client-side secret tokens or tracking cookies are executed.
              </div>
            </div>
          </div>

          {/* Right Column: Secure Form (7 cols) */}
          <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-2">Send a Direct Inquiry</h2>
            <p className="text-xs text-slate-400 mb-6">
              Fill in the parameters below to draft an immediate message via your default mail client.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Your mail client has been invoked with the message parameters. Thank you!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-mono text-[11px] text-slate-400 uppercase mb-1">
                    Your Name / Organization *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alice Smith / Tech Labs"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-[11px] text-slate-400 uppercase mb-1">
                    Your Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block font-mono text-[11px] text-slate-400 uppercase mb-1">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="e.g. Research Collaboration / Engineering Role"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-[11px] text-slate-400 uppercase mb-1">
                  Message Description *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Briefly describe your proposal, project requirements, or opportunity..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-colors shadow-sm"
              >
                <Send className="h-4 w-4" />
                <span>Open in Mail Client ({personalInfo.email})</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
