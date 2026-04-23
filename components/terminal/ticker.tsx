"use client";

import { tickerItems } from "@/data/meta";

export function Ticker() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="overflow-hidden border-b border-[var(--border-color)] bg-[var(--term-panel)]">
      <div
        className="flex whitespace-nowrap animate-ticker hover:[animation-play-state:paused]"
        aria-label="Scrolling ticker"
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-6 py-1 font-mono-terminal text-term-xs text-fg"
          >
            <span className="text-[var(--term-green)]">&#9650;</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
