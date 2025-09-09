import { motion } from "framer-motion";

export default function IDECard({ filename="project.jsx", children }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900 to-zinc-950 p-0"
    >
      <div className="flex items-center gap-2 border-b border-zinc-800/70 px-4 py-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
        <span className="ml-2 text-xs text-zinc-400 font-mono">{filename}</span>
      </div>
      <div className="relative p-5 font-mono text-sm text-zinc-300">
        {/* neon hover aura */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-indigo-500/10" />
        {children}
      </div>
    </motion.article>
  );
}
