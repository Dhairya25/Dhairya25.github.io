"use client";

import { useMode, type Mode } from "@/lib/mode-store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useCallback } from "react";

const MODES: { value: Mode; label: string; href: string }[] = [
  { value: "editorial", label: "EDITORIAL", href: "/" },
  { value: "ide", label: "IDE", href: "/ide" },
  { value: "terminal", label: "TERMINAL", href: "/terminal" },
];

export function ModeSwitcher() {
  const { mode, setMode, cycleMode } = useMode();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = useCallback(
    (next: Mode) => {
      if (next === mode) return;
      setMode(next);
      const target = MODES.find((m) => m.value === next);
      if (target) router.push(target.href);
    },
    [mode, setMode, router]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "M") {
        e.preventDefault();
        const idx = MODES.findIndex((m) => m.value === mode);
        const next = MODES[(idx + 1) % MODES.length];
        handleSwitch(next.value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode, handleSwitch]);

  // Determine background based on current mode
  const bgClass =
    mode === "editorial"
      ? "bg-[var(--bg)]"
      : mode === "ide"
        ? "bg-[#252526]"
        : "bg-[#0A0A0A]";

  const textClass =
    mode === "editorial"
      ? "text-fg"
      : mode === "ide"
        ? "text-[#D4D4D4]"
        : "text-[#E8B13A]";

  const activeTextClass =
    mode === "editorial"
      ? "text-fg"
      : mode === "ide"
        ? "text-white"
        : "text-[#E8B13A]";

  const inactiveTextClass =
    mode === "editorial"
      ? "text-fg-secondary/50"
      : mode === "ide"
        ? "text-[#858585]"
        : "text-[#7A6027]";

  return (
    <nav
      className={`fixed top-4 right-4 z-50 flex ${bgClass} border border-[var(--border-color)]/20 rounded-sm`}
      role="tablist"
      aria-label="View mode"
    >
      {MODES.map((m) => {
        const isActive = mode === m.value;
        return (
          <button
            key={m.value}
            role="tab"
            aria-selected={isActive}
            aria-label={`Switch to ${m.label} mode`}
            onClick={() => handleSwitch(m.value)}
            className={`
              px-3 py-1.5 text-[10px] font-mono tracking-[0.15em] uppercase transition-colors
              ${isActive ? activeTextClass : inactiveTextClass}
              ${isActive ? "bg-[var(--accent)]/10" : "hover:bg-[var(--fg)]/5"}
            `}
          >
            {m.label}
          </button>
        );
      })}
      <span className="sr-only" aria-live="polite">
        Current mode: {mode}
      </span>
    </nav>
  );
}
