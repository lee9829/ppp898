import type { Metadata } from "next";
import { siteName } from "./site-config";

export function metaTitle(h1: string, shortened?: string) {
  const clean = (shortened ?? h1).replace(/\s+/g, " ").trim();
  // An about page or home title may already contain the brand.
  if (clean.replace(/\s/g, "").includes(siteName)) return clean;
  return `${clean} - ${siteName}`;
}

export function metaDescription(description: string) {
  const text = description.replace(/\s+/g, " ").trim();
  if (text.length <= 120) return text;
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [text];
  let result = "";
  for (const sentence of sentences) {
    const next = `${result} ${sentence.trim()}`.trim();
    if (next.length > 120) break;
    result = next;
  }
  // Keep complete sentences where possible, otherwise cut only at a clause boundary.
  if (result.length >= 80) return result;
  const prefix = text.slice(0, 111);
  const boundary = Math.max(prefix.lastIndexOf(","), prefix.lastIndexOf("부터"), prefix.lastIndexOf("까지"));
  if (boundary >= 80) return `${prefix.slice(0, boundary).trim()} 등을 확인하세요.`;
  const end = prefix.lastIndexOf(" ");
  return `${prefix.slice(0, end > 80 ? end : 110).replace(/[,.·]$/, "")}…`;
}

export function pageMetadata({ h1, description, path, image, shortened, article }: {
  h1: string; description: string; path: string; image?: string; shortened?: string;
  article?: { publishedTime: string };
}): Metadata {
  const title = metaTitle(h1, shortened);
  const summary = metaDescription(description);
  return {
    title: { absolute: title },
    description: summary,
    alternates: { canonical: path },
    openGraph: {
      type: article ? "article" : "website", locale: "ko_KR", siteName,
      title, description: summary, url: path,
      ...(image ? { images: [image] } : {}),
      ...(article ?? {}),
    },
    twitter: { card: "summary_large_image", title, description: summary, ...(image ? { images: [image] } : {}) },
  };
}
