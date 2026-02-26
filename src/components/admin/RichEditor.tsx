"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlock from "@tiptap/extension-code-block";
import Youtube from "@tiptap/extension-youtube";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { useCallback, useState, useEffect, useRef } from "react";

// ─── Custom Button Extension (CTA) ───
import { Node as TiptapNode, mergeAttributes } from "@tiptap/core";

const ButtonNode = TiptapNode.create({
  name: "ctaButton",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      href: { default: "#" },
      label: { default: "Bouton" },
      style: { default: "primary" },
    };
  },
  parseHTML() {
    return [{ tag: 'a[data-cta="true"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    const styles: Record<string, string> = {
      primary: "display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#00E87B,#059669);color:#060A09;font-weight:600;font-size:14px;border-radius:8px;text-decoration:none;",
      secondary: "display:inline-block;padding:12px 32px;background:transparent;color:#10B981;font-weight:600;font-size:14px;border-radius:8px;text-decoration:none;border:1.5px solid rgba(16,185,129,0.4);",
      outline: "display:inline-block;padding:12px 32px;background:transparent;color:#F1F5F9;font-weight:600;font-size:14px;border-radius:8px;text-decoration:none;border:1.5px solid rgba(241,245,249,0.2);",
    };
    return [
      "div",
      { style: "text-align:center;margin:24px 0;" },
      [
        "a",
        mergeAttributes(HTMLAttributes, {
          "data-cta": "true",
          href: HTMLAttributes.href,
          style: styles[HTMLAttributes.style] || styles.primary,
        }),
        HTMLAttributes.label,
      ],
    ];
  },
});

// ─── Callout/Alert Box Extension ───
const CalloutNode = TiptapNode.create({
  name: "callout",
  group: "block",
  content: "block+",
  addAttributes() {
    return {
      type: { default: "info" },
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-callout]' }];
  },
  renderHTML({ HTMLAttributes }) {
    const colors: Record<string, { bg: string; border: string; icon: string }> = {
      info: { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.3)", icon: "ℹ️" },
      success: { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.3)", icon: "✅" },
      warning: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.3)", icon: "⚠️" },
      danger: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.3)", icon: "🚨" },
    };
    const c = colors[HTMLAttributes.type] || colors.info;
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-callout": HTMLAttributes.type,
        style: `background:${c.bg};border-left:3px solid ${c.border};border-radius:8px;padding:16px 16px 16px 20px;margin:16px 0;`,
      }),
      0,
    ];
  },
});

// ─── Divider colors ───
const COLORS = [
  { name: "Blanc", value: "#F1F5F9" },
  { name: "Emeraude", value: "#10B981" },
  { name: "Vert clair", value: "#00E87B" },
  { name: "Bleu", value: "#3B82F6" },
  { name: "Violet", value: "#8B5CF6" },
  { name: "Rose", value: "#EC4899" },
  { name: "Orange", value: "#F59E0B" },
  { name: "Rouge", value: "#EF4444" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Gris", value: "#94A3B8" },
];

const HIGHLIGHT_COLORS = [
  { name: "Vert", value: "rgba(16,185,129,0.25)" },
  { name: "Jaune", value: "rgba(245,158,11,0.25)" },
  { name: "Bleu", value: "rgba(59,130,246,0.25)" },
  { name: "Rose", value: "rgba(236,72,153,0.25)" },
  { name: "Violet", value: "rgba(139,92,246,0.25)" },
];

// ─── Toolbar Button ───
function Btn({ active, onClick, children, title }: { active?: boolean; onClick: () => void; children: React.ReactNode; title?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1.5 rounded text-xs font-mono transition-all ${
        active
          ? "bg-[#10B981] text-[#060A09] font-bold"
          : "text-gray-400 hover:text-white hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span className="w-px h-5 bg-gray-700/60 self-center mx-0.5" />;
}

// ─── Dropdown ───
function Dropdown({ label, children, active }: { label: string; children: React.ReactNode; active?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`px-2 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1 ${
          active ? "bg-[#10B981] text-[#060A09] font-bold" : "text-gray-400 hover:text-white hover:bg-white/10"
        }`}
      >
        {label} <span className="text-[8px]">▼</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-[#0F1B17] border border-[rgba(16,185,129,0.2)] rounded-lg shadow-xl z-50 min-w-[160px] py-1 max-h-[300px] overflow-y-auto">
          <div onClick={() => setOpen(false)}>{children}</div>
        </div>
      )}
    </div>
  );
}

function DropdownItem({ onClick, children, active }: { onClick: () => void; children: React.ReactNode; active?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
        active ? "bg-[#10B981]/20 text-[#10B981]" : "text-gray-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

// ─── MenuBar ───
function MenuBar({ editor }: { editor: Editor | null }) {
  const addImage = useCallback(() => {
    if (!editor) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const { url } = await res.json();
        editor.chain().focus().setImage({ src: url }).run();
      } else {
        alert("Erreur lors de l'upload");
      }
    };
    input.click();
  }, [editor]);

  const addImageUrl = useCallback(() => {
    if (!editor) return;
    const url = prompt("URL de l'image :");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const addLink = useCallback(() => {
    if (!editor) return;
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const url = prompt("URL du lien :");
    if (url) editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
  }, [editor]);

  const addYoutube = useCallback(() => {
    if (!editor) return;
    const url = prompt("URL YouTube :");
    if (url) editor.commands.setYoutubeVideo({ src: url, width: 640, height: 360 });
  }, [editor]);

  const addButton = useCallback(() => {
    if (!editor) return;
    const label = prompt("Texte du bouton :", "Réserver un appel") || "Réserver un appel";
    const href = prompt("URL du lien :", "#formulaire") || "#formulaire";
    editor.chain().focus().insertContent({
      type: "ctaButton",
      attrs: { href, label, style: "primary" },
    }).run();
  }, [editor]);

  const addCallout = useCallback((type: string) => {
    if (!editor) return;
    editor.chain().focus().insertContent({
      type: "callout",
      attrs: { type },
      content: [{ type: "paragraph", content: [{ type: "text", text: "Votre texte ici..." }] }],
    }).run();
  }, [editor]);

  const addTable = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border-b border-[rgba(16,185,129,0.15)] bg-[#060A09]/80">
      {/* Row 1 — Structure */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 pt-2 pb-1">
        <Dropdown label="Titre">
          <DropdownItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })}>
            <span className="text-base font-bold">Titre 1</span>
          </DropdownItem>
          <DropdownItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>
            <span className="text-sm font-bold">Titre 2</span>
          </DropdownItem>
          <DropdownItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>
            <span className="text-xs font-semibold">Titre 3</span>
          </DropdownItem>
          <DropdownItem onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive("paragraph")}>
            Paragraphe
          </DropdownItem>
        </Dropdown>

        <Sep />

        <Btn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="Gras">
          <strong>B</strong>
        </Btn>
        <Btn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italique">
          <em>I</em>
        </Btn>
        <Btn active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Souligné">
          <span className="underline">U</span>
        </Btn>
        <Btn active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} title="Barré">
          <span className="line-through">S</span>
        </Btn>
        <Btn active={editor.isActive("superscript")} onClick={() => editor.chain().focus().toggleSuperscript().run()} title="Exposant">
          X<sup className="text-[8px]">2</sup>
        </Btn>
        <Btn active={editor.isActive("subscript")} onClick={() => editor.chain().focus().toggleSubscript().run()} title="Indice">
          X<sub className="text-[8px]">2</sub>
        </Btn>
        <Btn active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()} title="Code inline">
          &lt;/&gt;
        </Btn>

        <Sep />

        {/* Text Color */}
        <Dropdown label="A̲" active={!!editor.getAttributes("textStyle").color}>
          {COLORS.map((c) => (
            <DropdownItem key={c.value} onClick={() => editor.chain().focus().setColor(c.value).run()}>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-white/20" style={{ background: c.value }} />
                {c.name}
              </span>
            </DropdownItem>
          ))}
          <DropdownItem onClick={() => editor.chain().focus().unsetColor().run()}>
            <span className="text-gray-500">Réinitialiser</span>
          </DropdownItem>
        </Dropdown>

        {/* Highlight */}
        <Dropdown label="🖍" active={editor.isActive("highlight")}>
          {HIGHLIGHT_COLORS.map((c) => (
            <DropdownItem key={c.value} onClick={() => editor.chain().focus().toggleHighlight({ color: c.value }).run()}>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded" style={{ background: c.value }} />
                {c.name}
              </span>
            </DropdownItem>
          ))}
          <DropdownItem onClick={() => editor.chain().focus().unsetHighlight().run()}>
            <span className="text-gray-500">Retirer</span>
          </DropdownItem>
        </Dropdown>
      </div>

      {/* Row 2 — Alignment, lists, media, inserts */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 pb-2 pt-1">
        <Btn active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()} title="Aligner à gauche">
          ≡←
        </Btn>
        <Btn active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()} title="Centrer">
          ≡↔
        </Btn>
        <Btn active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()} title="Aligner à droite">
          →≡
        </Btn>

        <Sep />

        <Btn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Liste à puces">
          • Liste
        </Btn>
        <Btn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Liste numérotée">
          1. Liste
        </Btn>
        <Btn active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Citation">
          ❝ Citation
        </Btn>
        <Btn active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Bloc de code">
          {"{ }"}
        </Btn>
        <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Séparateur">
          ―
        </Btn>

        <Sep />

        <Btn active={editor.isActive("link")} onClick={addLink} title="Lien">
          🔗 Lien
        </Btn>
        <Btn onClick={addImage} title="Upload image">
          📷 Image
        </Btn>
        <Btn onClick={addImageUrl} title="Image par URL">
          🌐 Img URL
        </Btn>
        <Btn onClick={addYoutube} title="Vidéo YouTube">
          ▶ YouTube
        </Btn>

        <Sep />

        <Dropdown label="+ Insérer">
          <DropdownItem onClick={addButton}>🔘 Bouton CTA</DropdownItem>
          <DropdownItem onClick={() => addCallout("info")}>ℹ️ Encadré Info</DropdownItem>
          <DropdownItem onClick={() => addCallout("success")}>✅ Encadré Succès</DropdownItem>
          <DropdownItem onClick={() => addCallout("warning")}>⚠️ Encadré Attention</DropdownItem>
          <DropdownItem onClick={() => addCallout("danger")}>🚨 Encadré Danger</DropdownItem>
          <DropdownItem onClick={addTable}>📊 Tableau</DropdownItem>
        </Dropdown>

        <Sep />

        <Btn onClick={() => editor.chain().focus().undo().run()} title="Annuler">
          ↩
        </Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} title="Rétablir">
          ↪
        </Btn>
      </div>
    </div>
  );
}

// ─── Main Editor ───
export default function RichEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const isUpdating = useRef(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" } }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Superscript,
      Subscript,
      Placeholder.configure({ placeholder: "Commencez à écrire votre article..." }),
      CodeBlock,
      Youtube.configure({ inline: false, ccLanguage: "fr" }),
      Table.configure({ resizable: false }),
      TableRow,
      TableCell,
      TableHeader,
      ButtonNode,
      CalloutNode,
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class: "tiptap min-h-[400px] px-5 py-4 focus:outline-none text-white text-sm leading-relaxed",
      },
    },
    onUpdate: ({ editor }) => {
      if (!isUpdating.current) {
        onChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editor && content === "") {
      isUpdating.current = true;
      editor.commands.setContent("");
      isUpdating.current = false;
    }
  }, [content, editor]);

  return (
    <div className="rounded-lg bg-[#060A09] border border-[rgba(16,185,129,0.15)] overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
