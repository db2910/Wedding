"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-08-16T08:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass rounded-xl px-5 py-4 md:px-8 md:py-6 min-w-[70px] md:min-w-[100px]">
        <span className="font-serif text-4xl md:text-6xl text-white block text-center leading-none drop-shadow-md">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-3 text-[11px] md:text-sm uppercase tracking-[0.25em] text-white/80 drop-shadow-sm font-medium">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Real hero background photo */}
      <div
        className="absolute inset-0 z-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/hero-bg.jpeg')" }}
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/70 z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25 z-0" />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.6) 100%)" }}
      />

      {/* Content — minimal padding and optimized for mobile */}
      <div className="relative z-10 px-4 md:px-6 max-w-4xl mx-auto pt-6 md:pt-12 pb-4">
        {/* Tag line */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/70 mb-3 md:mb-5 drop-shadow-md font-light"
        >
          Together with their families
        </motion.p>

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="script-text text-6xl md:text-[90px] leading-[1.1] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]"
        >
          Mignone
          <span className="block text-gold/90 text-4xl md:text-5xl mx-4 my-0.5 drop-shadow-md">&</span>
          Hamza
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-32 md:w-40 h-px mx-auto my-4 md:my-6"
          style={{ background: "linear-gradient(to right, transparent, rgba(197,160,89,0.6), transparent)" }}
        />

        {/* Cool Typographic Date */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center mb-6 md:mb-8"
        >
          <div className="flex items-center gap-3 md:gap-5">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-serif text-white leading-none">16</span>
              <div className="w-6 md:w-8 h-px bg-gold/40 my-1 md:my-1.5" />
              <span className="text-[8px] md:text-[10px] text-white/50 tracking-[0.25em] uppercase font-light">Day</span>
            </div>
            <div className="text-xl md:text-3xl font-light text-white/15">/</div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-serif text-white leading-none">08</span>
              <div className="w-6 md:w-8 h-px bg-gold/40 my-1 md:my-1.5" />
              <span className="text-[8px] md:text-[10px] text-white/50 tracking-[0.25em] uppercase font-light">Month</span>
            </div>
            <div className="text-xl md:text-3xl font-light text-white/15">/</div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-serif text-white leading-none">26</span>
              <div className="w-6 md:w-8 h-px bg-gold/40 my-1 md:my-1.5" />
              <span className="text-[8px] md:text-[10px] text-white/50 tracking-[0.25em] uppercase font-light">Year</span>
            </div>
          </div>
          <div className="mt-3 md:mt-5 flex flex-col items-center gap-0.5">
            <p className="text-white font-serif text-xs md:text-sm tracking-[0.35em] uppercase">Sunday · 8:00 AM</p>
            <p className="text-gold/70 text-[9px] md:text-[10px] tracking-[0.15em] uppercase font-light">Golden Garden Rebero · Kigali</p>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex items-start gap-2 md:gap-6 justify-center"
        >
          <CountUnit value={timeLeft.days} label="Days" />
          <span className="text-white/40 text-xl md:text-3xl mt-3 md:mt-5 font-light">:</span>
          <CountUnit value={timeLeft.hours} label="Hours" />
          <span className="text-white/40 text-xl md:text-3xl mt-3 md:mt-5 font-light">:</span>
          <CountUnit value={timeLeft.minutes} label="Mins" />
          <span className="text-white/40 text-xl md:text-3xl mt-3 md:mt-5 font-light">:</span>
          <CountUnit value={timeLeft.seconds} label="Secs" />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-10 md:mt-14 flex flex-col items-center gap-1.5 text-white/50"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 md:h-10 bg-gradient-to-b from-white/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
