import type { Metadata } from "next";
import { SITE } from "@/application/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL("https://respawntech.dev"),
  title: {
    default: "Respawn Tech",
    template: "%s | Respawn Tech"
  },
  description: "Respawn Tech is a platform of free online tools for developers.",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon"
      }
    ]
  },
  alternates: { canonical: "/en" },
  other: {
    "google-adsense-account": SITE.adsenseClient
  },
  openGraph: {
    type: "website",
    url: "https://respawntech.dev/en",
    title: "Respawn Tech",
    description: "Free online tools to solve technical tasks in seconds — no installs, no account.",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.svg"]
  }
};

export default function EnLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
