"use client";

import { useTranslation } from "@/i18n/TranslationContext";

function FunnelArrow() {
  return (
    <div className="flex flex-col items-center py-2">
      <div className="w-px h-6 bg-gradient-to-b from-emerald/30 to-emerald/10" />
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-emerald/30 -mt-px">
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function Probleme() {
  const { t } = useTranslation();

  return (
    <section id="probleme" className="relative py-[60px] md:py-[100px] border-t border-dark-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="fade-up font-mono text-xs tracking-[0.2em] uppercase text-emerald text-center mb-6">
          {t.probleme.sectionLabel}
        </p>

        <h2 className="fade-up font-display text-[28px] sm:text-[36px] md:text-[44px] font-bold text-txt text-center max-w-3xl mx-auto leading-[1.15]">
          {t.probleme.titleLine1}<br />{t.probleme.titleLine2}<br />
          <span className="text-red-400">{t.probleme.titleLine3}</span>
        </h2>

        <div className="mt-14 md:mt-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Narrative flow */}
          <div className="fade-up">
            <h3 className="font-display text-[18px] md:text-[20px] font-semibold text-txt mb-6 text-center">
              {t.probleme.leftTitle}
            </h3>
            {/* Step 1 */}
            <div className="rounded-card border border-dark-border bg-dark-card p-3 sm:p-5 card-glow">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-dim border border-emerald/20 flex items-center justify-center shrink-0 text-[10px] text-emerald">&#x2713;</span>
                <div className="text-[14px] sm:text-[15px] leading-[1.7] font-body">
                  <p className="text-txt">
                    {t.probleme.card1Text}<br />
                    <span className="text-txt-muted">{t.probleme.card1Sub}</span>
                  </p>
                  <p className="text-txt-muted mt-2">
                    {t.probleme.card1Warning}<span className="text-red-400">{t.probleme.card1WarningHighlight}</span>.
                  </p>
                  <p className="text-txt-muted mt-1">
                    {t.probleme.card1Detail}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center py-1.5">
              <svg width="12" height="18" viewBox="0 0 12 18" fill="none" className="text-red-400/40">
                <path d="M6 0v14M2 11l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="rounded-card border border-dark-border bg-dark-card p-3 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 text-[10px] text-red-400">&#x2717;</span>
                <p className="text-txt-muted text-[14px] sm:text-[15px] leading-[1.7] font-body">
                  {t.probleme.card2Text}<span className="text-red-400">{t.probleme.card2Highlight1}</span>{t.probleme.card2Mid}<span className="text-red-400">{t.probleme.card2Highlight2}</span>{t.probleme.card2End}
                </p>
              </div>
            </div>

            <div className="flex justify-center py-1.5">
              <svg width="12" height="18" viewBox="0 0 12 18" fill="none" className="text-red-400/40">
                <path d="M6 0v14M2 11l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Conclusion */}
            <div className="rounded-card border border-red-500/20 bg-red-500/[0.05] p-3 sm:p-5">
              <p className="text-[16px] md:text-[17px] font-medium text-txt leading-[1.6] font-body text-center">
                {t.probleme.conclusionLine1}<span className="text-red-400">{t.probleme.conclusionHighlight}</span>.<br />
                {t.probleme.conclusionLine2}
                <span className="text-red-400 font-bold underline decoration-red-400/40 underline-offset-4">
                  {t.probleme.conclusionBold}
                </span>.
              </p>
            </div>
          </div>

          {/* Funnel data vertical */}
          <div className="fade-up flex flex-col items-center">
            <h3 className="font-display text-[18px] md:text-[20px] font-semibold text-txt mb-6 text-center">
              {t.probleme.rightTitle}
            </h3>
            <div className="w-full max-w-xs rounded-card border border-emerald/20 bg-dark-card px-5 py-4 text-center card-glow">
              <p className="text-txt-muted text-[10px] font-mono uppercase tracking-[0.15em]">
                {t.probleme.leadsGenerated}
              </p>
              <p className="font-display text-[24px] sm:text-[32px] font-bold text-txt mt-1.5 leading-none">247</p>
            </div>

            <FunnelArrow />

            <div className="w-full max-w-xs rounded-card border border-red-500/20 bg-dark-card px-5 py-4 text-center card-glow">
              <p className="text-txt-muted text-[10px] font-mono uppercase tracking-[0.15em]">
                {t.probleme.leadsProfitable}
              </p>
              <div className="flex items-baseline justify-center gap-2 mt-1.5">
                <p className="font-display text-[24px] sm:text-[32px] font-bold text-red-400 leading-none">38</p>
                <span className="text-red-400/50 text-sm font-mono">(15%)</span>
              </div>
              <div className="mt-3 pt-3 border-t border-dark-border">
                <p className="text-[12px] font-body font-medium">
                  <span className="text-red-400">85%</span>
                  <span className="text-txt-muted/60">{t.probleme.leadsNeverClients}</span>
                </p>
              </div>
            </div>

            <FunnelArrow />

            <div className="w-full max-w-xs rounded-card border border-red-500/20 bg-dark-card px-5 py-4 card-glow">
              <p className="text-txt-muted text-[10px] font-mono uppercase tracking-[0.15em] text-center mb-3">
                {t.probleme.costPerProspect}
              </p>
              <div className="flex items-stretch gap-2.5">
                {/* Coût apparent */}
                <div className="flex-1 rounded-lg bg-dark-lighter border border-dark-border px-3 py-3 text-center">
                  <p className="text-txt-dim text-[9px] font-mono uppercase tracking-wider">{t.probleme.apparentCost}</p>
                  <p className="font-display text-[24px] font-bold text-txt-muted mt-1 leading-none">20&nbsp;&euro;</p>
                  <p className="text-txt-dim text-[10px] mt-1 font-body">{t.probleme.perFormFilled}</p>
                </div>
                {/* Coût réel */}
                <div className="flex-1 rounded-lg bg-red-500/[0.05] border border-red-500/20 px-3 py-3 text-center">
                  <p className="text-txt-dim text-[9px] font-mono uppercase tracking-wider">{t.probleme.realCost}</p>
                  <p className="font-display text-[24px] font-bold text-red-400 mt-1 leading-none">150&nbsp;&euro;</p>
                  <p className="text-txt-dim text-[10px] mt-1 font-body">{t.probleme.perQualifiedProspect}<span className="text-red-400">{t.probleme.qualified}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
