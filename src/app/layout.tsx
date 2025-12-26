import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://respawntech.dev"),
  title: {
    default: "Respawn Tech",
    template: "%s | Respawn Tech"
  },
  description:
    "Respawn Tech é uma plataforma de ferramentas online gratuitas para programadores, estudantes e empreendedores.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://respawntech.dev/",
    title: "Respawn Tech",
    description:
      "Plataforma de ferramentas online gratuitas para resolver tarefas técnicas em segundos — sem instalar e sem criar conta.",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.svg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
