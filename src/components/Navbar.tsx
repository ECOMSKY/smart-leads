"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogoFull } from "./Logo";
import { useTranslation } from "@/i18n/TranslationContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t, locale } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function switchLocale() {
    const newLocale = locale === "fr" ? "en" : "fr";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/80 backdrop-blur-xl border-b border-dark-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-[72px]">
        <a href={`/${locale}`} className="group">
          <LogoFull size={30} />
        </a>

        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#approche" className="text-sm text-txt-muted hover:text-emerald transition-colors">
            {t.navbar.approach}
          </a>
          <a href="#solution" className="text-sm text-txt-muted hover:text-emerald transition-colors">
            {t.navbar.howItWorks}
          </a>
          <a href="#resultats" className="text-sm text-txt-muted hover:text-emerald transition-colors">
            {t.navbar.results}
          </a>
          <a href="#faq" className="text-sm text-txt-muted hover:text-emerald transition-colors">
            {t.navbar.faq}
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language switcher */}
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-md border border-dark-border text-[13px] font-mono text-txt-muted hover:text-emerald hover:border-emerald/30 transition-colors"
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>

          {/* CTA */}
          <a
            href="#formulaire"
            className="btn-glow inline-flex items-center gap-1.5 px-3 sm:px-5 py-2.5 min-h-[44px] rounded-lg font-semibold text-[11px] sm:text-sm text-dark transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #00E87B 0%, #059669 100%)" }}
          >
            {t.navbar.cta} <span className="ml-0.5">&rarr;</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
