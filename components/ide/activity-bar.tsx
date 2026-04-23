"use client";

import { useIDE } from "@/lib/ide-store";

const FILES_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7Z" />
    <path d="M13 2v7h7" />
  </svg>
);

const SEARCH_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const GIT_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <path d="M6 21V9a9 9 0 0 0 9 9" />
  </svg>
);

const EXTENSIONS_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const SETTINGS_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

interface ActivityItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  position?: "bottom";
}

export function ActivityBar() {
  const { sidebarOpen, toggleSidebar } = useIDE();

  const items: ActivityItem[] = [
    { id: "files", icon: FILES_ICON, label: "Explorer", onClick: toggleSidebar },
    { id: "search", icon: SEARCH_ICON, label: "Search", onClick: () => {} },
    { id: "git", icon: GIT_ICON, label: "Source Control", onClick: () => {} },
    { id: "extensions", icon: EXTENSIONS_ICON, label: "Extensions", onClick: () => {} },
    { id: "settings", icon: SETTINGS_ICON, label: "Settings", onClick: () => {}, position: "bottom" },
  ];

  const topItems = items.filter((i) => i.position !== "bottom");
  const bottomItems = items.filter((i) => i.position === "bottom");

  return (
    <div className="flex flex-col items-center w-[48px] bg-[#1e1e1e] border-r border-[#2d2d2d] py-1 select-none">
      <div className="flex flex-col items-center gap-0.5 flex-1">
        {topItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            title={item.label}
            className={`relative w-[48px] h-[48px] flex items-center justify-center transition-colors ${
              item.id === "files" && sidebarOpen
                ? "text-white"
                : "text-[#8b8b8b] hover:text-white"
            }`}
          >
            {item.id === "files" && sidebarOpen && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-6 bg-white rounded-r" />
            )}
            {item.icon}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-0.5">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            title={item.label}
            className="w-[48px] h-[48px] flex items-center justify-center text-[#8b8b8b] hover:text-white transition-colors"
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
