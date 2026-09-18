import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'outline';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  size = 'sm',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  const variantClasses = {
    default: 'bg-slate-800/80 text-slate-300 border border-slate-700/60',
    accent: 'bg-sky-500/10 text-sky-400 border border-sky-500/30 font-medium',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium',
    warning: 'bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium',
    outline: 'bg-transparent text-slate-400 border border-slate-700',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono rounded-md ${sizeClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
