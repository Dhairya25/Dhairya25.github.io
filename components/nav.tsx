"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-24 h-16 bg-bg/80 backdrop-blur-md border-b border-border/50"
    >
      <a href="#hero" className="font-mono text-sm text-muted hover:text-text transition-colors">
        dhairya.
      </a>

      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            const event = new KeyboardEvent("keydown", {
              key: "k",
              metaKey: true,
            });
            document.dispatchEvent(event);
          }}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-xs text-muted hover:text-text hover:border-muted transition-colors font-mono"
        >
          <kbd className="text-[10px]">⌘</kbd>
          <kbd className="text-[10px]">K</kbd>
        </button>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
