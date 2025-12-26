import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/content/blog";
import type { ReactNode } from "react";
import Link from "next/link";
import { localePrefix } from "@/application/i18nServer";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

type ParamsInput = { slug: string } | Promise<{ slug: string }>;

async function resolveParams(params: ParamsInput): Promise<{ slug: string }> {
  return await Promise.resolve(params);
}

export async function generateMetadata({ params }: { params: ParamsInput }): Promise<Metadata> {
  const { slug } = await resolveParams(params);
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.ogDescription,
      url: `https://respawntech.dev/pt-br/blog/${post.slug}`,
      images: ["/og.svg"]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.ogDescription,
      images: ["/og.svg"]
    }
  };
}

export default async function BlogPostPage({ params }: { params: ParamsInput }) {
  const { slug } = await resolveParams(params);
  const post = getBlogPost(slug);
  if (!post) notFound();
  const p = localePrefix((params as any)?.locale);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Link href={`${p}/blog`} className="text-sm font-semibold text-blue-700 hover:underline dark:text-blue-300">
        ← Voltar
      </Link>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{post.title}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{post.ogDescription}</p>

      <article className="mt-8 space-y-4 text-slate-700 dark:text-slate-200">
        {renderPost(post.slug)}
      </article>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
        Publicado em {new Date(post.publishedAt).toLocaleDateString("pt-BR")}.
      </p>
    </main>
  );
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="pt-4 text-xl font-extrabold tracking-tight">{children}</h2>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="leading-relaxed">{children}</p>;
}

function renderPost(slug: string): ReactNode {
  switch (slug) {
    case "como-formatar-json-online":
      return (
        <>
          <P>
            JSON é o formato mais comum quando falamos de APIs, integrações e configurações. Ele é simples de gerar por
            máquinas, mas nem sempre é agradável de ler por humanos, principalmente quando vem minificado (tudo em uma
            linha) ou quando há objetos/arrays muito aninhados.
          </P>

          <H2>1) O que significa “formatar” JSON?</H2>
          <P>
            Formatar (ou “prettify”) é reorganizar o mesmo conteúdo com indentação e quebras de linha. Isso não altera
            valores; apenas melhora a leitura.
          </P>

          <H2>2) Quando vale a pena minificar?</H2>
          <P>
            Minificar é o caminho inverso: remove espaços e quebras. É útil quando você precisa colocar um JSON em um
            log, variável de ambiente, ou enviar um payload de teste pequeno.
          </P>

          <H2>3) Passo a passo para formatar e validar</H2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Cole o JSON na ferramenta.</li>
            <li>Se estiver inválido, confira a mensagem do erro (vírgula a mais, aspas erradas, chaves desbalanceadas).</li>
            <li>Depois de corrigir, formate com a indentação desejada (2, 4 ou 8 espaços).</li>
            <li>Copie o resultado ou baixe o arquivo formatado.</li>
          </ul>

          <H2>4) Dicas para resolver erros comuns</H2>
          <P>Alguns padrões aparecem o tempo todo:</P>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Vírgula a mais no final:</strong> em JSON, não existe “trailing comma”.
            </li>
            <li>
              <strong>Aspas simples:</strong> JSON exige aspas duplas em chaves e strings.
            </li>
            <li>
              <strong>Chaves/colchetes faltando:</strong> um <code className="rounded bg-slate-100 px-1 dark:bg-slate-900">{"{"}</code> sem{" "}
              <code className="rounded bg-slate-100 px-1 dark:bg-slate-900">{"}"}</code> ou{" "}
              <code className="rounded bg-slate-100 px-1 dark:bg-slate-900">{"["}</code> sem{" "}
              <code className="rounded bg-slate-100 px-1 dark:bg-slate-900">{"]"}</code> quebra tudo.
            </li>
            <li>
              <strong>Caracteres não escapados:</strong> quebras de linha dentro de strings precisam de{" "}
              <code className="rounded bg-slate-100 px-1 dark:bg-slate-900">\\n</code>.
            </li>
          </ul>

          <H2>5) Privacidade: meus dados vão para o servidor?</H2>
          <P>
            A proposta aqui é processar no navegador. Ainda assim, evite colar dados altamente sensíveis em qualquer
            site; a segurança também depende do seu dispositivo e do seu navegador.
          </P>

          <H2>6) Faça em segundos</H2>
          <P>
            Para um fluxo rápido no dia a dia: <Link className="font-semibold text-blue-700 hover:underline dark:text-blue-300" href={`${p}/tools/json/formatter`}>abrir o Formatador de JSON</Link>.
          </P>
        </>
      );

    case "ferramentas-uteis-para-programadores":
      return (
        <>
          <P>
            Programar não é só escrever código novo. Uma parte enorme do tempo vai embora em tarefas que não aparecem no
            commit: validar payload, converter arquivos, checar regex, ler logs, extrair um campo, organizar um snippet.
          </P>

          <H2>1) Utilitários de formato (JSON, CSV, JSONL)</H2>
          <P>
            Formato é onde a maioria dos bugs e confusões começam. Se você recebe um JSON minificado, um CSV com colunas
            estranhas ou um JSONL de logs, ter conversores rápidos ajuda a enxergar o problema.
          </P>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Formatador/Validador JSON:</strong> deixa payload legível e aponta erros.
            </li>
            <li>
              <strong>JSON Minify:</strong> útil para colar em variáveis e logs.
            </li>
            <li>
              <strong>JSON ↔ CSV:</strong> ótimo para relatórios e integrações simples.
            </li>
            <li>
              <strong>Prettify JSONL:</strong> facilita leitura de logs e exportações.
            </li>
          </ul>
          <P>
            <Link className="font-semibold text-blue-700 hover:underline dark:text-blue-300" href={`${p}/tools`}>
              Abrir as ferramentas da Respawn Tech
            </Link>
          </P>

          <H2>2) Ferramentas de texto (escape/unescape, base64, etc.)</H2>
          <P>
            Muitos erros acontecem porque uma string tem caracteres invisíveis (quebra de linha, tab), aspas ou barras.
            Um escape/unescape resolve isso rápido.
          </P>

          <H2>3) Validações (CPF/CNPJ, e-mail, regex)</H2>
          <P>
            O ideal é ter validações claras e mensagens úteis. Uma ferramenta web ajuda a testar rapidamente se um JSON
            está correto, ou se uma regra está coerente.
          </P>

          <H2>4) Hábitos que viram produtividade</H2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Padronize indentação:</strong> reduz ruído em PR e evita retrabalho.
            </li>
            <li>
              <strong>Copie exemplos formatados:</strong> melhora tickets e comunicação.
            </li>
            <li>
              <strong>Teste com casos reais:</strong> use um payload real (sem dados sensíveis) e valide o fluxo.
            </li>
            <li>
              <strong>Use atalhos:</strong> reduzir cliques é ganhar tempo e foco.
            </li>
          </ul>

          <H2>5) A ideia por trás da Respawn Tech</H2>
          <P>
            A Respawn Tech existe para devolver tempo a quem cria. Ferramentas devem ser rápidas. Um bloqueio de minutos
            deve ser resolvido em segundos.
          </P>
        </>
      );

    case "como-validar-cpf-json-regex":
      return (
        <>
          <P>
            Validação aparece em todo lugar: formulários, integrações, APIs e automações. O problema é que “validar”
            pode significar coisas diferentes: às vezes é só checar formato; às vezes é validar conteúdo.
          </P>

          <H2>1) Validar JSON: formato e sintaxe</H2>
          <P>
            JSON válido é uma questão de sintaxe. Um validador ajuda a detectar: vírgulas a mais, aspas erradas,
            chaves/colchetes faltando e strings com caracteres não escapados.
          </P>
          <P>
            <Link className="font-semibold text-blue-700 hover:underline dark:text-blue-300" href={`${p}/tools/json/validator`}>
              Abrir Validador JSON
            </Link>
          </P>

          <H2>2) Regex: validar ou apenas “filtrar”?</H2>
          <P>
            Regex é poderosa, mas perigosa quando vira “validação completa”. Em muitos casos, use regex para garantir um
            formato mínimo e deixe regras de negócio para o back-end.
          </P>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Dica:</strong> evite regex muito complexa para e-mail.
            </li>
            <li>
              <strong>Outra dica:</strong> trate unicode, espaços e inputs vazios explicitamente.
            </li>
          </ul>

          <H2>3) CPF: formato vs dígitos verificadores</H2>
          <P>
            Para CPF, “validar” geralmente significa verificar dígitos (além do formato). A validação completa deve
            evitar sequências inválidas (como todos os dígitos iguais) e conferir os dígitos verificadores.
          </P>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Normalização:</strong> remover caracteres não numéricos.
            </li>
            <li>
              <strong>Validação:</strong> regra dos dígitos verificadores.
            </li>
            <li>
              <strong>Mensagem:</strong> explicar o motivo do erro.
            </li>
          </ul>

          <H2>4) O que ferramentas web ajudam de verdade?</H2>
          <P>
            Ferramentas web são ótimas para testes rápidos. Elas reduzem tempo de setup e ajudam a transformar um
            problema em algo visível.
          </P>

          <H2>5) Conclusão</H2>
          <P>
            Validação bem feita é um equilíbrio entre experiência do usuário e segurança. Use o front-end para orientar
            e reduzir erros; use o back-end para garantir integridade.
          </P>
        </>
      );

    default:
      return null;
  }
}
