"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealOnViewProps = {
  children: ReactNode;
  className?: string;
};

/** Scroll-triggered section entrance — used across landing + home blocks. */
export function RevealOnView({ children, className }: RevealOnViewProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.12,
        margin: "0px 0px -48px 0px",
      }}
      transition={{
        duration: 0.68,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
