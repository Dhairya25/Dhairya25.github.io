"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Mode = "portfolio" | "ide";

interface ModeState {
  mode: Mode;
  enterIDE: () => void;
  exitIDE: () => void;
}

const ModeContext = createContext<ModeState>({
  mode: "portfolio",
  enterIDE: () => {},
  exitIDE: () => {},
});

export function useMode() {
  return useContext(ModeContext);
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("portfolio");

  const enterIDE = useCallback(() => setMode("ide"), []);
  const exitIDE = useCallback(() => setMode("portfolio"), []);

  return (
    <ModeContext.Provider value={{ mode, enterIDE, exitIDE }}>
      {children}
    </ModeContext.Provider>
  );
}
