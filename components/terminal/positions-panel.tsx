"use client";

import { positions } from "@/data/meta";

const stanceStyle: Record<string, string> = {
  LONG: "text-[var(--term-green)]",
  SHORT: "text-[var(--term-red)]",
  NEUTRAL: "text-fg-secondary",
};

const stanceIcon: Record<string, string> = {
  LONG: "\u25B2",    // ▲
  SHORT: "\u25BC",   // ▼
  NEUTRAL: "\u25C6", // ◆
};

export function PositionsPanel() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-3 py-1.5 border-b border-[var(--border-color)] bg-[var(--term-panel)]">
        <span className="font-mono-terminal text-term-xs text-fg font-bold tracking-wider">
          POSITIONS
        </span>
      </div>
      <div className="flex-1 overflow-auto">
        {positions.map((p, i) => (
          <div
            key={i}
            className="flex items-start gap-2 px-3 py-2 border-b border-[var(--border-color)] font-mono-terminal text-term-xs hover:bg-[rgba(232,177,58,0.05)]"
          >
            <span className={`shrink-0 font-bold ${stanceStyle[p.stance]}`}>
              {stanceIcon[p.stance]} {p.stance}
            </span>
            <span className="text-[var(--term-white)]">{p.statement}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
