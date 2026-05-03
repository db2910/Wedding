"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import PhotoSlideshow from "./PhotoSlideshow";

export default function Venue() {
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
                <span className="text-gold font-medium">Ceremony:</span> Garden Grounds, 3:00 PM
              </p>
              <p className="text-base text-sage/75 leading-relaxed">
                <span className="text-gold font-medium">Reception:</span> Main Hall, 5:00 PM
              </p>
              <p className="text-base text-sage/75 leading-relaxed">
                <span className="text-gold font-medium">Parking:</span> Complimentary on-site parking available
              </p>
              <p className="text-base text-sage/75 leading-relaxed">
                <span className="text-gold font-medium">Dress Code:</span> Black Tie / Formal Attire
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
    </section>
  );
}
