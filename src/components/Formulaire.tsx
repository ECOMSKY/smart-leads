"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "@/i18n/TranslationContext";

export default function Formulaire() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();

  useEffect(() => {
    if (!containerRef.current) return;

    const formUrl =
      locale === "en"
        ? "https://ok-ko.io/form/4301f75c-a901-4a41-ab3f-e80e25b6f528?embed=1"
        : "https://ok-ko.io/form/73f36bb7-e235-4e16-a19d-3e153b3c4236?embed=1";

    // Inject the OKKO embed script directly into the container
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://ok-ko.io/embed.js?v=2";
    script.setAttribute("data-form-url", formUrl);
    containerRef.current.appendChild(script);
  }, [locale]);

  return (
    <section id="formulaire" className="py-[60px] md:py-[100px] border-t border-dark-border">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <p className="fade-up font-mono text-xs tracking-[0.2em] uppercase text-emerald mb-6">
          {t.formulaire.sectionLabel}
        </p>

        <h2 className="fade-up font-display text-[28px] sm:text-[36px] md:text-[44px] font-bold text-txt leading-[1.15]">
          {t.formulaire.title}
        </h2>
        <p className="fade-up mt-4 text-txt-muted text-[17px] md:text-[19px] font-body leading-relaxed">
          {t.formulaire.subtitle}
        </p>
        <p className="fade-up mt-2 text-emerald text-sm italic font-body">
          {t.formulaire.spoiler}
        </p>

        {/* Conteneur OKKO Flow */}
        <div
          ref={containerRef}
          id="okko-form-container"
          className="fade-up mt-10 max-w-[700px] mx-auto min-h-[300px] md:min-h-[400px] overflow-hidden"
        />

        <p className="fade-up mt-8 text-sm text-txt-dim font-body">
          {t.formulaire.disclaimer}
        </p>
      </div>
    </section>
  );
}
