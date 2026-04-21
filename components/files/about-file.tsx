"use client";

import { motion } from "framer-motion";
import { NOW_ITEMS } from "@/lib/content";
import { stagger, slideUp } from "@/lib/animations";

export function AboutFile() {
  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        {/* File header */}
        <motion.div variants={slideUp} className="mb-8">
          <span className="font-mono text-xs text-[#8b8b8b]">
            <span className="text-[#c586c0]">// </span>
            src/about.ts — current status
          </span>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {NOW_ITEMS.map((item) => (
            <motion.div
              key={item.label}
              variants={slideUp}
              className={`border border-[#2d2d2d] rounded-lg p-6 bg-[#1e1e1e] hover:bg-[#252526] hover:border-accent/30 transition-all ${
                item.span === 2 ? "md:col-span-2" : ""
              }`}
            >
              <span className="font-mono text-[10px] text-accent uppercase tracking-wider block mb-2">
                {item.label}
              </span>
              <p className="text-sm text-[#cccccc]">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Code-style about */}
        <motion.div variants={slideUp}>
          <div className="border border-[#2d2d2d] rounded-lg overflow-hidden bg-[#1e1e1e] font-mono text-xs">
            <div className="px-4 py-2 border-b border-[#2d2d2d] text-[11px] text-[#8b8b8b]">
              about.ts
            </div>
            <div className="p-4 leading-6">
              <div className="text-[#6a9955]">{"// What I'm focused on right now"}</div>
              <div>&nbsp;</div>
              <div><span className="text-[#c586c0]">interface</span> <span className="text-[#4ec9b0]">Status</span> {"{"}</div>
              <div className="pl-4"><span className="text-[#9cdcfe]">building</span>: <span className="text-[#4ec9b0]">string</span>;</div>
              <div className="pl-4"><span className="text-[#9cdcfe]">location</span>: <span className="text-[#4ec9b0]">string</span>;</div>
              <div className="pl-4"><span className="text-[#9cdcfe]">studying</span>: <span className="text-[#4ec9b0]">string</span>;</div>
              <div className="pl-4"><span className="text-[#9cdcfe]">reading</span>: <span className="text-[#4ec9b0]">string</span>;</div>
              <div>{"}"}</div>
              <div>&nbsp;</div>
              <div><span className="text-[#c586c0]">export const</span> <span className="text-[#4fc1ff]">currentStatus</span>: <span className="text-[#4ec9b0]">Status</span> = {"{"}</div>
              <div className="pl-4"><span className="text-[#9cdcfe]">building</span>: <span className="text-[#ce9178]">&quot;Rivo Careers — AI career platform&quot;</span>,</div>
              <div className="pl-4"><span className="text-[#9cdcfe]">location</span>: <span className="text-[#ce9178]">&quot;Waterloo, ON&quot;</span>,</div>
              <div className="pl-4"><span className="text-[#9cdcfe]">studying</span>: <span className="text-[#ce9178]">&quot;CS + BBA @ Wilfrid Laurier&quot;</span>,</div>
              <div className="pl-4"><span className="text-[#9cdcfe]">reading</span>: <span className="text-[#ce9178]">&quot;Designing Data-Intensive Applications&quot;</span>,</div>
              <div>{"};"}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
