import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Ferramentas (HTML legado -> rotas Next)
      { source: "/validator.html", destination: "/tools/json-validator", permanent: true },
      { source: "/minify.html", destination: "/tools/json-minify", permanent: true },
      { source: "/escape.html", destination: "/tools/json-escape", permanent: true },
      { source: "/csv.html", destination: "/tools/json-csv", permanent: true },
      { source: "/jsonl.html", destination: "/tools/jsonl-prettify", permanent: true },

      // Institucional/legal (HTML legado -> slugs)
      { source: "/sobre.html", destination: "/sobre", permanent: true },
      { source: "/contact.html", destination: "/contato", permanent: true },
      { source: "/privacy.html", destination: "/politica-de-privacidade", permanent: true },
      { source: "/terms.html", destination: "/termos-de-uso", permanent: true },

      // Normalizar barra final (o app-router funciona sem ela por padrão)
      { source: "/sobre/", destination: "/sobre", permanent: true },
      { source: "/contato/", destination: "/contato", permanent: true },
      { source: "/politica-de-privacidade/", destination: "/politica-de-privacidade", permanent: true },
      { source: "/termos-de-uso/", destination: "/termos-de-uso", permanent: true },
      { source: "/blog/", destination: "/blog", permanent: true }
    ];
  }
};

export default nextConfig;