"use client";

import { motion } from "framer-motion";
import { stagger, slideUp, textReveal } from "@/lib/animations";
import { RESUME_URL } from "@/lib/content";
import { Typewriter } from "../ui/typewriter";
import { DinoGame } from "../dino-game";

const ROLES = [
  "Building AI Products",
  "Co-founding Rivo Careers",
  "Studying CS + Finance",
  "Shipping Full-Stack Apps",
];

export function ReadmeFile() {
  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        {/* Markdown-style header */}
        <motion.div variants={slideUp} className="flex items-center gap-2 mb-8 font-mono text-xs text-[#8b8b8b]">
          <span className="text-accent">~</span>
          <span>/</span>
          <span>dhairya-patel</span>
          <span>/</span>
          <span className="text-[#cccccc]">README.md</span>
          <span className="ml-2 w-1.5 h-4 bg-accent/70 animate-blink" />
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={textReveal}
          className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-[-0.04em] mb-8"
        >
          <span className="block text-[#cccccc]">Dhairya</span>
          <span className="block text-accent">Patel.</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div variants={slideUp} className="flex items-center gap-3 mb-8">
          <span className="font-mono text-accent text-sm">$</span>
          <Typewriter
            words={ROLES}
            className="font-mono text-sm md:text-base text-[#cccccc]"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={slideUp}
          className="text-base md:text-lg text-[#8b8b8b] max-w-md leading-relaxed mb-10"
        >
          Full-stack developer building intelligent software.
          Currently shaping the future of career tech at{" "}
          <span className="text-[#cccccc]">Rivo Careers</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={slideUp} className="flex flex-wrap gap-3 mb-12">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-medium rounded-md hover:brightness-110 transition-all text-sm"
          >
            Resume
            <span className="text-white/70">↗</span>
          </a>
          <a
            href="https://github.com/Dhairya25"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#383838] text-[#cccccc] font-medium rounded-md hover:bg-[#2d2d2d] transition-all text-sm"
          >
            GitHub
            <span className="text-[#8b8b8b]">↗</span>
          </a>
        </motion.div>

        {/* Code card */}
        <motion.div variants={slideUp} className="mb-10 max-w-md">
          <div className="border border-[#2d2d2d] rounded-lg overflow-hidden bg-[#1e1e1e] font-mono text-xs">
            <div className="flex items-center border-b border-[#2d2d2d] bg-[#1a1a1a] px-3 py-2">
              <div className="flex items-center gap-2 px-2 py-1 bg-[#1e1e1e] rounded-t border border-[#2d2d2d] border-b-0 -mb-[1px] text-[#cccccc] text-[11px]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-accent">
                  <path d="M13.5 2L3 14h9l-1.5 8L21 10h-9l1.5-8Z" fill="currentColor" />
                </svg>
                about.ts
              </div>
            </div>
            <div className="p-4 leading-6">
              <div className="flex"><span className="text-[#535353] w-8 text-right mr-4 select-none">1</span><span><span className="text-[#c586c0]">const</span> <span className="text-[#4fc1ff]">dhairya</span> <span className="text-[#cccccc]">=</span> <span className="text-[#cccccc]">{"{"}</span></span></div>
              <div className="flex"><span className="text-[#535353] w-8 text-right mr-4 select-none">2</span><span className="pl-4"><span className="text-[#9cdcfe]">role</span><span className="text-[#cccccc]">:</span> <span className="text-[#ce9178]">&quot;Full-Stack Developer&quot;</span><span className="text-[#cccccc]">,</span></span></div>
              <div className="flex"><span className="text-[#535353] w-8 text-right mr-4 select-none">3</span><span className="pl-4"><span className="text-[#9cdcfe]">school</span><span className="text-[#cccccc]">:</span> <span className="text-[#ce9178]">&quot;Wilfrid Laurier&quot;</span><span className="text-[#cccccc]">,</span></span></div>
              <div className="flex"><span className="text-[#535353] w-8 text-right mr-4 select-none">4</span><span className="pl-4"><span className="text-[#9cdcfe]">building</span><span className="text-[#cccccc]">:</span> <span className="text-[#ce9178]">&quot;Rivo Careers&quot;</span><span className="text-[#cccccc]">,</span></span></div>
              <div className="flex"><span className="text-[#535353] w-8 text-right mr-4 select-none">5</span><span className="pl-4"><span className="text-[#9cdcfe]">available</span><span className="text-[#cccccc]">:</span> <span className="text-[#569cd6]">true</span></span></div>
              <div className="flex"><span className="text-[#535353] w-8 text-right mr-4 select-none">6</span><span><span className="text-[#cccccc]">{"}"}</span><span className="text-[#cccccc]">;</span></span></div>
            </div>
          </div>
        </motion.div>

        {/* Dino game */}
        <motion.div variants={slideUp} className="max-w-[580px]">
          <DinoGame />
        </motion.div>
      </motion.div>
    </div>
  );
}
