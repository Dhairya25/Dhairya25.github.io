export interface Experience {
  id: string;
  code: string; // W-01, W-02, etc.
  year: string;
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  slug: string;
  type: "engineering" | "finance" | "both";
  brief: string;
  bullets: string[];
  pullQuote?: { value: string; label: string };
  artifacts?: { type: "screenshot" | "diagram" | "code" | "quote"; src?: string }[];
}

export const experiences: Experience[] = [
  {
    id: "rivo-careers",
    code: "W-01",
    year: "2025",
    role: "Co-Founder",
    company: "Rivo Careers",
    location: "Remote",
    start: "Nov 2025",
    end: "Present",
    slug: "rivo-careers",
    type: "both",
    brief:
      "Architected a full-stack career platform with 64 API routes across 6 domains. Built a real-time AI mock interview system with a lip-synced humanoid avatar, live speech transcription, and automated evaluation. Built a two-phase ML job matching engine combining NLP resume scoring with behavioral signals. Orchestrated a daily aggregation pipeline that sources, deduplicates, and validates thousands of Canadian internship listings.",
    bullets: [
      "Architected and scaled a full-stack career platform end-to-end, managing deployment and API design across 64 routes covering six core product domains.",
      "Engineered a real-time AI mock interview system featuring a lip-synced humanoid avatar, live speech transcription, and automated performance evaluation across behavioral, technical, and communication categories.",
      "Built a two-phase ML job matching engine that combines NLP-based resume scoring with behavioral signals from user activity to deliver personalized role recommendations with configurable strictness.",
      "Orchestrated an automated job aggregation pipeline that sources, deduplicates, and validates thousands of Canadian internship listings daily, maintaining accuracy through a multi-layer expiry detection system.",
      "Built financial models projecting unit economics, CAC/LTV ratios, and runway scenarios, informing pricing strategy and go-to-market execution.",
      "Conducted market sizing and competitive analysis across the North American career services landscape, identifying a multi-billion dollar TAM.",
      "Presented growth metrics, KPI performance, and strategic roadmaps to advisors and prospective investors.",
    ],
  },
  {
    id: "co-operators",
    code: "W-02",
    year: "2025",
    role: "Investment Analyst Co-op",
    company: "Co-operators Insurance",
    location: "Guelph, ON",
    start: "Jan 2025",
    end: "May 2025",
    slug: "co-operators",
    type: "finance",
    brief:
      "Analyzed 200+ daily mutual fund and securities transactions using Dataphile, OnBase, and Fundserv. Ran weekly compliance reviews against IIROC and KYC standards on 150+ securities. Designed a VBA reconciliation model adopted as desk SOP, cutting turnaround 50%.",
    bullets: [
      "Analyzed 200+ daily mutual fund and securities transactions across Canadian and international portfolios using Dataphile, OnBase, and Fundserv, evaluating trade execution quality and ensuring alignment with T+2 settlement standards.",
      "Performed weekly investment compliance reviews on 150+ securities transactions, assessing KYC documentation, prospectus adherence, and IIROC regulatory standards to flag anomalies and mitigate portfolio-level risk exposure.",
      "Conducted fund flow, asset allocation, and sector exposure analysis across client portfolios, producing advisor-facing research that informed mutual fund performance reviews, risk assessments, and rebalancing recommendations.",
      "Designed a VBA-backed reconciliation and investment tracking model, adopted as the desk's standard operating procedure (SOP), reducing analysis turnaround time by 50% and improving accuracy of portfolio reporting.",
    ],
    pullQuote: { value: "50%", label: "reduction in analysis turnaround after VBA model adopted as desk SOP" },
  },
  {
    id: "bio-excel",
    code: "W-03",
    year: "2025",
    role: "Software Developer Intern",
    company: "Bio-Excel Pharma",
    location: "Remote",
    start: "March 2025",
    end: "Nov 2025",
    slug: "bio-excel",
    type: "engineering",
    brief:
      "Refactored the SQL schema and indexing strategy powering the CRM. Built Python ETL pipelines to sync CRM with sales. Integrated REST APIs across the sales and inventory stack.",
    bullets: [
      "Engineered and optimized the relational database architecture powering the company's CRM, refactoring SQL queries and indexing strategies to reduce lookup latency across invoicing, purchase order, and inventory tables.",
      "Built Python-based ETL pipelines to automate data synchronization between the CRM and sales, eliminating redundant manual entry and standardizing record integrity.",
      "Integrated REST APIs across backend services to streamline data flow between sales pipelines and inventory management, improving end-to-end data consistency and reducing reconciliation errors.",
    ],
  },
  {
    id: "stratos",
    code: "W-04",
    year: "2024",
    role: "Financial Tax Advisory Intern",
    company: "Stratos Solutions Inc",
    location: "Toronto, ON",
    start: "May 2024",
    end: "Aug 2024",
    slug: "stratos",
    type: "finance",
    brief:
      "Reverse audits across ON/QC/BC, recovering GST/HST/QST/PST overpayments for corporate clients. Worked in SAP and Excel. Prepared interim and final audit reports with senior advisors.",
    bullets: [
      "Conducted reverse audits and tax compliance analysis for corporate clients across Ontario, Quebec, and British Columbia, leveraging SAP and Excel to identify and recover GST, HST, QST, and PST overpayments.",
      "Collaborated with senior tax advisors to prepare interim and final audit reports, interpret complex provincial tax regulations, and deliver actionable insights for client tax optimization.",
      "Contributed to the successful resolution of multi-jurisdictional tax discrepancies, enhancing client satisfaction and supporting departmental revenue recovery objectives.",
    ],
  },
  {
    id: "wrhn",
    code: "W-05",
    year: "2025",
    role: "Network Engineer Co-op",
    company: "Waterloo Regional Health Network",
    location: "Waterloo, ON",
    start: "Sept 2025",
    end: "Dec 2025",
    slug: "wrhn",
    type: "engineering",
    brief:
      "PowerShell and Bash automation for imaging 100+ clinical endpoints. AD, remote desktop, and terminal support that cut ticket times 30%.",
    bullets: [
      "Automated system deployment and imaging processes using PowerShell and Bash scripts, enhancing setup efficiency across 100+ clinical endpoints.",
      "Resolved command-line troubleshooting and terminal-based support for network authentication, AD account issues, and remote desktop connectivity, reducing ticket resolution time by 30%.",
      "Collaborated with IT infrastructure teams to troubleshoot and optimize internal systems and documented command-line workflows to standardize operations.",
    ],
    pullQuote: { value: "30%", label: "reduction in ticket resolution time" },
  },
];

export interface AlsoEntry {
  title: string;
  detail: string;
  type: "project" | "competition" | "certification";
}

export const alsoEntries: AlsoEntry[] = [
  {
    title: "Financial Portfolio Optimization",
    detail: "Python ML model, 12% Sharpe ratio improvement, Flask web app with personalized recommendations.",
    type: "project",
  },
  {
    title: "Wealthsimple Live Consulting",
    detail: "Lazaridis case competition. Strategic solution presented to Wealthsimple executives.",
    type: "competition",
  },
  {
    title: "Nestle Supply Chain",
    detail: "Laurier case competition. Statistical analysis of supply chain inefficiencies.",
    type: "competition",
  },
  {
    title: "PAW'd",
    detail: "React, Node.js, Express, Supabase. Full-stack pet health management application.",
    type: "project",
  },
  {
    title: "Excel Grading Application",
    detail: "VBA, XML, Microsoft SQL. Desktop grading tool with dynamic charts and Word report generation.",
    type: "project",
  },
];
