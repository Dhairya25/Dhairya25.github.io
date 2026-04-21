export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  blurb: string;
}

export interface Project {
  title: string;
  desc: string;
  tech: string[];
  link: string;
  featured?: boolean;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
}

export interface NowItem {
  label: string;
  value: string;
  span?: number;
}

export const RESUME_URL =
  "https://github.com/Dhairya25/Resume/raw/main/Dhairya_Resume_CS_2025.pdf";

export const EXPERIENCE: ExperienceItem[] = [
  {
    year: "2025",
    role: "Co-Founder & Full-Stack Developer",
    company: "Rivo Careers",
    blurb:
      "Building an AI-powered career platform with Next.js, Supabase, and Stripe. Integrated RAG-based resume analysis with LLMs, implemented real-time video via WebRTC, and designed a scalable multi-tenant architecture serving early beta users.",
  },
  {
    year: "2025",
    role: "Network Engineer Co-op",
    company: "WRHN",
    blurb:
      "Managed enterprise network infrastructure across healthcare facilities. Configured switches, VLANs, and firewalls. Automated monitoring dashboards and resolved critical outages under SLA, maintaining 99.9% uptime for clinical systems.",
  },
  {
    year: "2024",
    role: "Software Developer Intern",
    company: "Bio-Excel Pharma",
    blurb:
      "Built e-commerce presence and internal automation tooling. Developed Python ETL pipelines for analytics, streamlined CRM workflows with VBA, and shipped responsive front-end features that improved user engagement.",
  },
  {
    year: "2022 – Present",
    role: "BSc Computer Science + BBA Finance",
    company: "Wilfrid Laurier University",
    blurb:
      "Pursuing a dual degree combining strong technical foundations in CS with business acumen in finance. Coursework includes distributed systems, machine learning, data structures, and financial analysis.",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Rivo Careers",
    desc: "AI-powered career platform with RAG-based resume analysis, real-time video interviews via WebRTC, and a scalable multi-tenant architecture. Built with Next.js, Supabase, and Stripe.",
    tech: ["Next.js", "Supabase", "Stripe", "WebRTC", "RAG"],
    link: "https://github.com/Dhairya25",
    featured: true,
  },
  {
    title: "Financial Portfolio Optimizer",
    desc: "Python + Flask application for backtesting investment portfolios using modern portfolio theory. Improved Sharpe ratios on historical test data with interactive visualizations.",
    tech: ["Python", "Flask", "Scikit-learn", "Yahoo Finance"],
    link: "https://github.com/Dhairya25/financial-portfolio-optimizer",
    featured: true,
  },
  {
    title: "PAW'd",
    desc: "Full-stack pet health management app with vaccination tracking, medication reminders, and a clean dashboard UI.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    link: "https://github.com/Dhairya25",
    featured: true,
  },
  {
    title: "Genetic Algorithm Optimizer",
    desc: "Constraint optimization solver using crossover, mutation, and elitism strategies for multi-variable constrained problems.",
    tech: ["Python", "NumPy"],
    link: "https://github.com/Dhairya25/genetic-algorithm-optimizer",
  },
  {
    title: "Sudoku CSP Solver",
    desc: "Sudoku solver using AC-3 arc consistency, MRV/LCV heuristics, and backtracking with forward checking.",
    tech: ["Python", "CSP"],
    link: "https://github.com/Dhairya25/sudoku-csp-solver",
  },
  {
    title: "A* Puzzle Solver",
    desc: "Sliding tile puzzle solver (8/15) with A* search, Manhattan distance heuristic, and solution path visualization.",
    tech: ["Python", "A*"],
    link: "https://github.com/Dhairya25/A-Puzzle-Solver",
  },
  {
    title: "Excel Grading Application",
    desc: "Automated grading system with dynamic chart generation and Word report output.",
    tech: ["VBA", "SQL", "XML"],
    link: "https://github.com/Dhairya25/excel-grading-automation",
  },
];

export const SELECTED_PROJECTS = PROJECTS.filter((p) => p.featured);

export const CONTACT: ContactInfo = {
  email: "d.patel25@icloud.com",
  linkedin: "https://linkedin.com/in/dhairya-patel-b900b7267",
  github: "https://github.com/Dhairya25",
  resumeUrl: RESUME_URL,
};

export const SKILLS: Record<string, string[]> = {
  Languages: [
    "Python", "Java", "JavaScript", "TypeScript", "C/C++", "C#", "SQL", "R", "VBA", "Bash",
  ],
  Frameworks: [
    "Next.js", "React", "Node.js", "Express", "FastAPI", "Flask", "Tailwind CSS",
  ],
  "AI / ML": [
    "Scikit-learn", "TensorFlow", "PyTorch", "RAG", "LLMs",
  ],
  "Cloud & Tools": [
    "Azure", "GCP", "Supabase", "Vercel", "Docker", "Git", "PostgreSQL", "MongoDB",
  ],
};

export const NOW_ITEMS: NowItem[] = [
  { label: "Building", value: "Rivo Careers — AI career platform", span: 2 },
  { label: "Based in", value: "Waterloo, ON" },
  { label: "Studying", value: "CS + BBA @ Wilfrid Laurier" },
  { label: "Reading", value: "Designing Data-Intensive Applications" },
  { label: "GitHub", value: "github.com/Dhairya25" },
];

export const SECTIONS = [
  { id: "hero", label: "Home", number: "00" },
  { id: "now", label: "Now", number: "01" },
  { id: "work", label: "Selected Work", number: "02" },
  { id: "experience", label: "Experience", number: "03" },
  { id: "toolbox", label: "Toolbox", number: "04" },
  { id: "activity", label: "Activity", number: "05" },
  { id: "contact", label: "Contact", number: "06" },
] as const;
