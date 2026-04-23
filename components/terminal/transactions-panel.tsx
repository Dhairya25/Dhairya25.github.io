"use client";

import { transactions } from "@/data/meta";

const statusColor: Record<string, string> = {
  DELIVERED: "text-[var(--term-green)]",
  AWARDED: "text-[var(--term-green)]",
  "IN PROGRESS": "text-fg",
};

export function TransactionsPanel() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-3 py-1.5 border-b border-[var(--border-color)] bg-[var(--term-panel)]">
        <span className="font-mono-terminal text-term-xs text-fg font-bold tracking-wider">
          TRANSACTIONS
        </span>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full font-mono-terminal text-term-xs">
          <thead>
            <tr className="text-fg-secondary border-b border-[var(--border-color)]">
              <th className="text-left px-3 py-1.5 font-normal">NAME</th>
              <th className="text-left px-3 py-1.5 font-normal hidden sm:table-cell">TYPE</th>
              <th className="text-left px-3 py-1.5 font-normal">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.name}
                className="border-b border-[var(--border-color)] hover:bg-[rgba(232,177,58,0.05)]"
              >
                <td className="px-3 py-1.5 text-[var(--term-white)]">{t.name}</td>
                <td className="px-3 py-1.5 text-fg-secondary hidden sm:table-cell">{t.category}</td>
                <td className={`px-3 py-1.5 font-bold ${statusColor[t.status] || "text-fg"}`}>
                  {t.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
