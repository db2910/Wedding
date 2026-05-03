"use client";

import { useState } from "react";
import Envelope from "@/components/Envelope";
import Hero from "@/components/Hero";
import TheCouple from "@/components/TheCouple";
import Itinerary from "@/components/Itinerary";
import Venue from "@/components/Venue";
import Gifts from "@/components/Gifts";
import RSVP from "@/components/RSVP";
import MusicToggle from "@/components/MusicToggle";
import Sparkles from "@/components/Sparkles";
import SectionDivider from "@/components/SectionDivider";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative">
      {/* Background ambient sparkles */}
      <Sparkles />

      {/* Envelope Gatekeeper — one click, auto-transitions */}
      <AnimatePresence>
        {!opened && <Envelope onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      {/* Main Content — revealed after envelope opens */}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* ── Hero ── */}
            <Hero />

            {/* ── The Couple ── */}
            <TheCouple />

            {/* Ornament between sections */}
            <div style={{ background: "#f9f7f2" }}>
              <SectionDivider variant="ornament" />
            </div>

            {/* ── Itinerary ── */}
            <Itinerary />

            {/* Itinerary → Venue: elegant chevron */}
            <SectionDivider
              variant="flourish"
              topColor="#f9f7f2"
              bottomColor="#f0ede4"
            />

            {/* ── Venue / Gallery ── */}
            <Venue />

            {/* Venue → RSVP: botanical leaf */}
            <div style={{ background: "#f9f7f2" }}>
              <SectionDivider variant="leaf" />
            </div>

            {/* ── RSVP ── */}
            <RSVP />

            {/* RSVP → Gifts: elegant chevron */}
            <SectionDivider
              variant="flourish"
              topColor="#fdf5e6" // bg-cream
              bottomColor="#fdf5e6" // bg-cream
            />

            {/* ── Gifts ── */}
            <Gifts />

            {/* ── Footer ── */}
            <div style={{ background: "#f9f7f2" }}>
              <SectionDivider variant="ornament" />
            </div>
            <footer className="py-10 text-center bg-sage/5 border-t border-gold/10">
              <p className="script-text text-3xl text-gold mb-2">Mignone & Hamza</p>
              <p className="text-xs uppercase tracking-widest text-sage/40">
                August 16, 2026 · Kigali, Rwanda
              </p>
              <p className="text-sage/30 text-[10px] mt-4">Made with love ♥</p>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Music always mounted so audio is ready on envelope click */}
      <MusicToggle showButton={opened} />
    </main>
  );
}
