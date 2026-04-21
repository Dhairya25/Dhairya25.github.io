"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "./ui/section-label";
import { SKILLS } from "@/lib/content";
import { stagger, slideUp } from "@/lib/animations";

const CATEGORY_ICONS: Record<string, string> = {
  Languages: "{ }",
  Frameworks: "< />",
  "AI / ML": "◈",
  "Cloud & Tools": "☁",
};

function ToolTag({ name, delay }: { name: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(0, 212, 255, 0.1)",
        borderColor: "rgba(0, 212, 255, 0.4)",
      }}
      className="inline-flex items-center px-3 py-1.5 rounded-lg border border-border text-sm text-muted hover:text-text transition-colors cursor-default font-mono text-xs"
    >
      {name}
    </motion.span>
  );
}

export function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="toolbox" className="section">
      <SectionLabel number="04" title="Toolbox" />

      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {Object.entries(SKILLS).map(([category, tools]) => (
          <motion.div
            key={category}
            variants={slideUp}
            className="border border-border rounded-xl p-6 bg-surface/30 hover:bg-surface/60 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-accent text-sm">
                {CATEGORY_ICONS[category] || "●"}
              </span>
              <h3 className="font-mono text-xs text-muted uppercase tracking-widest">
                {category}
              </h3>
              <span className="font-mono text-[10px] text-muted/50 ml-auto">
                {tools.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, i) => (
                <ToolTag key={tool} name={tool} delay={i * 0.03} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
