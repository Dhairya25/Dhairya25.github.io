"use client";

import { nowItems } from "@/data/meta";

export function NowBlock() {
  const lastUpdated = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <aside className="editorial-container pb-12">
      <div className="border border-fg/15 p-5 max-w-[600px]">
        <div className="flex items-start gap-4">
          <span className="font-mono text-[10px] tracking-[0.15em] text-accent font-semibold shrink-0 pt-0.5">
            NOW
          </span>
          <div className="space-y-1.5 font-serif text-scale-2 text-fg-secondary leading-relaxed">
            {nowItems.map((item) => (
              <p key={item.label}>
                <span className="font-mono text-[10px] tracking-[0.1em] text-fg/60 uppercase mr-2">
                  {item.label}:
                </span>
                {item.value}
              </p>
            ))}
            <p className="font-mono text-[10px] tracking-[0.1em] text-fg/40 uppercase pt-1">
              Last updated: {lastUpdated}.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
