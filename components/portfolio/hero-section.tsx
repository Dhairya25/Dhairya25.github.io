"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
import { CodeCard } from "./code-card";
import { useMode } from "@/lib/mode-store";
import { CONTACT, RESUME_URL } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const { enterIDE } = useMode();
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] flex items-center pt-16 overflow-hidden"
    >
      {/* Ambient gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)",
        }}
      />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-indigo-200/20 via-purple-200/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-gradient-to-tr from-blue-200/15 to-transparent rounded-full blur-[80px] pointer-events-none" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: "radial-gradient(circle, #c0c0c0 0.75px, transparent 0.75px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="portfolio-section w-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-16 py-20">
        {/* Left — Text */}
        <div className="flex-1 max-w-xl">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-black/[0.05] shadow-soft mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[12px] font-medium text-[#64748b]">Available for opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="text-display text-[#1a1a2e]"
          >
            Dhairya
            <br />
            <span className="gradient-text">Patel</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-6 text-xl md:text-2xl text-[#64748b] font-light h-9"
          >
            <Typewriter
              words={[
                "Full-Stack Developer",
                "CS + BBA Student",
                "Co-Founder @ Rivo Careers",
                "Building AI Products",
              ]}
              typingSpeed={65}
              deletingSpeed={30}
              pauseDuration={2400}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease }}
            className="mt-6 text-[#64748b] text-[15px] leading-[1.8] max-w-md"
          >
            I craft fast, thoughtful digital products with modern web technology.
            Currently co-founding{" "}
            <span className="text-[#1a1a2e] font-medium">Rivo Careers</span> and
            studying at{" "}
            <span className="text-[#1a1a2e] font-medium">Wilfrid Laurier University</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a2e] text-white text-[13px] font-semibold rounded-xl hover:bg-accent hover:shadow-glow transition-all duration-300"
            >
              Resume
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200">
                <path d="M7 17L17 7" /><path d="M7 7h10v10" />
              </svg>
            </a>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold text-[#1a1a2e] rounded-xl border border-black/[0.08] hover:border-accent/30 hover:bg-accent/[0.04] transition-all duration-300"
            >
              GitHub
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold text-[#1a1a2e] rounded-xl border border-black/[0.08] hover:border-accent/30 hover:bg-accent/[0.04] transition-all duration-300"
            >
              LinkedIn
            </a>
          </motion.div>

          {/* Mobile IDE button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={enterIDE}
            className="mt-4 md:hidden inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-[13px] font-semibold rounded-xl"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
            Open IDE View
          </motion.button>
        </div>

        {/* Right — Code Card */}
        <CodeCard />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#94a3b8]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-accent/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
