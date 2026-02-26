import { NextRequest, NextResponse } from "next/server";
import { readArticles, writeArticles, generateId, slugify } from "@/lib/articles";
import { verifyAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const articles = readArticles();
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  if (!verifyAuth(req.headers.get("authorization"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const articles = readArticles();

  const newArticle = {
    id: generateId(data.locale || "fr"),
    slug: data.slug || slugify(data.title),
    locale: data.locale || "fr",
    title: data.title || "",
    excerpt: data.excerpt || "",
    date: data.date || new Date().toISOString().split("T")[0],
    author: data.author || "Smart Leads",
    readTime: data.readTime || "3 min",
    tags: data.tags || [],
    body: data.body || "",
  };

  articles.push(newArticle);
  writeArticles(articles);

  return NextResponse.json(newArticle, { status: 201 });
}
