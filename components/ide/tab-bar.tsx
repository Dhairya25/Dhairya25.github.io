"use client";

import { useIDE } from "@/lib/ide-store";
import { ICON_COLORS, type FileIcon } from "@/lib/file-registry";

function SmallFileIcon({ icon }: { icon: FileIcon }) {
  const color = ICON_COLORS[icon];

  if (icon === "markdown") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill={color} className="shrink-0">
        <path d="M2 2h12v12H2V2zm1.5 9V5h1.5l1.5 2 1.5-2H9.5v6H8V7.5L6.5 9.5 5 7.5V11H3.5zm8 0L9 8.5h1.5V5h1.5v3.5H13.5L11.5 11z" />
      </svg>
    );
  }
  if (icon === "typescript") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
        <rect x="1" y="1" width="14" height="14" rx="2" fill={color} />
        <text x="8" y="12" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">TS</text>
      </svg>
    );
  }
  if (icon === "react") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill={color} className="shrink-0">
        <circle cx="8" cy="8" r="1.2" />
        <ellipse cx="8" cy="8" rx="6.5" ry="2.5" fill="none" stroke={color} strokeWidth="0.7" />
        <ellipse cx="8" cy="8" rx="6.5" ry="2.5" fill="none" stroke={color} strokeWidth="0.7" transform="rotate(60 8 8)" />
        <ellipse cx="8" cy="8" rx="6.5" ry="2.5" fill="none" stroke={color} strokeWidth="0.7" transform="rotate(120 8 8)" />
      </svg>
    );
  }
  if (icon === "json") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
        <rect x="1" y="1" width="14" height="14" rx="2" stroke={color} strokeWidth="1" />
        <text x="8" y="11.5" textAnchor="middle" fill={color} fontSize="7" fontWeight="bold" fontFamily="monospace">{"{}"}</text>
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className="shrink-0">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7Z" />
      <path d="M13 2v7h7" />
    </svg>
  );
}

export function TabBar() {
  const { openTabs, activeTab, setActiveTab, closeTab } = useIDE();

  if (openTabs.length === 0) return null;

  return (
    <div className="flex bg-[#1e1e1e] border-b border-[#2d2d2d] overflow-x-auto ide-scrollbar select-none">
      {openTabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group flex items-center gap-2 px-3 py-1.5 border-r border-[#2d2d2d] font-mono text-[12px] cursor-pointer whitespace-nowrap min-w-0 transition-colors ${
              isActive
                ? "bg-[#1f1f1f] text-white border-t-2 border-t-accent"
                : "bg-[#2d2d2d] text-[#8b8b8b] hover:bg-[#1f1f1f] border-t-2 border-t-transparent"
            }`}
          >
            <SmallFileIcon icon={tab.file.icon} />
            <span className="truncate">{tab.file.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className={`ml-1 w-[18px] h-[18px] flex items-center justify-center rounded hover:bg-[#444] transition-colors ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
