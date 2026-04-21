"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectsSection() {
  const featured = PROJECTS.filter((p) => p.featured);
  const other = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-28 md:py-36">
      <div className="portfolio-section">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="text-[12px] font-mono uppercase tracking-[0.2em] text-accent font-medium"
        >
          02 &mdash; Selected Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-5 text-[2.25rem] md:text-[3rem] font-bold text-[#1a1a2e] tracking-tight leading-[1.15]"
        >
          Featured projects.
        </motion.h2>

        {/* Featured projects — cards */}
        <div className="mt-14 space-y-5">
          {featured.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="group block p-7 md:p-8 rounded-2xl bg-white border border-black/[0.05] hover:border-accent/20 shadow-soft hover:shadow-lifted hover:-translate-y-1 transition-all duration-400"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[12px] font-mono text-accent/60 tabular-nums font-semibold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-[#1a1a2e] group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[#64748b] text-[14px] leading-[1.7] max-w-xl">
                    {project.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono text-accent/70 bg-accent/[0.06] px-2.5 py-1 rounded-md font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 mt-1 w-10 h-10 rounded-xl border border-black/[0.06] flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:shadow-glow transition-all duration-300">
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="text-[#94a3b8] group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
                  >
                    <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Other projects */}
        <div className="mt-16">
          <div className="gradient-divider mb-8" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#94a3b8] mb-6 font-medium"
          >
            Other Projects
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {other.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex items-start justify-between gap-3 p-5 rounded-xl bg-white/50 border border-black/[0.04] hover:border-accent/15 hover:bg-white hover:shadow-soft transition-all duration-300"
              >
                <div className="min-w-0">
                  <h4 className="text-[14px] font-semibold text-[#1a1a2e] group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="mt-1 text-[12px] text-[#94a3b8] leading-relaxed line-clamp-2">
                    {project.desc}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[10px] text-[#94a3b8] font-mono">{t}</span>
                    ))}
                  </div>
                </div>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="shrink-0 mt-0.5 text-[#d0d0d0] group-hover:text-accent transition-colors duration-300"
                >
                  <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
