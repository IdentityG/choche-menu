"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "@/components/splash/SplashScreen";
import { springs } from "@/lib/motion";

interface SplashWrapperProps {
  children: React.ReactNode;
}

const SPLASH_SESSION_KEY = "choche-splash-seen";

export default function SplashWrapper({ children }: SplashWrapperProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  /* ── Check if splash was already seen this session ── */
  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem(SPLASH_SESSION_KEY);
      if (hasSeen === "true") {
        setShowSplash(false);
        setShowContent(true);
      }
    } catch {
      // sessionStorage unavailable (private browsing etc)
    }
    setIsChecking(false);
  }, []);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    try {
      sessionStorage.setItem(SPLASH_SESSION_KEY, "true");
    } catch {
      // Silently fail
    }
    setTimeout(() => setShowContent(true), 50);
  }, []);

  // Don't render anything until session check completes
  if (isChecking) {
    return (
      <div className="min-h-screen bg-void" />
    );
  }

  return (
    <>
      {/* ── Splash Layer ─────────────────────────────── */}
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* ── Main Content Layer ───────────────────────── */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                ...springs.gentle,
                delay: 0.1,
              },
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}