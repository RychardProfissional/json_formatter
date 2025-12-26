import type { Metadata } from "next";

import { SITE } from "@/application/siteConfig";
import { AdSlot } from "@/ui/components/AdSlot";
import { ImageCompressor } from "./components/ImageCompressor";

export const metadata: Metadata = {
  title: "Compressor de Imagens Online – Reduza PNG e JPG Gratuitamente",
  description: "Comprimir PNG, JPG e WEBP grátis, direto do navegador. Nenhum arquivo enviado ao servidor.",
  alternates: { canonical: `${SITE.url}/tools/image/compressor` },
  openGraph: {
    type: "website",
    url: `${SITE.url}/tools/image/compressor`,
    title: "Compressor de Imagens Online – Reduza PNG e JPG Gratuitamente",
    description: "Comprimir PNG, JPG e WEBP grátis, direto do navegador. Nenhum arquivo enviado ao servidor.",
    siteName: "Respawn Tech",
    images: [{ url: `${SITE.url}/og.svg`, width: 1200, height: 630, alt: "Respawn Tech" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Compressor de Imagens Online – Reduza PNG e JPG Gratuitamente",
    description: "Comprimir PNG, JPG e WEBP grátis, direto do navegador. Nenhum arquivo enviado ao servidor.",
    images: [`${SITE.url}/og.svg`]
  }
};

export default function ImageCompressorPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Compressor de Imagens Online</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Ferramenta gratuita para reduzir o tamanho de imagens PNG, JPG e WebP. Seus arquivos não são enviados para
        servidores.
      </p>

      <AdSlot
        slot={SITE.adsenseSlots.toolsExtra3}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <ImageCompressor />
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-xl font-bold">FAQ</h2>

        <div className="mt-4 space-y-4 text-slate-600 dark:text-slate-300">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Como funciona a compressão de imagem online?</h3>
            <p className="mt-1">
              A imagem é processada diretamente no seu navegador: ajustamos a qualidade e, se necessário, redimensionamos
              para reduzir o tamanho final.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Minhas imagens são enviadas a algum servidor?</h3>
            <p className="mt-1">Não. A compressão acontece 100% no seu dispositivo e o arquivo não é enviado para servidores.</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">A compressão reduz qualidade?</h3>
            <p className="mt-1">
              Pode reduzir. O controle de qualidade permite equilibrar tamanho e fidelidade visual. Em geral, 70%–85% é um
              bom ponto de partida.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Quais formatos são suportados?</h3>
            <p className="mt-1">PNG, JPG/JPEG e WebP.</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">É seguro usar?</h3>
            <p className="mt-1">
              Sim — o processamento ocorre no navegador. Mesmo assim, evite selecionar imagens com informações sensíveis
              em computadores públicos.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Quanto posso reduzir?</h3>
            <p className="mt-1">
              Depende do formato, dimensões e conteúdo da imagem. Fotos costumam reduzir bastante com qualidade entre 60%
              e 85%. Imagens já otimizadas podem reduzir pouco.
            </p>
          </div>
        </div>
      </section>

      <AdSlot
        slot={SITE.adsenseSlots.toolsExtra4}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        minHeight={250}
      />

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-lg font-bold">Privacidade</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          A ferramenta processa imagens localmente no seu navegador. Nenhum arquivo é enviado ao servidor. Ainda assim,
          evite usar imagens com dados sensíveis. Leia também a{" "}
          <a className="font-semibold" href="/politica-de-privacidade">
            Política de Privacidade
          </a>
          .
        </p>
      </section>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
        Ver mais ferramentas em <a href="/tools">/tools</a>.
      </p>
    </main>
  );
}
