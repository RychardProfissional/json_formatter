import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">Página não encontrada</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        O endereço pode ter mudado. Volte para a <Link className="font-semibold" href="/">home</Link>.
      </p>
    </main>
  );
}
