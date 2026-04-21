"use client";

import { useEffect, useState } from "react";

export function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Toronto",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 font-mono text-[10px] text-muted">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      <span>{time} EST</span>
    </div>
  );
}
