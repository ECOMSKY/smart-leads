"use client";

import { useTranslation } from "@/i18n/TranslationContext";

const emojis = ["🏗️", "🔧", "⚖️", "🏦", "🦷", "🏠", "☀️", "🚗", "📚", "💻", "🏋️", "🧹", "📦", "🔐", "🌿", "💼"];

export default function Secteurs() {
  const { t } = useTranslation();

  return (
    <section className="py-[60px] md:py-[100px] border-t border-dark-border">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <p className="fade-up font-mono text-xs tracking-[0.2em] uppercase text-emerald text-center mb-6">
          {t.secteurs.sectionLabel}
        </p>

        <h2 className="fade-up font-display text-[28px] sm:text-[36px] md:text-[44px] font-bold text-txt text-center leading-[1.15]">
          {t.secteurs.title}
        </h2>
        <p className="fade-up mt-4 text-txt-muted text-[17px] md:text-[19px] text-center font-body">
          {t.secteurs.subtitle}
        </p>

        <div className="fade-up mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {t.secteurs.items.map((label, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-dark-border bg-dark-card px-4 py-3 transition-colors duration-200 hover:border-emerald/25 hover:bg-emerald/[0.03]"
            >
              <span className="text-[20px] leading-none">{emojis[i]}</span>
              <span className="text-[14px] font-body text-txt-muted">{label}</span>
            </div>
          ))}
        </div>

        <p className="fade-up mt-8 text-center text-sm text-txt-dim font-body max-w-2xl mx-auto">
          {t.secteurs.notFoundPre}<a href="#formulaire" className="text-emerald hover:text-emerald-bright transition-colors">{t.secteurs.notFoundLink}</a>{t.secteurs.notFoundPost}
        </p>
      </div>
    </section>
  );
}
