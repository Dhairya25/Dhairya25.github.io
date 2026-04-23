"use client";

import { siteConfig } from "@/data/meta";

function getFormattedDate() {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return now.toLocaleDateString("en-CA", options);
}

export function Masthead() {
  const dateStr = getFormattedDate();

  return (
    <header className="editorial-container pt-20 pb-6">
      <div className="border-y border-fg/20 py-3 flex justify-between items-start">
        <div>
          <h1 className="font-display text-scale-6 md:text-scale-7 tracking-tight leading-none">
            {siteConfig.name.toUpperCase()}
          </h1>
          <p className="font-mono text-[10px] tracking-[0.1em] text-fg-secondary mt-1.5">
            {siteConfig.location}. {dateStr}.
          </p>
        </div>
        <div className="text-right font-mono text-[10px] tracking-[0.1em] text-fg-secondary">
          <p>VOL. {siteConfig.volume}</p>
          <p className="mt-0.5">ISSUE {siteConfig.issue}</p>
        </div>
      </div>
    </header>
  );
}
