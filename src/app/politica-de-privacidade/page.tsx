import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  alternates: { canonical: "/politica-de-privacidade" }
};

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Política de Privacidade</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Transparência sobre dados, armazenamento local, cookies, anúncios e analytics.
      </p>

      <div className="mt-8 space-y-4">
        {[
          {
            title: "1) Dados inseridos nas ferramentas",
            body: "O conteúdo que você cola nas ferramentas é processado no seu navegador. Não precisamos enviar esse conteúdo para um servidor próprio para formatar/validar/converter."
          },
          {
            title: "2) Armazenamento local",
            body: "Algumas ferramentas podem oferecer a opção de salvar localmente (localStorage) para reabrir o último texto. Você pode desativar essa opção na interface."
          },
          {
            title: "3) Anúncios",
            body: "Podemos exibir anúncios (ex.: Google AdSense). Fornecedores podem usar cookies/identificadores para exibir anúncios e medir performance, conforme seu consentimento e as configurações do fornecedor."
          },
          {
            title: "4) Medição (analytics)",
            body: "Podemos usar analytics (ex.: Plausible) para entender uso do site e melhorar as ferramentas. O carregamento fica condicionado ao seu consentimento quando aplicável."
          },
          {
            title: "5) Base legal e consentimento",
            body: "Quando aplicável, exibimos um banner de consentimento para você aceitar ou recusar cookies/tecnologias de anúncios e medição."
          },
          {
            title: "Preferências de cookies",
            body: "Você pode revisar sua escolha a qualquer momento pelo link “Preferências de cookies” no rodapé.",
            id: "preferencias"
          },
          {
            title: "6) Seus direitos",
            body: "Você pode gerenciar cookies no seu navegador e ajustar sua escolha pelo banner (limpando o armazenamento do site, se necessário)."
          },
          {
            title: "7) Contato",
            body: "Para dúvidas sobre privacidade, acesse a página de Contato.",
            link: { href: "/contato", label: "Ir para contato" }
          }
        ].map((s) => (
          <section
            key={s.title}
            id={s.id}
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

        <p className="text-sm text-slate-500 dark:text-slate-400">Última atualização: 26/12/2025.</p>
      </div>
    </main>
  );
}
