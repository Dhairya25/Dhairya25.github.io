"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Mode = "editorial" | "ide" | "terminal";

interface ModeContextValue {
  mode: Mode;
  setMode: (mode: Mode) => void;
  cycleMode: () => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

const MODE_KEY = "dp_mode";
const MODES: Mode[] = ["editorial", "ide", "terminal"];

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("editorial");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(MODE_KEY) as Mode | null;
    if (stored && MODES.includes(stored)) {
      setModeState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(MODE_KEY, mode);
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode, mounted]);

  const setMode = (next: Mode) => {
    setModeState(next);
  };

  const cycleMode = () => {
    setModeState((prev) => {
      const idx = MODES.indexOf(prev);
      return MODES[(idx + 1) % MODES.length];
    });
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, cycleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
