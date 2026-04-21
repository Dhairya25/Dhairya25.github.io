"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "./ui/section-label";
import { ExternalLink } from "./ui/external-link";
import { Magnetic } from "./ui/magnetic";
import { CONTACT } from "@/lib/content";
import { stagger, slideUp } from "@/lib/animations";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section">
      <SectionLabel number="06" title="Contact" />

      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={slideUp}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
        >
          Let&apos;s connect<span className="text-accent">.</span>
        </motion.h2>

        <motion.p
          variants={slideUp}
          className="text-muted text-lg mb-12 max-w-md"
        >
          Open to opportunities, collaborations, and interesting conversations.
        </motion.p>

        {/* Email */}
        <motion.div variants={slideUp} className="mb-12">
          <Magnetic>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-2xl md:text-4xl font-bold text-text hover:text-accent transition-colors underline decoration-border underline-offset-8 hover:decoration-accent"
            >
              {CONTACT.email}
            </a>
          </Magnetic>
        </motion.div>

        {/* Social links */}
        <motion.div variants={slideUp} className="flex flex-wrap gap-8">
          <Magnetic>
            <ExternalLink
              href={CONTACT.github}
              className="text-muted hover:text-text transition-colors"
            >
              GitHub
            </ExternalLink>
          </Magnetic>
          <Magnetic>
            <ExternalLink
              href={CONTACT.linkedin}
              className="text-muted hover:text-text transition-colors"
            >
              LinkedIn
            </ExternalLink>
          </Magnetic>
          <Magnetic>
            <ExternalLink
              href={CONTACT.resumeUrl}
              className="text-muted hover:text-text transition-colors"
            >
              Resume
            </ExternalLink>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
