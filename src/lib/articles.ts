import fs from "fs";
import path from "path";

export type StoredArticle = {
  id: string;
  slug: string;
  locale: "fr" | "en";
  title: string;
  excerpt: string;
  metaTitle?: string;
  metaDescription?: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  body: string;
};

const DATA_PATH = path.join(process.cwd(), "data", "articles.json");

function ensureDataDir() {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, "[]", "utf-8");
  }
}

export function readArticles(): StoredArticle[] {
  ensureDataDir();
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export function writeArticles(articles: StoredArticle[]) {
  ensureDataDir();
  fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), "utf-8");
}

export function generateId(locale: string): string {
  return `${locale}-${Date.now().toString(36)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
