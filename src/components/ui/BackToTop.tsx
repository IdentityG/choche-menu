"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { springs } from "@/lib/motion";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={springs.snappy}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-overlay
                     w-12 h-12 rounded-full
                     glass border border-ember/20
                     flex items-center justify-center
                     shadow-ember-sm hover:shadow-ember-md
                     transition-shadow duration-300
                     cursor-pointer
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-ember" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}