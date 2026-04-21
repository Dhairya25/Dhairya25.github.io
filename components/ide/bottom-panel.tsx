"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIDE } from "@/lib/ide-store";
import { Terminal } from "../terminal/terminal";

export function BottomPanel() {
  const { terminalOpen, toggleTerminal } = useIDE();

  return (
    <div className="border-t border-[#2d2d2d] bg-[#1e1e1e]">
      {/* Panel toggle bar */}
      <button
        onClick={toggleTerminal}
        className="w-full flex items-center gap-2 px-4 py-1 text-[11px] font-mono text-[#8b8b8b] hover:text-white transition-colors select-none"
      >
        <motion.svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="currentColor"
          animate={{ rotate: terminalOpen ? 180 : 0 }}
          transition={{ duration: 0.15 }}
        >
          <path d="M4 6l4 4 4-4" />
        </motion.svg>
        <span className="uppercase tracking-widest text-[10px]">Terminal</span>
        <span className="text-[10px] text-[#5a5a5a] ml-auto">
          {terminalOpen ? "⌘`" : "⌘` to open"}
        </span>
      </button>

      {/* Terminal content */}
      <AnimatePresence initial={false}>
        {terminalOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 220, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="h-[220px]">
              <Terminal />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
