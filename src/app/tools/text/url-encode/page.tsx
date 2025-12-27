import { ToolPage } from "@/ui/components/tools/ToolPage";
import { getDict } from "@/application/i18nServer";
import { UrlClient } from "./UrlClient";

interface Props {
  searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const sp = await searchParams;
  const dict = getDict(sp?.lang);
  return {
    title: dict["tools.text.url.meta.title"],
    description: dict["tools.text.url.meta.description"],
  };
}

export default async function UrlPage({ searchParams }: Props) {
  const sp = await searchParams;
  const dict = getDict(sp?.lang);

  return (
    <ToolPage>
      <UrlClient dict={dict} />
    </ToolPage>
  );
}
