"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const HERO_LEAD =
  "Fixforge-dApps is a protocol for autonomous, cross-chain remediation — engineered to fix what slows you down and safeguard what moves you forward.";

const HERO_TAIL =
  " across the wallets and networks you already use — continuously, securely, and on your terms.";

const ROTATING_PHRASES = [
  "Instant migration",
  "Trustless token bridging",
  "Smart swap diagnostics",
  "Multisig wallet validation",
  "Instant migration recovery",
  "NFT rescue & registry sync",
  "Seamless claim resolution",
  "Login error",
  "Recovery issues",
] as const;

const ROTATE_MS = 2000;

const STATIC_FULL_PARAGRAPH = `${HERO_LEAD} Experience instant migration recovery${HERO_TAIL}`;

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

function useRotatingPhraseIndex(enabled: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_PHRASES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [enabled]);

  return index;
}

export function HeroAuroraParagraph() {
  const reduceMotion = useReducedMotion();
  const leadWords = HERO_LEAD.split(/\s+/).filter(Boolean);
  const phraseIndex = useRotatingPhraseIndex(!reduceMotion);

  if (reduceMotion) {
    return (
      <p className="mb-10 max-w-2xl text-center text-base font-normal leading-relaxed text-white/88 sm:text-lg md:text-xl">
        {STATIC_FULL_PARAGRAPH}
      </p>
    );
  }

  return (
    <motion.p
      className="mb-10 max-w-2xl text-center text-base font-normal leading-relaxed sm:text-lg md:text-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-live="polite"
      aria-label={STATIC_FULL_PARAGRAPH}
    >
      {leadWords.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className="hero-wave-word"
          style={{ "--word-i": i } as CSSProperties}
        >
          {word}
          {i < leadWords.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
      <motion.span variants={wordVariants} className="hero-wave-word inline">
        {"\u00A0"}
      </motion.span>
      <motion.span
        variants={wordVariants}
        className="hero-wave-word inline text-white/88"
        style={{ "--word-i": leadWords.length } as CSSProperties}
      >
        Experience{"\u00A0"}
      </motion.span>
      <span className="relative inline-block min-h-[1.35em] align-baseline">
        <AnimatePresence mode="wait">
          <motion.span
            key={ROTATING_PHRASES[phraseIndex]}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="inline-block font-semibold tracking-tight text-amber-200 [text-shadow:0_0_18px_rgba(250,204,21,0.75),0_0_36px_rgba(245,158,11,0.45),0_0_56px_rgba(234,179,8,0.2)]"
          >
            {ROTATING_PHRASES[phraseIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
      <motion.span
        variants={wordVariants}
        className="inline text-white/88"
        style={{ "--word-i": leadWords.length + 1 } as CSSProperties}
      >
        {HERO_TAIL}
      </motion.span>
    </motion.p>
  );
}
