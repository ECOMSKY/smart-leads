"use client";

import { LogoMark } from "./Logo";
import { useTranslation } from "@/i18n/TranslationContext";

const rowData = [
  { classique: true, smart: true },
  { classique: false, smart: true },
  { classique: false, smart: true },
  { classique: false, smart: true },
  { classique: false, smart: true },
  { classique: "rarely", smart: true },
];

export default function Differenciateurs() {
  const { t } = useTranslation();

  return (
    <section className="relative py-[60px] md:py-[100px] grid-bg border-t border-dark-border">
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8">
        <p className="fade-up font-mono text-xs tracking-[0.2em] uppercase text-emerald text-center mb-6">
          {t.differenciateurs.sectionLabel}
        </p>

        <h2 className="fade-up font-display text-[28px] sm:text-[36px] md:text-[44px] font-bold text-txt text-center leading-[1.15]">
          {t.differenciateurs.title}
        </h2>
        <p className="fade-up mt-4 text-txt-muted text-[17px] md:text-[19px] text-center font-body leading-relaxed">
          {t.differenciateurs.subtitlePre}<br />
          {t.differenciateurs.subtitlePost}<span className="text-emerald-bright/80">{t.differenciateurs.subtitleHighlight}</span>.
        </p>

        {/* Table */}
        <div className="fade-up mt-14 md:mt-20 rounded-[18px] border border-dark-border bg-dark-card overflow-visible shadow-[0_4px_40px_rgba(0,0,0,0.3)]">
          <div>
            {/* Header */}
            <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_130px_170px] md:grid-cols-[1fr_170px_220px] border-b border-dark-border">
              <div className="p-2 sm:p-4 md:p-5" />
              <div className="p-2 sm:p-4 md:p-5 text-center bg-red-500/[0.04] border-l border-dark-border flex items-center justify-center">
                {/* Mobile: stacked */}
                <div className="flex flex-col items-center gap-1.5 sm:hidden py-1">
                  <span className="w-2 h-2 rounded-full bg-red-400/50" />
                  <span className="font-display text-[9px] font-semibold text-txt-muted leading-tight text-center">Agence<br />classique</span>
                </div>
                {/* Desktop: horizontal */}
                <div className="hidden sm:flex items-center justify-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                  <span className="font-display text-[13px] md:text-[15px] font-semibold text-txt-muted">
                    {t.differenciateurs.classicAgency}
                  </span>
                </div>
              </div>
              <div className="p-2 sm:p-4 md:p-5 bg-emerald/[0.06] border-l border-emerald/15 relative shadow-[inset_0_0_30px_rgba(16,185,129,0.04)] rounded-tr-[17px] flex items-center justify-center">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 rounded-full bg-emerald text-dark text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(16,185,129,0.3)] hidden sm:block">
                  {t.differenciateurs.recommended}
                </span>
                {/* Mobile: stacked */}
                <div className="flex flex-col items-center gap-1.5 sm:hidden py-1">
                  <LogoMark size={16} />
                  <span className="font-display text-[9px] font-bold text-emerald leading-tight text-center">Smart<br />Leads</span>
                </div>
                {/* Desktop: horizontal */}
                <div className="hidden sm:flex items-center justify-center gap-2">
                  <LogoMark size={16} />
                  <span className="font-display text-[14px] md:text-[16px] font-bold text-emerald">Smart Leads</span>
                </div>
              </div>
            </div>

            {/* Rows */}
            {rowData.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_130px_170px] md:grid-cols-[1fr_170px_220px] transition-colors duration-200 hover:bg-emerald/[0.02] ${
                  i < rowData.length - 1 ? "border-b border-dark-border" : ""
                }`}
              >
                <div className="p-3 sm:p-4 md:p-5 flex items-center">
                  <span className="text-[12px] sm:text-[13px] md:text-[15px] font-body text-txt-muted">
                    {t.differenciateurs.rows[i]}
                  </span>
                </div>
                <div className="p-3 sm:p-4 md:p-5 flex items-center justify-center bg-red-500/[0.04] border-l border-dark-border">
                  {row.classique === true ? (
                    <span className="text-txt-muted text-[16px] sm:text-[18px]">&#x2713;</span>
                  ) : row.classique === false ? (
                    <span className="text-red-400/60 text-[14px] sm:text-[16px] font-bold">&#x2717;</span>
                  ) : (
                    <span className="text-txt-dim text-[11px] sm:text-[13px] font-body italic">{t.differenciateurs.rarely}</span>
                  )}
                </div>
                <div className="p-3 sm:p-4 md:p-5 flex items-center justify-center bg-emerald/[0.06] border-l border-emerald/15 shadow-[inset_0_0_30px_rgba(16,185,129,0.04)]">
                  {row.smart === true ? (
                    <span className="text-emerald text-[16px] sm:text-[18px] drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]">&#x2713;</span>
                  ) : (
                    <span className="text-red-400/60 text-[14px] sm:text-[16px] font-bold">&#x2717;</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-up mt-14 flex justify-center">
          <a
            href="#formulaire"
            className="btn-light-border inline-flex items-center gap-2 px-8 py-4 rounded-lg text-txt font-medium transition-all duration-300 hover:text-emerald-bright"
          >
            {t.differenciateurs.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
