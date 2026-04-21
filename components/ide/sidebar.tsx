"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIDE } from "@/lib/ide-store";
import { FileTree } from "./file-tree";

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useIDE();

  return (
    <AnimatePresence initial={false}>
      {sidebarOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 240, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="bg-[#1e1e1e] border-r border-[#2d2d2d] overflow-hidden flex flex-col shrink-0"
        >
          {/* Explorer header */}
          <div className="flex items-center justify-between px-4 py-2 min-w-[240px]">
            <span className="font-mono text-[11px] text-[#8b8b8b] uppercase tracking-widest">
              Explorer
            </span>
            <button
              onClick={toggleSidebar}
              className="text-[#8b8b8b] hover:text-white transition-colors"
              title="Close sidebar"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M15 8H1M1 8l5-5M1 8l5 5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Project name section */}
          <div className="px-2 min-w-[240px]">
            <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono text-[#cccccc] uppercase tracking-wide font-semibold">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6 4l4 4-4 4" />
              </svg>
              dhairya-patel
            </div>
          </div>

          {/* File tree */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden min-w-[240px] ide-scrollbar">
            <FileTree />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
