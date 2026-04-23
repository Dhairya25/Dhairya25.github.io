"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useIDE } from "@/lib/ide-store";
import { TabBar } from "./tab-bar";
import { getFileById } from "@/lib/ide-files";

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={key++} className="text-2xl font-bold text-[#e0e0e0] mt-6 mb-2 first:mt-0">
          {parseInline(trimmed.slice(2))}
        </h1>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-xl font-semibold text-[#d4d4d4] mt-5 mb-2">
          {parseInline(trimmed.slice(3))}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-lg font-medium text-[#cccccc] mt-4 mb-2">
          {parseInline(trimmed.slice(4))}
        </h3>
      );
    } else if (trimmed.startsWith("- ")) {
      elements.push(
        <li key={key++} className="ml-4 text-[#d4d4d4] list-disc">
          {parseInline(trimmed.slice(2))}
        </li>
      );
    } else if (trimmed === "") {
      elements.push(<div key={key++} className="h-3" />);
    } else {
      elements.push(
        <p key={key++} className="text-[#d4d4d4] leading-relaxed">
          {parseInline(trimmed)}
        </p>
      );
    }
  }

  return <div className="space-y-0.5">{elements}</div>;
}

function parseInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let i = 0;

  while (remaining.length > 0) {
    const codeMatch = remaining.match(/^`([^`]+)`/);
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);

    if (codeMatch) {
      parts.push(
        <code key={i++} className="bg-[#2d2d2d] text-[#ce9178] px-1.5 py-0.5 rounded text-[13px]">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
    } else if (boldMatch) {
      parts.push(
        <strong key={i++} className="text-[#e0e0e0] font-semibold">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
    } else {
      const nextSpecial = remaining.search(/[`*]/);
      if (nextSpecial === -1) {
        parts.push(remaining);
        break;
      }
      parts.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return <>{parts}</>;
}

function CodeRenderer({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="font-mono text-[13px] leading-[20px]">
      <table className="border-collapse w-full">
        <tbody>
          {lines.map((line, i) => (
            <tr key={i} className="hover:bg-[#2a2d2e]">
              <td className="text-right pr-4 pl-4 text-[#858585] select-none w-[50px] align-top">
                {i + 1}
              </td>
              <td className="pr-4">
                <pre className="text-[#d4d4d4] whitespace-pre">{line}</pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WelcomeScreen() {
  const { openFile } = useIDE();

  return (
    <div className="flex items-center justify-center h-full text-center">
      <div>
        <h2 className="font-mono text-2xl text-[#5a5a5a] mb-2">
          dhairya.portfolio
        </h2>
        <p className="font-mono text-sm text-[#4a4a4a] mb-6">
          Open a file from the explorer to get started
        </p>
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => openFile("root-readme")}
            className="font-mono text-sm text-[#569cd6] hover:underline"
          >
            README.md
          </button>
          <span className="font-mono text-[10px] text-[#4a4a4a]">
            or press <kbd className="px-1.5 py-0.5 bg-[#2d2d2d] rounded text-[#8b8b8b]">Cmd+K</kbd> to search
          </span>
        </div>
      </div>
    </div>
  );
}

export function EditorArea() {
  const { activeTab } = useIDE();
  const file = activeTab ? getFileById(activeTab) : null;

  return (
    <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-[#1e1e1e]">
      <TabBar />
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="absolute inset-0 overflow-y-auto scrollbar-hide"
            >
              <div className="p-6 max-w-[900px]">
                {file.isMarkdown ? (
                  <MarkdownRenderer content={file.content} />
                ) : (
                  <CodeRenderer content={file.content} />
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <WelcomeScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
