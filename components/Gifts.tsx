"use client";

import { motion } from "framer-motion";
import { Gift, Phone } from "lucide-react";

export default function Gifts() {
  return (
    <section id="gifts" className="py-24 md:py-32 px-6 bg-cream">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4 font-medium">Registry & Gifts</p>
          <h2 className="font-serif text-4xl md:text-5xl text-sage mb-5">A Token of Love</h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-6" />
          <p className="text-sage/75 text-base leading-relaxed max-w-xl mx-auto">
            Your presence at our wedding is the greatest gift of all. However, should you wish to help us celebrate with a gift, a contribution towards our future together would be deeply appreciated.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 border border-gold/20 flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-sage/5 flex items-center justify-center">
              <Gift className="w-5 h-5 text-sage" />
            </div>
            <h3 className="font-serif text-2xl text-sage">Mignone</h3>
            <p className="text-sm uppercase tracking-widest text-gold font-medium">Mobile Money</p>
            <div className="flex flex-col items-center gap-2 w-full mt-2">
              <div className="flex items-center gap-2 text-sage/80 bg-white/50 px-4 py-2 rounded-lg border border-sage/10 w-full justify-center">
                <Phone className="w-4 h-4" />
                <span className="font-medium tracking-wide">0780 711 750</span>
              </div>
              <div className="flex items-center gap-2 text-sage/80 bg-white/50 px-4 py-2 rounded-lg border border-sage/10 w-full justify-center">
                <Phone className="w-4 h-4" />
                <span className="font-medium tracking-wide">0786 406 677</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 border border-gold/20 flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-sage/5 flex items-center justify-center">
              <Gift className="w-5 h-5 text-sage" />
            </div>
            <h3 className="font-serif text-2xl text-sage">Hamza</h3>
            <p className="text-sm uppercase tracking-widest text-gold font-medium">Mobile Money</p>
            <div className="flex flex-col items-center gap-2 w-full mt-2">
              <div className="flex items-center gap-2 text-sage/80 bg-white/50 px-4 py-2 rounded-lg border border-sage/10 w-full justify-center">
                <Phone className="w-4 h-4" />
                <span className="font-medium tracking-wide">0788 547 440</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
