export default function HomePage() {
  const tools = [
    { href: "/tools/json/formatter", name: "Formatador de JSON", desc: "Organiza, minifica e valida JSON direto no navegador." },
    { href: "/tools/json/validator", name: "Validador JSON", desc: "Verifica se um JSON está válido e mostra mensagens de erro." },
    { href: "/tools/json/minify", name: "JSON Minify", desc: "Compacta JSON removendo espaços e quebras de linha." },
    { href: "/tools/json/escape", name: "Escape / Unescape", desc: "Transforma textos com \\n, \\t e aspas para strings JSON seguras." },
    { href: "/tools/json/csv", name: "JSON ↔ CSV", desc: "Converte JSON para CSV e CSV simples para JSON." },
    { href: "/tools/json/jsonl-prettify", name: "Prettify JSONL", desc: "Embeleza JSON Lines (um JSON por linha) em blocos legíveis." }
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <section aria-label="Hero" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h1 className="text-4xl font-extrabold tracking-tight">Respawn Tech</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Ferramentas online gratuitas para programadores, estudantes e empreendedores. Missão: reduzir atrito no uso
          da tecnologia — resolver tarefas técnicas em segundos, sem instalação e sem criar conta.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700" href="/tools">
            Acessar ferramentas
          </a>
          <a
            className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900"
            href="/blog"
          >
            Ler o blog
          </a>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "Sem login",
            "Rápido e responsivo",
            "Foco em utilidade",
            "Transparência"
          ].map((b) => (
            <span
              key={b}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      <section aria-label="O que é" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">O que é a Respawn Tech</h2>
        <div className="mt-3 space-y-3 text-slate-600 dark:text-slate-300">
          <p>
            A Respawn Tech é uma plataforma de ferramentas online gratuitas para programadores, estudantes e
            empreendedores. A missão é reduzir atrito no uso da tecnologia, permitindo executar tarefas técnicas em
            poucos segundos — sem instalação ou criação de conta.
          </p>
          <p>
            O projeto existe porque muita produtividade se perde em “tarefas pequenas”: validar um JSON, escapar uma
            string, converter um CSV, organizar um log. São passos simples, mas repetidos dezenas de vezes por semana.
          </p>
          <p>
            A base é simples: ferramentas que rodam no navegador, com foco em legibilidade, performance e uma
            experiência consistente. Quando houver anúncios e medição, isso é tratado com transparência e preferências
            claras para o usuário.
          </p>
        </div>
      </section>

      <section aria-label="Ferramentas" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">Ferramentas disponíveis</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          O conteúdo principal do projeto fica em <a href="/tools">/tools</a>.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {tools.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-900 dark:hover:bg-slate-900"
            >
              <h3 className="text-lg font-bold">{t.name}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section aria-label="Para quem é" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">Para quem é</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>
            <strong>Desenvolvedores:</strong> depuração rápida de payloads, configs e integrações.
          </li>
          <li>
            <strong>Estudantes:</strong> aprender estruturas, validar exemplos e entender erros comuns.
          </li>
          <li>
            <strong>PMEs e empreendedores:</strong> testar integrações, automações e exportações.
          </li>
          <li>
            <strong>Times de produto/ops:</strong> inspecionar dados e logs sem abrir um editor pesado.
          </li>
        </ul>
      </section>

      <section aria-label="Diferenciais" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">Diferenciais</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>
            <strong>Sem atrito:</strong> abra, cole, resolva, copie/baixe.
          </li>
          <li>
            <strong>Leve e rápido:</strong> foco em boa experiência em desktop e celular.
          </li>
          <li>
            <strong>Consistência:</strong> interface e comportamento previsíveis.
          </li>
          <li>
            <strong>Transparência:</strong> páginas legais claras e preferências de cookies.
          </li>
        </ul>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          A Respawn Tech existe para devolver tempo a quem cria. Ferramentas devem ser rápidas.
        </p>
      </section>

      <section aria-label="Quem desenvolve" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">Quem desenvolve</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          O projeto é mantido por Rychard. Veja: <a href="https://rychard.vercel.app/" rel="noopener">rychard.vercel.app</a>.
        </p>
      </section>

      <section aria-label="Roadmap" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">Roadmap</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>Novas ferramentas (regex, base64, JWT, timestamp, diffs, utilitários de texto).</li>
          <li>Melhorias de UX (atalhos, templates, presets e acessibilidade).</li>
          <li>Mais conteúdo educativo no blog (guias, exemplos e boas práticas).</li>
          <li>Multilíngue (pt-BR e en).</li>
          <li>API pública para automações (quando fizer sentido).</li>
          <li>Comunidade e sugestões abertas.</li>
        </ul>
      </section>

      <section aria-label="FAQ" className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">Perguntas frequentes (FAQ)</h2>
        <ul className="mt-3 space-y-2 text-slate-600 dark:text-slate-300">
          <li>
            <strong>É grátis?</strong> Sim. As ferramentas são gratuitas para uso pessoal e profissional.
          </li>
          <li>
            <strong>Meus dados ficam armazenados?</strong> Em geral, não. As ferramentas processam no navegador. Algumas
            funções podem usar armazenamento local apenas se você ativar.
          </li>
          <li>
            <strong>Precisa de login?</strong> Não. A proposta é reduzir atrito: abrir e usar.
          </li>
          <li>
            <strong>Quem desenvolveu?</strong> O projeto é mantido por Rychard.
          </li>
          <li>
            <strong>Posso usar comercialmente?</strong> Sim. Só recomendamos revisar resultados antes de usar em produção.
          </li>
        </ul>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Quer sugerir uma ferramenta? Fale pelo <a href="/contato">contato</a>.
        </p>
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "É grátis?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. As ferramentas da Respawn Tech são gratuitas para uso pessoal e profissional."
                }
              },
              {
                "@type": "Question",
                name: "Meus dados ficam armazenados?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Em geral não. O processamento ocorre no navegador. Algumas funções podem usar armazenamento local apenas se você ativar."
                }
              },
              {
                "@type": "Question",
                name: "Precisa de login?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não. A proposta é reduzir atrito: abrir e usar, sem criar conta."
                }
              },
              {
                "@type": "Question",
                name: "Quem desenvolveu?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O projeto é mantido por Rychard."
                }
              },
              {
                "@type": "Question",
                name: "Posso usar comercialmente?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. Recomendamos revisar os resultados antes de usar em produção, especialmente conversões."
                }
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Respawn Tech",
            url: "https://respawntech.dev/",
            founder: {
              "@type": "Person",
              name: "Rychard",
              url: "https://rychard.vercel.app/"
            }
          })
        }}
      />
    </main>
  );
}
