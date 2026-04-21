"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/lib/mode-store";
import { FileTree } from "./file-tree";

export function TitleBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { exitIDE } = useMode();

  return (
    <>
      <div className="flex items-center h-[28px] bg-[#1e1e1e] dark:bg-[#1e1e1e] border-b border-[#2d2d2d] select-none px-3 shrink-0">
        {/* Traffic lights + Portfolio back button - desktop */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={exitIDE}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
            title="Back to Portfolio"
          />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all" />
          <button
            onClick={exitIDE}
            className="ml-2 text-[10px] font-mono text-[#8b8b8b] hover:text-white transition-colors flex items-center gap-1"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Portfolio
          </button>
        </div>

        {/* Mobile: hamburger + back button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#8b8b8b] hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 4h12M2 8h12M2 12h12" />
            </svg>
          </button>
          <button
            onClick={exitIDE}
            className="text-[10px] font-mono text-[#8b8b8b] hover:text-white transition-colors flex items-center gap-0.5"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </button>
        </div>

        {/* Center title */}
        <div className="flex-1 text-center">
          <span className="font-mono text-[11px] text-[#8b8b8b]">
            Dhairya Patel — Portfolio
          </span>
        </div>

        {/* Right spacer for symmetry */}
        <div className="w-[52px] md:w-[80px]">
          <span className="md:hidden font-mono text-[10px] text-[#5a5a5a] text-right block">⌘K</span>
        </div>
      </div>

      {/* Mobile file drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 md:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed left-0 top-0 bottom-0 w-[280px] z-50 bg-[#1e1e1e] border-r border-[#2d2d2d] flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d2d2d]">
                <span className="font-mono text-[11px] text-[#8b8b8b] uppercase tracking-widest">
                  Explorer
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#8b8b8b] hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </button>
              </div>
              <div className="px-2 py-2">
                <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono text-[#cccccc] uppercase tracking-wide font-semibold">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                  dhairya-patel
                </div>
              </div>
              <div className="flex-1 overflow-y-auto ide-scrollbar" onClick={() => setMobileMenuOpen(false)}>
                <FileTree />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
