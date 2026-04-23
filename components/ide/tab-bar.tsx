"use client";

import { useIDE } from "@/lib/ide-store";

const EXT_COLORS: Record<string, string> = {
  md: "#519aba",
  ts: "#3178c6",
  tsx: "#61dafb",
  py: "#3572a5",
  vba: "#867db1",
  ps1: "#012456",
  json: "#cbcb41",
};

function TabIcon({ name }: { name: string }) {
  const ext = name.split(".").pop() || "";
  const color = EXT_COLORS[ext] || "#a6a6a6";

  return (
    <svg width="14" height="14" viewBox="0 0 16 16" className="shrink-0">
      <rect x="2" y="1" width="12" height="14" rx="1" fill="none" stroke={color} strokeWidth="1" />
      <rect x="4" y="4" width="8" height="1" fill={color} opacity="0.5" />
      <rect x="4" y="7" width="6" height="1" fill={color} opacity="0.5" />
    </svg>
  );
}

export function TabBar() {
  const { openTabs, activeTab, setActiveTab, closeTab } = useIDE();

  if (openTabs.length === 0) return null;

  return (
    <div className="flex bg-[#1e1e1e] border-b border-[#2d2d2d] overflow-x-auto scrollbar-hide select-none">
      {openTabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group flex items-center gap-2 px-3 py-1.5 border-r border-[#2d2d2d] font-mono text-[12px] cursor-pointer whitespace-nowrap min-w-0 transition-colors ${
              isActive
                ? "bg-[#1f1f1f] text-white border-t-2 border-t-[#569cd6]"
                : "bg-[#2d2d2d] text-[#8b8b8b] hover:bg-[#1f1f1f] border-t-2 border-t-transparent"
            }`}
          >
            <TabIcon name={tab.file.name} />
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
