"use client";

import { holdings } from "@/data/meta";

export function HoldingsPanel() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-3 py-1.5 border-b border-[var(--border-color)] bg-[var(--term-panel)]">
        <span className="font-mono-terminal text-term-xs text-fg font-bold tracking-wider">
          HOLDINGS
        </span>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full font-mono-terminal text-term-xs">
          <thead>
            <tr className="text-fg-secondary border-b border-[var(--border-color)]">
              <th className="text-left px-3 py-1.5 font-normal">TICKER</th>
              <th className="text-left px-3 py-1.5 font-normal">ROLE</th>
              <th className="text-left px-3 py-1.5 font-normal hidden md:table-cell">COMPANY</th>
              <th className="text-left px-3 py-1.5 font-normal">PERIOD</th>
              <th className="text-left px-3 py-1.5 font-normal hidden lg:table-cell">METRIC</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => (
              <tr
                key={h.ticker}
                className="border-b border-[var(--border-color)] hover:bg-[rgba(232,177,58,0.05)]"
              >
                <td className="px-3 py-1.5 text-fg font-bold">{h.ticker}</td>
                <td className="px-3 py-1.5 text-[var(--term-white)]">{h.role}</td>
                <td className="px-3 py-1.5 text-fg-secondary hidden md:table-cell">{h.company}</td>
                <td className="px-3 py-1.5 text-fg-secondary">
                  {h.start}&ndash;{h.end}
                </td>
                <td className="px-3 py-1.5 text-[var(--term-green)] hidden lg:table-cell">
                  {h.metric}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
