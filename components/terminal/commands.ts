import { fileTree, isFolder, isFile, type TreeNode, type VirtualFolder, type VirtualFile } from "@/lib/ide-files";
import { siteConfig } from "@/data/meta";

export interface CommandResult {
  output: string;
  isError?: boolean;
  action?: "clear" | "mode-editorial" | "mode-terminal" | "mode-ide" | "resume-cs" | "resume-bba" | "open-project";
  actionPayload?: string;
}

function findNode(path: string): TreeNode | null {
  if (path === "" || path === "/" || path === "~") return fileTree;

  const parts = path.replace(/^\//, "").split("/").filter(Boolean);
  let current: TreeNode = fileTree;

  for (const part of parts) {
    if (!isFolder(current)) return null;
    const child: TreeNode | undefined = (current as VirtualFolder).children.find((c: TreeNode) => {
      if (isFile(c)) return c.name === part;
      return (c as VirtualFolder).name === part;
    });
    if (!child) return null;
    current = child;
  }
  return current;
}

function listDir(path: string): string {
  const node = findNode(path);
  if (!node) return `ls: cannot access '${path}': No such file or directory`;
  if (!isFolder(node)) return (node as VirtualFile).name;

  const entries = (node as VirtualFolder).children.map((c) => {
    if (isFolder(c)) return `${c.name}/`;
    return (c as VirtualFile).name;
  });
  return entries.join("  ");
}

function catFile(path: string): string {
  const node = findNode(path);
  if (!node) return `cat: ${path}: No such file or directory`;
  if (isFolder(node)) return `cat: ${path}: Is a directory`;
  return (node as VirtualFile).content;
}

const HELP_TEXT = `Available commands:

  help          Show this message
  ls [path]     List directory contents
  cd <path>     Change directory
  cat <file>    Display file contents
  whoami        Display bio
  contact       Show contact information
  open <proj>   Open a project case page
  mode <name>   Switch mode (editorial, ide, terminal)
  resume <type> Download resume (cs, bba)
  clear         Clear terminal
  sudo hire me  ;)`;

const WHOAMI_TEXT = `Dhairya Patel
Senior at Wilfrid Laurier University
Dual degree: Honors BSc Computer Science + Honors BBA
Co-founder of Rivo Careers`;

const CONTACT_TEXT = `  Email:    ${siteConfig.email}
  Phone:    ${siteConfig.phone}
  GitHub:   ${siteConfig.github}
  LinkedIn: ${siteConfig.linkedin}
  Location: ${siteConfig.location}`;

const SUDO_HIRE_ME = `
  ┌─────────────────────────────────────────────┐
  │  DHAIRYA PATEL                              │
  │  d.patel25@icloud.com                       │
  │  +1 (647) 564 1602                          │
  │                                             │
  │  Currently looking for Fall 2026 co-op.     │
  │  Software engineering or investment         │
  │  analysis. Or anything at the seam.         │
  │                                             │
  │  Resume: resume cs | resume bba             │
  └─────────────────────────────────────────────┘`;

export function executeCommand(input: string, cwd: string): { result: CommandResult; newCwd: string } {
  const trimmed = input.trim();
  if (!trimmed) return { result: { output: "" }, newCwd: cwd };

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case "help":
      return { result: { output: HELP_TEXT }, newCwd: cwd };

    case "whoami":
      return { result: { output: WHOAMI_TEXT }, newCwd: cwd };

    case "contact":
      return { result: { output: CONTACT_TEXT }, newCwd: cwd };

    case "ls": {
      const target = args[0] || cwd;
      const path = target.startsWith("/") ? target : cwd ? `${cwd}/${target}` : target;
      return { result: { output: listDir(path.replace(/^\//, "")) }, newCwd: cwd };
    }

    case "cd": {
      if (!args[0] || args[0] === "~" || args[0] === "/") {
        return { result: { output: "" }, newCwd: "" };
      }
      if (args[0] === "..") {
        const parts = cwd.split("/").filter(Boolean);
        parts.pop();
        return { result: { output: "" }, newCwd: parts.join("/") };
      }
      const target = args[0].startsWith("/") ? args[0] : cwd ? `${cwd}/${args[0]}` : args[0];
      const clean = target.replace(/^\//, "");
      const node = findNode(clean);
      if (!node) return { result: { output: `cd: no such file or directory: ${args[0]}`, isError: true }, newCwd: cwd };
      if (!isFolder(node)) return { result: { output: `cd: not a directory: ${args[0]}`, isError: true }, newCwd: cwd };
      return { result: { output: "" }, newCwd: clean };
    }

    case "cat": {
      if (!args[0]) return { result: { output: "cat: missing file operand", isError: true }, newCwd: cwd };
      const target = args[0].startsWith("/") ? args[0] : cwd ? `${cwd}/${args[0]}` : args[0];
      return { result: { output: catFile(target.replace(/^\//, "")) }, newCwd: cwd };
    }

    case "open": {
      if (!args[0]) return { result: { output: "open: specify a project (rivo-careers, co-operators, bio-excel, stratos, wrhn)", isError: true }, newCwd: cwd };
      const slug = args[0].toLowerCase();
      const valid = ["rivo-careers", "co-operators", "bio-excel", "stratos", "wrhn"];
      if (!valid.includes(slug)) return { result: { output: `open: unknown project '${slug}'. Valid: ${valid.join(", ")}`, isError: true }, newCwd: cwd };
      return { result: { output: `Opening /work/${slug}...`, action: "open-project", actionPayload: slug }, newCwd: cwd };
    }

    case "mode": {
      const mode = args[0]?.toLowerCase();
      if (mode === "editorial") return { result: { output: "Switching to editorial mode...", action: "mode-editorial" }, newCwd: cwd };
      if (mode === "terminal") return { result: { output: "Switching to terminal mode...", action: "mode-terminal" }, newCwd: cwd };
      if (mode === "ide") return { result: { output: "Switching to IDE mode...", action: "mode-ide" }, newCwd: cwd };
      return { result: { output: "mode: specify editorial, ide, or terminal", isError: true }, newCwd: cwd };
    }

    case "resume": {
      const type = args[0]?.toLowerCase();
      if (type === "cs") return { result: { output: "Downloading CS resume...", action: "resume-cs" }, newCwd: cwd };
      if (type === "bba") return { result: { output: "Downloading BBA resume...", action: "resume-bba" }, newCwd: cwd };
      return { result: { output: "resume: specify cs or bba", isError: true }, newCwd: cwd };
    }

    case "clear":
      return { result: { output: "", action: "clear" }, newCwd: cwd };

    case "pwd":
      return { result: { output: cwd ? `/${cwd}` : "/" }, newCwd: cwd };

    case "echo":
      return { result: { output: args.join(" ") }, newCwd: cwd };

    case "sudo":
      if (args.join(" ").toLowerCase() === "hire me") {
        return { result: { output: SUDO_HIRE_ME }, newCwd: cwd };
      }
      return { result: { output: `zsh: command not found: sudo ${args.join(" ")}`, isError: true }, newCwd: cwd };

    default:
      return { result: { output: `zsh: command not found: ${cmd}`, isError: true }, newCwd: cwd };
  }
}
