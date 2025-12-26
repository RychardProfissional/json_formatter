import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de Uso da Respawn Tech: regras, limitações, responsabilidade e uso das ferramentas.",
  alternates: { canonical: "/termos-de-uso" },
  openGraph: {
    type: "website",
    title: "Termos de Uso | Respawn Tech",
    description: "Termos de Uso da Respawn Tech: regras, limitações, responsabilidade e uso das ferramentas.",
    url: "https://respawntech.dev/termos-de-uso",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Termos de Uso | Respawn Tech",
    description: "Termos de Uso da Respawn Tech: regras, limitações, responsabilidade e uso das ferramentas.",
    images: ["/og.svg"]
  }
};

export default function TermosDeUsoPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Termos de Uso</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Regras simples para uso das ferramentas e limites de responsabilidade.
      </p>

      <div className="mt-8 space-y-4">
        {[
          {
            title: "1) Uso do serviço",
            body: "As ferramentas e conteúdos são fornecidos “no estado em que se encontram”, para ajudar a formatar, validar e transformar dados e apoiar tarefas técnicas. Você pode usar para fins pessoais ou profissionais."
          },
          {
            title: "2) Dados inseridos",
            body: "O processamento ocorre no seu navegador. Ainda assim, evite colar dados sensíveis em qualquer site sem avaliar o risco do seu ambiente. Se houver anúncios/analytics, o carregamento pode envolver terceiros após seu consentimento."
          },
          {
            title: "3) Limitações",
            body: "Não garantimos disponibilidade contínua, ausência total de erros, nem adequação para um propósito específico. Conversões (ex.: CSV) podem ter limitações de compatibilidade conforme o formato do seu arquivo."
          },
          {
            title: "4) Responsabilidade",
            body: "Você é responsável por revisar o resultado antes de usar em produção. Não nos responsabilizamos por perdas, danos ou consequências decorrentes do uso das ferramentas."
          },
          {
            title: "5) Contato",
            body: "Para dúvidas, acesse a página de Contato.",
            link: { href: "/contato", label: "Ir para contato" }
          }
        ].map((s) => (
          <section
            key={s.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          >
            <h2 className="text-lg font-bold">{s.title}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{s.body}</p>
            {s.link ? (
              <p className="mt-2">
                <a href={s.link.href} className="font-semibold">
                  {s.link.label}
                </a>
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </main>
  );
}
