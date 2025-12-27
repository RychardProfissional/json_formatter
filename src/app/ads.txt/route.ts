import { SITE } from "@/application/siteConfig";

export async function GET() {
  const publisherId = SITE.adsenseClient.replace("ca-", "");
  const content = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
