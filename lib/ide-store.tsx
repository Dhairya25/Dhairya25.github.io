"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { getFileById, type VirtualFile } from "./ide-files";

export interface FileTab {
  id: string;
  file: VirtualFile;
}

interface IDEState {
  openTabs: FileTab[];
  activeTab: string | null;
  sidebarOpen: boolean;
  terminalOpen: boolean;
  openFile: (id: string) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  toggleSidebar: () => void;
  toggleTerminal: () => void;
}

const IDEContext = createContext<IDEState | null>(null);

export function useIDE(): IDEState {
  const ctx = useContext(IDEContext);
  if (!ctx) throw new Error("useIDE must be used within IDEStoreProvider");
  return ctx;
}

export function IDEStoreProvider({ children }: { children: ReactNode }) {
  const [openTabs, setOpenTabs] = useState<FileTab[]>(() => {
    const readme = getFileById("root-readme");
    return readme ? [{ id: "root-readme", file: readme }] : [];
  });
  const [activeTab, setActiveTabState] = useState<string | null>("root-readme");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const openFile = useCallback((id: string) => {
    const file = getFileById(id);
    if (!file) return;

    setOpenTabs((prev) => {
      const exists = prev.find((t) => t.id === id);
      if (exists) return prev;
      return [...prev, { id, file }];
    });
    setActiveTabState(id);
  }, []);

  const closeTab = useCallback((id: string) => {
    setOpenTabs((prev) => {
      const idx = prev.findIndex((t) => t.id === id);
      if (idx === -1) return prev;
      const next = prev.filter((t) => t.id !== id);

      setActiveTabState((currentActive) => {
        if (currentActive !== id) return currentActive;
        if (next.length === 0) return null;
        const newIdx = Math.min(idx, next.length - 1);
        return next[newIdx].id;
      });

      return next;
    });
  }, []);

  const setActiveTab = useCallback((id: string) => {
    setActiveTabState(id);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const toggleTerminal = useCallback(() => {
    setTerminalOpen((prev) => !prev);
  }, []);

  return (
    <IDEContext.Provider
      value={{
        openTabs,
        activeTab,
        sidebarOpen,
        terminalOpen,
        openFile,
        closeTab,
        setActiveTab,
        toggleSidebar,
        toggleTerminal,
      }}
    >
      {children}
    </IDEContext.Provider>
  );
}
