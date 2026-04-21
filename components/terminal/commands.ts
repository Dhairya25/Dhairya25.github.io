import { CONTACT, EXPERIENCE, PROJECTS, SKILLS } from "@/lib/content";

export interface CommandResult {
  command: string;
  output: string[];
  isError?: boolean;
}

export function parseCommand(input: string): CommandResult {
  const trimmed = input.trim().toLowerCase();
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0];
  const arg = parts.slice(1).join(" ");

  switch (cmd) {
    case "help":
      return {
        command: input,
        output: [
          "Available commands:",
          "",
          "  whoami          About me",
          "  ls projects     List projects",
          "  cat contact.txt Contact info",
          "  experience      Work history",
          "  skills          Technical skills",
          "  clear           Clear terminal",
          "  help            Show this message",
        ],
      };

    case "whoami":
      return {
        command: input,
        output: [
          "Dhairya Patel",
          "─────────────",
          "CS + BBA student @ Wilfrid Laurier University",
          "Co-Founder & Full-Stack Developer @ Rivo Careers",
          "Based in Waterloo, ON",
          "",
          "Building AI-powered products with Next.js, Python, and modern tooling.",
        ],
      };

    case "ls":
      if (arg === "projects" || arg === "projects/") {
        return {
          command: input,
          output: PROJECTS.map(
            (p, i) =>
              `${p.featured ? "★" : " "} ${String(i + 1).padStart(2, "0")}  ${p.title.padEnd(32)} [${p.tech.slice(0, 3).join(", ")}]`
          ),
        };
      }
      return {
        command: input,
        output: [
          "projects/    contact.txt    experience/    skills/    README.md",
        ],
        isError: false,
      };

    case "cat":
      if (arg === "contact.txt") {
        return {
          command: input,
          output: [
            "┌─────────────────────────────────┐",
            "│  CONTACT                        │",
            "├─────────────────────────────────┤",
            `│  email     ${CONTACT.email.padEnd(21)}│`,
            `│  github    github.com/Dhairya25  │`,
            `│  linkedin  /in/dhairya-patel     │`,
            "│  resume    dhairya.dev/resume     │",
            "└─────────────────────────────────┘",
          ],
        };
      }
      return {
        command: input,
        output: [`cat: ${arg || "(no file)"}: No such file or directory`],
        isError: true,
      };

    case "experience":
      return {
        command: input,
        output: EXPERIENCE.map(
          (e) => `${e.year.padEnd(16)} ${e.role}\n${"".padEnd(16)} @ ${e.company}`
        ),
      };

    case "skills":
      return {
        command: input,
        output: Object.entries(SKILLS).flatMap(([category, items]) => [
          `\n${category}:`,
          `  ${items.join(", ")}`,
        ]),
      };

    case "clear":
      return { command: input, output: [] };

    case "":
      return { command: "", output: [] };

    default:
      return {
        command: input,
        output: [`command not found: ${cmd}. Type 'help' for available commands.`],
        isError: true,
      };
  }
}
