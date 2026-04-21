"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useMode } from "@/lib/mode-store";

const CODE_LINES = [
  { tokens: [{ text: "const ", c: "#c792ea" }, { text: "dhairya", c: "#82aaff" }, { text: " = {", c: "#bfc7d5" }] },
  { tokens: [{ text: "  role", c: "#f78c6c" }, { text: ": ", c: "#bfc7d5" }, { text: '"Full-Stack Developer"', c: "#c3e88d" }, { text: ",", c: "#bfc7d5" }] },
  { tokens: [{ text: "  education", c: "#f78c6c" }, { text: ": ", c: "#bfc7d5" }, { text: '"CS + BBA @ Laurier"', c: "#c3e88d" }, { text: ",", c: "#bfc7d5" }] },
  { tokens: [{ text: "  building", c: "#f78c6c" }, { text: ": ", c: "#bfc7d5" }, { text: '"Rivo Careers"', c: "#c3e88d" }, { text: ",", c: "#bfc7d5" }] },
  { tokens: [{ text: "  stack", c: "#f78c6c" }, { text: ": [", c: "#bfc7d5" }, { text: '"Next.js"', c: "#c3e88d" }, { text: ", ", c: "#bfc7d5" }, { text: '"React"', c: "#c3e88d" }, { text: ", ", c: "#bfc7d5" }, { text: '"Python"', c: "#c3e88d" }, { text: "]", c: "#bfc7d5" }] },
  { tokens: [{ text: "  open_to", c: "#f78c6c" }, { text: ": ", c: "#bfc7d5" }, { text: '"Opportunities"', c: "#c3e88d" }, { text: ",", c: "#bfc7d5" }] },
  { tokens: [{ text: "};", c: "#bfc7d5" }] },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function CodeCard() {
  const { enterIDE } = useMode();
  const [hovered, setHovered] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [5, -5]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-5, 5]), { stiffness: 200, damping: 25 });

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    CODE_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 800 + i * 180));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.8, ease }}
      className="relative hidden md:block"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={enterIDE}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        className="cursor-pointer float-animation"
      >
        <motion.div
          animate={
            hovered
              ? { boxShadow: "0 0 40px rgba(99,102,241,0.15), 0 30px 60px rgba(0,0,0,0.15)" }
              : { boxShadow: "0 20px 50px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.05)" }
          }
          transition={{ duration: 0.4 }}
          className="relative bg-[#1e1e2e] rounded-2xl overflow-hidden w-[400px] gradient-border"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#181825] border-b border-white/[0.04]">
            <div className="w-3 h-3 rounded-full bg-[#f38ba8] hover:brightness-125 transition" />
            <div className="w-3 h-3 rounded-full bg-[#f9e2af] hover:brightness-125 transition" />
            <div className="w-3 h-3 rounded-full bg-[#a6e3a1] hover:brightness-125 transition" />
            <span className="flex-1 text-center text-[11px] font-mono text-white/20">portfolio.ts</span>
          </div>

          {/* Code */}
          <div className="px-0 py-4 font-mono text-[13px] leading-7 min-h-[220px]">
            {CODE_LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={i < visibleLines ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex px-4 hover:bg-white/[0.03] transition-colors duration-200"
              >
                <span className="w-7 text-right mr-4 text-white/15 text-[12px] select-none shrink-0">
                  {i + 1}
                </span>
                <span>
                  {line.tokens.map((token, j) => (
                    <span key={j} style={{ color: token.c }}>{token.text}</span>
                  ))}
                  {i === CODE_LINES.length - 1 && visibleLines >= CODE_LINES.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.53, repeat: Infinity, repeatType: "reverse" }}
                      className="inline-block w-[2px] h-[14px] bg-accent ml-0.5 align-middle"
                    />
                  )}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-accent text-white/90 text-[10px] font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M6 21V9a9 9 0 0 0 9 9" />
                </svg>
                main
              </span>
            </div>
            <span>TypeScript</span>
          </div>
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-2xl flex items-center justify-center"
        >
          <motion.span
            initial={{ y: 6 }}
            animate={hovered ? { y: 0 } : { y: 6 }}
            className="flex items-center gap-2 text-white text-[13px] font-semibold bg-accent/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-glow"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
            Enter IDE Mode
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
