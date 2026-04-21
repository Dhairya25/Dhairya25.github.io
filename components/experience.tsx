"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "./ui/section-label";
import { EXPERIENCE } from "@/lib/content";

const ICONS = ["⚡", "🏥", "💊", "🎓"];

function ExperienceCard({
  item,
  index,
}: {
  item: (typeof EXPERIENCE)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="min-w-[320px] md:min-w-[380px] snap-start"
    >
      <div className="h-full border border-border rounded-lg bg-surface hover:border-accent/30 transition-all duration-300 group overflow-hidden">
        {/* Card header — colored accent bar */}
        <div className="h-1 bg-gradient-to-r from-accent via-[--purple] to-accent opacity-40 group-hover:opacity-100 transition-opacity" />

        <div className="p-6">
          {/* Top row: icon + year */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl">{ICONS[index]}</span>
            <span className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded">
              {item.year}
            </span>
          </div>

          {/* Role */}
          <h3 className="text-base font-semibold mb-1 group-hover:text-accent transition-colors">
            {item.role}
          </h3>
          <p className="font-mono text-xs text-muted mb-4">{item.company}</p>

          {/* Divider */}
          <div className="w-full h-px bg-border mb-4" />

          {/* Blurb */}
          <p className="text-sm text-muted leading-relaxed">{item.blurb}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" className="py-24 md:py-32" ref={sectionRef}>
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <SectionLabel number="03" title="Experience" />
      </div>

      {/* Horizontal scroll container */}
      <div className="relative">
        {/* Timeline connector line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2 z-0" />

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto px-6 md:px-12 lg:px-24 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {EXPERIENCE.map((item, i) => (
            <ExperienceCard key={item.company} item={item} index={i} />
          ))}

          {/* "What's next?" card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="min-w-[280px] snap-start flex items-center justify-center"
          >
            <div className="h-full border border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center group hover:border-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mb-4 group-hover:border-accent/50 transition-colors">
                <span className="text-muted group-hover:text-accent transition-colors text-lg">?</span>
              </div>
              <p className="font-mono text-xs text-muted">What&apos;s next</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="flex items-center justify-center mt-4 gap-2">
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="font-mono text-[10px] text-muted flex items-center gap-2"
          >
            <span>Scroll</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
