export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  ogDescription: string;
  publishedAt: string; // ISO date
};

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "como-formatar-json-online",
    title: "Como formatar JSON online (sem instalar nada)",
    description: "Guia prático para formatar, validar e minificar JSON online com rapidez, incluindo dicas de depuração e exemplos.",
    ogDescription: "Aprenda a deixar JSON legível, detectar erros e exportar resultados em segundos.",
    publishedAt: "2025-12-26"
  },
  {
    slug: "ferramentas-uteis-para-programadores",
    title: "Ferramentas úteis para programadores (web e produtividade)",
    description: "Lista de ferramentas úteis para programadores: utilitários web, validação, conversão de formatos e hábitos para ganhar tempo no dia a dia.",
    ogDescription: "Um checklist de utilitários e hábitos que economizam minutos — e viram horas no mês.",
    publishedAt: "2025-12-26"
  },
  {
    slug: "como-validar-cpf-json-regex",
    title: "Como validar CPF/JSON/regex usando ferramentas web",
    description: "Guia de validação: JSON válido, testes de regex e boas práticas para validar CPF no front e no back (com foco em UX e segurança).",
    ogDescription: "Boas práticas e exemplos para validar no front e no back, com foco em segurança e clareza.",
    publishedAt: "2025-12-26"
  }
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
