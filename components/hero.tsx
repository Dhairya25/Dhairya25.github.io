"use client";

import { motion } from "framer-motion";
import { stagger, slideUp, textReveal } from "@/lib/animations";
import { RESUME_URL } from "@/lib/content";
import { Typewriter } from "./ui/typewriter";
import { DinoGame } from "./dino-game";

const ROLES = [
  "Building AI Products",
  "Co-founding Rivo Careers",
  "Studying CS + Finance",
  "Shipping Full-Stack Apps",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background grid — IDE feel */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="w-full h-full opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Faint radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-accent/[0.04] blur-[100px]" />
      </div>

      <div className="relative px-6 md:px-12 lg:px-24 pt-28 pb-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* IDE-style breadcrumb / file path */}
          <motion.div
            variants={slideUp}
            className="flex items-center gap-2 mb-10 font-mono text-xs text-muted"
          >
            <span className="text-accent">~</span>
            <span>/</span>
            <span>dhairya-patel</span>
            <span>/</span>
            <span className="text-text">portfolio</span>
            <span className="ml-2 w-1.5 h-4 bg-accent/70 animate-blink" />
          </motion.div>

          {/* Two-column hero: left = content, right = code card */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">
            {/* Left column */}
            <div>
              {/* Name */}
              <motion.h1
                variants={textReveal}
                className="text-display font-bold leading-[0.85] tracking-[-0.04em] mb-8"
              >
                <span className="block">Dhairya</span>
                <span className="block text-accent">Patel.</span>
              </motion.h1>

              {/* Typewriter */}
              <motion.div
                variants={slideUp}
                className="flex items-center gap-3 mb-8"
              >
                <span className="font-mono text-accent text-sm">$</span>
                <Typewriter
                  words={ROLES}
                  className="font-mono text-sm md:text-base text-text"
                />
              </motion.div>

              {/* Description */}
              <motion.p
                variants={slideUp}
                className="text-base md:text-lg text-muted max-w-md leading-relaxed mb-10"
              >
                Full-stack developer building intelligent software.
                Currently shaping the future of career tech at{" "}
                <span className="text-text">Rivo Careers</span>.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={slideUp} className="flex flex-wrap gap-3 mb-14">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-medium rounded-md hover:brightness-110 transition-all text-sm"
                >
                  View Work
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text font-medium rounded-md hover:bg-surface hover:border-muted transition-all text-sm group"
                >
                  Resume
                  <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-muted">
                    ↗
                  </span>
                </a>
              </motion.div>

              {/* Dino game */}
              <motion.div variants={slideUp} className="max-w-[580px]">
                <DinoGame />
              </motion.div>
            </div>

            {/* Right column — code card */}
            <motion.div
              variants={slideUp}
              className="hidden lg:block"
            >
              <div className="border border-border rounded-lg overflow-hidden bg-surface font-mono text-xs">
                {/* Tab bar */}
                <div className="flex items-center border-b border-border bg-bg px-3 py-2">
                  <div className="flex items-center gap-2 px-2 py-1 bg-surface rounded-t border border-border border-b-0 -mb-[1px] text-text text-[11px]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-accent">
                      <path d="M13.5 2L3 14h9l-1.5 8L21 10h-9l1.5-8Z" fill="currentColor" />
                    </svg>
                    about.ts
                  </div>
                  <div className="px-2 py-1 text-[11px] text-muted ml-1">
                    skills.ts
                  </div>
                </div>
                {/* Code body */}
                <div className="p-4 leading-6">
                  <div className="flex">
                    <span className="text-[#535353] w-8 text-right mr-4 select-none">1</span>
                    <span><span className="text-[#c586c0]">const</span> <span className="text-[#4fc1ff]">dhairya</span> <span className="text-text">=</span> <span className="text-text">{"{"}</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-[#535353] w-8 text-right mr-4 select-none">2</span>
                    <span className="pl-4"><span className="text-[#9cdcfe]">role</span><span className="text-text">:</span> <span className="text-[#ce9178]">&quot;Full-Stack Developer&quot;</span><span className="text-text">,</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-[#535353] w-8 text-right mr-4 select-none">3</span>
                    <span className="pl-4"><span className="text-[#9cdcfe]">school</span><span className="text-text">:</span> <span className="text-[#ce9178]">&quot;Wilfrid Laurier&quot;</span><span className="text-text">,</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-[#535353] w-8 text-right mr-4 select-none">4</span>
                    <span className="pl-4"><span className="text-[#9cdcfe]">degrees</span><span className="text-text">:</span> <span className="text-text">[</span><span className="text-[#ce9178]">&quot;CS&quot;</span><span className="text-text">,</span> <span className="text-[#ce9178]">&quot;BBA&quot;</span><span className="text-text">],</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-[#535353] w-8 text-right mr-4 select-none">5</span>
                    <span className="pl-4"><span className="text-[#9cdcfe]">building</span><span className="text-text">:</span> <span className="text-[#ce9178]">&quot;Rivo Careers&quot;</span><span className="text-text">,</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-[#535353] w-8 text-right mr-4 select-none">6</span>
                    <span className="pl-4"><span className="text-[#9cdcfe]">location</span><span className="text-text">:</span> <span className="text-[#ce9178]">&quot;Waterloo, ON&quot;</span><span className="text-text">,</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-[#535353] w-8 text-right mr-4 select-none">7</span>
                    <span className="pl-4"><span className="text-[#9cdcfe]">available</span><span className="text-text">:</span> <span className="text-[#569cd6]">true</span><span className="text-text">,</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-[#535353] w-8 text-right mr-4 select-none">8</span>
                    <span><span className="text-text">{"}"}</span><span className="text-text">;</span></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-6 md:left-12 lg:left-24 flex items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent"
        />
        <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
