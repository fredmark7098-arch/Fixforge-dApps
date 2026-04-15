"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

const HERO_BODY =
  "Fixforge-dApps is a protocol for autonomous, cross-chain remediation — engineered to fix what slows you down and safeguard what moves you forward. Experience instant migration recovery across the wallets and networks you already use — continuously, securely, and on your terms.";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.022,
      delayChildren: 0.08,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { type: "spring", stiffness: 420, damping: 32 },
  },
};

export function HeroAuroraParagraph() {
  const reduceMotion = useReducedMotion();
  const words = HERO_BODY.split(/\s+/).filter(Boolean);

  if (reduceMotion) {
    return (
      <p className="mb-10 max-w-2xl text-center text-base font-normal leading-relaxed text-white/88 sm:text-lg md:text-xl">
        {HERO_BODY}
      </p>
    );
  }

  return (
    <motion.p
      className="mb-10 max-w-2xl text-center text-base font-normal leading-relaxed sm:text-lg md:text-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={HERO_BODY}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className="hero-wave-word"
          style={{ "--word-i": i } as CSSProperties}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}
