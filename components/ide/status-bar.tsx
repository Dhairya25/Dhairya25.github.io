"use client";

import { useState, useEffect } from "react";
import { useIDE } from "@/lib/ide-store";
import { getFileById } from "@/lib/ide-files";

const EXT_LABELS: Record<string, string> = {
  md: "Markdown",
  ts: "TypeScript",
  tsx: "TypeScript React",
  py: "Python",
  vba: "VBA",
  ps1: "PowerShell",
  json: "JSON",
};

function useLiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Toronto",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export function StatusBar() {
  const { activeTab } = useIDE();
  const time = useLiveClock();

  const file = activeTab ? getFileById(activeTab) : null;
  const ext = file ? file.name.split(".").pop() || "" : "";
  const langLabel = ext ? EXT_LABELS[ext] || ext : "";
  const lineCount = file ? file.content.split("\n").length : 0;

  return (
    <div className="flex items-center h-[22px] bg-[#007acc] px-3 text-white text-[11px] font-mono select-none shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <path d="M6 21V9a9 9 0 0 0 9 9" />
          </svg>
          main
        </span>
      </div>

      {/* Center */}
      <div className="flex-1 text-center flex items-center justify-center gap-4">
        {langLabel && <span>{langLabel}</span>}
        {file && <span>Ln {lineCount}, Col 1</span>}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <span>UTF-8</span>
        <span>LF</span>
        {time && <span>{time}</span>}
        <span>Port 3000</span>
      </div>
    </div>
  );
}
