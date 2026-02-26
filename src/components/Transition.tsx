"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "@/i18n/TranslationContext";

export default function Transition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const nodes = entry.target.querySelectorAll("[data-anim]");
            nodes.forEach((node) => {
              (node as HTMLElement).style.opacity = "1";
              (node as HTMLElement).style.transform = "translateY(0) scale(1)";
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="approche" className="relative py-[50px] md:py-[80px] border-t border-dark-border grid-bg overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">
        <div className="fade-up rounded-[14px] sm:rounded-[18px] border border-dark-border bg-dark-card p-4 sm:p-8 md:p-10 card-glow shadow-[0_4px_40px_rgba(0,0,0,0.3)]" ref={sectionRef}>
          {/* Badge */}
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-emerald/80 mb-6">
            {t.transition.sectionLabel}
          </p>

          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
            {/* Left — Copy */}
            <div className="flex-1">
              {/* Smart Leads pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald/20 bg-emerald-dim mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                <span className="text-emerald text-[13px] font-medium font-body">
                  {t.transition.pill}
                </span>
              </div>

              <div className="space-y-4 text-[16px] md:text-[17px] leading-[1.75] font-body">
                <p className="text-txt">
                  {t.transition.line1Pre}
                  <span className="text-emerald font-semibold">{t.transition.line1Highlight}</span>
                  {t.transition.line1Post}
                </p>
                <p className="text-txt-muted">
                  {t.transition.line2Pre}
                  <span className="text-emerald-bright/80">{t.transition.line2Highlight}</span>
                  {t.transition.line2Post}
                </p>
                <p className="text-txt-muted">
                  {t.transition.line3Pre}
                  <span className="text-emerald-bright/80">{t.transition.line3Highlight}</span>
                  {t.transition.line3Post}
                </p>
              </div>
            </div>

            {/* Right — Agency illustration: Signal filter diagram */}
            <div className="shrink-0 flex justify-center">
              <div className="flex flex-col items-center gap-4">
                {/* Main flow row */}
                <div className="flex items-center gap-3 md:gap-5">
                  {/* Incoming dots — mixed */}
                  <div className="flex flex-col items-center gap-2.5">
                    {[
                      { color: "bg-red-400/50 border-red-400/30", delay: 0 },
                      { color: "bg-emerald/50 border-emerald/30", delay: 80 },
                      { color: "bg-red-400/50 border-red-400/30", delay: 160 },
                      { color: "bg-emerald/50 border-emerald/30", delay: 240 },
                      { color: "bg-red-400/50 border-red-400/30", delay: 320 },
                    ].map((dot, i) => (
                      <div
                        key={i}
                        className="opacity-0 scale-75 transition-all duration-500"
                        style={{ transitionDelay: `${dot.delay}ms` }}
                        data-anim
                      >
                        <div className={`w-3 h-3 rounded-full border ${dot.color}`} />
                      </div>
                    ))}
                    <span className="text-[9px] font-mono text-txt-dim tracking-wide mt-1">{t.transition.incomingLabel}</span>
                  </div>

                  {/* Arrow in */}
                  <div
                    className="opacity-0 transition-all duration-500"
                    style={{ transitionDelay: "200ms" }}
                    data-anim
                  >
                    <svg width="30" height="12" viewBox="0 0 40 12" fill="none" className="sm:w-[40px]">
                      <path d="M0 6h32M28 2l4 4-4 4" stroke="rgba(100,116,139,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Central filter */}
                  <div
                    className="w-[70px] h-[90px] sm:w-[90px] sm:h-[110px] rounded-xl border border-emerald/30 bg-dark-lighter flex flex-col items-center justify-center gap-2 shadow-[0_0_24px_rgba(16,185,129,0.1)] opacity-0 scale-90 transition-all duration-600 relative"
                    style={{ transitionDelay: "300ms" }}
                    data-anim
                  >
                    <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
                      <path d="M4 6h20l-7 8v6l-6 3V14L4 6z" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[8px] font-mono text-emerald/60 tracking-widest uppercase leading-none">{t.transition.filterLabel}</span>
                    <div className="absolute inset-0 rounded-xl border border-emerald/15 animate-pulse" />
                  </div>

                  {/* Arrow out */}
                  <div
                    className="opacity-0 transition-all duration-500"
                    style={{ transitionDelay: "450ms" }}
                    data-anim
                  >
                    <svg width="30" height="12" viewBox="0 0 40 12" fill="none" className="sm:w-[40px]">
                      <path d="M0 6h32M28 2l4 4-4 4" stroke="rgba(16,185,129,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Outgoing dots — only green */}
                  <div className="flex flex-col items-center gap-3.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="opacity-0 scale-75 transition-all duration-500"
                        style={{ transitionDelay: `${550 + i * 100}ms` }}
                        data-anim
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald/70 border border-emerald/40 shadow-[0_0_10px_rgba(16,185,129,0.35)]" />
                      </div>
                    ))}
                    <span className="text-[9px] font-mono text-emerald/50 tracking-wide mt-1">{t.transition.outgoingLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
