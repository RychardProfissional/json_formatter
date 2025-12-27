import { MetadataRoute } from "next";
import { SITE } from "@/application/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/tools",
    "/tools/image/compressor",
    "/tools/json/formatter",
    "/tools/json/minify",
    "/tools/json/validator",
    "/tools/json/csv",
    "/tools/json/escape",
    "/tools/json/jsonl-prettify",
    "/tools/pdf/image-to-pdf",
    "/tools/pdf/merge",
    "/termos-de-uso",
    "/politica-de-privacidade",
  ].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
