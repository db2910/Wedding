"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Heart } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  guests: string;
  message: string;
};

export default function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    message: "",
  });

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canSubmit = form.name.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);

    try {
      // Post to our own Next.js API route — no CORS issues
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          guests: form.guests,
          message: form.message,
        }),
      });

      if (!res.ok) throw new Error("Server error");

      setSubmitted(true);
    } catch (error) {
      console.error("RSVP error:", error);
      alert("There was an error sending your RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const labelClass = "block text-xs uppercase tracking-[0.25em] text-sage/60 mb-2 font-medium";
  const inputClass =
    "w-full bg-white/70 border border-gold/25 rounded-xl px-5 py-3.5 text-sage text-base placeholder-sage/35 focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/15 transition-all duration-200";
  const selectClass = inputClass + " appearance-none cursor-pointer";

  return (
    <section id="rsvp" className="py-24 md:py-32 px-6 bg-cream">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4 font-medium">Kindly Reply</p>
          <h2 className="font-serif text-5xl md:text-6xl text-sage mb-5">RSVP</h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-6" />
          <p className="text-sage/65 text-base leading-relaxed">
            Please respond by{" "}
            <span className="text-sage font-medium">August 1, 2026</span>
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              >
                <CheckCircle2 className="w-20 h-20 text-sage mx-auto" strokeWidth={1.5} />
              </motion.div>
              <h3 className="font-serif text-3xl text-sage">
                Thank You, {form.name.split(" ")[0]}!
              </h3>
              <p className="text-sage/65 text-base leading-relaxed max-w-sm mx-auto">
                We're so excited to celebrate with you in Kigali! We'll be in touch with more details soon.
              </p>
              <Heart className="w-6 h-6 text-gold/60 mx-auto" fill="currentColor" />
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* ── Section 1: Your Details ── */}
              <div className="glass rounded-2xl p-7 md:p-9 shadow-sm space-y-6">
                <h3 className="font-serif text-xl text-sage border-b border-gold/20 pb-3">
                  Your Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input
                      className={inputClass}
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="+250 7xx xxx xxx"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </div>
              </div>

              {/* ── Section 2: Guest Details ── */}
              <div className="glass rounded-2xl p-7 md:p-9 shadow-sm space-y-6">
                <h3 className="font-serif text-xl text-sage border-b border-gold/20 pb-3">
                  Guest Details
                </h3>

                <div>
                  <label className={labelClass}>Number of Guests</label>
                  <select
                    className={selectClass}
                    value={form.guests}
                    onChange={(e) => update("guests", e.target.value)}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ── Section 3: Message ── */}
              <div className="glass rounded-2xl p-7 md:p-9 shadow-sm space-y-4">
                <h3 className="font-serif text-xl text-sage border-b border-gold/20 pb-3">
                  A Message for the Couple
                  <span className="text-sage/40 text-sm font-sans font-normal ml-2">(optional)</span>
                </h3>
                <textarea
                  className={`${inputClass} resize-none h-32`}
                  placeholder="Share your warm wishes with Mignone & Hamza…"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={!canSubmit || loading}
                whileHover={canSubmit ? { scale: 1.02, y: -2 } : {}}
                whileTap={canSubmit ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-xl font-serif text-base tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                  canSubmit
                    ? "bg-sage text-cream hover:bg-sage/85 shadow-sage/20"
                    : "bg-sage/30 text-sage/40 cursor-not-allowed shadow-none"
                }`}
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
                ) : (
                  <><Heart className="w-4 h-4" fill="currentColor" /> Send RSVP</>
                )}
              </motion.button>

              {!canSubmit && (
                <p className="text-center text-sage/45 text-sm">
                  Please fill in your name to continue.
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
