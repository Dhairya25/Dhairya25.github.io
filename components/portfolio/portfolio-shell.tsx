"use client";

import { motion } from "framer-motion";
import { PortfolioNav } from "./portfolio-nav";
import { HeroSection } from "./hero-section";
import { AboutSection } from "./about-section";
import { ProjectsSection } from "./projects-section";
import { ExperienceSection } from "./experience-section";
import { SkillsSection } from "./skills-section";
import { ActivitySection } from "./activity-section";
import { ContactSection } from "./contact-section";
import { PortfolioFooter } from "./portfolio-footer";

export function PortfolioShell() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAF8] noise-overlay"
    >
      <PortfolioNav />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ActivitySection />
        <ContactSection />
      </main>
      <PortfolioFooter />
    </motion.div>
  );
}
