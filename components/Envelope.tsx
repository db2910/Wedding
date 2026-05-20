"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type Phase = "idle" | "opening" | "raised" | "exit";

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [randomElements, setRandomElements] = useState<{
    particles: Array<{width: number, height: number, left: string, top: string, bg: string, delay: number, duration: number}>;
    heartsData: Array<{id: number, x: number, delay: number, duration: number, size: number, rotate: number}>;
  }>({ particles: [], heartsData: [] });

  useEffect(() => {
    setMounted(true);
    
    // Generate random values only on the client to prevent hydration errors
    setRandomElements({
      particles: Array.from({ length: 60 }).map(() => ({
        width: Math.random() * 4 + 1.5,
        height: Math.random() * 4 + 1.5,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        bg: `rgba(197, 160, 89, ${Math.random() * 0.4 + 0.15})`,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
      heartsData: Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 5,
        size: 14 + Math.random() * 18,
        rotate: Math.random() * 360,
      })),
    });

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Calculate scale based on width (max 420px) and height (ensure rise fits)
      const scaleW = Math.min(1, (width * 0.85) / 420);
      const scaleH = Math.min(1, (height * 0.7) / 540); // 300px + 240px rise
      setScale(Math.min(scaleW, scaleH));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEnvelopeClick = () => {
    if (phase !== "idle") return;
    
    const audio = (window as any).weddingAudio;
    if (audio) {
      audio.muted = false;
      audio.volume = 0.4;
      audio.play().catch(() => {});
    }
    
    window.dispatchEvent(new Event("playMusic"));
    
    setPhase("opening");
    setTimeout(() => setPhase("raised"), 1200);
    setTimeout(() => setPhase("exit"), 2600);
    setTimeout(onOpen, 3500);
  };

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="envelope-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 55% 45%, #f0ede4 0%, #e8e2d4 40%, #d8d0c0 100%)",
          }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(24px)" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Subtle gold shimmer particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {mounted && randomElements.particles.map((p, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: p.width,
                  height: p.height,
                  left: p.left,
                  top: p.top,
                  background: p.bg,
                }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Floating hearts */}
          {mounted && randomElements.heartsData.map((p) => (
            <motion.div
              key={`heart-${p.id}`}
              className="absolute pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: "-20px",
                width: p.size,
                height: p.size,
                rotate: p.rotate,
                opacity: 0,
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: [0, (Math.random() - 0.5) * 150],
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
              <svg viewBox="0 0 32 29.6" fill="#8da38d">
                <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
              </svg>
            </motion.div>
          ))}

          {/* Corner ornaments */}
          {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map((pos, i) => (
            <div key={`ornament-${i}`} className={`absolute ${pos} w-14 h-14 opacity-20 pointer-events-none`}>
              <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="#c5a059" strokeWidth="1">
                {i === 0 && <path d="M0 20 L0 0 L20 0" />}
                {i === 1 && <path d="M64 20 L64 0 L44 0" />}
                {i === 2 && <path d="M0 44 L0 64 L20 64" />}
                {i === 3 && <path d="M64 44 L64 64 L44 64" />}
              </svg>
            </div>
          ))}

          {/* Decorative botanical border circle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full border border-[#c5a059]/10" />
          </div>

          {/* ═══ ENVELOPE SCENE ═══ */}
          <motion.div
            className="relative select-none cursor-pointer group"
            style={{ 
              width: 420, 
              height: 300,
              scale: scale,
            }}
            onClick={handleEnvelopeClick}
            initial={false}
            animate={{ scale: scale }}
          >
            {/* Pulsing effect */}
            <motion.div
              className="absolute inset-0 rounded-[6px] bg-[#c5a059]/20"
              style={{ zIndex: -1 }}
              animate={phase === "idle" ? { scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] } : { opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Envelope body */}
            <div
              className="absolute inset-0 rounded-[6px] shadow-[0_24px_70px_rgba(0,0,0,0.2)] transition-transform duration-500 group-hover:scale-[1.01]"
              style={{ background: "linear-gradient(145deg, #7a9a84 0%, #5a7a64 100%)", zIndex: 0 }}
            />

            {/* Inner lining */}
            <div
              className="absolute inset-0 rounded-[6px] pointer-events-none transition-transform duration-500 group-hover:scale-[1.01]"
              style={{
                background: "linear-gradient(160deg, #6a8a74 0%, #4a6a54 100%)",
                clipPath: "polygon(0 0, 50% 54%, 100% 0, 100% 100%, 0 100%)",
                opacity: 0.7,
                zIndex: 1,
              }}
            />

            {/* Side flaps */}
            <div
              className="absolute inset-0 rounded-[6px] pointer-events-none transition-transform duration-500 group-hover:scale-[1.01]"
              style={{
                background:
                  "linear-gradient(to right, rgba(60,85,65,0.9) 0%, transparent 40%, transparent 60%, rgba(60,85,65,0.9) 100%)",
                clipPath: "polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)",
                zIndex: 2,
              }}
            />

            {/* Bottom flap */}
            <div
              className="absolute inset-0 rounded-b-[6px] pointer-events-none transition-transform duration-500 group-hover:scale-[1.01]"
              style={{
                background: "linear-gradient(to top, rgba(50,75,55,0.95) 0%, rgba(60,85,65,0.7) 35%, transparent 100%)",
                clipPath: "polygon(0 100%, 50% 54%, 100% 100%)",
                zIndex: 2,
              }}
            />

            {/* Decorative lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[6px] transition-transform duration-500 group-hover:scale-[1.01]" style={{ zIndex: 3 }}>
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 420 300" fill="none">
                <line x1="0" y1="0" x2="210" y2="162" stroke="#c5a059" strokeWidth="0.5" />
                <line x1="420" y1="0" x2="210" y2="162" stroke="#c5a059" strokeWidth="0.5" />
                <line x1="0" y1="300" x2="210" y2="162" stroke="#c5a059" strokeWidth="0.5" />
                <line x1="420" y1="300" x2="210" y2="162" stroke="#c5a059" strokeWidth="0.5" />
              </svg>
            </div>

            {/* ── CARD (z-10) ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={
                phase === "raised"
                  ? { y: -240, opacity: 1, scale: 1.04 }
                  : { y: 20, opacity: 0 }
              }
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-6 shadow-[0_16px_50px_rgba(0,0,0,0.25)] rounded-sm"
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
                <div key={`star-${i}`} className={`absolute ${pos} text-[#c5a059]/40 text-xl leading-none pointer-events-none select-none`}>✦</div>
              ))}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-[4px] px-12 py-8 text-center">
                <div className="flex flex-col items-center gap-[2px]">
                  <p className="font-serif text-[6.5px] tracking-[0.2em] uppercase text-[#c5a059]/70">The family of Innocent Kanobana</p>
                  <p className="font-serif text-[6.5px] tracking-[0.2em] uppercase text-[#c5a059]/70">& Issa Mpamo</p>
                </div>
                <div className="w-10 h-px bg-[#c5a059]/30 my-[1px]" />
                <p className="font-serif text-[6px] tracking-[0.15em] uppercase text-[#7a9a84]/70 max-w-[200px]">joyfully invite you to the wedding of their beloved children</p>
                <p className="script-text text-[32px] text-[#4a7561] leading-none mt-1">Clarisse</p>
                <p className="font-serif text-[7px] text-[#7a9a84]/50 tracking-[0.05em] uppercase -mt-1">(Mignone)</p>
                <p className="font-serif text-[#c5a059]/55 text-xs tracking-widest">&</p>
                <p className="script-text text-[32px] text-[#4a7561] leading-none mb-1">Amzan</p>
                <div className="w-10 h-px bg-[#c5a059]/30 my-[1px]" />
                <div className="flex items-center gap-2">
                  <span className="font-serif text-[12px] text-[#4a7561]/70">16</span>
                  <span className="text-[#c5a059]/40 text-[9px]">/</span>
                  <span className="font-serif text-[12px] text-[#4a7561]/70">08</span>
                  <span className="text-[#c5a059]/40 text-[9px]">/</span>
                  <span className="font-serif text-[12px] text-[#4a7561]/70">26</span>
                </div>
                <p className="font-serif text-[6px] tracking-[0.15em] uppercase text-[#4a7561]/50 max-w-[180px] mt-1">Golden Garden Rebero · Kigali</p>
              </div>
            </motion.div>

            {/* ── TOP FLAP ── */}
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]"
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
                  background: "linear-gradient(160deg, #8aaa94 0%, #6a8a74 100%)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  boxShadow: "inset 0 -8px 18px rgba(0,0,0,0.15)",
                }}
              />
              <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 420 168" fill="none">
                <path d="M0 0 L420 0 L210 168 Z" stroke="#c5a059" strokeWidth="0.5" fill="none" />
                <circle cx="210" cy="100" r="30" stroke="#c5a059" strokeWidth="0.4" fill="none" />
              </svg>
            </motion.div>

            {/* ── WAX SEAL ── */}
            <motion.div
              className="absolute transition-transform duration-500 group-hover:scale-105"
              style={{ top: "42%", left: "50%", x: "-50%", y: "-50%", zIndex: 6 }}
              animate={
                phase !== "idle"
                  ? { opacity: 0, scale: 0, y: "-80%" }
                  : { opacity: 1, scale: 1, y: "-50%" }
              }
              transition={{ duration: 0.3, ease: "backIn" }}
            >
              <div className="absolute inset-0 rounded-full bg-[#c5a059]/30 blur-[10px] scale-110" />
              <div className="w-[76px] h-[76px] rounded-full border-[3px] border-[#a08040] bg-gradient-to-br from-[#c5a059] to-[#9a7a3a] shadow-[0_6px_24px_rgba(160,128,64,0.5)] flex items-center justify-center">
                <div className="w-[60px] h-[60px] rounded-full border border-[#f5d890]/40 flex items-center justify-center bg-gradient-to-br from-[#d4b870] to-[#b3914a]">
                  <span className="font-serif italic text-white text-[22px] tracking-[0.1em] font-medium leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                    M&A
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
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="text-[#c5a059] opacity-80">
                  <path d="M 1 1 L 10 10 L 19 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#667866]/70 font-serif font-medium">
                Open Your Invitation
              </p>
            </motion.div>
          </motion.div>

          {/* Couple names */}
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
                <p className="text-[#667866]/50 text-[10px] uppercase tracking-[0.4em] font-serif mb-2">You are invited</p>
                <p className="script-text text-5xl text-[#667866] drop-shadow-[0_2px_12px_rgba(197,160,89,0.3)]">
                  Clarisse & Amzan
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
