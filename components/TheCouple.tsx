"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const profiles = [
  {
    role: "The Bride",
    name: "Mignone",
    tagline: "Graceful, Radiant & Full of Light",
    bio: "A lover of sunsets, great music, and meaningful conversations. Mignone brings warmth into every room she enters and light into every heart she touches.",
    photo: "/Bride.jpeg",
    accent: "border-sage/30",
    accentBg: "from-sage/5 to-transparent",
  },
  {
    role: "The Groom",
    name: "Amzan",
    tagline: "Steadfast, Gentle & Devoted",
    bio: "From small acts of kindness to grand gestures of love, Amzan's commitment to the people he cherishes is unwavering. He is the steady heartbeat of their love story.",
    photo: "/groom.jpeg",
    accent: "border-gold/30",
    accentBg: "from-gold/5 to-transparent",
  },
];

export default function TheCouple() {
  return (
    <section id="couple" className="py-24 md:py-32 px-6" style={{ background: "linear-gradient(180deg, #f0ede4 0%, #f9f7f2 100%)" }}>
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4 font-medium">Their Story</p>
          <h2 className="font-serif text-4xl md:text-6xl text-sage">The Couple</h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
        </AnimatedSection>

        {/* Story quote */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-lg md:text-xl leading-loose text-sage/65 italic font-serif">
            &ldquo;They didn&apos;t find each other by chance. The universe had been conspiring for them to meet all along.&rdquo;
          </p>
        </AnimatedSection>

        {/* Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {profiles.map((person) => (
            <AnimatedSection key={person.name}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl border ${person.accent} overflow-hidden shadow-md bg-white/50`}
              >
                {/* Real photo — object-center so full face is visible */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/30 backdrop-blur-sm text-white/90 text-[10px] uppercase tracking-[0.3em] font-serif px-3 py-1 rounded-full border border-white/20">
                      {person.role}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className={`p-8 text-center space-y-4 bg-gradient-to-b ${person.accentBg}`}>
                  <h3 className="script-text text-5xl text-sage leading-none">{person.name}</h3>
                  <p className="text-sm text-sage/50 italic tracking-wide">{person.tagline}</p>
                  <div className="w-10 h-px bg-gold/30 mx-auto" />
                  <p className="text-sage/75 leading-loose text-base">{person.bio}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-16">
          <span className="script-text text-4xl text-gold/50">for eternity</span>
        </AnimatedSection>
      </div>
    </section>
  );
}
