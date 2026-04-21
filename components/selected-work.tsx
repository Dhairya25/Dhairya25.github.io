"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SectionLabel } from "./ui/section-label";
import { ExternalLink } from "./ui/external-link";
import { SELECTED_PROJECTS } from "@/lib/content";

export function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const activeProject = SELECTED_PROJECTS[activeIndex];

  return (
    <section id="work" className="section">
      <SectionLabel number="02" title="Selected Work" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* IDE-style window */}
        <div className="border border-border rounded-lg overflow-hidden bg-surface">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-bg border-b border-border">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[11px] text-muted">
              projects — dhairya-patel
            </span>
          </div>

          {/* Tab bar — project tabs */}
          <div className="flex border-b border-border bg-bg overflow-x-auto">
            {SELECTED_PROJECTS.map((project, i) => (
              <button
                key={project.title}
                onClick={() => setActiveIndex(i)}
                className={`flex items-center gap-2 px-4 py-2 border-r border-border font-mono text-[11px] whitespace-nowrap transition-colors ${
                  i === activeIndex
                    ? "bg-surface text-text border-b-2 border-b-accent"
                    : "text-muted hover:text-text hover:bg-surface/50"
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={i === activeIndex ? "text-accent" : "text-muted/50"}>
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M13 2v7h7" stroke="currentColor" strokeWidth="2" />
                </svg>
                {project.title.toLowerCase().replace(/\s+/g, "-")}.md
              </button>
            ))}
          </div>

          {/* Content area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="p-0"
            >
              {/* Editor-style content with line numbers */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
                {/* Main content — like a markdown preview */}
                <div className="p-8 md:p-10 md:border-r md:border-border">
                  {/* Project number + featured badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded">
                      PROJECT 0{activeIndex + 1}
                    </span>
                    {activeProject.featured && (
                      <span className="font-mono text-[10px] text-[--green] bg-[--green]/10 px-2 py-0.5 rounded">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                    {activeProject.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted leading-relaxed mb-8 max-w-lg text-base">
                    {activeProject.desc}
                  </p>

                  {/* Link */}
                  <ExternalLink
                    href={activeProject.link}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-md hover:bg-accent/20 transition-colors text-sm font-medium"
                  >
                    View on GitHub
                  </ExternalLink>
                </div>

                {/* Sidebar — metadata panel */}
                <div className="p-6 bg-bg/50 hidden md:block">
                  <p className="font-mono text-[10px] text-muted uppercase tracking-wider mb-4">
                    Properties
                  </p>

                  {/* Status */}
                  <div className="mb-4">
                    <p className="font-mono text-[10px] text-muted/60 mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[--green]" />
                      <span className="text-sm text-text">Active</span>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="mb-4">
                    <p className="font-mono text-[10px] text-muted/60 mb-1">Type</p>
                    <span className="text-sm text-text">Full-Stack</span>
                  </div>

                  {/* Tech stack */}
                  <div className="mb-4">
                    <p className="font-mono text-[10px] text-muted/60 mb-2">Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface border border-border text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div>
                    <p className="font-mono text-[10px] text-muted/60 mb-1">Repository</p>
                    <ExternalLink
                      href={activeProject.link}
                      className="text-xs text-accent hover:underline"
                    >
                      github.com/Dhairya25
                    </ExternalLink>
                  </div>
                </div>
              </div>

              {/* Mobile tech tags */}
              <div className="md:hidden px-8 pb-6">
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-bg border border-border text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom status bar */}
          <div className="flex items-center justify-between px-4 py-1.5 bg-bg border-t border-border font-mono text-[10px] text-muted">
            <div className="flex items-center gap-4">
              <span>Ln 1, Col 1</span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Markdown</span>
              <span className="text-accent">{activeProject.tech.length} deps</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
