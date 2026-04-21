"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "./ui/section-label";
import { NOW_ITEMS } from "@/lib/content";
import { Terminal } from "./terminal/terminal";
import { stagger, slideUp } from "@/lib/animations";

export function Now() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="now" className="section">
      <SectionLabel number="01" title="Now" />

      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
      >
        {NOW_ITEMS.map((item) => (
          <motion.div
            key={item.label}
            variants={slideUp}
            className={`border border-border rounded-xl p-6 bg-surface/30 hover:bg-surface/60 transition-colors ${
              item.span === 2 ? "md:col-span-2" : ""
            }`}
          >
            <span className="font-mono text-[10px] text-accent uppercase tracking-wider block mb-2">
              {item.label}
            </span>
            <p className="text-sm text-text">{item.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <Terminal />
      </motion.div>
    </section>
  );
}
