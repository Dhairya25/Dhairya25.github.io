"use client";

import { siteConfig } from "@/data/meta";

export function EditorialFooter() {
  const dateStr = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <footer className="editorial-container py-8 border-t border-fg/10">
      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-fg-secondary">
        {siteConfig.name} / {siteConfig.location} / Last published {dateStr}
      </p>
    </footer>
  );
}
