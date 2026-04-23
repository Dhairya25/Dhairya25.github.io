export const siteConfig = {
  name: "Dhairya Patel",
  title: "Dhairya Patel",
  description:
    "Senior at Wilfrid Laurier, Computer Science and Business Administration. Co-founder of Rivo Careers. Work, writing, and a pair of resumes.",
  url: "https://dhairya-patel.ca",
  email: "d.patel25@icloud.com",
  phone: "+1 (647) 564 1602",
  location: "Kitchener, ON",
  github: "https://github.com/Dhairya25",
  linkedin: "https://linkedin.com/in/dhairya-patel-b900b7267",
  resumes: {
    cs: "/resumes/Dhairya_Resume_CS_2026.pdf",
    bba: "/resumes/Dhairya_Resume_BBA_2026.pdf",
  },
  // Masthead
  volume: "III",
  issue: "07",
};

export interface NowItem {
  label: string;
  value: string;
}

export const nowItems: NowItem[] = [
  { label: "Building", value: "Rivo Careers. Season-ending Lazaridis case prep." },
  { label: "Reading", value: "Designing Data-Intensive Applications (Kleppmann)." },
  { label: "Listening", value: "recommendations welcome." },
];

// Open-to section for contact
export const openTo =
  "I'm finishing my senior year at Laurier (graduating April 2027) and looking for Fall 2026 co-op roles. I'm interested in software engineering, investment analysis, or anything that lets me work across both. If you have something that fits, I'd like to hear about it.";

// Hero copy for editorial mode
export const heroCopy =
  "I build software and model businesses. Usually for the same project. I'm a senior at Wilfrid Laurier studying Computer Science and Business Administration, and I co-founded Rivo Careers in late 2025, where I ship the engineering and own the financial model. Before that, I analyzed 200+ daily securities transactions at Co-operators Insurance and automated clinical deployments at a regional health network. I carry both halves because most interesting problems live at the seam.";

// Writing entries metadata
export interface WritingEntry {
  slug: string;
  title: string;
  status: "published" | "coming";
  comingDate?: string;
  description?: string;
}

export const writingEntries: WritingEntry[] = [
  {
    slug: "reverse-audits",
    title: "What a tax reverse-audit teaches you about dirty data.",
    status: "coming",
    comingDate: "Summer 2026",
  },
  {
    slug: "ml-matcher-weekend",
    title: "Rebuilding our ML job-matcher in a weekend (and why the simpler one won).",
    status: "coming",
    comingDate: "Summer 2026",
  },
  {
    slug: "financial-modeling-founders",
    title: "Financial modeling for founders who also ship the code.",
    status: "coming",
    comingDate: "Fall 2026",
  },
  {
    slug: "kleppmann-part-1",
    title: "Reading notes: Kleppmann, Part I.",
    status: "coming",
    comingDate: "Fall 2026",
  },
];

// Terminal mode: positions/opinions
export interface Position {
  stance: "LONG" | "SHORT" | "NEUTRAL";
  statement: string;
}

export const positions: Position[] = [
  { stance: "LONG", statement: "engineers who can model a cap table." },
  { stance: "LONG", statement: "financial tools with editable code paths." },
  { stance: "SHORT", statement: "SaaS that hides its pricing from engineers." },
  { stance: "NEUTRAL", statement: "headless CMS for sites that won't outlive a year." },
  { stance: "LONG", statement: "case comps as forcing functions, not as extracurriculars." },
  { stance: "LONG", statement: "spreadsheets over dashboards for anything you actually reason about." },
];

// Terminal mode: research notes
export interface ResearchNote {
  symbol: string;
  author: string;
  date: string;
  thesis: string;
  mechanism: string;
  risk: string;
}

export const researchNotes: ResearchNote[] = [
  {
    symbol: "RIVO-ML",
    author: "D. PATEL",
    date: "2025-11",
    thesis: "Two-phase resume matcher outperforms one-phase at precision@5 by 23pp.",
    mechanism: "NLP embedding + behavioral signal blend (configurable strictness).",
    risk: "Cold-start dominates error at low session counts.",
  },
  {
    symbol: "RIVO-INT",
    author: "D. PATEL",
    date: "2025-11",
    thesis: "Lip-synced avatar interviews improve candidate preparation confidence over text-only.",
    mechanism: "WebRTC + speech-to-text pipeline with real-time evaluation across three categories.",
    risk: "Latency spikes on low-bandwidth connections degrade avatar sync quality.",
  },
  {
    symbol: "PORT-OPT",
    author: "D. PATEL",
    date: "2025-03",
    thesis: "ML-optimized allocation improves Sharpe ratio by 12% over equal-weight baseline.",
    mechanism: "Covariance estimation + mean-variance optimization on Yahoo Finance real-time feed.",
    risk: "Overfitting to trailing window; regime changes undetected.",
  },
  {
    symbol: "PAWD",
    author: "D. PATEL",
    date: "2025-06",
    thesis: "Pet owners underserve vaccination tracking; digital log reduces missed doses.",
    mechanism: "React + Node.js + Supabase with calendar-based reminder system.",
    risk: "Retention dependent on notification permissions; low engagement without push.",
  },
  {
    symbol: "GRDR",
    author: "D. PATEL",
    date: "2024-12",
    thesis: "VBA + SQL grading tool replaces manual Excel workflows for course evaluation.",
    mechanism: "Macro-driven input with XML schema validation and MSSQL backend.",
    risk: "Excel version compatibility; macro security policies block enterprise deployment.",
  },
];

// Terminal mode: ticker items
export const tickerItems = [
  "RIVO +72% WoW (user growth)",
  "DP OPEN TO FALL 2026 CO-OP",
  "PORT-OPT +12% SHARPE",
  "WRHN -30% TICKET TIME",
  "COOP SOP ADOPTION +50%",
  "BSc + BBA DUAL DEGREE 2027",
];

// Terminal mode: holdings table
export interface Holding {
  ticker: string;
  role: string;
  company: string;
  start: string;
  end: string;
  metric: string;
}

export const holdings: Holding[] = [
  { ticker: "RIVO", role: "Co-Founder", company: "Rivo Careers", start: "11/25", end: "PRES", metric: "Seed-stage, 6 product lines" },
  { ticker: "COOP", role: "Investment Analyst", company: "Co-operators Insurance", start: "01/25", end: "05/25", metric: "+50% desk SOP adoption" },
  { ticker: "BXCL", role: "Software Dev Intern", company: "Bio-Excel Pharma", start: "03/25", end: "11/25", metric: "CRM refactor + ETL" },
  { ticker: "STRT", role: "Tax Advisor", company: "Stratos Solutions", start: "05/24", end: "08/24", metric: "Provincial recovery (multi-jurisd)" },
  { ticker: "WRHN", role: "Network Engineer", company: "WRHN", start: "09/25", end: "12/25", metric: "-30% ticket resolution time" },
];

// Terminal mode: transactions
export interface Transaction {
  name: string;
  category: string;
  status: "DELIVERED" | "AWARDED" | "IN PROGRESS";
}

export const transactions: Transaction[] = [
  { name: "LAZARIDIS / WEALTHSIMPLE LIVE CONSULTING", category: "Case Competition", status: "DELIVERED" },
  { name: "LAURIER SC / NESTLE", category: "Case Competition", status: "DELIVERED" },
  { name: "GOOGLE / DIG MKTG + E-COMMERCE CERT", category: "Certification", status: "AWARDED" },
  { name: "META / BACK-END DEVELOPER CERT", category: "Certification", status: "AWARDED" },
];
