// components/Hero.jsx
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="hero-wrap">
      {/* background glow effects */}
      <div className="glow glow-left" />
      <div className="glow glow-right" />

      <div className="hero-center">
        <p className="eyebrow">DHAIRYA PATEL</p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="headline"
        >
          Building <span className="headline-gradient">modern software</span>{" "}
          at the intersection of tech and business
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="subcopy"
        >
          CS & BBA student at Wilfrid Laurier University. Passionate about
          fintech, development, and creating useful products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="cta-row"
        >
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn-ghost">
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
