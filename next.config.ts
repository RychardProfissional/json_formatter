import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Ferramentas (HTML legado -> rotas Next)
      { source: "/validator.html", destination: "/tools/json/validator", permanent: true },
      { source: "/minify.html", destination: "/tools/json/minify", permanent: true },
      { source: "/escape.html", destination: "/tools/json/escape", permanent: true },
      { source: "/csv.html", destination: "/tools/json/csv", permanent: true },
      { source: "/jsonl.html", destination: "/tools/json/jsonl-prettify", permanent: true },

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
      { source: "/blog/", destination: "/blog", permanent: true },
      { source: "/blog/:slug/", destination: "/blog/:slug", permanent: true },

      // Image compressor (URL antiga -> nova)
      { source: "/image-compressor", destination: "/tools/image/compressor", permanent: true },
      { source: "/image-compressor/", destination: "/tools/image/compressor", permanent: true },

      // Tools JSON (URLs antigas -> nova taxonomia)
      { source: "/tools/json-formatter", destination: "/tools/json/formatter", permanent: true },
      { source: "/tools/json-validator", destination: "/tools/json/validator", permanent: true },
      { source: "/tools/json-minify", destination: "/tools/json/minify", permanent: true },
      { source: "/tools/json-escape", destination: "/tools/json/escape", permanent: true },
      { source: "/tools/json-csv", destination: "/tools/json/csv", permanent: true },
      { source: "/tools/jsonl-prettify", destination: "/tools/json/jsonl-prettify", permanent: true },

      { source: "/tools/", destination: "/tools", permanent: true },
      { source: "/tools/:path*/", destination: "/tools/:path*", permanent: true }
    ];
  }
};

export default nextConfig;