"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useIDE } from "@/lib/ide-store";
import { TabBar } from "./tab-bar";
import { ReadmeFile } from "../files/readme-file";
import { AboutFile } from "../files/about-file";
import { ProjectsFile } from "../files/projects-file";
import { ExperienceFile } from "../files/experience-file";
import { SkillsFile } from "../files/skills-file";
import { ActivityFile } from "../files/activity-file";
import { ContactFile } from "../files/contact-file";

const FILE_COMPONENTS: Record<string, React.ComponentType> = {
  readme: ReadmeFile,
  about: AboutFile,
  projects: ProjectsFile,
  experience: ExperienceFile,
  skills: SkillsFile,
  activity: ActivityFile,
  contact: ContactFile,
};

function WelcomeScreen() {
  const { openFile } = useIDE();

  return (
    <div className="flex items-center justify-center h-full text-center">
      <div>
        <h2 className="font-mono text-2xl text-[#5a5a5a] mb-2">
          Dhairya Patel
        </h2>
        <p className="font-mono text-sm text-[#4a4a4a] mb-6">
          Open a file from the explorer to get started
        </p>
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => openFile("readme")}
            className="font-mono text-sm text-accent hover:underline"
          >
            README.md
          </button>
          <span className="font-mono text-[10px] text-[#4a4a4a]">
            or press <kbd className="px-1.5 py-0.5 bg-[#2d2d2d] rounded text-[#8b8b8b]">Cmd+K</kbd> to search
          </span>
        </div>
      </div>
    </div>
  );
}

export function EditorArea() {
  const { activeTab } = useIDE();
  const ActiveComponent = activeTab ? FILE_COMPONENTS[activeTab] : null;

  return (
    <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-[#1f1f1f]">
      <TabBar />
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {ActiveComponent ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 overflow-y-auto ide-scrollbar"
            >
              <ActiveComponent />
            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <WelcomeScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
