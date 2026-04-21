"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "../ui/external-link";
import { Magnetic } from "../ui/magnetic";
import { CONTACT } from "@/lib/content";
import { stagger, slideUp } from "@/lib/animations";

export function ContactFile() {
  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        {/* File header */}
        <motion.div variants={slideUp} className="mb-8">
          <span className="font-mono text-xs text-[#8b8b8b]">
            <span className="text-[#6a9955]"># </span>
            contact.txt — get in touch
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={slideUp}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[#cccccc]"
        >
          Let&apos;s connect<span className="text-accent">.</span>
        </motion.h2>

        <motion.p
          variants={slideUp}
          className="text-[#8b8b8b] text-lg mb-12 max-w-md"
        >
          Open to opportunities, collaborations, and interesting conversations.
        </motion.p>

        {/* Email */}
        <motion.div variants={slideUp} className="mb-12">
          <Magnetic>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-2xl md:text-4xl font-bold text-[#cccccc] hover:text-accent transition-colors underline decoration-[#2d2d2d] underline-offset-8 hover:decoration-accent"
            >
              {CONTACT.email}
            </a>
          </Magnetic>
        </motion.div>

        {/* Social links */}
        <motion.div variants={slideUp} className="flex flex-wrap gap-8 mb-12">
          <Magnetic>
            <ExternalLink href={CONTACT.github} className="text-[#8b8b8b] hover:text-[#cccccc] transition-colors">
              GitHub
            </ExternalLink>
          </Magnetic>
          <Magnetic>
            <ExternalLink href={CONTACT.linkedin} className="text-[#8b8b8b] hover:text-[#cccccc] transition-colors">
              LinkedIn
            </ExternalLink>
          </Magnetic>
          <Magnetic>
            <ExternalLink href={CONTACT.resumeUrl} className="text-[#8b8b8b] hover:text-[#cccccc] transition-colors">
              Resume
            </ExternalLink>
          </Magnetic>
        </motion.div>

        {/* Plaintext representation */}
        <motion.div variants={slideUp}>
          <div className="border border-[#2d2d2d] rounded-lg overflow-hidden bg-[#1e1e1e] font-mono text-xs">
            <div className="px-4 py-2 border-b border-[#2d2d2d] text-[11px] text-[#8b8b8b]">
              contact.txt
            </div>
            <div className="p-4 leading-6 text-[#8b8b8b]">
              <div className="text-[#6a9955]">┌─────────────────────────────────┐</div>
              <div className="text-[#6a9955]">│  CONTACT                        │</div>
              <div className="text-[#6a9955]">├─────────────────────────────────┤</div>
              <div>│  <span className="text-[#9cdcfe]">email</span>     <span className="text-[#ce9178]">{CONTACT.email}</span>  │</div>
              <div>│  <span className="text-[#9cdcfe]">github</span>    <span className="text-[#ce9178]">github.com/Dhairya25</span>  │</div>
              <div>│  <span className="text-[#9cdcfe]">linkedin</span>  <span className="text-[#ce9178]">/in/dhairya-patel</span>     │</div>
              <div>│  <span className="text-[#9cdcfe]">resume</span>    <span className="text-[#ce9178]">dhairya-patel.ca/resume</span>│</div>
              <div className="text-[#6a9955]">└─────────────────────────────────┘</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
