import type { MetadataRoute } from "next";
import { locales } from "@/i18n/locales";
import { getAllSlugs } from "@/content/blog";

const baseUrl = "https://smart-leads.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/cgv", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/politique-de-confidentialite", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page.path}`])
          ),
        },
      });
    }
  }

  // Blog articles
  const allSlugs = getAllSlugs();
  for (const { slug, locale } of allSlugs) {
    entries.push({
      url: `${baseUrl}/${locale}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  return entries;
}
