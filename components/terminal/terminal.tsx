"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { executeCommand, type CommandResult } from "./commands";
import { useMode } from "@/lib/mode-store";
import { siteConfig } from "@/data/meta";

interface HistoryEntry {
  command: string;
  result: CommandResult;
}

export function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setMode } = useMode();

  const prompt = `dhairya@portfolio ${cwd ? `~/${cwd}` : "~"} % `;

  const handleCommand = useCallback(
    (cmd: string) => {
      const { result, newCwd } = executeCommand(cmd, cwd);

      if (result.action === "clear") {
        setHistory([]);
        setCwd(newCwd);
        return;
      }

      if (result.action === "mode-editorial") {
        setMode("editorial");
        return;
      }
      if (result.action === "mode-terminal") {
        setMode("terminal");
        return;
      }
      if (result.action === "mode-ide") {
        setMode("ide");
        return;
      }
      if (result.action === "resume-cs") {
        window.open(siteConfig.resumes.cs, "_blank");
      }
      if (result.action === "resume-bba") {
        window.open(siteConfig.resumes.bba, "_blank");
      }
      if (result.action === "open-project" && result.actionPayload) {
        window.open(`/work/${result.actionPayload}`, "_blank");
      }

      setHistory((prev) => [...prev, { command: cmd, result }]);
      setCwd(newCwd);
      if (cmd.trim()) {
        setCmdHistory((prev) => [cmd, ...prev]);
        setHistoryIdx(-1);
      }
    },
    [cwd, setMode]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
        setHistoryIdx(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const next = historyIdx - 1;
        setHistoryIdx(next);
        setInput(cmdHistory[next]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="h-full flex flex-col bg-[#1e1e1e] font-mono text-[13px] text-[#d4d4d4]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center px-3 py-1 border-b border-[#2d2d2d] text-[11px] text-[#858585]">
        <span>TERMINAL</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hide">
        {/* Welcome line */}
        <div className="text-[#858585]">dhairya@portfolio ~ % type &quot;help&quot; for commands</div>

        {history.map((entry, i) => (
          <div key={i}>
            <div>
              <span className="text-[#569cd6]">{prompt}</span>
              <span>{entry.command}</span>
            </div>
            {entry.result.output && (
              <pre
                className={`whitespace-pre-wrap ${entry.result.isError ? "text-[#f44747]" : "text-[#d4d4d4]"}`}
              >
                {entry.result.output}
              </pre>
            )}
          </div>
        ))}

        {/* Current input line */}
        <div className="flex">
          <span className="text-[#569cd6] whitespace-pre">{prompt}</span>
          <input
            ref={inputRef}
            data-terminal-input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-[#d4d4d4] caret-[#d4d4d4]"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
