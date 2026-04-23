"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { getAllFiles } from "@/lib/ide-files";
import { useIDE } from "@/lib/ide-store";
import { useMode } from "@/lib/mode-store";
import { siteConfig } from "@/data/meta";

const FILE_ITEMS = getAllFiles().map((f) => ({
  id: f.id,
  label: f.name,
  path: f.path,
}));

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { openFile, toggleTerminal, toggleSidebar } = useIDE();
  const { setMode } = useMode();

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

    switch (id) {
      case "cmd-terminal":
        toggleTerminal();
        break;
      case "cmd-sidebar":
        toggleSidebar();
        break;
      case "cmd-mode-editorial":
        setMode("editorial");
        break;
      case "cmd-mode-terminal":
        setMode("terminal");
        break;
      case "cmd-copy-email":
        navigator.clipboard.writeText(siteConfig.email);
        break;
      case "cmd-copy-phone":
        navigator.clipboard.writeText(siteConfig.phone);
        break;
      case "cmd-github":
        window.open(siteConfig.github, "_blank");
        break;
      case "cmd-linkedin":
        window.open(siteConfig.linkedin, "_blank");
        break;
      case "cmd-resume-cs":
        window.open(siteConfig.resumes.cs, "_blank");
        break;
      case "cmd-resume-bba":
        window.open(siteConfig.resumes.bba, "_blank");
        break;
      default:
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
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#8b8b8b] cursor-pointer data-[selected=true]:bg-[#569cd6]/10 data-[selected=true]:text-[#cccccc] transition-colors"
                    >
                      <span className="flex-1 truncate font-mono">{item.label}</span>
                      <span className="font-mono text-[10px] text-[#5a5a5a]">{item.path}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading={<span className="font-mono text-[10px] text-[#5a5a5a] uppercase tracking-widest px-2 mt-2">Commands</span>}>
                  {[
                    { id: "cmd-terminal", label: "Toggle Terminal", kbd: "Ctrl+`" },
                    { id: "cmd-sidebar", label: "Toggle Sidebar", kbd: "Cmd+B" },
                    { id: "cmd-mode-editorial", label: "Switch to Editorial" },
                    { id: "cmd-mode-terminal", label: "Switch to Terminal" },
                    { id: "cmd-resume-cs", label: "Open Resume (CS)" },
                    { id: "cmd-resume-bba", label: "Open Resume (BBA)" },
                    { id: "cmd-copy-email", label: "Copy Email" },
                    { id: "cmd-copy-phone", label: "Copy Phone" },
                    { id: "cmd-github", label: "Open GitHub" },
                    { id: "cmd-linkedin", label: "Open LinkedIn" },
                  ].map((cmd) => (
                    <Command.Item
                      key={cmd.id}
                      value={cmd.label}
                      onSelect={() => handleSelect(cmd.id)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#8b8b8b] cursor-pointer data-[selected=true]:bg-[#569cd6]/10 data-[selected=true]:text-[#cccccc] transition-colors font-mono"
                    >
                      <span className="flex-1">{cmd.label}</span>
                      {cmd.kbd && (
                        <kbd className="text-[10px] text-[#5a5a5a] bg-[#2d2d2d] px-1.5 py-0.5 rounded">
                          {cmd.kbd}
                        </kbd>
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
