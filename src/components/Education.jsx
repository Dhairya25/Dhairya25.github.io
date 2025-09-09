// components/Education.jsx
import { motion } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Education() {
  return (
    <section id="education" className="edu-wrap">
      {/* Title + underline */}
      <div className="edu-head">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="edu-title"
        >
          Education
        </motion.h2>
        <motion.span
          className="edu-underline"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Cards */}
      <div className="edu-grid">
        {/* Laurier CS */}
        <motion.article
          className="edu-card"
          variants={cardVariant}
          initial="hidden"
          whileInView="show"
          custom={0}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(139,92,246,0.18)" }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <img
            src="/edu/laurier.svg"
            alt="Wilfrid Laurier University"
            className="edu-logo"
            loading="lazy"
          />
          <h3 className="edu-school">Wilfrid Laurier University</h3>
          <p className="edu-degree">
            Honours Bachelor of Science in Computer Science (BSc)
          </p>
          <p className="edu-location">Waterloo, ON</p>
        </motion.article>

        {/* Lazaridis BBA */}
        <motion.article
          className="edu-card"
          variants={cardVariant}
          initial="hidden"
          whileInView="show"
          custom={0.05}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(139,92,246,0.18)" }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <img
            src="/edu/lazaridis.svg"
            alt="Lazaridis School of Business and Economics"
            className="edu-logo"
            loading="lazy"
          />
          <h3 className="edu-school">Lazaridis School of Business and Economics</h3>
          <p className="edu-degree">
            Honours Bachelor of Business Administration (BBA), Finance
          </p>
          <p className="edu-location">Waterloo, ON</p>
        </motion.article>
      </div>
    </section>
  );
}
