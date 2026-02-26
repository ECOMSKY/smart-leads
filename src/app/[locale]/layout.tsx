import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { TranslationProvider } from "@/i18n/TranslationContext";
import { locales, type Locale } from "@/i18n/locales";
import type { Metadata } from "next";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t =
    params.locale === "en"
      ? (await import("@/i18n/translations/en.json")).default
      : (await import("@/i18n/translations/fr.json")).default;

  return {
    icons: { icon: "/favicon.svg" },
    title: t.metadata.title,
    description: t.metadata.description,
    metadataBase: new URL("https://smart-leads.fr"),
    openGraph: {
      title: t.metadata.ogTitle,
      description: t.metadata.ogDescription,
      url: `https://smart-leads.fr/${params.locale}`,
      siteName: "Smart Leads",
      locale: params.locale === "en" ? "en_US" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.metadata.ogTitle,
      description: t.metadata.ogDescription,
    },
    alternates: {
      canonical: `https://smart-leads.fr/${params.locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = (params.locale as Locale) || "fr";

  return (
    <html lang={locale} className={`${bricolage.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Smart Leads",
              description: locale === "en"
                ? "AI-powered lead qualification agency for Meta Ads. We filter your prospects in real time so the algorithm only optimizes for qualified profiles."
                : "Agence de qualification de leads par IA pour Meta Ads. Nous filtrons vos prospects en temps réel pour que l'algorithme n'optimise que sur les bons profils.",
              url: "https://smart-leads.fr",
              logo: "https://smart-leads.fr/favicon.svg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "229 rue Saint-Honoré",
                addressLocality: "Paris",
                postalCode: "75001",
                addressCountry: "FR",
              },
              areaServed: { "@type": "Country", name: "France" },
              serviceType: ["Lead Qualification", "Meta Ads Optimization", "Digital Advertising"],
              priceRange: "$$",
              sameAs: [],
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "Smart Leads",
                  url: "https://smart-leads.fr",
                  inLanguage: [locale === "en" ? "en-US" : "fr-FR"],
                },
                {
                  "@type": "Organization",
                  name: "ECOMSKY",
                  legalName: "ECOMSKY SARL",
                  url: "https://smart-leads.fr",
                  brand: { "@type": "Brand", name: "Smart Leads" },
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "229 rue Saint-Honoré",
                    addressLocality: "Paris",
                    postalCode: "75001",
                    addressCountry: "FR",
                  },
                  vatID: "FR05849401385",
                },
              ],
            }),
          }}
        />
        <script async src="https://ok-ko.io/tracking-helper.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WD8W3KNB');`,
          }}
        />
      </head>
      <body className="font-body antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WD8W3KNB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <TranslationProvider locale={locale}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
