"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { FILES, getFilePath } from "@/lib/file-registry";
import { useIDE } from "@/lib/ide-store";
import { useTheme } from "@/components/theme-provider";

const FILE_ITEMS = FILES.map((f) => ({
  id: f.id,
  label: f.name,
  path: getFilePath(f.id),
}));

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { openFile, toggleTerminal, toggleSidebar } = useIDE();
  const { toggle: toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (id: string) => {
    setOpen(false);

    if (id === "cmd-terminal") {
      toggleTerminal();
    } else if (id === "cmd-sidebar") {
      toggleSidebar();
    } else if (id === "cmd-theme") {
      toggleTheme();
    } else {
      openFile(id);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg"
          >
            <Command className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl shadow-2xl overflow-hidden">
              <Command.Input
                placeholder="Search files and commands..."
                className="w-full px-4 py-3 bg-transparent text-sm text-[#cccccc] placeholder:text-[#5a5a5a] border-b border-[#2d2d2d] outline-none font-mono"
                autoFocus
              />
              <Command.List className="max-h-64 overflow-y-auto p-2">
                <Command.Empty className="px-4 py-8 text-center text-sm text-[#8b8b8b]">
                  No results found.
                </Command.Empty>

                <Command.Group heading={<span className="font-mono text-[10px] text-[#5a5a5a] uppercase tracking-widest px-2">Files</span>}>
                  {FILE_ITEMS.map((item) => (
                    <Command.Item
                      key={item.id}
                      value={`${item.label} ${item.path}`}
                      onSelect={() => handleSelect(item.id)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8b8b8b] cursor-pointer data-[selected=true]:bg-accent/10 data-[selected=true]:text-[#cccccc] transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-accent">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7Z" />
                        <path d="M13 2v7h7" />
                      </svg>
                      <span className="flex-1 truncate">{item.label}</span>
                      <span className="font-mono text-[10px] text-[#5a5a5a]">{item.path}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading={<span className="font-mono text-[10px] text-[#5a5a5a] uppercase tracking-widest px-2 mt-2">Commands</span>}>
                  <Command.Item
                    value="Toggle Terminal"
                    onSelect={() => handleSelect("cmd-terminal")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8b8b8b] cursor-pointer data-[selected=true]:bg-accent/10 data-[selected=true]:text-[#cccccc] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-[#5a5a5a]">
                      <path d="M4 17l6-6-6-6M12 19h8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="flex-1">Toggle Terminal</span>
                    <kbd className="font-mono text-[10px] text-[#5a5a5a] bg-[#2d2d2d] px-1.5 py-0.5 rounded">⌘`</kbd>
                  </Command.Item>
                  <Command.Item
                    value="Toggle Sidebar"
                    onSelect={() => handleSelect("cmd-sidebar")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8b8b8b] cursor-pointer data-[selected=true]:bg-accent/10 data-[selected=true]:text-[#cccccc] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-[#5a5a5a]">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M9 3v18" />
                    </svg>
                    <span className="flex-1">Toggle Sidebar</span>
                    <kbd className="font-mono text-[10px] text-[#5a5a5a] bg-[#2d2d2d] px-1.5 py-0.5 rounded">⌘B</kbd>
                  </Command.Item>
                  <Command.Item
                    value="Toggle Theme"
                    onSelect={() => handleSelect("cmd-theme")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8b8b8b] cursor-pointer data-[selected=true]:bg-accent/10 data-[selected=true]:text-[#cccccc] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-[#5a5a5a]">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
                    </svg>
                    <span className="flex-1">Toggle Theme</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
