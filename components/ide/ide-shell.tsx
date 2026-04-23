"use client";

import { useEffect } from "react";
import { IDEStoreProvider, useIDE } from "@/lib/ide-store";
import { TitleBar } from "./title-bar";
import { ActivityBar } from "./activity-bar";
import { Sidebar } from "./sidebar";
import { EditorArea } from "./editor-area";
import { BottomPanel } from "./bottom-panel";
import { StatusBar } from "./status-bar";
import { CommandPalette } from "../command-palette";

function IDEInner() {
  const { toggleSidebar, toggleTerminal, closeTab, activeTab } = useIDE();

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", "ide");
    return () => {
      document.documentElement.setAttribute("data-mode", "editorial");
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
      if (meta && e.key === "`") {
        e.preventDefault();
        toggleTerminal();
      }
      if (meta && e.key === "w") {
        e.preventDefault();
        if (activeTab) closeTab(activeTab);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar, toggleTerminal, closeTab, activeTab]);

  return (
    <div id="main-content" className="h-screen w-screen flex flex-col bg-[#1e1e1e] text-[#d4d4d4] overflow-hidden select-none">
      <TitleBar />
      <div className="flex flex-1 min-h-0">
        <ActivityBar />
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <EditorArea />
          <BottomPanel />
        </div>
      </div>
      <StatusBar />
      <CommandPalette />
    </div>
  );
}

export function IDEShell() {
  return (
    <IDEStoreProvider>
      <IDEInner />
    </IDEStoreProvider>
  );
}
