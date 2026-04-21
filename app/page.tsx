"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useMode } from "@/lib/mode-store";
import { useTheme } from "@/components/theme-provider";
import { PortfolioShell } from "@/components/portfolio/portfolio-shell";
import { IDEShell } from "@/components/ide/ide-shell";

export default function Home() {
  const { mode } = useMode();
  const { setTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;

    if (mode === "ide") {
      setTheme("dark");
      root.classList.add("ide-mode");
    } else {
      setTheme("light");
      root.classList.remove("ide-mode");
      window.scrollTo(0, 0);
    }
  }, [mode, setTheme]);

  return (
    <AnimatePresence mode="wait">
      {mode === "portfolio" ? (
        <PortfolioShell key="portfolio" />
      ) : (
        <IDEShell key="ide" />
      )}
    </AnimatePresence>
  );
}
