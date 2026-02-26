"use client";

import { createContext, useContext, ReactNode } from "react";
import frTranslations from "./translations/fr.json";
import enTranslations from "./translations/en.json";
import type { Locale } from "./locales";

const translations: Record<Locale, typeof frTranslations> = {
  fr: frTranslations,
  en: enTranslations as typeof frTranslations,
};

type TranslationContextType = {
  t: typeof frTranslations;
  locale: Locale;
};

const TranslationContext = createContext<TranslationContextType>({
  t: frTranslations,
  locale: "fr",
});

export function TranslationProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const t = translations[locale];
  return (
    <TranslationContext.Provider value={{ t, locale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
