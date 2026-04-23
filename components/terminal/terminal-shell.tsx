"use client";

import { useState } from "react";
import { Ticker } from "./ticker";
import { HoldingsPanel } from "./holdings-panel";
import { TransactionsPanel } from "./transactions-panel";
import { ResearchPanel } from "./research-panel";
import { PositionsPanel } from "./positions-panel";
import { FunctionBar } from "./function-bar";
import { Terminal } from "./terminal";

export function TerminalShell() {
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <div id="main-content" className="h-screen flex flex-col bg-bg text-fg crt-overlay overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--border-color)] bg-[var(--term-panel)]">
        <div className="flex items-center gap-4 font-mono-terminal text-term-sm">
          <span className="text-fg font-bold">DP&gt;</span>
          <span className="text-[var(--term-white)]">DHAIRYA PATEL</span>
          <span className="text-fg-secondary">KITCH.ON</span>
        </div>
        <div className="flex items-center gap-4 font-mono-terminal text-term-xs">
          <span className="text-[var(--term-green)]">STATUS: OPEN TO WORK</span>
          <button
            onClick={() => setShowTerminal(!showTerminal)}
            className="text-fg-secondary hover:text-fg transition-colors"
            aria-label={showTerminal ? "Hide terminal" : "Show terminal"}
          >
            {showTerminal ? "[PANELS]" : "[TERM]"}
          </button>
        </div>
      </div>

      {/* Ticker */}
      <Ticker />

      {/* Main content */}
      {showTerminal ? (
        <div className="flex-1 overflow-hidden">
          <Terminal />
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 grid-rows-2 overflow-hidden">
          {/* Top left: Holdings */}
          <div className="border-r border-b border-[var(--border-color)] overflow-hidden">
            <HoldingsPanel />
          </div>

          {/* Top right: Transactions */}
          <div className="border-b border-[var(--border-color)] overflow-hidden">
            <TransactionsPanel />
          </div>

          {/* Bottom left: Research */}
          <div className="border-r border-[var(--border-color)] overflow-hidden">
            <ResearchPanel />
          </div>

          {/* Bottom right: Positions */}
          <div className="overflow-hidden">
            <PositionsPanel />
          </div>
        </div>
      )}

      {/* Function bar */}
      <FunctionBar />
    </div>
  );
}
