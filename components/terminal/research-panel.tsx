"use client";

import { useState } from "react";
import { researchNotes } from "@/data/meta";

export function ResearchPanel() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-3 py-1.5 border-b border-[var(--border-color)] bg-[var(--term-panel)]">
        <span className="font-mono-terminal text-term-xs text-fg font-bold tracking-wider">
          RESEARCH
        </span>
      </div>
      <div className="flex-1 overflow-auto">
        {researchNotes.map((note) => (
          <button
            key={note.symbol}
            onClick={() => setExpanded(expanded === note.symbol ? null : note.symbol)}
            className="w-full text-left border-b border-[var(--border-color)] hover:bg-[rgba(232,177,58,0.05)] focus:outline-none"
          >
            <div className="px-3 py-2 font-mono-terminal text-term-xs">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-fg font-bold">{note.symbol}</span>
                <span className="text-fg-secondary">{note.date}</span>
              </div>
              <div className="mt-1 text-[var(--term-white)]">{note.thesis}</div>

              {expanded === note.symbol && (
                <div className="mt-2 space-y-1 text-fg-secondary">
                  <div>
                    <span className="text-fg">MECHANISM: </span>
                    {note.mechanism}
                  </div>
                  <div>
                    <span className="text-[var(--term-red)]">RISK: </span>
                    {note.risk}
                  </div>
                  <div className="text-fg-secondary">
                    <span className="text-fg">ANALYST: </span>
                    {note.author}
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
