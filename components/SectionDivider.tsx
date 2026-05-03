"use client";

import { motion } from "framer-motion";

type DividerVariant = "diamond" | "ornament" | "flourish" | "leaf";

interface SectionDividerProps {
  variant?: DividerVariant;
  flip?: boolean;
  topColor?: string;
  bottomColor?: string;
}

/* ── Diamond rule — geometric, minimal ── */
function DiamondDivider({
  topColor = "#f0ede4",
  bottomColor = "#f9f7f2",
}: {
  topColor?: string;
  bottomColor?: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden leading-[0]"
      style={{ background: topColor }}
    >
      {/* Clean diagonal cut */}
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full"
        preserveAspectRatio="none"
        style={{ height: 60 }}
      >
        {/* Flat angled transition */}
        <path d="M0,0 L1440,40 L1440,60 L0,60 Z" fill={bottomColor} />
        {/* Gold accent line */}
        <path
          d="M0,0 L1440,40"
          fill="none"
          stroke="#c5a059"
          strokeWidth="0.7"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

/* ── Ornament — centre flourish ── */
function OrnamentDivider() {
  return (
    <div className="relative flex items-center justify-center py-10 overflow-hidden">
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gold/20" />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-cream px-8 flex items-center gap-4"
      >
        {/* Left flourish */}
        <svg width="70" height="22" viewBox="0 0 70 22" fill="none" className="text-gold/50">
          <path d="M0,11 C10,4 20,18 35,11 C50,4 60,18 70,11" stroke="currentColor" strokeWidth="0.9" fill="none" />
          <circle cx="0" cy="11" r="2" fill="currentColor" opacity="0.4" />
        </svg>
        {/* Centre gem */}
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="text-gold/55">
          <rect x="6" y="6" width="14" height="14" transform="rotate(45 13 13)" stroke="currentColor" strokeWidth="0.9" />
          <rect x="9" y="9" width="8" height="8" transform="rotate(45 13 13)" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="13" cy="13" r="2" fill="currentColor" opacity="0.7" />
        </svg>
        {/* Right flourish */}
        <svg width="70" height="22" viewBox="0 0 70 22" fill="none" className="text-gold/50" style={{ transform: "scaleX(-1)" }}>
          <path d="M0,11 C10,4 20,18 35,11 C50,4 60,18 70,11" stroke="currentColor" strokeWidth="0.9" fill="none" />
          <circle cx="0" cy="11" r="2" fill="currentColor" opacity="0.4" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ── Flourish — elegant chevron with ornaments ── */
function FlourishDivider({
  topColor = "#f0ede4",
  bottomColor = "#f9f7f2",
}: {
  topColor?: string;
  bottomColor?: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden leading-[0]"
      style={{ background: topColor }}
    >
      <svg
        viewBox="0 0 1440 70"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full"
        preserveAspectRatio="none"
        style={{ height: 70 }}
      >
        {/* Elegant single-point chevron */}
        <path d="M0,0 L720,50 L1440,0 L1440,70 L0,70 Z" fill={bottomColor} />
        {/* Gold outline */}
        <path
          d="M0,0 L720,50 L1440,0"
          fill="none"
          stroke="#c5a059"
          strokeWidth="0.8"
          opacity="0.45"
        />
        {/* Centre ornament */}
        <g transform="translate(720, 50)">
          <circle cx="0" cy="0" r="5" fill={bottomColor} stroke="#c5a059" strokeWidth="0.8" opacity="0.7" />
          <circle cx="0" cy="0" r="2.5" fill="#c5a059" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

/* ── Leaf botanical row ── */
function LeafDivider() {
  return (
    <div className="relative flex items-center justify-center py-7 overflow-hidden">
      <motion.svg
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        viewBox="0 0 560 44"
        className="w-full max-w-2xl h-11 text-gold/45"
        fill="none"
      >
        {/* Centre diamond */}
        <polygon points="280,10 290,22 280,34 270,22" fill="currentColor" opacity="0.65" />
        {/* Inner centre diamond */}
        <polygon points="280,15 286,22 280,29 274,22" fill="currentColor" opacity="0.3" />
        {/* Lines */}
        <line x1="20" y1="22" x2="258" y2="22" stroke="currentColor" strokeWidth="0.6" />
        <line x1="302" y1="22" x2="540" y2="22" stroke="currentColor" strokeWidth="0.6" />
        {/* Left sprigs */}
        {[230, 205, 180, 155].map((x, i) => (
          <g key={i} transform={`translate(${x},22)`}>
            <ellipse cx="0" cy="-8" rx="3.5" ry="8" fill="currentColor" opacity={0.45 - i * 0.08} transform="rotate(-25)" />
            <ellipse cx="0" cy="-8" rx="3.5" ry="8" fill="currentColor" opacity={0.3 - i * 0.06} transform="rotate(25)" />
          </g>
        ))}
        {/* Right sprigs (mirror) */}
        {[330, 355, 380, 405].map((x, i) => (
          <g key={i} transform={`translate(${x},22) scale(-1,1)`}>
            <ellipse cx="0" cy="-8" rx="3.5" ry="8" fill="currentColor" opacity={0.45 - i * 0.08} transform="rotate(-25)" />
            <ellipse cx="0" cy="-8" rx="3.5" ry="8" fill="currentColor" opacity={0.3 - i * 0.06} transform="rotate(25)" />
          </g>
        ))}
        {/* End dots */}
        <circle cx="20" cy="22" r="3" fill="currentColor" opacity="0.45" />
        <circle cx="540" cy="22" r="3" fill="currentColor" opacity="0.45" />
        <circle cx="48" cy="22" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="512" cy="22" r="1.5" fill="currentColor" opacity="0.3" />
      </motion.svg>
    </div>
  );
}

export default function SectionDivider({
  variant = "ornament",
  flip = false,
  topColor = "#f0ede4",
  bottomColor = "#f9f7f2",
}: SectionDividerProps) {
  if (variant === "diamond")
    return <DiamondDivider topColor={topColor} bottomColor={bottomColor} />;
  if (variant === "flourish")
    return (
      <div style={{ transform: flip ? "scaleY(-1)" : undefined }}>
        <FlourishDivider topColor={topColor} bottomColor={bottomColor} />
      </div>
    );
  if (variant === "leaf") return <LeafDivider />;
  return <OrnamentDivider />;
}
