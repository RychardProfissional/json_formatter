import { ToolPage } from "@/ui/components/tools/ToolPage";
import { getDict } from "@/application/i18nServer";
import { JsonXmlClient } from "./JsonXmlClient";

interface Props {
  searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const sp = await searchParams;
  const dict = getDict(sp?.lang);
  return {
    title: dict["tools.json.xml.meta.title"],
    description: dict["tools.json.xml.meta.description"],
  };
}

export default async function JsonXmlPage({ searchParams }: Props) {
  const sp = await searchParams;
  const dict = getDict(sp?.lang);

  return (
    <ToolPage>
      <JsonXmlClient dict={dict} />
    </ToolPage>
  );
}
