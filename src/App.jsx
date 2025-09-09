import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import TerminalBox from "./components/TerminalBox.jsx";
import laurierLogo from "./assets/edu/laurier.png";
import lazaridisLogo from "./assets/edu/lazaridis.png";


// === Clean Portfolio Layout ===
// Sections: Home, About, Education, Experience, Projects, Contact

const ACCENT = "from-purple-500 via-fuchsia-500 to-indigo-500";
const RESUME_URL = "https://github.com/Dhairya25/Resume/raw/main/Dhairya_Resume_CS_2025.pdf";


function Container({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-5xl px-6 ${className}`}>{children}</div>;
}

function SectionTitle({ kicker, title }) {
  return (
    <div className="mb-10">
      {kicker && (
        <div className="mb-2 text-xs uppercase tracking-widest text-zinc-400">{kicker}</div>
      )}
      <h2 className="text-3xl font-semibold text-zinc-100">{title}</h2>
    </div>
  );
}

function Nav() {
  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-md">
      <div className="mx-auto w-full max-w-5xl px-6">
        <nav className="h-14 flex items-center justify-center">
          <ul className="flex items-center gap-2 text-sm text-zinc-300">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="px-3 py-2 rounded-md hover:text-zinc-100 hover:bg-white/5 transition"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

/* --- 1) HOME (revised hierarchy + softer bg + taller) --- */
function HomeSection() {
  return (
    <header
      id="home"
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* animated gradient blobs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-purple-600/40 via-fuchsia-500/25 to-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-28 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tl from-indigo-500/30 via-fuchsia-500/20 to-purple-500/25 blur-3xl" />
      </motion.div>

      {/* subtle dotted grid */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px] opacity-[.12]"
      />

      {/* content */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        {/* kicker pill */}
        <motion.div
          initial={{ y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-300"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,.8)]" />
          Building software at the intersection of tech and finance.
        </motion.div>

        {/* headline */}
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="max-w-4xl text-5xl font-extrabold leading-tight sm:text-6xl"
        >
          Hi, My name is{" "}
          <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
            Dhairya Patel
          </span>{" "}
          
        </motion.h1>

        {/* subhead */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="mt-5 max-w-2xl text-lg text-zinc-300"
        >
          CS & BBA student at Wilfrid Laurier University. Experienced in automation, web apps, and
          financial analysis.
        </motion.p>

        {/* typing line */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-4 text-zinc-300"
        >
          I build{" "}
          <span className="text-purple-300">
            <TypeAnimation
              sequence={["web apps", 1400, "automations", 1400, "data tools", 1400]}
              speed={42}
              repeat={Infinity}
            />
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group relative rounded-xl px-5 py-3 text-sm font-medium text-zinc-900 transition"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 opacity-90 transition group-hover:opacity-100" />
            <span className="relative block">View Projects</span>
          </a>

          <a
            href="#contact"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-200 hover:border-white/20 hover:bg-white/[.07] transition"
          >
            Get in Touch
          </a>
        </motion.div>

        
      </div>
    </header>
  );
}

/* background component — dimmable + taller look */
function HeroBackground() {
  return (
    <>
      {/* dotted grid (fainter) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px) 0 0 / 18px 18px",
          maskImage:
            "linear-gradient(to bottom, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 75%, transparent 100%)",
        }}
      />

      {/* blobs (darker, lower opacity) */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-[36rem] w-[36rem] animate-blob rounded-full bg-purple-500/14 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[34rem] w-[34rem] animate-blob animation-delay-2000 rounded-full bg-fuchsia-500/12 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 animate-blob animation-delay-4000 rounded-full bg-indigo-500/12 blur-3xl" />

      {/* grain overlay (fainter) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/></filter><rect width=%2240%22 height=%2240%22 filter=%22url(%23n)%22 opacity=%220.25%22/></svg>')",
        }}
      />

      {/* horizon line (subtle) */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    </>
  );
}

/* --- 2) ABOUT --- */
function AboutSection() {
  return (
    <section id="about" className="py-20 scroll-mt-24">
      <Container>
        <SectionTitle kicker="who i am" title="About me" />
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          {/* Left: your writeup */}
          <div className="space-y-4 text-zinc-300">
          <p className="max-w-3xl text-zinc-300 space-y-4 leading-relaxed">
  Hey, I’m{" "}
  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent font-semibold hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
    Dhairya Patel
  </span>{" "}
  👋
  <br /><br />
  I’m a{" "}
  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent font-semibold hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
    Computer Science
  </span>{" "}
  and{" "}
  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent font-semibold hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
    Business
  </span>{" "}
  student at{" "}
  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent font-semibold hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
    Wilfrid Laurier University
  </span>{" "}
  who loves exploring the space where technology meets{" "}
  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent font-medium hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
    finance
  </span>.
  On one side I enjoy the problem-solving and creativity that come with being a{" "}
  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent font-medium hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
    developer
  </span>. On the other I’m fascinated by how innovation in{" "}
  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent font-medium hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
    fintech
  </span>{" "}
  can transform the way we think about money and decision-making.
  <br /><br />
  For me it’s not just about writing{" "}
  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent font-medium hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
    code
  </span>{" "}
  or analyzing{" "}
  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent font-medium hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
    data
  </span>, it’s about using those skills to create something meaningful. Whether that means building smarter{" "}
  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent font-medium hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
    systems
  </span>, making financial tools more accessible, or shaping new ideas in tech, I’m driven by curiosity and the impact of what comes next.
  <br /><br />
  Outside of academics I’m always looking for new challenges, from brainstorming startup ideas to enjoying basketball and gaming with friends. At the end of the day I see myself as someone who loves to build, learn, and push boundaries in both tech and{" "}
  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent font-medium hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
    finance
  </span>.
</p>
          </div>

          {/* Right: cool terminal box */}
          <TerminalBox cycleMs={5000} />
        </div>
      </Container>
    </section>
  );
}

/* --- 3) EDUCATION --- */

function EducationSection() {
  return (
    <section id="education" className="py-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        {/* Title */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white">Education</h2>
          <div className="mt-2 h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500"></div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Laurier CS */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center shadow-lg hover:shadow-purple-500/20 transition">
            <img
              src={laurierLogo}
              alt="Wilfrid Laurier University"
              className="mx-auto mb-4 w-40 object-contain"
            />
            <h3 className="text-lg font-semibold text-white">
              Wilfrid Laurier University
            </h3>
            <p className="mt-1 text-sm text-zinc-300">
              Honours Bachelor of Science in Computer Science (BSc)
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-400">Waterloo, ON</p>
          </div>

          {/* Lazaridis BBA */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center shadow-lg hover:shadow-purple-500/20 transition">
            <img
              src={lazaridisLogo}
              alt="Lazaridis School of Business and Economics"
              className="mx-auto mb-4 w-40 object-contain"
            />
            <h3 className="text-lg font-semibold text-white">
              Lazaridis School of Business and Economics
            </h3>
            <p className="mt-1 text-sm text-zinc-300">
              Honours Bachelor of Business Administration (BBA), Finance
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-400">Waterloo, ON</p>
          </div>
        </div>
      </div>
    </section>
  );
}



/* --- 4) EXPERIENCE --- */
/* --- 4) WORK TIMELINE (alternating + animated, robust layout) --- */
function WorkTimelineSection() {
  const items = [
    { year: "2025", role: "Junior Software Developer", company: "Bio-Excel Pharma",
      blurb:
        "Built e-commerce presence and automation tooling. Streamlined CRM workflows with VBA and shipped Python ETL for analytics, improving latency and reliability." },
    { year: "2025", role: "Mutual Funds Trader", company: "Co-operators",
      blurb:
        "Processed high-volume trades with accuracy guards. Delivered a VBA reminder system adopted as SOP and automated weekly compliance exports." },
    { year: "2024", role: "Financial Tax Advisory Intern", company: "Stratos Solutions Inc.",
      blurb:
        "Supported multi-province audits with SAP/Excel analysis. Produced reproducible workpapers and narratives that improved recovery outcomes." },
    { year: "2023", role: "Field Technician Intern", company: "TCP Networking Services",
      blurb:
        "Assisted enterprise network installs—switch config, patching, signal tests—and wrote handoff notes for reliable operations." },
    { year: "2023", role: "Network Ops: Collision Conference", company: "Bell Canada",
      blurb:
        "Helped stabilize venue Wi-Fi for thousands. Mapped AP coverage, triaged congestion, and supported rapid fixes during live sessions." },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };
  const card = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section id="experience" className="py-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white">Work Timeline</h2>
          <div className="mt-2 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500" />
        </div>

        <div className="relative">
          {/* vertical line that animates in on desktop */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block"
            style={{ transformOrigin: "top" }}
          >
            <div className="h-full w-px bg-gradient-to-b from-purple-500/60 via-fuchsia-500/40 to-indigo-500/20" />
          </motion.div>

          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-10"
          >
            {items.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <li key={item.year + item.role}>
                  {/* 1 col on mobile, 3 cols on md+: [left | 56px | right] */}
                  <div className="grid grid-cols-1 md:grid-cols-[1fr,56px,1fr] md:gap-6 md:items-start">
                    {/* center dot (desktop only) */}
                    <div className="hidden md:block md:col-start-2 md:row-start-1">
                      <div className="relative top-8 flex justify-center">
                        <span className="relative block h-4 w-4 rounded-full border border-white/20 bg-zinc-900">
                          <span className="absolute inset-1 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500" />
                          <span className="absolute -inset-1 rounded-full bg-fuchsia-500/20 blur-sm animate-pulse" />
                        </span>
                      </div>
                    </div>

                    {/* the card (always rendered once) */}
                    <motion.article
                      variants={card}
                      whileHover={{ y: -4, rotate: isLeft ? -0.2 : 0.2 }}
                      className={[
                        "group rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur",
                        "transition-all duration-300 hover:border-fuchsia-400/30 hover:shadow-fuchsia-500/20",
                        // mobile: single column
                        "col-start-1",
                        // desktop: force left or right column
                        isLeft ? "md:col-start-1" : "md:col-start-3",
                      ].join(" ")}
                    >
                      <div className="mb-1 text-xs font-semibold tracking-wider text-zinc-400">{item.year}</div>
                      <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                      <div className="mt-1 text-sm font-medium text-zinc-300">{item.company}</div>
                      <p className="mt-3 text-sm leading-6 text-zinc-300">{item.blurb}</p>
                      <div className="mt-4 h-[2px] w-0 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 transition-all duration-500 group-hover:w-full" />
                    </motion.article>
                  </div>
                </li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}


/* --- helper: Projects Grid (revamped) --- */
function ProjectsGrid() {
  const ALL = "All";
  const DATA = [
    {
      title: "Financial Portfolio Optimization",
      tags: ["ML", "Web"],
      desc: "Python + Flask app for backtesting portfolios, achieving improved Sharpe ratios on test data.",
      tech: ["Python", "Flask", "Yahoo Finance API"],
      live: "https://github.com/Dhairya25/financial-portfolio-optimizer",
      code: "https://github.com/Dhairya25/financial-portfolio-optimizer",
    },
    {
      title: "Excel Grading Application",
      tags: ["Automation"],
      desc: "Automated grading system with charts and dynamic Word report generation, reducing manual effort.",
      tech: ["VBA", "SQL", "XML"],
      live: "https://github.com/Dhairya25/excel-grading-automation",
      code: "https://github.com/Dhairya25/excel-grading-automation",
    },
    {
      title: "Website & CRM Automation",
      tags: ["Web", "Automation"],
      desc: "Responsive website plus VBA workflow automation, streamlining CRM operations for efficiency.",
      tech: ["HTML", "CSS", "JavaScript", "VBA"],
      live: "#",
      code: "#",
    },
    {
      title: "Genetic Algorithm: Constraint Optimizer",
      tags: ["AI", "Algorithms"],
      desc: "Implements crossover, mutation, and elitism to evolve high-quality solutions for constrained problems.",
      tech: ["Python", "NumPy", "Genetic Algorithm"],
      live: "https://github.com/Dhairya25/genetic-algorithm-optimizer",
      code: "https://github.com/Dhairya25/genetic-algorithm-optimizer",
    },
    {
      title: "Sudoku Solver: CSP + Heuristics",
      tags: ["AI", "Algorithms"],
      desc: "Sudoku solved using CSP techniques (AC-3, MRV, LCV) with backtracking and forward checking.",
      tech: ["Python", "CSP", "Heuristics"],
      live: "https://github.com/Dhairya25/sudoku-csp-solver",
      code: "https://github.com/Dhairya25/sudoku-csp-solver",
    },
    {
      title: "A* Puzzle Solver (8/15 Puzzle)",
      tags: ["AI", "Algorithms"],
      desc: "Sliding tile puzzle solver with A* search and heuristics like Manhattan distance & misplaced tiles.",
      tech: ["Python", "A*", "Heuristics"],
      live: "https://github.com/Dhairya25/A-Puzzle-Solver",
      code: "https://github.com/Dhairya25/A-Puzzle-Solver",
    },
    {
      title: "PAW'd — Pet Vaccine & Medication Tracker",
      tags: ["Web", "App", "Full-Stack"],
      desc:
        "Full-stack app designed to help pet owners manage vaccination and medication schedules. Tracks reminders, provides a clean UI for logging doses, and integrates with backend storage for persistence. Built to improve pet health management with accessible tech.",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      live: "#",   // placeholder, swap for demo link
      code: "#",   // placeholder, swap for repo link
    },
  ];

  const TABS = [ALL, "Web", "ML", "Automation", "AI", "Algorithms"];
  const [tab, setTab] = useState(ALL);
  const filtered = tab === ALL ? DATA : DATA.filter((p) => p.tags.includes(tab));

  return (
    <div>
      {/* filter buttons */}
      <div className="mb-8 flex flex-wrap gap-2 text-sm justify-center">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 transition ${
              tab === t
                ? "bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 text-white font-semibold shadow"
                : "border border-white/10 bg-white/5 text-zinc-300 hover:border-white/20"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* projects grid */}
      <div className="grid gap-8 sm:grid-cols-2">
        <AnimatePresence>
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 
                         shadow-lg backdrop-blur transition-transform hover:-translate-y-1 hover:shadow-purple-500/20"
            >
              {/* gradient border effect */}
              <span
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(168,85,247,0.35), rgba(217,70,239,0.35), rgba(99,102,241,0.35))",
                  filter: "blur(10px)",
                }}
              />

              <div className="relative z-10">
                {/* Title */}
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-200 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
                  {p.title}
                </h3>

                {/* Desc */}
                <p className="mt-2 text-sm text-zinc-300">{p.desc}</p>

                {/* Tech */}
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-zinc-400">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-2 py-0.5 bg-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-4 flex gap-3">
                  <a
                    className="rounded-lg bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 px-3 py-1.5 text-xs font-semibold text-zinc-900 shadow hover:opacity-90"
                    href={p.live}
                  >
                    Live
                  </a>
                  <a
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-300 hover:border-white/20"
                    href={p.code}
                  >
                    Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* --- 5) PROJECTS --- */
function ProjectsSection() {
  return (
    <section id="projects" className="py-20 scroll-mt-24">
      <Container>
        <SectionTitle kicker="things i've built" title="Recent projects" />
        <ProjectsGrid />
      </Container>
    </section>
  );
}

/* --- 6) CONTACT --- */
/* --- 6) CONTACT (mac-app header + no Email button) --- */
function ContactSection() {
  const email = "pate6541@mylaurier.ca";
  const resumeUrl =
    typeof RESUME_URL !== "undefined" && RESUME_URL ? RESUME_URL : "#";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      const el = document.getElementById("copyHint");
      if (el) {
        el.classList.remove("opacity-0");
        setTimeout(() => el.classList.add("opacity-0"), 1200);
      }
    } catch {}
  };

  return (
    <section id="contact" className="py-24 scroll-mt-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white">Get in touch</h2>
          <div className="mt-2 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500" />
        </div>

        <div className="relative">
          {/* soft glow */}
          <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 blur-2xl" />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl">
            {/* app-style header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-zinc-900/60 px-5 py-3">
              {/* traffic lights */}
              <div className="flex items-center gap-[6px]">
                <span aria-hidden className="inline-block h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_12px_0_rgba(255,95,86,0.6)]" />
                <span aria-hidden className="inline-block h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_12px_0_rgba(255,189,46,0.6)]" />
                <span aria-hidden className="inline-block h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_12px_0_rgba(39,201,63,0.6)]" />
              </div>
              <div className="ml-2 text-xs tracking-wider text-zinc-400">/contact</div>
              <div className="ml-auto text-[11px] text-zinc-400">
                online <span className="ml-1 inline-block h-2 w-2 rounded-full bg-fuchsia-400 align-middle" />
              </div>
            </div>

            {/* body */}
            <div className="relative grid gap-10 p-8 md:grid-cols-2 md:p-10">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-zinc-300">
                  <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_18px_2px_rgba(217,70,239,0.7)]" />
                  let’s talk
                </span>
                <h3 className="mt-4 text-2xl font-semibold leading-snug text-white">
                  Have an opportunity, idea, or question?
                </h3>
                <p className="mt-3 max-w-prose text-zinc-300">
                  I’m open to internships, collaborations, and problems at the
                  intersection of <span className="text-fuchsia-300">tech</span> &{" "}
                  <span className="text-fuchsia-300">finance</span>.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200">
                  {/* email pill with copy */}
                  <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80">
                    <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4-8 5L4 8V6l8 5l8-5z"/>
                  </svg>
                  {email}
                  <button
                    onClick={copyEmail}
                    className="ml-2 rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-300 hover:border-white/20 hover:bg-white/5"
                  >
                    Copy
                  </button>
                  <span
                    id="copyHint"
                    className="ml-2 text-[11px] text-fuchsia-300 opacity-0 transition-opacity"
                  >
                    Copied!
                  </span>
                </div>
              </div>

              {/* quick links */}
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={`mailto:${email}`}
                  className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-fuchsia-400/40 hover:shadow-[0_0_24px_0_rgba(232,121,249,0.25)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">Email</div>
                    <span className="text-xs text-zinc-400 group-hover:text-fuchsia-300">
                      Compose ↗
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">Say hello directly.</p>
                </a>

                <a
                  href="https://linkedin.com/in/dhairya-patel-b900b7267"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-fuchsia-400/40 hover:shadow-[0_0_24px_0_rgba(232,121,249,0.25)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">LinkedIn</div>
                    <span className="text-xs text-zinc-400 group-hover:text-fuchsia-300">
                      Connect ↗
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">Let’s connect professionally.</p>
                </a>

                <a
                  href="https://github.com/Dhairya25"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-fuchsia-400/40 hover:shadow-[0_0_24px_0_rgba(232,121,249,0.25)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">GitHub</div>
                    <span className="text-xs text-zinc-400 group-hover:text-fuchsia-300">
                      Explore ↗
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">See more code & experiments.</p>
                </a>

                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-fuchsia-400/40 hover:shadow-[0_0_24px_0_rgba(232,121,249,0.25)]"
                
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">Resume</div>
                    <span className="text-xs text-zinc-400 group-hover:text-fuchsia-300">
                      Open PDF ↗
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">One-pager snapshot.</p>
                </a>
              </div>
            </div>

            {/* footer — removed “Email me” button, kept schedule */}
            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-8 py-6 md:px-10">
              <p className="text-sm text-zinc-400">
                Prefer async? Email works best — or book a quick slot:
              </p>
              <div className="flex gap-3">
                <a
                  href="https://cal.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-200 hover:border-white/20 hover:bg-white/5"
                >
                  Schedule chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">
      <Nav />
      <HomeSection />
      <AboutSection />
      <EducationSection />
      <WorkTimelineSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
