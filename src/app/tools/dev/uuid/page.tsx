import { ToolPage } from "@/ui/components/tools/ToolPage";
import { getDict } from "@/application/i18nServer";
import { UuidClient } from "./UuidClient";

interface Props {
  searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const sp = await searchParams;
  const dict = getDict(sp?.lang);
  return {
    title: dict["tools.dev.uuid.meta.title"],
    description: dict["tools.dev.uuid.meta.description"],
  };
}

export default async function UuidPage({ searchParams }: Props) {
  const sp = await searchParams;
  const dict = getDict(sp?.lang);

  return (
    <ToolPage>
      <UuidClient dict={dict} />
    </ToolPage>
  );
}
