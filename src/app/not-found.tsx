import Link from "next/link";
import { getDict } from "@/application/i18nServer";

export default function NotFound() {
  const dict = getDict("pt-BR"); // Default to pt-BR for 404 as we might not have context

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold">{dict["404.title"]}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        {dict["404.body.before"]}
        <Link className="font-semibold" href="/">
          {dict["404.body.link"]}
        </Link>
        {dict["404.body.after"]}
      </p>
    </div>
  );
}
