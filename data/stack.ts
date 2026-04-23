// Stack data expressed as prose, not pill grids.
// The editorial mode renders this as a paragraph.
// IDE mode renders it as a JSON file.
// Terminal mode renders it in the research panel.

export const stackProse = `For the web I reach for Next.js, TypeScript, and Tailwind, with Supabase or Postgres behind it. For anything with data I live in Python, pandas, and SQL. For quantitative work or anything a desk will actually open, I stay in Excel and VBA. I'm comfortable in Java, C, C++, Go, R, and Assembly from coursework, and I've shipped production work in C# and Bash. I use Shiki, Stripe, WebRTC, and a rotating cast of LLM APIs when projects need them.`;

export const stackMeta = {
  editor: "VS Code + Claude Code",
  terminal: "zsh + starship",
};

export interface StackCategory {
  label: string;
  items: string[];
}

export const stackStructured: StackCategory[] = [
  {
    label: "Languages",
    items: [
      "Python", "Java", "JavaScript", "TypeScript", "SQL", "C", "C++",
      "C#", "R", "VBA", "Go", "Assembly", "Bash", "PowerShell", "HTML", "CSS",
    ],
  },
  {
    label: "Frameworks",
    items: [
      "Next.js", "React", "Node.js", "Express", "FastAPI", "Flask",
      "Scikit-learn", "TensorFlow", "PyTorch", "Apache Spark",
    ],
  },
  {
    label: "Infrastructure",
    items: [
      "Supabase", "Vercel", "Azure", "GCP", "Google Cloud Run",
      "SQL Server", "BigQuery", "CI/CD", "Git",
    ],
  },
  {
    label: "Tools",
    items: [
      "Stripe", "WebRTC", "Power BI", "Tableau", "Figma",
      "SAP", "Active Directory", "Dataphile", "OnBase", "Fundserv",
    ],
  },
  {
    label: "AI/ML",
    items: [
      "RAG", "Prompt Engineering", "LLM Integration", "NLP",
      "Semantic Embeddings", "Vector Search", "Speech-to-Text",
      "Text-to-Speech", "Computer Vision", "Real-Time AI Inference",
    ],
  },
  {
    label: "Finance",
    items: [
      "Financial Modeling", "Portfolio Analysis", "Securities Trading",
      "KYC/AML", "IIROC Compliance", "Reverse Audits",
      "GST/HST/QST/PST Recovery", "Sharpe Ratio Analysis",
    ],
  },
];
