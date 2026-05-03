"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const PETAL_COUNT = 16;
const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 4 + Math.random() * 4,
  size: 5 + Math.random() * 10,
  rotate: Math.random() * 360,
}));

type Phase = "idle" | "opening" | "raised" | "exit";

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");

  const handleEnvelopeClick = () => {
    if (phase !== "idle") return;
    
    // Direct play call in the click handler (guarantees browser allows it)
    const audio = (window as any).weddingAudio;
    if (audio) {
      audio.muted = false;
      audio.volume = 0.4;
      audio.play().catch(() => {});
    }
    
    // Dispatch event to update the music button UI
    window.dispatchEvent(new Event("playMusic"));
    
    // Phase 1: flap folds open (900ms)
    setPhase("opening");
    // Phase 2: card rises AFTER flap is clear (1200ms later)
    setTimeout(() => setPhase("raised"), 1200);
    // Phase 3: auto-transition to main site
    setTimeout(() => setPhase("exit"), 2600);
    setTimeout(onOpen, 3500);
  };

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="envelope-screen"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 55% 45%, #1a1a2e 0%, #16213e 45%, #0f3460 100%)",
          }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(24px)" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Star field */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2.5 + 0.5,
                  height: Math.random() * 2.5 + 0.5,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.6 + 0.1,
                }}
                animate={{ opacity: [null, 0.1, 0.8, 0.1] }}
                transition={{
                  duration: 2 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Floating hearts */}
          {petals.map((p) => (
            <motion.div
              key={p.id}
              className="absolute pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: "-20px",
                width: p.size,
                height: p.size,
                rotate: p.rotate,
                opacity: 0.5,
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: [0, (Math.random() - 0.5) * 100],
                rotate: [p.rotate, p.rotate + 360],
                opacity: [0, 0.6, 0.4, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg viewBox="0 0 32 29.6" fill="#e8b4c8">
                <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
              </svg>
            </motion.div>
          ))}

          {/* Corner ornaments */}
          {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-14 h-14 opacity-25 pointer-events-none`}>
              <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="#c5a059" strokeWidth="1">
                {i === 0 && <path d="M0 20 L0 0 L20 0" />}
                {i === 1 && <path d="M64 20 L64 0 L44 0" />}
                {i === 2 && <path d="M0 44 L0 64 L20 64" />}
                {i === 3 && <path d="M64 44 L64 64 L44 64" />}
              </svg>
            </div>
          ))}

          {/* ═══ ENVELOPE SCENE ═══ */}
          <div
            className="relative select-none cursor-pointer"
            style={{ width: 420, height: 300 }}
            onClick={handleEnvelopeClick}
          >
            {/* ── ENVELOPE BODY (z-0) ── */}
            <div
              className="absolute inset-0 rounded-[6px] shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
              style={{ background: "linear-gradient(145deg, #2d2545 0%, #1e1a35 100%)", zIndex: 0 }}
            />

            {/* Inner lining triangles */}
            <div
              className="absolute inset-0 rounded-[6px] pointer-events-none"
              style={{
                background: "linear-gradient(160deg, #3d3060 0%, #2a2050 100%)",
                clipPath: "polygon(0 0, 50% 54%, 100% 0, 100% 100%, 0 100%)",
                opacity: 0.7,
                zIndex: 1,
              }}
            />

            {/* Side flaps */}
            <div
              className="absolute inset-0 rounded-[6px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(25,20,50,0.9) 0%, transparent 40%, transparent 60%, rgba(25,20,50,0.9) 100%)",
                clipPath: "polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)",
                zIndex: 2,
              }}
            />

            {/* Bottom flap */}
            <div
              className="absolute inset-0 rounded-b-[6px] pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(15,12,35,0.95) 0%, rgba(25,20,50,0.7) 35%, transparent 100%)",
                clipPath: "polygon(0 100%, 50% 54%, 100% 100%)",
                zIndex: 2,
              }}
            />

            {/* Decorative envelope lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[6px]" style={{ zIndex: 3 }}>
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 420 300" fill="none">
                <line x1="0" y1="0" x2="210" y2="162" stroke="#c5a059" strokeWidth="0.5" />
                <line x1="420" y1="0" x2="210" y2="162" stroke="#c5a059" strokeWidth="0.5" />
                <line x1="0" y1="300" x2="210" y2="162" stroke="#c5a059" strokeWidth="0.5" />
                <line x1="420" y1="300" x2="210" y2="162" stroke="#c5a059" strokeWidth="0.5" />
              </svg>
            </div>

            {/* ── CARD (z-10) — sits ABOVE the flap always ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={
                phase === "raised"
                  ? { y: -240, opacity: 1, scale: 1.04 }
                  : { y: 20, opacity: 0 }
              }
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-6 shadow-[0_16px_50px_rgba(0,0,0,0.55)] rounded-sm"
              style={{
                top: 28,
                bottom: 28,
                background: "linear-gradient(160deg, #fffcf7 0%, #fdf5e6 100%)",
                zIndex: 10,
              }}
            >
              <div className="absolute inset-3 border border-[#c5a059]/35 pointer-events-none rounded-sm" />
              <div className="absolute inset-[13px] border-[0.5px] border-[#c5a059]/18 pointer-events-none rounded-sm" />
              {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
                <div key={i} className={`absolute ${pos} text-[#c5a059]/40 text-xl leading-none pointer-events-none select-none`}>✦</div>
              ))}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8 text-center">
                <p className="font-serif text-[8px] tracking-[0.35em] uppercase text-[#c5a059]/60">Together with their families</p>
                <div className="w-10 h-px bg-[#c5a059]/30" />
                <p className="font-serif text-[8px] tracking-[0.25em] uppercase text-[#7a9a84]/60">invite you to the wedding of</p>
                <p className="script-text text-[40px] text-[#4a7561] leading-none mt-1">Mignone</p>
                <p className="font-serif text-[#c5a059]/55 text-sm tracking-widest">&</p>
                <p className="script-text text-[40px] text-[#4a7561] leading-none mb-1">Hamza</p>
                <div className="w-10 h-px bg-[#c5a059]/30" />
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-serif text-[14px] text-[#4a7561]/70">16</span>
                  <span className="text-[#c5a059]/40 text-[10px]">/</span>
                  <span className="font-serif text-[14px] text-[#4a7561]/70">08</span>
                  <span className="text-[#c5a059]/40 text-[10px]">/</span>
                  <span className="font-serif text-[14px] text-[#4a7561]/70">26</span>
                </div>
                <p className="font-serif text-[7px] tracking-[0.15em] uppercase text-[#4a7561]/50">Golden Garden Rebero · Kigali</p>
              </div>
            </motion.div>

            {/* ── TOP FLAP (z-5) — BEHIND the card ── */}
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top overflow-hidden"
              style={{
                height: "56%",
                transformStyle: "preserve-3d",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                zIndex: 5,
              }}
              initial={{ rotateX: 0 }}
              animate={phase !== "idle" ? { rotateX: -190 } : { rotateX: 0 }}
              transition={{ duration: 0.9, ease: [0.645, 0.045, 0.355, 1.0] }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(160deg, #352a65 0%, #221b4a 100%)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  boxShadow: "inset 0 -8px 18px rgba(0,0,0,0.3)",
                }}
              />
              <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 420 168" fill="none">
                <path d="M0 0 L420 0 L210 168 Z" stroke="#c5a059" strokeWidth="0.5" fill="none" />
                <circle cx="210" cy="100" r="30" stroke="#c5a059" strokeWidth="0.4" fill="none" />
              </svg>
            </motion.div>

            {/* ── WAX SEAL (z-6) ── */}
            <motion.div
              className="absolute"
              style={{ top: "42%", left: "50%", x: "-50%", y: "-50%", zIndex: 6 }}
              animate={
                phase !== "idle"
                  ? { opacity: 0, scale: 0, y: "-80%" }
                  : { opacity: 1, scale: 1, y: "-50%" }
              }
              transition={{ duration: 0.3, ease: "backIn" }}
            >
              <div className="absolute inset-0 rounded-full bg-[#8b1a1a]/30 blur-[10px] scale-110" />
              <div className="w-[76px] h-[76px] rounded-full border-4 border-[#7a1a1a] bg-gradient-to-br from-[#a03030] to-[#7a1515] shadow-[0_6px_24px_rgba(120,30,30,0.6)] flex items-center justify-center">
                <div className="w-[58px] h-[58px] rounded-full border border-[#c06060]/40 flex items-center justify-center">
                  <span className="script-text text-[#f0d090] text-2xl leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    M&H
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── CTA hint ── */}
            <motion.div
              className="absolute -bottom-16 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none"
              style={{ zIndex: 20 }}
              animate={phase !== "idle" ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="text-[#c5a059] opacity-60">
                  <path d="M 1 1 L 10 10 L 19 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-serif">
                Open Your Invitation
              </p>
            </motion.div>
          </div>

          {/* Couple names — fade in when card rises */}
          <AnimatePresence>
            {phase === "raised" && (
              <motion.div
                key="couple-names"
                className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-serif mb-2">You are invited</p>
                <p className="script-text text-5xl text-white/90 drop-shadow-[0_2px_12px_rgba(197,160,89,0.5)]">
                  Mignone & Hamza
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
