"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Church, Wine, Users } from "lucide-react";

const events = [
  {
    time: "09:00 AM",
    title: "Introduction & Dowry",
    description: "Introduction and Dowry giving at Golden Garden Rebero.",
    icon: Users,
    color: "text-sage",
    bg: "bg-sage/10",
  },
  {
    time: "03:00 PM",
    title: "Vows & Ceremony",
    description: "A sacred and intimate ceremony as they exchange their vows before God and their loved ones.",
    icon: Church,
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    time: "05:00 PM",
    title: "Wedding Reception",
    description: "The reception will be held at Golden Garden Rebero to celebrate the new couple with family and friends.",
    icon: Wine,
    color: "text-sage",
    bg: "bg-sage/10",
  },
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Itinerary() {
  return (
    <section id="itinerary" className="py-24 md:py-32 px-6 bg-cream">
      <div className="max-w-3xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4 font-medium">Day Programme</p>
          <h2 className="font-serif text-4xl md:text-6xl text-sage">The Itinerary</h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-px bg-gold/20 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {events.map((event, i) => {
              const Icon = event.icon;
              const isLeft = i % 2 === 0;

              return (
                <AnimatedSection key={event.title} delay={i * 0.15}>
                  <div className={`relative flex items-center gap-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Desktop: content block */}
                    <div className={`hidden md:block w-[45%] ${isLeft ? "text-right" : "text-left"}`}>
                      <p className="text-xs text-gold tracking-widest uppercase mb-2 font-medium">{event.time}</p>
                      <h3 className="font-serif text-2xl text-sage mb-2">{event.title}</h3>
                      <p className="text-sage/65 text-base leading-relaxed">{event.description}</p>
                    </div>

                    {/* Center Icon Node */}
                    <div className="relative z-10 flex-shrink-0 w-[60px] h-[60px]">
                      <div className={`w-full h-full rounded-full ${event.bg} border border-gold/30 flex items-center justify-center shadow-sm`}>
                        <Icon className={`w-5 h-5 ${event.color}`} />
                      </div>
                    </div>

                    {/* Mobile: full-width content */}
                    <div className="md:hidden flex-1">
                      <p className="text-xs text-gold tracking-widest uppercase mb-2 font-medium">{event.time}</p>
                      <h3 className="font-serif text-xl text-sage mb-2">{event.title}</h3>
                      <p className="text-sage/65 text-base leading-relaxed">{event.description}</p>
                    </div>

                    {/* Desktop: empty side to balance layout */}
                    <div className="hidden md:block w-[45%]" />
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
