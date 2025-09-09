import { useRef, useState } from "react";

export default function Magnetic({ children, strength = 0.12, className = "" }) {
  const ref = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        setT({ x, y });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{ transform: `translate(${t.x}px, ${t.y}px)` }}
      className={`inline-block transition-transform will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
