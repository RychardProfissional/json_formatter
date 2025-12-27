import { MetadataRoute } from "next";
import { SITE } from "@/application/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/api/"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
