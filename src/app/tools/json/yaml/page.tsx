import { ToolPage } from "@/ui/components/tools/ToolPage";
import { getDict } from "@/application/i18nServer";
import { JsonYamlClient } from "./JsonYamlClient";

interface Props {
  searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const sp = await searchParams;
  const dict = getDict(sp?.lang);
  return {
    title: dict["tools.json.yaml.meta.title"],
    description: dict["tools.json.yaml.meta.description"],
  };
}

export default async function JsonYamlPage({ searchParams }: Props) {
  const sp = await searchParams;
  const dict = getDict(sp?.lang);

  return (
    <ToolPage>
      <JsonYamlClient dict={dict} />
    </ToolPage>
  );
}
