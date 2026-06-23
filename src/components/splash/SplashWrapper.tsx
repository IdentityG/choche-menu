"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "@/components/splash/SplashScreen";
import { springs } from "@/lib/motion";

interface SplashWrapperProps {
  children: React.ReactNode;
}

export default function SplashWrapper({ children }: SplashWrapperProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    // Small delay to let splash fully exit before content enters
    setTimeout(() => setShowContent(true), 50);
  }, []);

  return (
    <>
      {/* -- Splash Layer ------------------------------- */}
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* -- Main Content Layer ------------------------- */}
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
