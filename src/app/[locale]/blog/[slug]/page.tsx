import { notFound } from "next/navigation";
import frTranslations from "@/i18n/translations/fr.json";
import enTranslations from "@/i18n/translations/en.json";
import { getArticleBySlug, getArticlesByLocale } from "@/content/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const article = getArticleBySlug(params.slug, params.locale);
  if (!article) return { title: "Not found" };

  return {
    title: article.metaTitle || `${article.title} — Smart Leads`,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      url: `https://smart-leads.fr/${params.locale}/blog/${params.slug}`,
      siteName: "Smart Leads",
    },
    alternates: {
      canonical: `https://smart-leads.fr/${params.locale}/blog/${params.slug}`,
    },
  };
}

function renderMarkdown(body: string) {
  // Simple markdown-to-JSX renderer for headings, bold, lists, paragraphs
  const lines = body.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Image line ![alt](url)
    const imgMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      elements.push(
        <figure key={i} className="my-8">
          <img src={imgMatch[2]} alt={imgMatch[1]} className="rounded-lg max-w-full mx-auto" />
          {imgMatch[1] && <figcaption className="text-center text-txt-dim text-[13px] font-mono mt-2">{imgMatch[1]}</figcaption>}
        </figure>
      );
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-display text-[22px] md:text-[26px] font-bold text-txt mt-10 mb-4 leading-snug">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="font-display text-[18px] md:text-[20px] font-semibold text-txt mt-8 mb-3 leading-snug">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal pl-6 space-y-1.5 text-txt-muted text-[15px] leading-[1.75] font-body my-4">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: inlineMd(item) }} />
          ))}
        </ol>
      );
      continue;
    }

    // Unordered list
    if (line.trim().startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc pl-6 space-y-1.5 text-txt-muted text-[15px] leading-[1.75] font-body my-4">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: inlineMd(item) }} />
          ))}
        </ul>
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p
        key={i}
        className="text-txt-muted text-[15px] md:text-[16px] leading-[1.8] font-body my-4"
        dangerouslySetInnerHTML={{ __html: inlineMd(line) }}
      />
    );
    i++;
  }

  return elements;
}

function inlineMd(text: string): string {
  let result = text;
  // Images ![alt](url)
  result = result.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="rounded-lg my-6 max-w-full" />'
  );
  // Links [text](url)
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-emerald underline hover:text-emerald/80" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  // Bold **text**
  result = result.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="text-txt font-semibold">$1</strong>'
  );
  // Italic *text*
  result = result.replace(
    /\*(.+?)\*/g,
    '<em>$1</em>'
  );
  return result;
}

export default function BlogArticlePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const article = getArticleBySlug(params.slug, params.locale);
  if (!article) notFound();

  const t = params.locale === "en" ? enTranslations : frTranslations;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(
      params.locale === "en" ? "en-US" : "fr-FR",
      { year: "numeric", month: "long", day: "numeric" }
    );

  // Related articles (same locale, different slug)
  const related = getArticlesByLocale(params.locale)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-5 sm:px-8">
        {/* BlogPosting structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: article.title,
              description: article.excerpt,
              datePublished: article.date,
              dateModified: article.date,
              author: {
                "@type": "Organization",
                name: article.author,
                url: "https://smart-leads.fr",
              },
              publisher: {
                "@type": "Organization",
                name: "Smart Leads",
                url: "https://smart-leads.fr",
                logo: {
                  "@type": "ImageObject",
                  url: "https://smart-leads.fr/favicon.svg",
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://smart-leads.fr/${params.locale}/blog/${article.slug}`,
              },
              inLanguage: params.locale === "en" ? "en-US" : "fr-FR",
              keywords: article.tags.join(", "),
            }),
          }}
        />

        <article className="max-w-2xl mx-auto">
          {/* Back to blog */}
          <a
            href={`/${params.locale}/blog`}
            className="text-emerald text-sm font-mono hover:underline"
          >
            {t.blog.backToBlog}
          </a>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded text-[11px] font-mono text-emerald/70 bg-emerald/[0.08] border border-emerald/15"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-[28px] sm:text-[36px] md:text-[42px] font-bold text-txt mt-6 leading-[1.15]">
            {article.title}
          </h1>

          {/* Meta info */}
          <div className="mt-4 flex items-center gap-4 text-[13px] font-mono text-txt-dim">
            <span>{t.blog.publishedOn} {formatDate(article.date)}</span>
            <span className="w-1 h-1 rounded-full bg-txt-dim/30" />
            <span>{article.readTime} {t.blog.readTime}</span>
          </div>

          {/* Divider */}
          <div className="mt-8 mb-2 h-px bg-dark-border" />

          {/* Article body */}
          {article.body.trim().startsWith("<") ? (
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          ) : (
            <div>{renderMarkdown(article.body)}</div>
          )}

          {/* CTA */}
          <div className="mt-14 rounded-[16px] border border-emerald/20 bg-emerald-dim p-5 sm:p-6 md:p-8 text-center">
            <p className="font-display text-[20px] md:text-[24px] font-bold text-txt">
              {params.locale === "en"
                ? "Ready to qualify your leads?"
                : "Prêt à qualifier vos leads ?"}
            </p>
            <p className="mt-2 text-txt-muted text-[15px] font-body">
              {params.locale === "en"
                ? "Book a call and discover how Smart Leads can transform your Meta campaigns."
                : "Réservez un appel et découvrez comment Smart Leads peut transformer vos campagnes Meta."}
            </p>
            <a
              href={`/${params.locale}#formulaire`}
              className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm text-dark transition-all duration-300 hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg, #00E87B 0%, #059669 100%)" }}
            >
              {params.locale === "en" ? "Book a call" : "Réserver un appel"} <span>&rarr;</span>
            </a>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-[20px] font-bold text-txt mb-6">
                {t.blog.relatedArticles}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <a
                    key={r.slug}
                    href={`/${params.locale}/blog/${r.slug}`}
                    className="group rounded-[12px] border border-dark-border bg-dark-card p-5 card-glow transition-all duration-300 hover:border-emerald/30"
                  >
                    <h3 className="font-display text-[15px] font-bold text-txt leading-snug group-hover:text-emerald transition-colors">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-txt-muted text-[13px] leading-[1.6] font-body line-clamp-2">
                      {r.excerpt}
                    </p>
                    <span className="mt-3 inline-block text-emerald text-[12px] font-mono">
                      {t.blog.readMore} &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
