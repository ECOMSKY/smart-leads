"use client";

import { useTranslation } from "@/i18n/TranslationContext";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center grid-bg perspective-grid overflow-hidden">
      {/* Glow spots */}
      <div className="glow-spot w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] top-[-10%] left-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center py-24 md:py-32">
        {/* Section label */}
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-emerald mb-8">
          {t.hero.sectionLabel}
        </p>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald/20 bg-emerald-dim mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
          <span className="text-emerald text-sm font-medium font-body">
            {t.hero.badge}
          </span>
        </div>

        {/* H1 */}
        <h1 className="font-display text-[32px] sm:text-[42px] md:text-[52px] font-bold leading-[1.12] text-txt max-w-[800px] mx-auto">
          {t.hero.titleMain}{" "}
          <span
            className="glitch-text text-emerald"
            data-text={t.hero.titleHighlight}
          >
            {t.hero.titleHighlight}
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="mt-8 text-[15px] md:text-[18px] leading-[2] text-txt-muted max-w-[780px] mx-auto font-body">
          {t.hero.subtitlePre}<span className="text-emerald-bright">{t.hero.subtitleHighlight1}</span>{t.hero.subtitleMid}<span className="text-emerald-bright">{t.hero.subtitleHighlight2}</span>{t.hero.subtitlePost}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href="#formulaire"
            className="btn-light-border inline-flex items-center gap-2 px-8 py-4 rounded-lg text-txt font-medium transition-all duration-300 hover:text-emerald-bright"
          >
            {t.hero.cta}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 w-full z-10 flex justify-center animate-bounce-subtle">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-emerald-bright animate-pulse" style={{ filter: "drop-shadow(0 0 10px rgba(52,211,153,0.6)) drop-shadow(0 0 20px rgba(16,185,129,0.3))" }}>
          <path d="M8 14l10 10 10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
