"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/TranslationContext";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-dark-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-display text-[15px] md:text-[16px] font-semibold text-txt pr-4 group-hover:text-emerald transition-colors">
          {q}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className={`shrink-0 text-txt-muted transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[400px] pb-6" : "max-h-0"
        }`}
      >
        <p className="text-txt-muted text-[14px] sm:text-[15px] leading-[1.7] font-body pr-4 sm:pr-8">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useTranslation();

  return (
    <section id="faq" className="py-[60px] md:py-[100px] border-t border-dark-border">
      {/* FAQ structured data for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: t.faq.items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <p className="fade-up font-mono text-xs tracking-[0.2em] uppercase text-emerald text-center mb-6">
          {t.faq.sectionLabel}
        </p>

        <h2 className="fade-up font-display text-[28px] sm:text-[36px] md:text-[44px] font-bold text-txt text-center leading-[1.15]">
          {t.faq.title}
        </h2>

        <div className="fade-up mt-12">
          {t.faq.items.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
