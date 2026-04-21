"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "./ui/section-label";
import { ExternalLink } from "./ui/external-link";
import { slideUp, stagger } from "@/lib/animations";

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateContributions(): number[] {
  const rand = seededRandom(2025);
  const cells = 52 * 7;
  const contributions: number[] = [];
  for (let i = 0; i < cells; i++) {
    const r = rand();
    if (r < 0.25) contributions.push(0);
    else if (r < 0.5) contributions.push(1);
    else if (r < 0.72) contributions.push(2);
    else if (r < 0.88) contributions.push(3);
    else contributions.push(4);
  }
  return contributions;
}

const LEVEL_COLORS = [
  "bg-border/40",
  "bg-accent/15",
  "bg-accent/35",
  "bg-accent/60",
  "bg-accent",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function Counter({ target, suffix = "", inView }: { target: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <>{count}{suffix}</>;
}

const STATS = [
  { label: "Repositories", value: 20, suffix: "+" },
  { label: "Languages Used", value: 8, suffix: "" },
  { label: "Contributions", value: 547, suffix: "" },
  { label: "Day Streak", value: 34, suffix: "" },
];

const PINNED_REPOS = [
  { name: "rivo-careers", desc: "AI-powered career platform", lang: "TypeScript", langColor: "#3178c6", stars: 2 },
  { name: "financial-portfolio-optimizer", desc: "Portfolio backtesting with MPT", lang: "Python", langColor: "#3572A5", stars: 4 },
  { name: "sudoku-csp-solver", desc: "CSP solver with AC-3 + MRV", lang: "Python", langColor: "#3572A5", stars: 1 },
];

function HeatmapTooltip({ level }: { level: number }) {
  const labels = ["No contributions", "1-2 contributions", "3-5 contributions", "6-9 contributions", "10+ contributions"];
  return labels[level];
}

export function GitHubActivity() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const contributions = useMemo(() => generateContributions(), []);
  const [hoveredCell, setHoveredCell] = useState<{ week: number; day: number; level: number } | null>(null);
  const totalContribs = useMemo(() => contributions.filter((c) => c > 0).length, [contributions]);

  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    weeks.push(contributions.slice(w * 7, w * 7 + 7));
  }

  return (
    <section id="activity" className="section">
      <SectionLabel number="05" title="Activity" />

      <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
        <motion.div variants={slideUp} className="border border-border rounded-xl p-6 bg-surface/30 mb-6 overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-muted">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
              </svg>
              <span className="font-mono text-xs text-muted">{totalContribs} contributions in the last year</span>
            </div>
            <ExternalLink href="https://github.com/Dhairya25" className="font-mono text-[10px] text-muted hover:text-text">
              @Dhairya25
            </ExternalLink>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="flex gap-[3px] mb-1 ml-7">
                {MONTHS.map((m) => (
                  <span key={m} className="font-mono text-[9px] text-muted/60" style={{ width: `${100 / 12}%` }}>{m}</span>
                ))}
              </div>
              <div className="flex gap-0">
                <div className="flex flex-col gap-[3px] mr-1.5 pt-0">
                  {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                    <span key={i} className="font-mono text-[9px] text-muted/60 h-[11px] flex items-center leading-none">{d}</span>
                  ))}
                </div>
                <div className="flex gap-[3px] flex-1 relative">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((level, di) => (
                        <motion.div
                          key={di}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.12, delay: wi * 0.006 + di * 0.003 }}
                          onMouseEnter={() => setHoveredCell({ week: wi, day: di, level })}
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_COLORS[level]} transition-all duration-150 cursor-crosshair ${
                            hoveredCell?.week === wi && hoveredCell?.day === di
                              ? "ring-1 ring-accent scale-150 z-10"
                              : "hover:ring-1 hover:ring-accent/30"
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="font-mono text-[10px] text-muted/60 h-4">
              {hoveredCell ? <HeatmapTooltip level={hoveredCell.level} /> : "Hover for details"}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-muted/60">Less</span>
              {LEVEL_COLORS.map((color, i) => (
                <div key={i} className={`w-[11px] h-[11px] rounded-[2px] ${color}`} />
              ))}
              <span className="font-mono text-[10px] text-muted/60">More</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={slideUp} className="border border-border rounded-xl p-5 bg-surface/30 text-center hover:bg-surface/60 hover:border-accent/20 transition-all duration-500 group">
              <p className="text-3xl font-bold text-text mb-1 tabular-nums group-hover:text-accent transition-colors">
                <Counter target={stat.value} suffix={stat.suffix} inView={inView} />
              </p>
              <p className="font-mono text-[10px] text-muted uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={slideUp}>
          <p className="font-mono text-[10px] text-muted uppercase tracking-wider mb-3">Pinned Repositories</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PINNED_REPOS.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={`https://github.com/Dhairya25/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="border border-border rounded-xl p-5 bg-surface/30 hover:bg-surface/60 hover:border-accent/20 transition-all duration-500 group block"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-muted shrink-0">
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
                  </svg>
                  <span className="text-sm font-semibold text-text group-hover:text-accent transition-colors truncate">{repo.name}</span>
                </div>
                <p className="text-xs text-muted mb-4 leading-relaxed">{repo.desc}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                    <span className="font-mono text-[10px] text-muted">{repo.lang}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="text-muted">
                      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                    </svg>
                    <span className="font-mono text-[10px] text-muted">{repo.stars}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
