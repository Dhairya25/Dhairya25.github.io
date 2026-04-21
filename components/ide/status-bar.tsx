"use client";

import { useState, useEffect } from "react";
import { useIDE } from "@/lib/ide-store";
import { getFileExtension } from "@/lib/file-registry";
import { useTheme } from "../theme-provider";

const EXT_LABELS: Record<string, string> = {
  md: "Markdown",
  ts: "TypeScript",
  tsx: "TypeScript React",
  json: "JSON",
  txt: "Plain Text",
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

function StatusClock() {
  const time = useLiveClock();
  if (!time) return null;

  return (
    <span className="hidden md:inline-flex items-center gap-1">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
      <span>{time}</span>
    </span>
  );
}

export function StatusBar() {
  const { activeTab } = useIDE();
  const { theme, toggle: toggleTheme } = useTheme();
  const ext = activeTab ? getFileExtension(activeTab) : "";
  const langLabel = ext ? EXT_LABELS[ext] || ext : "";

  return (
    <div className="flex items-center h-[22px] bg-accent px-3 text-white text-[11px] font-mono select-none shrink-0">
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
        <span className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="8" cy="8" r="3" />
          </svg>
          0
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2L2 14h12L8 2z" />
          </svg>
          0
        </span>
      </div>

      {/* Center */}
      <div className="flex-1 text-center">
        {langLabel && <span>{langLabel}</span>}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <span>UTF-8</span>
        <StatusClock />
        <button
          onClick={toggleTheme}
          className="hover:bg-white/20 px-1 rounded transition-colors"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13.5 9A5.5 5.5 0 0 1 7 2.5 5.5 5.5 0 1 0 13.5 9Z" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
