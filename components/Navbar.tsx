"use client";

import { motion } from "framer-motion";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#couple", label: "The Couple" },
  { href: "#itinerary", label: "Itinerary" },
  { href: "#venue", label: "Venue" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 glass"
    >
      <a href="#home" className="script-text text-2xl text-gold">A & D</a>
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs uppercase tracking-widest text-sage hover:text-gold transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
