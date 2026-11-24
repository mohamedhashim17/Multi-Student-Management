import React from "react";
import { motion } from "framer-motion";

export default function BackgroundOrbs() {
  return (
    <div className="animated-bg-container" aria-hidden="true">
      {/* Deep vignette backdrop */}
      <div className="bg-vignette-overlay" />

      {/* Main Emerald Core Glow - inspired by reference video */}
      <motion.div
        className="glow-orb orb-emerald-core"
        animate={{
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.65, 0.85, 0.6, 0.65],
          x: [0, 25, -20, 0],
          y: [0, -30, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top Neon Mint Orb */}
      <motion.div
        className="glow-orb orb-mint-top"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.5, 0.75, 0.5],
          x: [0, -35, 20, 0],
          y: [0, 25, -15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Vibrant Magenta / Violet Accent Orb - like the mascot accents in reference video */}
      <motion.div
        className="glow-orb orb-magenta-accent"
        animate={{
          scale: [0.9, 1.2, 0.95, 0.9],
          opacity: [0.35, 0.55, 0.35],
          x: [0, 40, -30, 0],
          y: [0, -25, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan Secondary Orb */}
      <motion.div
        className="glow-orb orb-cyan-bottom"
        animate={{
          scale: [1.1, 0.9, 1.15, 1.1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -25, 35, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle Mesh Grid */}
      <div className="bg-grid-pattern" />
    </div>
  );
}
