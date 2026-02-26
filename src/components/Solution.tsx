"use client";

import { useTranslation } from "@/i18n/TranslationContext";

const icons = [
  (
    <svg key="icon-0" width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#10B981" strokeWidth="1.5">
      <rect x="10" y="6" width="28" height="36" rx="3" />
      <line x1="17" y1="16" x2="31" y2="16" />
      <line x1="17" y1="22" x2="31" y2="22" />
      <line x1="17" y1="28" x2="25" y2="28" />
      <path d="M17 34l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  (
    <svg key="icon-1" width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#10B981" strokeWidth="1.5">
      <rect x="8" y="8" width="32" height="32" rx="4" />
      <line x1="8" y1="18" x2="40" y2="18" />
      <line x1="8" y1="28" x2="40" y2="28" />
      <path d="M14 23l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 33l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="28" y1="32" x2="34" y2="36" strokeLinecap="round" />
      <line x1="34" y1="32" x2="28" y2="36" strokeLinecap="round" stroke="#EF4444" />
    </svg>
  ),
  (
    <svg key="icon-2" width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#10B981" strokeWidth="1.5">
      <circle cx="24" cy="24" r="16" />
      <circle cx="24" cy="24" r="10" />
      <circle cx="24" cy="24" r="4" fill="#10B981" stroke="none" />
      <line x1="24" y1="2" x2="24" y2="8" />
      <line x1="24" y1="40" x2="24" y2="46" />
      <line x1="2" y1="24" x2="8" y2="24" />
      <line x1="40" y1="24" x2="46" y2="24" />
    </svg>
  ),
  (
    <svg key="icon-3" width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#10B981" strokeWidth="1.5">
      <path d="M6 36l10-12 8 6 10-10 8-6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="42" cy="14" r="4" fill="#10B981" stroke="none" />
      <line x1="6" y1="42" x2="42" y2="42" strokeOpacity="0.3" />
      <path d="M6 42v-6" strokeOpacity="0.3" />
      <path d="M16 42v-10" strokeOpacity="0.3" />
      <path d="M26 42v-16" strokeOpacity="0.3" />
      <path d="M36 42v-22" strokeOpacity="0.3" />
    </svg>
  ),
];

export default function Solution() {
  const { t } = useTranslation();
  const steps = t.solution.steps;

  return (
    <section id="solution" className="relative py-[60px] md:py-[100px] grid-bg perspective-grid border-t border-dark-border overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <p className="fade-up font-mono text-xs tracking-[0.2em] uppercase text-emerald text-center mb-6">
          {t.solution.sectionLabel}
        </p>

        <h2 className="fade-up font-display text-[28px] sm:text-[36px] md:text-[44px] font-bold text-txt text-center leading-[1.15]">
          {t.solution.title}
          <span className="text-emerald glitch-text" data-text={t.solution.titleHighlight}>{t.solution.titleHighlight}</span>
          {t.solution.titleEnd}
        </h2>
        <p className="fade-up mt-4 text-txt-muted text-[17px] md:text-[19px] text-center font-body">
          {t.solution.subtitle}
        </p>

        {/* Steps grid — 4 colonnes desktop */}
        <div className="fade-up mt-16 md:mt-20">
          {/* Desktop layout — 7 columns: card | line | card | line | card | line | card */}
          <div className="hidden lg:grid max-w-4xl mx-auto" style={{ gridTemplateColumns: "130px 1fr 130px 1fr 130px 1fr 130px", justifyItems: "center" }}>
            {/* Row 1: Icon cards + connectors */}
            {steps.map((step, i) => (
              <div key={`icon-${i}`} className="contents">
                <div className="flex justify-center">
                  <div className="relative w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] rounded-xl border border-emerald/25 bg-dark-card flex items-center justify-center card-glow">
                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-md bg-emerald text-dark text-[13px] font-bold font-mono flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                      {step.num}
                    </span>
                    {i === 1 && (
                      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald/15 border border-emerald/30 text-emerald">
                          OK
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/10 border border-red-500/25 text-red-400">
                          KO
                        </span>
                      </div>
                    )}
                    {icons[i]}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex items-center w-full">
                    <div className="flex-1 h-px bg-emerald/30" />
                    <div className="w-2 h-2 rounded-full border border-emerald/40 bg-dark shrink-0 mx-1" />
                    <div className="flex-1 h-px bg-emerald/30" />
                  </div>
                )}
              </div>
            ))}

            {/* Row 2: Text blocks — span same columns, connectors get empty div */}
            {steps.map((step, i) => (
              <div key={`text-${i}`} className="contents">
                <div className="flex flex-col items-center text-center pt-6 w-[220px] justify-self-center">
                  <h3 className="font-display text-[16px] font-bold text-txt leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-txt-muted text-[15px] font-body">
                    {step.subtitle}
                  </p>
                  <p className="mt-3 text-txt-dim text-[13px] leading-[1.65] font-body">
                    {step.description}
                  </p>
                </div>
                {i < steps.length - 1 && <div />}
              </div>
            ))}
          </div>

          {/* Mobile layout */}
          <div className="flex flex-col items-center gap-8 lg:hidden">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center w-full">
                <div className="relative w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] rounded-xl border border-emerald/25 bg-dark-card flex items-center justify-center card-glow">
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-md bg-emerald text-dark text-[13px] font-bold font-mono flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                    {step.num}
                  </span>
                  {i === 1 && (
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald/15 border border-emerald/30 text-emerald">
                        OK
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/10 border border-red-500/25 text-red-400">
                        KO
                      </span>
                    </div>
                  )}
                  {icons[i]}
                </div>
                <h3 className="mt-6 font-display text-[16px] font-bold text-txt leading-snug">
                  {step.title}
                </h3>
                <p className="text-txt-muted text-[15px] font-body">
                  {step.subtitle}
                </p>
                <p className="mt-3 text-txt-dim text-[13px] leading-[1.65] font-body max-w-[210px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Callout */}
        <div className="fade-up mt-14 max-w-2xl mx-auto rounded-lg border border-emerald/20 bg-emerald-dim px-6 py-4 flex items-center justify-center gap-3">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
            <circle cx="10" cy="10" r="9" stroke="#10B981" strokeWidth="1.5" />
            <path d="M6 10l3 3 5-5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-txt text-[15px] font-body">
            {t.solution.callout}
            <span className="text-emerald font-semibold">{t.solution.calloutHighlight}</span>
          </p>
        </div>

        <div className="fade-up mt-14 flex justify-center">
          <a
            href="#formulaire"
            className="btn-light-border inline-flex items-center gap-2 px-8 py-4 rounded-lg text-txt font-medium transition-all duration-300 hover:text-emerald-bright"
          >
            {t.solution.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
