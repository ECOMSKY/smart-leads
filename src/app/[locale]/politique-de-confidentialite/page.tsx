import frTranslations from "@/i18n/translations/fr.json";
import enTranslations from "@/i18n/translations/en.json";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = params.locale === "en" ? enTranslations : frTranslations;
  return { title: t.privacy.metaTitle };
}

export default function PolitiqueConfidentialite({ params }: { params: { locale: string } }) {
  const t = params.locale === "en" ? enTranslations : frTranslations;
  const p = t.privacy;

  return (
    <main className="min-h-screen py-32 px-5 sm:px-8">
      <article className="max-w-2xl mx-auto font-body text-txt-muted text-[15px] leading-[1.8]">
        <a href={`/${params.locale}`} className="text-emerald text-sm font-mono hover:underline">
          {t.legal.backToHome}
        </a>

        <h1 className="font-display text-[32px] md:text-[40px] font-bold text-txt mt-8 mb-10">
          {p.title}
        </h1>

        <section className="space-y-8">
          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{p.controllerTitle}</h2>
            <ul className="space-y-1">
              <li><span className="text-txt-dim">{p.company}</span> <span className="text-txt">{p.companyValue}</span></li>
              <li><span className="text-txt-dim">{p.addressLabel}</span> {p.addressValue}</li>
              <li><span className="text-txt-dim">{p.contactLabel}</span> {p.contactValue}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{p.dataCollectedTitle}</h2>
            <p>{p.dataCollectedText}</p>
            <ul className="mt-3 space-y-1 list-disc pl-5">
              {p.dataCollectedItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{p.purposeTitle}</h2>
            <p>{p.purposeText}</p>
            <ul className="mt-3 space-y-1 list-disc pl-5">
              {p.purposeItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{p.legalBasisTitle}</h2>
            <p>{p.legalBasisText}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{p.retentionTitle}</h2>
            <p>{p.retentionText}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{p.sharingTitle}</h2>
            <p>{p.sharingText}</p>
            <ul className="mt-3 space-y-1 list-disc pl-5">
              {p.sharingItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-3">{p.sharingNote}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{p.rightsTitle}</h2>
            <p>{p.rightsText}</p>
            <ul className="mt-3 space-y-1 list-disc pl-5">
              {p.rightsItems.map((item, i) => (
                <li key={i}><span className="text-txt">{item.name}</span> — {item.desc}</li>
              ))}
            </ul>
            <p className="mt-3">{p.rightsContact}</p>
            <p className="mt-3">{p.rightsCnil}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{p.cookiesTitle}</h2>
            <p>{p.cookiesText}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{p.securityTitle}</h2>
            <p>{p.securityText}</p>
          </div>
        </section>

        <p className="mt-12 text-xs text-txt-dim">{p.lastUpdated}</p>
      </article>
    </main>
  );
}
