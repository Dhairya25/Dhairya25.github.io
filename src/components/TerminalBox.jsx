import { useEffect, useState } from "react";

export default function TerminalBox({ cycleMs = 3000 }) {
  // Each "out" is an array of lines
  const commands = [
    {
      cmd: "whoami",
      out: ["> Dhairya Patel", ">", ">", "> Wilfrid Laurier University"],
    },
    {
      cmd: "skills",
      out: [
        "> Languages: Python, Java, JavaScript, C/C++, SQL, C#, R, VBA, HTML/CSS",
        "> Tools: MS 365, QuickBooks, G‑Suite, Power BI, Tableau, GitHub, VS Code, Figma, Azure, BigQuery, Spark",
        "> Frameworks: React, Tailwind, Flask",
      ],
    },
    {
      cmd: "focus --today",
      out: [
        "> Building at the intersection of tech & finance",
        "> Shipping web apps & automations with clean UX",
      ],
    },
  ];

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("cmd"); // "cmd" | "out" | "wait" | "eraseOut" | "eraseCmd"
  const [typedCmd, setTypedCmd] = useState("");
  const [typedOut, setTypedOut] = useState("");

  // Reset on command change
  useEffect(() => {
    setTypedCmd("");
    setTypedOut("");
    setPhase("cmd");
  }, [idx]);

  // Typing + erasing state machine (plain JS, no TS types)
  useEffect(() => {
    let intervalId = null;
    let timeoutId = null;

    if (phase === "cmd") {
      const full = commands[idx].cmd;
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setTypedCmd(full.slice(0, i));
        if (i >= full.length) {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => setPhase("out"), 180);
        }
      }, 40); // command typing speed
    } else if (phase === "out") {
      const full = commands[idx].out.join("\n");
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setTypedOut(full.slice(0, i));
        if (i >= full.length) {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => setPhase("wait"), cycleMs); // dwell time
        }
      }, 14); // output typing speed
    } else if (phase === "wait") {
      setPhase("eraseOut");
    } else if (phase === "eraseOut") {
      intervalId = setInterval(() => {
        setTypedOut((prev) => {
          if (!prev.length) {
            clearInterval(intervalId);
            setPhase("eraseCmd");
            return "";
          }
          return prev.slice(0, Math.max(0, prev.length - 3));
        });
      }, 12);
    } else if (phase === "eraseCmd") {
      intervalId = setInterval(() => {
        setTypedCmd((prev) => {
          if (!prev.length) {
            clearInterval(intervalId);
            setIdx((n) => (n + 1) % commands.length);
            return "";
          }
          return prev.slice(0, Math.max(0, prev.length - 2));
        });
      }, 18);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [phase, idx, cycleMs]);

  return (
    <div className="rounded-xl bg-zinc-900/80 backdrop-blur border border-zinc-700 shadow-[0_0_25px_rgba(139,92,246,0.6)] max-w-md w-full h-[300px] overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800 border-b border-zinc-700 text-xs text-zinc-400">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="ml-3">~/about</span>
      </div>

      {/* Body */}
      <div className="px-4 py-3 font-mono text-[13px] leading-relaxed text-zinc-100">
        <div className="mb-2">
          <span className="text-green-400">$</span>{" "}
          <span>{typedCmd}</span>
          {(phase === "cmd" || phase === "out") && (
            <span className="ml-1 inline-block w-[7px] h-4 bg-purple-300 align-[-2px] animate-pulse" />
          )}
        </div>
        <pre className="whitespace-pre-wrap text-zinc-200">{typedOut}</pre>
      </div>
    </div>
  );
}
