"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { parseCommand, type CommandResult } from "./commands";

export function Terminal() {
  const [history, setHistory] = useState<CommandResult[]>([
    {
      command: "",
      output: [
        'Welcome to dhairya.sh — type "help" for available commands.',
        "",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const commandHistory = useRef<string[]>([]);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = parseCommand(input);

    if (input.trim().toLowerCase() === "clear") {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, result]);
    }

    if (input.trim()) {
      commandHistory.current = [input, ...commandHistory.current];
    }
    setInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const cmds = commandHistory.current;
      if (cmds.length === 0) return;
      const newIndex = Math.min(historyIndex + 1, cmds.length - 1);
      setHistoryIndex(newIndex);
      setInput(cmds[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory.current[newIndex]);
      }
    }
  };

  return (
    <div
      className="bg-[#1a1a1a] font-mono text-sm h-full flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal body */}
      <div ref={scrollRef} className="p-3 flex-1 overflow-y-auto ide-scrollbar">
        {history.map((entry, i) => (
          <div key={i} className="mb-2">
            {entry.command && (
              <div className="flex items-center gap-2 text-[#8b8b8b]">
                <span className="text-accent">$</span>
                <span className="text-[#cccccc]">{entry.command}</span>
              </div>
            )}
            {entry.output.map((line, j) => (
              <div
                key={j}
                className={`whitespace-pre-wrap ${entry.isError ? "text-red-400" : "text-[#8b8b8b]"}`}
              >
                {line}
              </div>
            ))}
          </div>
        ))}

        {/* Input line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-accent">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-[#cccccc] caret-accent"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
