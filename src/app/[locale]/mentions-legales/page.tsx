import frTranslations from "@/i18n/translations/fr.json";
import enTranslations from "@/i18n/translations/en.json";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = params.locale === "en" ? enTranslations : frTranslations;
  return { title: t.mentionsLegales.metaTitle };
}

export default function MentionsLegales({ params }: { params: { locale: string } }) {
  const t = params.locale === "en" ? enTranslations : frTranslations;
  const l = t.mentionsLegales;

  return (
    <main className="min-h-screen py-32 px-5 sm:px-8">
      <article className="max-w-2xl mx-auto font-body text-txt-muted text-[15px] leading-[1.8]">
        <a href={`/${params.locale}`} className="text-emerald text-sm font-mono hover:underline">
          {t.legal.backToHome}
        </a>

        <h1 className="font-display text-[32px] md:text-[40px] font-bold text-txt mt-8 mb-10">
          {l.title}
        </h1>

        <section className="space-y-8">
          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{l.editorTitle}</h2>
            <p>{l.editorText}</p>
            <ul className="mt-3 space-y-1">
              <li><span className="text-txt-dim">{l.companyName}</span> <span className="text-txt">{l.companyValue}</span></li>
              <li><span className="text-txt-dim">{l.legalForm}</span> {l.legalFormValue}</li>
              <li><span className="text-txt-dim">{l.address}</span> {l.addressValue}</li>
              <li><span className="text-txt-dim">{l.vat}</span> {l.vatValue}</li>
              <li><span className="text-txt-dim">{l.director}</span> {l.directorValue}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{l.hostingTitle}</h2>
            <p>{l.hostingText}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{l.ipTitle}</h2>
            <p>{l.ipText1}</p>
            <p className="mt-3">{l.ipText2}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{l.responsibilityTitle}</h2>
            <p>{l.responsibilityText}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{l.dataTitle}</h2>
            <p>
              {l.dataTextPre}
              <a href={`/${params.locale}/politique-de-confidentialite`} className="text-emerald hover:underline">
                {l.dataTextLink}
              </a>
              {l.dataTextPost}
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{l.contactTitle}</h2>
            <p>{l.contactText}</p>
          </div>
        </section>

        <p className="mt-12 text-xs text-txt-dim">{l.lastUpdated}</p>
      </article>
    </main>
  );
}
