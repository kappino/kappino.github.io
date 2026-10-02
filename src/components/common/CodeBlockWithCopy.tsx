import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockWithCopyProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

/**
 * CodeBlockWithCopy
 * Custom pre / code block wrapper with an interactive copy button,
 * subtle terminal header, and instant visual feedback.
 */
export const CodeBlockWithCopy: React.FC<CodeBlockWithCopyProps> = ({
  children,
  className = '',
  ...props
}) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = () => {
    if (!preRef.current) return;
    const text = preRef.current.innerText || '';
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  return (
    <div className="relative group my-5 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950/90 shadow-lg">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-zinc-900/80 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 select-none">
        <span className="flex items-center gap-1.5 text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-sky-400/60" />
          <span>code snippet</span>
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
          title="Copy code to clipboard"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-zinc-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre
        ref={preRef}
        className={`p-4 overflow-x-auto text-xs font-mono text-zinc-200 leading-relaxed ${className}`}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
};

export default CodeBlockWithCopy;
