"use client";

import { LogoFull } from "./Logo";
import { useTranslation } from "@/i18n/TranslationContext";

export default function Footer() {
  const { t, locale } = useTranslation();

  return (
    <footer className="border-t border-dark-border py-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Gauche */}
          <LogoFull size={30} />

          {/* Droite */}
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-5 text-sm font-body text-txt-muted">
            <a href={`/${locale}/mentions-legales`} className="py-2 hover:text-emerald transition-colors">
              {t.footer.legalNotice}
            </a>
            <a href={`/${locale}/cgv`} className="py-2 hover:text-emerald transition-colors">
              {t.footer.terms}
            </a>
            <a href={`/${locale}/politique-de-confidentialite`} className="py-2 hover:text-emerald transition-colors">
              {t.footer.privacy}
            </a>
            <a href={`/${locale}/blog`} className="py-2 hover:text-emerald transition-colors">
              Blog
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-dark-border text-center text-sm text-txt-dim font-mono">
          {t.footer.copyright}
        </div>

        <p className="mt-4 text-center text-[11px] text-txt-dim/50 font-body leading-relaxed max-w-2xl mx-auto">
          {t.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
