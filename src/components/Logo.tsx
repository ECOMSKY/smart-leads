/**
 * Smart Leads brand mark — abstract "signal filter" icon.
 * Three vertical bars representing incoming signals, with the rightmost
 * bar highlighted in emerald to symbolize the qualified lead that passes through.
 * A subtle diagonal slash across the first two bars suggests filtering / rejection.
 */
export function LogoMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-glow" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <linearGradient id="logo-dim" x1="0" y1="0" x2="0" y2="32">
          <stop offset="0%" stopColor="#64748B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#64748B" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Background rounded square */}
      <rect x="0" y="0" width="32" height="32" rx="8" fill="#0F1614" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="url(#logo-glow)" strokeOpacity="0.25" />

      {/* Bar 1 — dim (rejected signal) */}
      <rect x="7" y="10" width="3.5" height="12" rx="1.75" fill="url(#logo-dim)" />

      {/* Bar 2 — dim (rejected signal) */}
      <rect x="14.25" y="7" width="3.5" height="18" rx="1.75" fill="url(#logo-dim)" />

      {/* Bar 3 — bright emerald (qualified signal) */}
      <rect x="21.5" y="4" width="3.5" height="24" rx="1.75" fill="url(#logo-glow)" />

      {/* Diagonal filter slash across bars 1 & 2 */}
      <line x1="5.5" y1="24" x2="19" y2="5.5" stroke="#EF4444" strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function LogoFull({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={size} />
      <span className="font-display text-[17px] font-bold text-txt leading-none">
        Smart Leads
      </span>
    </div>
  );
}
