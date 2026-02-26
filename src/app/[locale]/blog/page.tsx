import frTranslations from "@/i18n/translations/fr.json";
import enTranslations from "@/i18n/translations/en.json";
import { getArticlesByLocale } from "@/content/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = params.locale === "en" ? enTranslations : frTranslations;
  return {
    title: t.blog.metaTitle,
    description: t.blog.metaDescription,
    alternates: {
      canonical: `https://smart-leads.fr/${params.locale}/blog`,
      languages: { fr: "/fr/blog", en: "/en/blog" },
    },
  };
}

export default function BlogPage({ params }: { params: { locale: string } }) {
  const t = params.locale === "en" ? enTranslations : frTranslations;
  const articles = getArticlesByLocale(params.locale);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(
      params.locale === "en" ? "en-US" : "fr-FR",
      { year: "numeric", month: "long", day: "numeric" }
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-emerald text-center mb-6">
            {t.blog.sectionLabel}
          </p>

          <h1 className="font-display text-[32px] sm:text-[40px] md:text-[48px] font-bold text-txt text-center leading-[1.12]">
            {t.blog.title}
          </h1>
          <p className="mt-4 text-txt-muted text-[17px] md:text-[19px] text-center font-body max-w-2xl mx-auto">
            {t.blog.subtitle}
          </p>

          {/* Blog structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Blog",
                name: "Smart Leads Blog",
                url: `https://smart-leads.fr/${params.locale}/blog`,
                description: t.blog.metaDescription,
                publisher: {
                  "@type": "Organization",
                  name: "Smart Leads",
                  url: "https://smart-leads.fr",
                },
                blogPost: articles.map((a) => ({
                  "@type": "BlogPosting",
                  headline: a.title,
                  description: a.excerpt,
                  datePublished: a.date,
                  author: { "@type": "Organization", name: a.author },
                  url: `https://smart-leads.fr/${params.locale}/blog/${a.slug}`,
                })),
              }),
            }}
          />

          {/* Article grid */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <a
                key={article.slug}
                href={`/${params.locale}/blog/${article.slug}`}
                className="group rounded-[16px] border border-dark-border bg-dark-card overflow-hidden card-glow transition-all duration-300 hover:border-emerald/30"
              >
                {/* Gradient placeholder thumbnail */}
                <div className="h-[160px] bg-gradient-to-br from-emerald/10 via-dark-lighter to-dark-card flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-emerald/30">
                    <rect x="4" y="4" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="10" y1="14" x2="30" y2="14" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="10" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="10" y1="26" x2="22" y2="26" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>

                <div className="p-5">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald/70 bg-emerald/[0.08] border border-emerald/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-display text-[17px] font-bold text-txt leading-snug group-hover:text-emerald transition-colors">
                    {article.title}
                  </h2>

                  <p className="mt-2 text-txt-muted text-[14px] leading-[1.6] font-body line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-[12px] font-mono text-txt-dim">
                    <span>{formatDate(article.date)}</span>
                    <span>{article.readTime} {t.blog.readTime}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
