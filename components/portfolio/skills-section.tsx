"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const CATEGORY_ICONS: Record<string, string> = {
  Languages: "{ }",
  Frameworks: "< />",
  "AI / ML": "f(x)",
  "Cloud & Tools": "$ _",
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-28 md:py-36">
      <div className="portfolio-section">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="text-[12px] font-mono uppercase tracking-[0.2em] text-accent font-medium"
        >
          04 &mdash; Toolbox
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-5 text-[2.25rem] md:text-[3rem] font-bold text-[#1a1a2e] tracking-tight leading-[1.15]"
        >
          My toolbox.
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.entries(SKILLS).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="group p-6 rounded-2xl bg-white border border-black/[0.05] hover:border-accent/15 shadow-soft hover:shadow-lifted transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-xl bg-accent/[0.06] flex items-center justify-center font-mono text-[12px] text-accent font-bold group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {CATEGORY_ICONS[category] || "+"}
                </span>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1a1a2e]">
                  {category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: i * 0.04 + j * 0.02 }}
                    className="text-[12px] text-[#64748b] font-medium bg-[#f8f9fa] border border-black/[0.04] px-3 py-1.5 rounded-lg cursor-default hover:border-accent/30 hover:text-accent hover:bg-accent/[0.04] transition-all duration-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
