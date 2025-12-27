import { ToolPage } from "@/ui/components/tools/ToolPage";
import { getDict } from "@/application/i18nServer";
import { Base64Client } from "./Base64Client";

interface Props {
  searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const sp = await searchParams;
  const dict = getDict(sp?.lang);
  return {
    title: dict["tools.text.base64.meta.title"],
    description: dict["tools.text.base64.meta.description"],
  };
}

export default async function Base64Page({ searchParams }: Props) {
  const sp = await searchParams;
  const dict = getDict(sp?.lang);

  return (
    <ToolPage>
      <Base64Client dict={dict} />
    </ToolPage>
  );
}
