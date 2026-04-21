"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "../ui/external-link";
import { SELECTED_PROJECTS } from "@/lib/content";

export function ProjectsFile() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = SELECTED_PROJECTS[activeIndex];

  return (
    <div className="p-6 md:p-8">
      {/* IDE-style window */}
      <div className="border border-[#2d2d2d] rounded-lg overflow-hidden bg-[#1e1e1e]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-[#2d2d2d]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[11px] text-[#8b8b8b]">
            projects — dhairya-patel
          </span>
        </div>

        {/* Tab bar — project tabs */}
        <div className="flex border-b border-[#2d2d2d] bg-[#1a1a1a] overflow-x-auto ide-scrollbar">
          {SELECTED_PROJECTS.map((project, i) => (
            <button
              key={project.title}
              onClick={() => setActiveIndex(i)}
              className={`flex items-center gap-2 px-4 py-2 border-r border-[#2d2d2d] font-mono text-[11px] whitespace-nowrap transition-colors ${
                i === activeIndex
                  ? "bg-[#1e1e1e] text-[#cccccc] border-b-2 border-b-accent"
                  : "text-[#8b8b8b] hover:text-[#cccccc] hover:bg-[#252526]"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={i === activeIndex ? "text-accent" : "text-[#5a5a5a]"}>
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
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
              {/* Main content */}
              <div className="p-8 md:p-10 md:border-r md:border-[#2d2d2d]">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded">
                    PROJECT 0{activeIndex + 1}
                  </span>
                  {activeProject.featured && (
                    <span className="font-mono text-[10px] text-[#15ac91] bg-[#15ac91]/10 px-2 py-0.5 rounded">
                      FEATURED
                    </span>
                  )}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-[#cccccc]">
                  {activeProject.title}
                </h3>

                <p className="text-[#8b8b8b] leading-relaxed mb-8 max-w-lg text-base">
                  {activeProject.desc}
                </p>

                <ExternalLink
                  href={activeProject.link}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-md hover:bg-accent/20 transition-colors text-sm font-medium"
                >
                  View on GitHub
                </ExternalLink>
              </div>

              {/* Sidebar — metadata panel */}
              <div className="p-6 bg-[#1a1a1a] hidden md:block">
                <p className="font-mono text-[10px] text-[#8b8b8b] uppercase tracking-wider mb-4">
                  Properties
                </p>

                <div className="mb-4">
                  <p className="font-mono text-[10px] text-[#5a5a5a] mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#15ac91]" />
                    <span className="text-sm text-[#cccccc]">Active</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-mono text-[10px] text-[#5a5a5a] mb-1">Type</p>
                  <span className="text-sm text-[#cccccc]">Full-Stack</span>
                </div>

                <div className="mb-4">
                  <p className="font-mono text-[10px] text-[#5a5a5a] mb-2">Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1e1e1e] border border-[#2d2d2d] text-[#8b8b8b]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-[10px] text-[#5a5a5a] mb-1">Repository</p>
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
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1a1a1a] border border-[#2d2d2d] text-[#8b8b8b]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#1a1a1a] border-t border-[#2d2d2d] font-mono text-[10px] text-[#8b8b8b]">
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
    </div>
  );
}
