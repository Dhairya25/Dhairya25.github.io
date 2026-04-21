"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function Typewriter({
  words,
  className = "",
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: TypewriterProps) {
  const [display, setDisplay] = useState("");
  const textRef = useRef("");
  const wordIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const tick = useCallback(() => {
    const currentWord = words[wordIndexRef.current];

    if (!isDeletingRef.current) {
      // Typing forward
      if (textRef.current.length < currentWord.length) {
        textRef.current = currentWord.slice(0, textRef.current.length + 1);
        setDisplay(textRef.current);
        timeoutRef.current = setTimeout(tick, typingSpeed + Math.random() * 40);
      } else {
        // Finished typing — pause then start deleting
        isDeletingRef.current = true;
        timeoutRef.current = setTimeout(tick, pauseDuration);
      }
    } else {
      // Deleting
      if (textRef.current.length > 0) {
        textRef.current = textRef.current.slice(0, -1);
        setDisplay(textRef.current);
        timeoutRef.current = setTimeout(tick, deletingSpeed);
      } else {
        // Finished deleting — move to next word
        isDeletingRef.current = false;
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
        timeoutRef.current = setTimeout(tick, typingSpeed);
      }
    }
  }, [words, typingSpeed, deletingSpeed, pauseDuration]);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timeoutRef.current);
  }, [tick, typingSpeed]);

  return (
    <span className={className}>
      {display}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1em] bg-accent ml-0.5 align-middle"
      />
    </span>
  );
}
