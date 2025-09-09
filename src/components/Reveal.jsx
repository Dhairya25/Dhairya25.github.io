import { motion } from "framer-motion";

const parent = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
};
const child = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function Reveal({ children, once = true }) {
  return (
    <motion.div
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
    >
      {Array.isArray(children)
        ? children.map((c, i) => (
            <motion.div variants={child} key={i}>{c}</motion.div>
          ))
        : <motion.div variants={child}>{children}</motion.div>}
    </motion.div>
  );
}
