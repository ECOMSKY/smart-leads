import frTranslations from "@/i18n/translations/fr.json";
import enTranslations from "@/i18n/translations/en.json";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = params.locale === "en" ? enTranslations : frTranslations;
  return { title: t.cgv.metaTitle };
}

export default function CGV({ params }: { params: { locale: string } }) {
  const t = params.locale === "en" ? enTranslations : frTranslations;
  const c = t.cgv;

  return (
    <main className="min-h-screen py-32 px-5 sm:px-8">
      <article className="max-w-2xl mx-auto font-body text-txt-muted text-[15px] leading-[1.8]">
        <a href={`/${params.locale}`} className="text-emerald text-sm font-mono hover:underline">
          {t.legal.backToHome}
        </a>

        <h1 className="font-display text-[32px] md:text-[40px] font-bold text-txt mt-8 mb-10">
          {c.title}
        </h1>

        <section className="space-y-8">
          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{c.article1Title}</h2>
            <p>{c.article1Text}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{c.article2Title}</h2>
            <p>{c.article2Text}</p>
            <ul className="mt-3 space-y-1 list-disc pl-5">
              {c.article2Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{c.article3Title}</h2>
            <p>{c.article3Text}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{c.article4Title}</h2>
            <p>{c.article4Text1}</p>
            <p className="mt-3">{c.article4Vat}</p>
            <p className="mt-3">{c.article4Text2}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{c.article5Title}</h2>
            <p>{c.article5Text}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{c.article6Title}</h2>
            <p>{c.article6Text}</p>
            <ul className="mt-3 space-y-1 list-disc pl-5">
              {c.article6Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{c.article7Title}</h2>
            <p>{c.article7Text}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{c.article8Title}</h2>
            <p>{c.article8Text}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-txt mb-3">{c.article9Title}</h2>
            <p>{c.article9Text}</p>
          </div>
        </section>

        <p className="mt-12 text-xs text-txt-dim">{c.lastUpdated}</p>
      </article>
    </main>
  );
}
