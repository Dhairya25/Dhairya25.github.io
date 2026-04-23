"use client";

import { useState } from "react";
import { useIDE } from "@/lib/ide-store";
import { fileTree, isFolder, isFile, type TreeNode, type VirtualFolder, type VirtualFile } from "@/lib/ide-files";

const FILE_ICON_COLORS: Record<string, string> = {
  md: "#519aba",
  ts: "#3178c6",
  tsx: "#61dafb",
  py: "#3572a5",
  vba: "#867db1",
  ps1: "#012456",
  json: "#cbcb41",
};

function getIconColor(name: string): string {
  const ext = name.split(".").pop() || "";
  return FILE_ICON_COLORS[ext] || "#a6a6a6";
}

function FolderNode({ folder, depth }: { folder: VirtualFolder; depth: number }) {
  const [expanded, setExpanded] = useState(folder.expanded ?? false);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-1 py-[2px] hover:bg-[#2a2d2e] text-[13px] text-[#cccccc] font-mono"
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          className={`shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`}
        >
          <path d="M6 4l4 4-4 4" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0" fill={expanded ? "#dcb67a" : "#c09553"}>
          {expanded ? (
            <path d="M1.5 14h13l-1.5-8H7L5.5 4H1.5v10z" />
          ) : (
            <path d="M1.5 2.5v11h13v-8.5H7L5.5 2.5H1.5z" />
          )}
        </svg>
        <span className="truncate">{folder.name}</span>
      </button>
      {expanded && (
        <div>
          {folder.children.map((child) => (
            <TreeNodeComponent key={isFile(child) ? child.id : (child as VirtualFolder).path} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function FileNode({ file, depth }: { file: VirtualFile; depth: number }) {
  const { openFile, activeTab } = useIDE();
  const isActive = activeTab === file.id;
  const color = getIconColor(file.name);

  return (
    <button
      onClick={() => openFile(file.id)}
      className={`w-full flex items-center gap-1.5 py-[2px] text-[13px] font-mono ${
        isActive ? "bg-[#37373d] text-white" : "text-[#cccccc] hover:bg-[#2a2d2e]"
      }`}
      style={{ paddingLeft: `${depth * 16 + 20}px` }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" className="shrink-0">
        <rect x="2" y="1" width="12" height="14" rx="1" fill="none" stroke={color} strokeWidth="1" />
        <rect x="4" y="4" width="8" height="1" fill={color} opacity="0.5" />
        <rect x="4" y="7" width="6" height="1" fill={color} opacity="0.5" />
        <rect x="4" y="10" width="7" height="1" fill={color} opacity="0.5" />
      </svg>
      <span className="truncate">{file.name}</span>
    </button>
  );
}

function TreeNodeComponent({ node, depth }: { node: TreeNode; depth: number }) {
  if (isFolder(node)) {
    return <FolderNode folder={node} depth={depth} />;
  }
  return <FileNode file={node as VirtualFile} depth={depth} />;
}

export function FileTree() {
  return (
    <div className="py-1 text-[13px]">
      <div className="flex items-center gap-1.5 px-4 py-1 text-[11px] font-mono text-[#cccccc] uppercase tracking-wide font-semibold">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="rotate-90">
          <path d="M6 4l4 4-4 4" />
        </svg>
        dhairya.portfolio
      </div>
      {fileTree.children.map((child) => (
        <TreeNodeComponent
          key={isFile(child) ? (child as VirtualFile).id : (child as VirtualFolder).path}
          node={child}
          depth={1}
        />
      ))}
    </div>
  );
}
