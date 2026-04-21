"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/content";
import { stagger, slideUp } from "@/lib/animations";

const ICONS = ["⚡", "🏥", "💊", "🎓"];

export function ExperienceFile() {
  return (
    <div className="p-8 md:p-12">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        {/* File header */}
        <motion.div variants={slideUp} className="mb-8">
          <span className="font-mono text-xs text-[#8b8b8b]">
            <span className="text-[#c586c0]">// </span>
            src/experience.ts — work history
          </span>
        </motion.div>

        {/* Horizontal scroll container */}
        <div className="flex gap-6 overflow-x-auto pb-4 ide-scrollbar snap-x snap-mandatory">
          {EXPERIENCE.map((item, i) => (
            <motion.div
              key={item.company}
              variants={slideUp}
              className="min-w-[320px] md:min-w-[380px] snap-start shrink-0"
            >
              <div className="h-full border border-[#2d2d2d] rounded-lg bg-[#1e1e1e] hover:border-accent/30 transition-all duration-300 group overflow-hidden">
                {/* Accent bar */}
                <div className="h-1 bg-gradient-to-r from-accent via-[#5b51ec] to-accent opacity-40 group-hover:opacity-100 transition-opacity" />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl">{ICONS[i]}</span>
                    <span className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold mb-1 text-[#cccccc] group-hover:text-accent transition-colors">
                    {item.role}
                  </h3>
                  <p className="font-mono text-xs text-[#8b8b8b] mb-4">{item.company}</p>

                  <div className="w-full h-px bg-[#2d2d2d] mb-4" />

                  <p className="text-sm text-[#8b8b8b] leading-relaxed">{item.blurb}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* What's next card */}
          <motion.div
            variants={slideUp}
            className="min-w-[280px] snap-start shrink-0 flex items-center justify-center"
          >
            <div className="h-full border border-dashed border-[#2d2d2d] rounded-lg p-8 flex flex-col items-center justify-center text-center group hover:border-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-full border border-[#2d2d2d] flex items-center justify-center mb-4 group-hover:border-accent/50 transition-colors">
                <span className="text-[#8b8b8b] group-hover:text-accent transition-colors text-lg">?</span>
              </div>
              <p className="font-mono text-xs text-[#8b8b8b]">What&apos;s next</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          variants={slideUp}
          className="flex items-center justify-center mt-4 gap-2"
        >
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="font-mono text-[10px] text-[#8b8b8b] flex items-center gap-2"
          >
            <span>Scroll</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
