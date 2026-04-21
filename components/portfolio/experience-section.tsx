"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function ExperienceSection() {
  return (
    <>
      <div className="gradient-divider" />
      <section id="experience" className="py-28 md:py-36">
        <div className="portfolio-section">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
            className="text-[12px] font-mono uppercase tracking-[0.2em] text-accent font-medium"
          >
            03 &mdash; Experience
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-5 text-[2.25rem] md:text-[3rem] font-bold text-[#1a1a2e] tracking-tight leading-[1.15]"
          >
            Where I&apos;ve been.
          </motion.h2>

          <div className="mt-14 relative">
            {/* Timeline line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease }}
              className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-accent via-accent/30 to-transparent origin-top hidden md:block rounded-full"
            />

            <div className="space-y-0">
              {EXPERIENCE.map((item, i) => (
                <motion.div
                  key={`${item.company}-${item.year}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                  className="relative md:pl-14 group py-6"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.2, type: "spring", stiffness: 500 }}
                    className="absolute left-0 top-[34px] hidden md:flex items-center justify-center"
                  >
                    <div className="w-4 h-4 rounded-full border-[2px] border-accent bg-[#FAFAF8] group-hover:bg-accent transition-colors duration-300">
                    </div>
                  </motion.div>

                  <div className="p-5 md:p-6 rounded-2xl hover:bg-white hover:shadow-soft hover:border-accent/10 border border-transparent transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[11px] text-accent tracking-wider bg-accent/[0.06] px-2.5 py-0.5 rounded-md font-semibold">{item.year}</span>
                      <span className="w-1 h-1 rounded-full bg-[#d0d0d0]" />
                      <span className="text-accent text-[13px] font-semibold">{item.company}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#1a1a2e]">
                      {item.role}
                    </h3>
                    <p className="mt-2 text-[#64748b] text-[14px] leading-[1.75] max-w-xl">
                      {item.blurb}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
