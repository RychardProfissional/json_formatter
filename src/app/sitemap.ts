import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://respawntech.dev";
  const now = new Date();

  const staticRoutes = [
    "",
    "/tools",
    "/tools/pdf",
    "/tools/pdf/image-to-pdf",
    "/tools/pdf/merge",
    "/tools/image",
    "/tools/image/compressor",
    "/tools/json",
    "/tools/json/formatter",
    "/tools/json/validator",
    "/tools/json/minify",
    "/tools/json/escape",
    "/tools/json/csv",
    "/tools/json/jsonl-prettify",
    "/blog",
    "/sobre",
    "/contato",
    "/politica-de-privacidade",
    "/termos-de-uso"
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now
    })),
    ...blogPosts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt)
    }))
  ];
}
