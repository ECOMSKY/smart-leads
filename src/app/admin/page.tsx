"use client";

import { useState, useEffect, useCallback, lazy, Suspense } from "react";

const RichEditor = lazy(() => import("@/components/admin/RichEditor"));

type Article = {
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

const emptyArticle: Omit<Article, "id"> = {
  slug: "",
  locale: "fr",
  title: "",
  excerpt: "",
  metaTitle: "",
  metaDescription: "",
  date: new Date().toISOString().split("T")[0],
  author: "Smart Leads",
  readTime: "3 min",
  tags: [],
  body: "",
};

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [tab, setTab] = useState<"fr" | "en">("fr");
  const [editing, setEditing] = useState<Article | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyArticle);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    if (stored) setToken(stored);
  }, []);

  const fetchArticles = useCallback(async () => {
    const res = await fetch("/api/articles");
    if (res.ok) {
      const data = await res.json();
      setArticles(data);
    }
  }, []);

  useEffect(() => {
    if (token) fetchArticles();
  }, [token, fetchArticles]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      const { token: t } = await res.json();
      setToken(t);
      localStorage.setItem("admin_token", t);
    } else {
      setError("Mot de passe incorrect");
    }
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("admin_token");
  }

  function startCreate(locale: "fr" | "en") {
    setForm({ ...emptyArticle, locale });
    setTagsInput("");
    setCreating(true);
    setEditing(null);
  }

  function startEdit(article: Article) {
    setForm(article);
    setTagsInput(article.tags.join(", "));
    setEditing(article);
    setCreating(false);
  }

  function cancelForm() {
    setEditing(null);
    setCreating(false);
  }

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (editing) {
      await fetch(`/api/articles/${editing.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/articles", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
    }

    setSaving(false);
    cancelForm();
    fetchArticles();
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet article ?")) return;
    await fetch(`/api/articles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchArticles();
  }

  // --- Login screen ---
  if (!token) {
    return (
      <div className="min-h-screen bg-[#060A09] flex items-center justify-center px-5">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <h1 className="font-bold text-2xl text-white text-center mb-8">
            Admin — Smart Leads
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 rounded-lg bg-[#0F1B17] border border-[rgba(16,185,129,0.2)] text-white placeholder-gray-500 focus:outline-none focus:border-[#10B981]"
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full py-3 rounded-lg font-semibold text-sm text-[#060A09] transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #00E87B 0%, #059669 100%)" }}
          >
            Connexion
          </button>
        </form>
      </div>
    );
  }

  const filtered = articles.filter((a) => a.locale === tab);
  const isFormOpen = editing || creating;

  // --- Dashboard ---
  return (
    <div className="min-h-screen bg-[#060A09] text-white">
      {/* Header */}
      <div className="border-b border-[rgba(16,185,129,0.2)] px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold text-lg">Admin — Smart Leads Blog</h1>
        <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-red-400 transition-colors">
          Deconnexion
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs + New button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            {(["fr", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setTab(l)}
                className={`px-4 py-2 rounded-lg text-sm font-mono font-bold transition-all ${
                  tab === l
                    ? "bg-[#10B981] text-[#060A09]"
                    : "bg-[#0F1B17] text-gray-400 border border-[rgba(16,185,129,0.15)] hover:border-[rgba(16,185,129,0.3)]"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => startCreate(tab)}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm text-[#060A09] transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #00E87B 0%, #059669 100%)" }}
          >
            + Nouvel article ({tab.toUpperCase()})
          </button>
        </div>

        {/* Form */}
        {isFormOpen && (
          <div className="mb-8 rounded-xl border border-[rgba(16,185,129,0.2)] bg-[#0F1B17] p-6">
            <h2 className="font-bold text-lg mb-6">
              {editing ? "Modifier l'article" : "Nouvel article"} ({form.locale.toUpperCase()})
            </h2>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-gray-400 font-mono mb-1.5">Titre</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#060A09] border border-[rgba(16,185,129,0.15)] text-white text-sm focus:outline-none focus:border-[#10B981]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-mono mb-1.5">Slug (auto si vide)</label>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder={form.title ? slugify(form.title) : ""}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#060A09] border border-[rgba(16,185,129,0.15)] text-white text-sm focus:outline-none focus:border-[#10B981]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-mono mb-1.5">Extrait</label>
                <textarea
                  required
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#060A09] border border-[rgba(16,185,129,0.15)] text-white text-sm focus:outline-none focus:border-[#10B981] resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-gray-400 font-mono mb-1.5">Meta Title (max 60 car.)</label>
                  <input
                    value={form.metaTitle || ""}
                    onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                    placeholder={form.title ? `${form.title} — Smart Leads` : "Auto-généré depuis le titre"}
                    maxLength={70}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#060A09] border border-[rgba(16,185,129,0.15)] text-white text-sm focus:outline-none focus:border-[#10B981]"
                  />
                  <span className="text-[10px] text-gray-600 font-mono mt-1 block">{(form.metaTitle || "").length}/60</span>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-mono mb-1.5">Meta Description (max 155 car.)</label>
                  <input
                    value={form.metaDescription || ""}
                    onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                    placeholder="Auto-généré depuis l'extrait"
                    maxLength={160}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#060A09] border border-[rgba(16,185,129,0.15)] text-white text-sm focus:outline-none focus:border-[#10B981]"
                  />
                  <span className="text-[10px] text-gray-600 font-mono mt-1 block">{(form.metaDescription || "").length}/155</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs text-gray-400 font-mono mb-1.5">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#060A09] border border-[rgba(16,185,129,0.15)] text-white text-sm focus:outline-none focus:border-[#10B981]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-mono mb-1.5">Temps de lecture</label>
                  <input
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#060A09] border border-[rgba(16,185,129,0.15)] text-white text-sm focus:outline-none focus:border-[#10B981]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-mono mb-1.5">Tags (virgules)</label>
                  <input
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Meta Ads, CPA, B2B"
                    className="w-full px-3 py-2.5 rounded-lg bg-[#060A09] border border-[rgba(16,185,129,0.15)] text-white text-sm focus:outline-none focus:border-[#10B981]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-mono mb-1.5">Contenu</label>
                <Suspense fallback={<div className="h-[300px] rounded-lg bg-[#060A09] border border-[rgba(16,185,129,0.15)] flex items-center justify-center text-gray-500 text-sm">Chargement de l&apos;éditeur...</div>}>
                  <RichEditor
                    content={form.body}
                    onChange={(md) => setForm({ ...form, body: md })}
                  />
                </Suspense>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-lg font-semibold text-sm text-[#060A09] transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, #00E87B 0%, #059669 100%)" }}
                >
                  {saving ? "Enregistrement..." : editing ? "Mettre a jour" : "Publier"}
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-6 py-2.5 rounded-lg text-sm text-gray-400 border border-gray-700 hover:border-gray-500 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Articles list */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <p className="text-gray-500 text-center py-12">Aucun article en {tab.toUpperCase()}</p>
          )}
          {filtered
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((article) => (
            <div
              key={article.id}
              className="rounded-xl border border-[rgba(16,185,129,0.15)] bg-[#0F1B17] p-5 flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono text-[#10B981]/70 bg-[#10B981]/10 border border-[#10B981]/15">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-[15px] text-white truncate">{article.title}</h3>
                <p className="text-gray-500 text-[13px] mt-1 truncate">{article.excerpt}</p>
                <p className="text-gray-600 text-[11px] font-mono mt-2">{article.date} &middot; {article.readTime}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(article)}
                  className="px-3 py-1.5 rounded-md text-xs font-mono text-gray-300 border border-gray-700 hover:border-[#10B981]/40 hover:text-[#10B981] transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="px-3 py-1.5 rounded-md text-xs font-mono text-gray-300 border border-gray-700 hover:border-red-500/40 hover:text-red-400 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
