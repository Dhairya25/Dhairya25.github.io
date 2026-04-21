"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/content";
import { stagger, slideUp } from "@/lib/animations";

const CATEGORY_ICONS: Record<string, string> = {
  Languages: "{ }",
  Frameworks: "< />",
  "AI / ML": "◈",
  "Cloud & Tools": "☁",
};

export function SkillsFile() {
  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        {/* File header */}
        <motion.div variants={slideUp} className="mb-8">
          <span className="font-mono text-xs text-[#8b8b8b]">
            <span className="text-[#c586c0]">// </span>
            src/skills.json — tech stack
          </span>
        </motion.div>

        {/* Skills grid */}
        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(SKILLS).map(([category, tools]) => (
            <motion.div
              key={category}
              variants={slideUp}
              className="border border-[#2d2d2d] rounded-lg p-6 bg-[#1e1e1e] hover:bg-[#252526] hover:border-accent/20 transition-all group"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-accent text-sm">
                  {CATEGORY_ICONS[category] || "●"}
                </span>
                <h3 className="font-mono text-xs text-[#8b8b8b] uppercase tracking-widest">
                  {category}
                </h3>
                <span className="font-mono text-[10px] text-[#5a5a5a] ml-auto">
                  {tools.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, i) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(34, 141, 242, 0.1)",
                      borderColor: "rgba(34, 141, 242, 0.4)",
                    }}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg border border-[#2d2d2d] text-xs text-[#8b8b8b] hover:text-[#cccccc] transition-colors cursor-default font-mono"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* JSON representation */}
        <motion.div variants={slideUp} className="mt-8">
          <div className="border border-[#2d2d2d] rounded-lg overflow-hidden bg-[#1e1e1e] font-mono text-xs">
            <div className="px-4 py-2 border-b border-[#2d2d2d] text-[11px] text-[#8b8b8b]">
              skills.json
            </div>
            <div className="p-4 leading-6 max-h-[200px] overflow-y-auto ide-scrollbar">
              <div className="text-[#cccccc]">{"{"}</div>
              {Object.entries(SKILLS).map(([cat, tools], i, arr) => (
                <div key={cat}>
                  <div className="pl-4">
                    <span className="text-[#9cdcfe]">&quot;{cat}&quot;</span>
                    <span className="text-[#cccccc]">: [</span>
                  </div>
                  <div className="pl-8 text-[#ce9178]">
                    {tools.map((t, j) => (
                      <span key={t}>
                        &quot;{t}&quot;{j < tools.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                  <div className="pl-4 text-[#cccccc]">]{i < arr.length - 1 ? "," : ""}</div>
                </div>
              ))}
              <div className="text-[#cccccc]">{"}"}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
