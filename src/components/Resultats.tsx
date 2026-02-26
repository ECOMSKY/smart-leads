"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/TranslationContext";

function formatNum(n: number, locale: string) {
  return Math.round(n).toLocaleString(locale === "en" ? "en-US" : "fr-FR");
}

const sliderClasses = `w-full h-2 rounded-full appearance-none cursor-pointer bg-dark-lighter
  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald
  [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(16,185,129,0.4)]
  [&::-webkit-slider-thumb]:cursor-pointer
  [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald [&::-moz-range-thumb]:border-0
  [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(16,185,129,0.4)]
  [&::-moz-range-thumb]:cursor-pointer`;

function sliderBg(value: number, min: number, max: number) {
  const pct = ((value - min) / (max - min)) * 100;
  return `linear-gradient(to right, #10B981 0%, #10B981 ${pct}%, #152420 ${pct}%, #152420 100%)`;
}

const statColors = ["text-emerald", "text-emerald-bright", "text-emerald"];

function Simulator() {
  const [budget, setBudget] = useState(3000);
  const [coutParLead, setCoutParLead] = useState(20);
  const { t, locale } = useTranslation();

  const totalLeads = Math.round(budget / coutParLead);

  // Aujourd'hui — 15% qualifiés
  const qualAuj = Math.round(totalLeads * 0.15);
  const coutAuj = qualAuj > 0 ? budget / qualAuj : 0;

  // Mois 1 — 40% qualifiés
  const qualM1 = Math.round(totalLeads * 0.40);
  const coutM1 = qualM1 > 0 ? budget / qualM1 : 0;

  // Mois 6 — 75% qualifiés
  const qualM6 = Math.round(totalLeads * 0.75);
  const coutM6 = qualM6 > 0 ? budget / qualM6 : 0;

  return (
    <div className="fade-up mt-16">
      <h3 className="font-display text-[22px] sm:text-[28px] md:text-[32px] font-bold text-txt text-center leading-[1.15]">
        {t.resultats.simulatorTitle}
      </h3>
      <p className="mt-3 text-txt-muted text-[16px] md:text-[17px] text-center font-body">
        {t.resultats.simulatorSubtitle}
      </p>

      {/* Sliders */}
      <div className="mt-10 max-w-md mx-auto space-y-8">
        {/* Slider 1 — Budget */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-txt-muted text-sm font-body">{t.resultats.budgetLabel}</span>
            <span className="font-display text-[22px] font-bold text-emerald">{formatNum(budget, locale)}&nbsp;&euro;</span>
          </div>
          <input
            type="range"
            min={1000}
            max={50000}
            step={500}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className={sliderClasses}
            style={{ background: sliderBg(budget, 1000, 50000) }}
          />
          <div className="flex justify-between text-[11px] font-mono text-txt-dim mt-1.5">
            <span>1 000 &euro;</span>
            <span>50 000 &euro;</span>
          </div>
        </div>

        {/* Slider 2 — Coût par lead */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-txt-muted text-sm font-body">{t.resultats.costPerLeadLabel}</span>
            <span className="font-display text-[22px] font-bold text-emerald">{coutParLead}&nbsp;&euro;</span>
          </div>
          <input
            type="range"
            min={5}
            max={100}
            step={1}
            value={coutParLead}
            onChange={(e) => setCoutParLead(Number(e.target.value))}
            className={sliderClasses}
            style={{ background: sliderBg(coutParLead, 5, 100) }}
          />
          <div className="flex justify-between text-[11px] font-mono text-txt-dim mt-1.5">
            <span>5 &euro;</span>
            <span>100 &euro;</span>
          </div>
        </div>
      </div>

      {/* Comparison columns */}
      <div className="mt-10 grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {/* Aujourd'hui */}
        <div className="rounded-card border border-red-500/20 bg-dark-card p-5 md:p-7">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
            <span className="font-display text-[14px] font-semibold text-txt-muted">{t.resultats.today}</span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-txt-dim text-[10px] font-mono uppercase tracking-wider">{t.resultats.leadsGenerated}</p>
              <p className="font-display text-[24px] font-bold text-txt-muted mt-1 leading-none">
                {formatNum(totalLeads, locale)}
              </p>
            </div>
            <div>
              <p className="text-txt-dim text-[10px] font-mono uppercase tracking-wider">{t.resultats.qualifiedLeads} (15%)</p>
              <p className="font-display text-[24px] font-bold text-red-400 mt-1 leading-none">
                {formatNum(qualAuj, locale)}
              </p>
            </div>
            <div className="pt-3 border-t border-dark-border">
              <p className="text-txt-dim text-[10px] font-mono uppercase tracking-wider">{t.resultats.costPerQualified}</p>
              <p className="font-display text-[28px] font-bold text-red-400 mt-1 leading-none">
                {formatNum(coutAuj, locale)}&nbsp;&euro;
              </p>
            </div>
          </div>
        </div>

        {/* Mois 1 */}
        <div className="rounded-card border border-emerald/15 bg-dark-card p-5 md:p-7">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald/50" />
            <span className="font-display text-[14px] font-semibold text-emerald/70">{t.resultats.month1}</span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-txt-dim text-[10px] font-mono uppercase tracking-wider">{t.resultats.leadsGenerated}</p>
              <p className="font-display text-[24px] font-bold text-txt mt-1 leading-none">
                {formatNum(totalLeads, locale)}
              </p>
            </div>
            <div>
              <p className="text-txt-dim text-[10px] font-mono uppercase tracking-wider">{t.resultats.qualifiedLeads} (40%)</p>
              <p className="font-display text-[24px] font-bold text-emerald/70 mt-1 leading-none">
                {formatNum(qualM1, locale)}
              </p>
            </div>
            <div className="pt-3 border-t border-dark-border">
              <p className="text-txt-dim text-[10px] font-mono uppercase tracking-wider">{t.resultats.costPerQualified}</p>
              <p className="font-display text-[28px] font-bold text-emerald/70 mt-1 leading-none">
                {formatNum(coutM1, locale)}&nbsp;&euro;
              </p>
            </div>
          </div>
        </div>

        {/* Mois 6 */}
        <div className="rounded-card border-2 border-emerald/35 bg-dark-card p-5 md:p-7 card-glow relative shadow-[0_0_30px_rgba(16,185,129,0.08)]">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald text-dark text-[10px] font-mono font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            {t.resultats.goalBadge}
          </span>
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald animate-pulse" />
            <span className="font-display text-[14px] font-semibold text-emerald">{t.resultats.month6}</span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-txt-dim text-[10px] font-mono uppercase tracking-wider">{t.resultats.leadsGenerated}</p>
              <p className="font-display text-[24px] font-bold text-txt mt-1 leading-none">
                {formatNum(totalLeads, locale)}
              </p>
            </div>
            <div>
              <p className="text-txt-dim text-[10px] font-mono uppercase tracking-wider">{t.resultats.qualifiedLeads} (75%)</p>
              <p className="font-display text-[24px] font-bold text-emerald mt-1 leading-none">
                {formatNum(qualM6, locale)}
              </p>
            </div>
            <div className="pt-3 border-t border-dark-border">
              <p className="text-txt-dim text-[10px] font-mono uppercase tracking-wider">{t.resultats.costPerQualified}</p>
              <p className="font-display text-[28px] font-bold text-emerald mt-1 leading-none">
                {formatNum(coutM6, locale)}&nbsp;&euro;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 max-w-5xl mx-auto rounded-card border border-emerald/20 bg-emerald-dim px-6 py-4 text-center">
        <p className="text-[15px] md:text-[16px] font-body text-txt">
          {t.resultats.summaryPre}<span className="text-emerald font-semibold">{t.resultats.summaryHighlight1}</span>{t.resultats.summaryMid}<span className="text-emerald font-semibold">{t.resultats.summaryHighlight2}</span>{t.resultats.summaryPost}
        </p>
      </div>

      {/* Note */}
      <p className="mt-6 text-center text-sm text-txt-dim italic max-w-2xl mx-auto font-body">
        {t.resultats.disclaimer}
      </p>
    </div>
  );
}

export default function Resultats() {
  const { t } = useTranslation();

  return (
    <section id="resultats" className="py-[60px] md:py-[100px] border-t border-dark-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="fade-up font-mono text-xs tracking-[0.2em] uppercase text-emerald text-center mb-6">
          {t.resultats.sectionLabel}
        </p>

        <h2 className="fade-up font-display text-[28px] sm:text-[36px] md:text-[44px] font-bold text-txt text-center leading-[1.15]">
          {t.resultats.title}
        </h2>

        <div className="mt-14 grid md:grid-cols-3 gap-5 stagger">
          {t.resultats.stats.map((stat, i) => (
            <div
              key={i}
              className="fade-up rounded-card border border-dark-border bg-dark-card p-6 sm:p-8 md:p-12 text-center card-glow"
            >
              <p className={`font-display text-[36px] sm:text-[48px] md:text-[56px] font-bold ${statColors[i]} leading-none`}>
                {stat.value}
              </p>
              <p className="mt-4 text-txt-muted text-[15px] font-body leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <Simulator />
      </div>
    </section>
  );
}
