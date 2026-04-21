"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionLabelProps {
  number: string;
  title: string;
}

export function SectionLabel({ number, title }: SectionLabelProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-16"
    >
      <span className="font-mono text-xs text-accent">{number}</span>
      <div className="w-8 h-px bg-border" />
      <span className="font-mono text-xs text-muted uppercase tracking-widest">
        {title}
      </span>
    </motion.div>
  );
}
