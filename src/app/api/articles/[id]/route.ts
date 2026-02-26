import { NextRequest, NextResponse } from "next/server";
import { readArticles, writeArticles, slugify } from "@/lib/articles";
import { verifyAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!verifyAuth(req.headers.get("authorization"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const articles = readArticles();
  const index = articles.findIndex((a) => a.id === params.id);

  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  articles[index] = {
    ...articles[index],
    ...data,
    slug: data.slug || slugify(data.title || articles[index].title),
    id: articles[index].id,
  };

  writeArticles(articles);
  return NextResponse.json(articles[index]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!verifyAuth(req.headers.get("authorization"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const articles = readArticles();
  const filtered = articles.filter((a) => a.id !== params.id);

  if (filtered.length === articles.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  writeArticles(filtered);
  return NextResponse.json({ success: true });
}
