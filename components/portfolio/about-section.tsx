"use client";

import { motion } from "framer-motion";
import { NOW_ITEMS } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutSection() {
  return (
    <>
      {/* Gradient divider */}
      <div className="gradient-divider" />

      <section id="about" className="py-28 md:py-36">
        <div className="portfolio-section">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
            className="text-[12px] font-mono uppercase tracking-[0.2em] text-accent font-medium"
          >
            01 &mdash; About
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-5 text-[2.25rem] md:text-[3rem] font-bold text-[#1a1a2e] tracking-tight leading-[1.15]"
          >
            Building at the intersection
            <br />
            <span className="gradient-text">of code and business.</span>
          </motion.h2>

          <div className="mt-14 md:flex gap-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="text-[#64748b] text-[15px] leading-[1.85] max-w-lg flex-1"
            >
              I&apos;m a dual-degree student at Wilfrid Laurier pursuing Computer Science and
              Business Administration. I love building products that solve real problems —
              from AI-powered career platforms to financial portfolio optimizers.
              <br /><br />
              I believe the best software comes from deeply understanding both the
              technology and the people who use it.
            </motion.p>

            {/* Bento-style status grid */}
            <div className="mt-10 md:mt-0 flex-1 space-y-2">
              {NOW_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                  className="group flex items-center gap-5 p-4 rounded-xl bg-white/50 border border-black/[0.04] hover:border-accent/20 hover:bg-white hover:shadow-soft transition-all duration-300"
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent font-semibold w-20 shrink-0">
                    {item.label}
                  </span>
                  <span className="text-[14px] text-[#1a1a2e] font-medium">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
