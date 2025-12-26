export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Respawn Tech</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Migração para Next.js em andamento. Em breve: home institucional, blog e ferramentas em
        <span className="font-semibold"> /tools</span>.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          href="/tools"
        >
          Acessar ferramentas
        </a>
        <a
          className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900"
          href="/blog"
        >
          Ler o blog
        </a>
      </div>
    </main>
  );
}
