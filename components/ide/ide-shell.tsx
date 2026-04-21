"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { IDEStoreProvider, useIDE } from "@/lib/ide-store";
import { TitleBar } from "./title-bar";
import { ActivityBar } from "./activity-bar";
import { Sidebar } from "./sidebar";
import { EditorArea } from "./editor-area";
import { BottomPanel } from "./bottom-panel";
import { StatusBar } from "./status-bar";
import { CommandPalette } from "../command-palette";

function IDELayout() {
  const { toggleSidebar, toggleTerminal, closeTab, activeTab } = useIDE();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+B → toggle sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
      // Cmd+` → toggle terminal
      if ((e.metaKey || e.ctrlKey) && e.key === "`") {
        e.preventDefault();
        toggleTerminal();
      }
      // Cmd+W → close active tab
      if ((e.metaKey || e.ctrlKey) && e.key === "w") {
        e.preventDefault();
        if (activeTab) closeTab(activeTab);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar, toggleTerminal, closeTab, activeTab]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="h-screen w-screen overflow-hidden flex flex-col bg-[#1f1f1f]"
    >
      {/* Title bar */}
      <TitleBar />

      {/* Main area: activity bar + sidebar + editor */}
      <div className="flex flex-1 min-h-0">
        {/* Activity bar - hidden on mobile */}
        <div className="hidden md:flex">
          <ActivityBar />
        </div>

        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        {/* Editor + bottom panel */}
        <div className="flex flex-col flex-1 min-w-0">
          <EditorArea />
          <BottomPanel />
        </div>
      </div>

      {/* Status bar */}
      <StatusBar />

      {/* Command palette overlay */}
      <CommandPalette />
    </motion.div>
  );
}

export function IDEShell() {
  return (
    <IDEStoreProvider>
      <IDELayout />
    </IDEStoreProvider>
  );
}
