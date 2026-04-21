"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { textReveal } from "@/lib/animations";

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function RevealText({ children, className, delay = 0 }: RevealTextProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      variants={textReveal}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
