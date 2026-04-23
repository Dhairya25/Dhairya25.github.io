"use client";

import { useEffect } from "react";
import { TerminalShell } from "@/components/terminal/terminal-shell";

export default function TerminalPage() {
  useEffect(() => {
    document.documentElement.setAttribute("data-mode", "terminal");
    return () => {
      document.documentElement.setAttribute("data-mode", "editorial");
    };
  }, []);

  return <TerminalShell />;
}
