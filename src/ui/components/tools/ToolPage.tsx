import React from "react";
import { SITE } from "@/application/siteConfig";
import { AdSlot } from "@/ui/components/AdSlot";

export function ToolPage({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Respawn Tech Tools",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          {children}
          <div className="mt-8">
            <AdSlot slot={SITE.adsenseSlots.toolsExtra3} />
          </div>
        </div>
        <div className="space-y-8">
          <div className="sticky top-24">
            <AdSlot slot={SITE.adsenseSlots.tools} minHeight={600} />
          </div>
        </div>
      </div>
    </div>
  );
}
