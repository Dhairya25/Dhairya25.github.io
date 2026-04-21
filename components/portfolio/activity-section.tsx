"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CONTACT } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateHeatmapData() {
  const weeks = 52;
  const days = 7;
  const data: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      const rand = seededRandom(w * 7 + d + 42);
      if (rand < 0.22) week.push(0);
      else if (rand < 0.48) week.push(1);
      else if (rand < 0.70) week.push(2);
      else if (rand < 0.88) week.push(3);
      else week.push(4);
    }
    data.push(week);
  }
  return data;
}

const LEVEL_COLORS = ["#eef2ff", "#c7d2fe", "#a5b4fc", "#818cf8", "#6366f1"];

const STATS = [
  { label: "Repositories", value: 25, suffix: "+" },
  { label: "Contributions", value: 400, suffix: "+" },
  { label: "Day Streak", value: 30, suffix: "" },
  { label: "Top Language", value: 0, suffix: "", display: "Python" },
];

function CountUp({ target, suffix, display }: { target: number; suffix: string; display?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || display) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 50));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCount(current);
    }, 25);
    return () => clearInterval(interval);
  }, [isInView, target, display]);

  return <span ref={ref}>{display || `${count}${suffix}`}</span>;
}

export function ActivitySection() {
  const heatmap = useMemo(() => generateHeatmapData(), []);

  return (
    <>
      <div className="gradient-divider" />
      <section id="activity" className="py-28 md:py-36">
        <div className="portfolio-section">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
            className="text-[12px] font-mono uppercase tracking-[0.2em] text-accent font-medium"
          >
            05 &mdash; Activity
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-5 text-[2.25rem] md:text-[3rem] font-bold text-[#1a1a2e] tracking-tight leading-[1.15]"
          >
            Staying active.
          </motion.h2>

          {/* Stats grid */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-black/[0.05] shadow-soft hover:shadow-lifted hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-3xl md:text-4xl font-bold gradient-text tabular-nums tracking-tight">
                  <CountUp target={stat.value} suffix={stat.suffix} display={stat.display} />
                </p>
                <p className="text-[11px] font-mono text-[#94a3b8] mt-2 tracking-[0.08em] uppercase font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 p-6 rounded-2xl bg-white border border-black/[0.05] shadow-soft overflow-x-auto scrollbar-hide"
          >
            <div className="flex items-center gap-2 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#1a1a2e]">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-[13px] font-semibold text-[#1a1a2e]">Contribution Graph</span>
            </div>
            <div className="inline-flex gap-[3px]">
              {heatmap.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => (
                    <div
                      key={di}
                      className="w-[11px] h-[11px] rounded-[2px] hover:ring-2 hover:ring-accent/30 hover:ring-offset-1 transition-all cursor-default"
                      style={{ backgroundColor: LEVEL_COLORS[level] }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 mt-4">
              <span className="text-[10px] text-[#94a3b8] font-mono mr-1">Less</span>
              {LEVEL_COLORS.map((c) => (
                <div key={c} className="w-[11px] h-[11px] rounded-[2px]" style={{ backgroundColor: c }} />
              ))}
              <span className="text-[10px] text-[#94a3b8] font-mono ml-1">More</span>
            </div>
          </motion.div>

          <motion.a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="group inline-flex items-center gap-2 mt-6 text-[13px] text-[#64748b] hover:text-accent transition-colors duration-300 font-medium"
          >
            View full profile on GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </motion.a>
        </div>
      </section>
    </>
  );
}
