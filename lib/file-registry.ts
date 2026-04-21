export type FileIcon = "markdown" | "typescript" | "react" | "json" | "text";

export interface FileEntry {
  id: string;
  name: string;
  icon: FileIcon;
  folder: string | null;
}

export interface FolderEntry {
  name: string;
  files: FileEntry[];
}

export const FILES: FileEntry[] = [
  { id: "readme", name: "README.md", icon: "markdown", folder: null },
  { id: "about", name: "about.ts", icon: "typescript", folder: "src" },
  { id: "projects", name: "projects.tsx", icon: "react", folder: "src" },
  { id: "experience", name: "experience.ts", icon: "typescript", folder: "src" },
  { id: "skills", name: "skills.json", icon: "json", folder: "src" },
  { id: "activity", name: "CONTRIBUTING.md", icon: "markdown", folder: null },
  { id: "contact", name: "contact.txt", icon: "text", folder: null },
];

export function getFile(id: string): FileEntry | undefined {
  return FILES.find((f) => f.id === id);
}

export function getFilesByFolder(): { root: FileEntry[]; folders: FolderEntry[] } {
  const root = FILES.filter((f) => !f.folder);
  const folderMap = new Map<string, FileEntry[]>();

  FILES.forEach((f) => {
    if (f.folder) {
      const existing = folderMap.get(f.folder) || [];
      existing.push(f);
      folderMap.set(f.folder, existing);
    }
  });

  const folders: FolderEntry[] = Array.from(folderMap.entries()).map(
    ([name, files]) => ({ name, files })
  );

  return { root, folders };
}

export function getFileExtension(id: string): string {
  const file = getFile(id);
  if (!file) return "";
  const parts = file.name.split(".");
  return parts[parts.length - 1];
}

export function getFilePath(id: string): string {
  const file = getFile(id);
  if (!file) return "";
  return file.folder ? `${file.folder}/${file.name}` : file.name;
}

export const ICON_COLORS: Record<FileIcon, string> = {
  markdown: "#519aba",
  typescript: "#3178c6",
  react: "#61dafb",
  json: "#cbcb41",
  text: "#a6a6a6",
};
