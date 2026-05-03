"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { X, ZoomIn } from "lucide-react";

const photos = [
  { src: "/couple-1.jpeg", caption: "Our Story" },
  { src: "/couple-2.jpeg", caption: "Together" },
  { src: "/couple-3.jpeg", caption: "Forever" },
  { src: "/couple-4.jpeg", caption: "In Love" },
  { src: "/couple-5.jpeg", caption: "Always" },
  { src: "/couple-6.jpeg", caption: "Our Journey" },
  { src: "/couple-7.jpeg", caption: "Captured Moments" },
  { src: "/couple-8.jpeg", caption: "With You" },
  { src: "/couple-9.jpeg", caption: "Hand in Hand" },
  { src: "/couple-10.jpeg", caption: "Heart & Soul" },
  { src: "/couple-11.jpeg", caption: "Forever & Always" },
];

// Duplicate for seamless infinite loop
const STRIP = [...photos, ...photos];

export default function PhotoSlideshow() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  // Close lightbox on Escape
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setLightbox(null);
    if (e.key === "ArrowRight" && lightbox !== null) setLightbox((i) => ((i ?? 0) + 1) % photos.length);
    if (e.key === "ArrowLeft" && lightbox !== null) setLightbox((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
  }, [lightbox]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <>
      {/* ── Infinite moving strip ── */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #f0ede4, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #f0ede4, transparent)" }} />

        <div
          ref={stripRef}
          className="flex gap-4"
          style={{
            animation: paused ? "none" : "scroll-strip 40s linear infinite",
            width: "max-content",
          }}
        >
          {STRIP.map((photo, i) => (
            <motion.div
              key={`${photo.src}-${i}`}
              className="relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group shadow-md border border-gold/15"
              style={{ width: 300, height: 220 }}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.25 }}
              onClick={() => setLightbox(i % photos.length)}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                draggable={false}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/25 backdrop-blur-sm rounded-full p-3 border border-white/40">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <p className="script-text text-white text-xl drop-shadow-md">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[lightbox].src}
                alt={photos[lightbox].caption}
                className="w-full h-full object-contain rounded-xl shadow-2xl"
                style={{ maxHeight: "85vh" }}
              />
              {/* Caption */}
              <div className="absolute bottom-4 left-4">
                <p className="script-text text-4xl text-white/90 drop-shadow-lg">{photos[lightbox].caption}</p>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-1 font-serif">
                  {lightbox + 1} / {photos.length}
                </p>
              </div>
              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors backdrop-blur-sm border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
              {/* Prev / Next */}
              <button
                onClick={() => setLightbox((lightbox - 1 + photos.length) % photos.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2.5 transition-colors backdrop-blur-sm border border-white/20"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
              <button
                onClick={() => setLightbox((lightbox + 1) % photos.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2.5 transition-colors backdrop-blur-sm border border-white/20"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyframe animation */}
      <style>{`
        @keyframes scroll-strip {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}
