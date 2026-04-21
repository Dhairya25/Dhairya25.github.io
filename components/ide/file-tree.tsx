"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIDE } from "@/lib/ide-store";
import { getFilesByFolder, ICON_COLORS, type FileEntry, type FileIcon } from "@/lib/file-registry";

function FileIconSvg({ icon }: { icon: FileIcon }) {
  const color = ICON_COLORS[icon];

  if (icon === "markdown") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
        <path d="M2 2h12v12H2V2zm1.5 9V5h1.5l1.5 2 1.5-2H9.5v6H8V7.5L6.5 9.5 5 7.5V11H3.5zm8 0L9 8.5h1.5V5h1.5v3.5H13.5L11.5 11z" />
      </svg>
    );
  }

  if (icon === "typescript") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="14" height="14" rx="2" fill={color} />
        <text x="8" y="12" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace">TS</text>
      </svg>
    );
  }

  if (icon === "react") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
        <circle cx="8" cy="8" r="1.5" />
        <ellipse cx="8" cy="8" rx="7" ry="3" fill="none" stroke={color} strokeWidth="0.8" />
        <ellipse cx="8" cy="8" rx="7" ry="3" fill="none" stroke={color} strokeWidth="0.8" transform="rotate(60 8 8)" />
        <ellipse cx="8" cy="8" rx="7" ry="3" fill="none" stroke={color} strokeWidth="0.8" transform="rotate(120 8 8)" />
      </svg>
    );
  }

  if (icon === "json") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="14" height="14" rx="2" fill="transparent" stroke={color} strokeWidth="1" />
        <text x="8" y="11.5" textAnchor="middle" fill={color} fontSize="7" fontWeight="bold" fontFamily="monospace">{"{}"}</text>
      </svg>
    );
  }

  // text
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7Z" />
      <path d="M13 2v7h7" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      animate={{ rotate: open ? 90 : 0 }}
      transition={{ duration: 0.15 }}
      className="shrink-0"
    >
      <path d="M6 4l4 4-4 4" />
    </motion.svg>
  );
}

function FolderIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="#dcb67a">
        <path d="M1.5 13.5V3a1 1 0 0 1 1-1h3.29a1 1 0 0 1 .7.29L7.71 3.5H13a1 1 0 0 1 1 1V5H3.5L2 13h11.5l1.5-7H3.5" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="#dcb67a">
      <path d="M1.5 13V3a1 1 0 0 1 1-1h3.29a1 1 0 0 1 .7.29L7.71 3.5H13.5a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function FileNode({ file }: { file: FileEntry }) {
  const { activeTab, openFile } = useIDE();
  const isActive = activeTab === file.id;

  return (
    <button
      onClick={() => openFile(file.id)}
      className={`w-full flex items-center gap-1.5 pl-6 pr-2 py-[3px] text-[13px] font-mono transition-colors truncate ${
        isActive
          ? "bg-[#37373d] text-white"
          : "text-[#cccccc] hover:bg-[#2a2d2e]"
      }`}
    >
      <FileIconSvg icon={file.icon} />
      <span className="truncate">{file.name}</span>
    </button>
  );
}

function FolderNode({ name, files }: { name: string; files: FileEntry[] }) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-1 pl-2 pr-2 py-[3px] text-[13px] font-mono text-[#cccccc] hover:bg-[#2a2d2e] transition-colors"
      >
        <ChevronIcon open={open} />
        <FolderIcon open={open} />
        <span className="truncate">{name}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            {files.map((file) => (
              <div key={file.id} className="pl-3">
                <FileNode file={file} />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FileTree() {
  const { root, folders } = getFilesByFolder();

  return (
    <div className="py-1">
      {/* Root files first that come before src folder */}
      {root.filter((f) => f.id === "readme").map((file) => (
        <FileNode key={file.id} file={file} />
      ))}

      {/* Folders */}
      {folders.map((folder) => (
        <FolderNode key={folder.name} name={folder.name} files={folder.files} />
      ))}

      {/* Root files after folders */}
      {root.filter((f) => f.id !== "readme").map((file) => (
        <FileNode key={file.id} file={file} />
      ))}
    </div>
  );
}
