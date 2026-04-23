"use client";

import { useMode } from "@/lib/mode-store";
import { siteConfig } from "@/data/meta";

interface FnKey {
  key: string;
  label: string;
  action: () => void;
}

export function FunctionBar() {
  const { setMode } = useMode();

  const fnKeys: FnKey[] = [
    {
      key: "F1",
      label: "HELP",
      action: () => {
        const el = document.querySelector<HTMLInputElement>("[data-terminal-input]");
        if (el) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype, "value"
          )?.set;
          nativeInputValueSetter?.call(el, "help");
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
        }
      },
    },
    {
      key: "F2",
      label: "CONTACT",
      action: () => {
        window.location.href = `mailto:${siteConfig.email}`;
      },
    },
    {
      key: "F3",
      label: "RESUME",
      action: () => {
        window.open(siteConfig.resumes.cs, "_blank");
      },
    },
    {
      key: "F4",
      label: "EDITORIAL",
      action: () => setMode("editorial"),
    },
    {
      key: "F5",
      label: "IDE",
      action: () => setMode("ide"),
    },
  ];

  return (
    <div className="flex items-center gap-1 px-2 py-1 border-t border-[var(--border-color)] bg-[var(--term-panel)]">
      {fnKeys.map((fn) => (
        <button
          key={fn.key}
          onClick={fn.action}
          className="flex items-center gap-1 px-2 py-0.5 font-mono-terminal text-term-xs text-fg-secondary hover:text-fg hover:bg-[rgba(232,177,58,0.1)] transition-colors"
        >
          <span className="text-fg font-bold">{fn.key}</span>
          <span>{fn.label}</span>
        </button>
      ))}
    </div>
  );
}
