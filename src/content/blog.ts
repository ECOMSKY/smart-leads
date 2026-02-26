import { readArticles, type StoredArticle } from "@/lib/articles";

export type BlogArticle = StoredArticle;

export function getArticlesByLocale(locale: string): BlogArticle[] {
  return readArticles()
    .filter((a) => a.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string, locale: string): BlogArticle | undefined {
  return readArticles().find((a) => a.slug === slug && a.locale === locale);
}

export function getAllSlugs(): { slug: string; locale: string }[] {
  return readArticles().map((a) => ({ slug: a.slug, locale: a.locale }));
}
