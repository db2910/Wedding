"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicToggle({ showButton = false }: { showButton?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // As soon as the audio element mounts, register it on the window
  // so the Envelope component can call .play() directly in its click handler
  useEffect(() => {
    if (audioRef.current) {
      (window as any).weddingAudio = audioRef.current;
    }
    return () => {
      delete (window as any).weddingAudio;
    };
  }, []);

  // Listen for UI state update from Envelope
  useEffect(() => {
    const onPlay = () => setPlaying(true);
    window.addEventListener("playMusic", onPlay);
    return () => window.removeEventListener("playMusic", onPlay);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.4;
      audio.play().catch(() => {});
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      {/* Audio always mounted & ready even before envelope opens */}
      <audio ref={audioRef} loop src="/perfect.mp3" preload="auto" />

      <AnimatePresence>
        {showButton && (
          <motion.button
            key="music-btn"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
            onClick={toggle}
            className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-gold/90 text-white shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:bg-gold transition-colors flex items-center justify-center backdrop-blur-md border border-white/30"
            title={playing ? "Pause music" : "Play music"}
          >
            {playing ? (
              <motion.div
                key="vol-on"
                animate={{ scale: [1, 1.15, 1], opacity: [1, 0.8, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Volume2 className="w-6 h-6" />
              </motion.div>
            ) : (
              <VolumeX className="w-6 h-6 opacity-70" />
            )}

            {playing && (
              <motion.div
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.7, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-gold pointer-events-none"
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
