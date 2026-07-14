"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, X } from "lucide-react";
import PhotoSlideshow from "./PhotoSlideshow";

const PALETTE = [
  { name: "Dark Espresso", hex: "#251A16" },
  { name: "Chocolate Brown", hex: "#59392A" },
  { name: "Burnt Terracotta", hex: "#9F461C" },
  { name: "Warm Amber", hex: "#CA5D1A" },
  { name: "Ivory Cream", hex: "#D9D7BE" },
];

export default function Venue() {
  const [showPalette, setShowPalette] = useState(false);
  const mapsLink = "https://www.google.com/maps/search/?api=1&query=Golden+Garden+Rebero+Kigali+Rwanda";

  return (
    <section
      id="venue"
      className="py-24 md:py-32 px-6"
      style={{ background: "linear-gradient(180deg, #f9f7f2 0%, #f0ede4 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4 font-medium">Where to Find Us</p>
          <h2 className="font-serif text-4xl md:text-6xl text-sage">The Venue</h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Venue Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-7"
          >
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex-shrink-0 flex items-center justify-center mt-1">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-sage mb-2">Golden Garden Rebero</h3>
                <p className="text-sage/65 text-base leading-relaxed">
                  Rebero Hill<br />
                  Kigali, Rwanda
                </p>
              </div>
            </div>

            <div className="border-l-2 border-gold/25 pl-5 space-y-4 ml-6">
              <p className="text-base text-sage/75 leading-relaxed">
                <span className="text-gold font-medium">Introduction & Dowry:</span> 09:00 AM
              </p>
              <p className="text-base text-sage/75 leading-relaxed">
                <span className="text-gold font-medium">Vows:</span> 03:00 PM
              </p>
              <p className="text-base text-sage/75 leading-relaxed">
                <span className="text-gold font-medium">Reception:</span> 05:00 PM
              </p>
              <p className="text-base text-sage/75 leading-relaxed">
                <span className="text-gold font-medium">Parking:</span> Complimentary on-site parking available
              </p>
              <p className="text-base text-sage/75 leading-relaxed">
                <span className="text-gold font-medium">Dress Code:</span> Black Tie / Formal Attire — see color palette below
              </p>
            </div>

            <motion.a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-sage text-cream text-sm font-serif tracking-widest uppercase rounded-full shadow-md hover:bg-sage/80 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </motion.a>
          </motion.div>

          {/* Embedded Map — Golden Garden Rebero, Kigali */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-xl border border-gold/20 h-72 md:h-80"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15949.1!2d30.0945!3d-1.9706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6f595462bfb%3A0xabcdef1234!2sRebero%2C%20Kigali%2C%20Rwanda!5e0!3m2!1sen!2srw!4v1714000000000!5m2!1sen!2srw"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>

        {/* Dress Code / Color Palette */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          {/* Text + swatches */}
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4 font-medium">Dress Code</p>
            <h3 className="font-serif text-4xl md:text-5xl text-sage mb-5">Wedding Colors</h3>
            <p className="text-sage/65 text-base leading-relaxed max-w-md mx-auto md:mx-0 mb-9">
              We invite our guests to join us dressed in the warmth of our wedding palette —
              earthy tones that reflect the beauty of nature, love, and celebration.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-5">
              {PALETTE.map((c) => (
                <div key={c.hex} className="flex flex-col items-center w-[68px]">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-white shadow-md"
                    style={{ backgroundColor: c.hex }}
                  />
                  <p className="mt-2.5 text-[9px] uppercase tracking-wide text-sage/70 font-medium text-center leading-tight">
                    {c.name}
                  </p>
                  <p className="text-[9px] text-sage/35 tracking-wide mt-0.5">{c.hex}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo pill — the couple's actual palette photo, shown in full */}
          <button
            onClick={() => setShowPalette(true)}
            className="relative mx-auto h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px] aspect-[444/1280] rounded-[3rem] overflow-hidden shadow-xl border-4 border-white group"
          >
            <img
              src="/dress-code-palette.jpeg"
              alt="Wedding color palette — please dress in these colors"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </button>
        </motion.div>

        {/* Photo Slideshow Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4 font-medium">Gallery</p>
            <h3 className="font-serif text-4xl text-sage">Our Moments</h3>
            <div className="w-12 h-px bg-gold/30 mx-auto mt-5" />
          </div>
          <PhotoSlideshow />
        </motion.div>
      </div>

      {/* Dress code palette lightbox */}
      <AnimatePresence>
        {showPalette && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
            onClick={() => setShowPalette(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-3xl w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/dress-code-palette.jpeg"
                alt="Wedding color palette"
                className="w-full h-full object-contain rounded-xl shadow-2xl"
                style={{ maxHeight: "80vh" }}
              />
              <p className="text-center text-white/70 text-xs uppercase tracking-widest mt-3 font-serif">
                Please dress in these colors
              </p>
              <button
                onClick={() => setShowPalette(false)}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors backdrop-blur-sm border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
