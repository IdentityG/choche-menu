"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { springs } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* --- Timing Constants ----------------------------------- */
const SPLASH_DURATION = 3200; // Total splash time in ms
const PROGRESS_DURATION = 2.8; // Progress bar fill time in seconds

/* --- SVG Wave Path Definitions -------------------------- */
const wavePathTop1 =
    "M0,64 C80,32 160,96 240,64 C320,32 400,96 480,64 C560,32 640,96 720,64 L720,0 L0,0 Z";
const wavePathTop2 =
    "M0,48 C80,80 160,16 240,48 C320,80 400,16 480,48 C560,80 640,16 720,48 L720,0 L0,0 Z";
const wavePathBottom1 =
    "M0,32 C80,64 160,0 240,32 C320,64 400,0 480,32 C560,64 640,0 720,32 L720,100 L0,100 Z";
const wavePathBottom2 =
    "M0,48 C80,16 160,80 240,48 C320,16 400,80 480,48 C560,16 640,80 720,48 L720,100 L0,100 Z";

/* --- Animation Variants --------------------------------- */
const containerVariants = {
    visible: {
        opacity: 1,
        scale: 1,
    },
    exit: {
        opacity: 0,
        scale: 1.08,
        filter: "blur(8px)",
        transition: {
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1] as const,
            scale: springs.cinematic,
        },
    },
};

const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -20 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            ...springs.bouncy,
            delay: 0.3,
        },
    },
};

const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            ...springs.gentle,
            delay: 0.6 + i * 0.15,
        },
    }),
};

const taglineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            ...springs.gentle,
            delay: 1.1,
        },
    },
};

const dotsVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { delay: 1.4, duration: 0.3 },
    },
};

const progressVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 1.2, duration: 0.4 },
    },
};

/* --- Wave Component ------------------------------------- */
function LiquidWave({
    path1,
    path2,
    position,
    color = "rgba(232, 97, 42, 0.12)",
    secondaryColor = "rgba(242, 169, 59, 0.08)",
    delay = 0,
}: {
    path1: string;
    path2: string;
    position: "top" | "bottom";
    color?: string;
    secondaryColor?: string;
    delay?: number;
}) {
    return (
        <div
            className={cn(
                "absolute left-0 right-0 z-10 pointer-events-none",
                position === "top" ? "top-0" : "bottom-0"
            )}
            style={{ height: "120px" }}
        >
            {/* Secondary wave (behind) */}
            <svg
                viewBox="0 0 720 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
            >
                <motion.path
                    d={path1}
                    fill={secondaryColor}
                    animate={{
                        d: [path1, path2, path1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: delay + 0.5,
                    }}
                />
            </svg>

            {/* Primary wave (front) */}
            <svg
                viewBox="0 0 720 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
            >
                <motion.path
                    d={path1}
                    fill={color}
                    animate={{
                        d: [path2, path1, path2],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay,
                    }}
                />
            </svg>
        </div>
    );
}

/* --- Pulsing Dots --------------------------------------- */
function LoadingDots() {
    return (
        <motion.div
            className="flex items-center justify-center gap-2"
            variants={dotsVariants}
            initial="hidden"
            animate="visible"
        >
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="block w-1.5 h-1.5 rounded-full bg-ember"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </motion.div>
    );
}

/* --- Floating Particles --------------------------------- */
interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

function FloatingParticles() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const generated = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 4 + 3,
            delay: Math.random() * 2,
        }));
        setParticles(generated);
    }, []);

    if (particles.length === 0) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background:
                            p.id % 3 === 0
                                ? "rgba(232, 97, 42, 0.3)"
                                : p.id % 3 === 1
                                    ? "rgba(242, 169, 59, 0.25)"
                                    : "rgba(255, 107, 53, 0.2)",
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, p.id % 2 === 0 ? 15 : -15, 0],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

/* --- Progress Bar --------------------------------------- */
function ProgressBar() {
    return (
        <motion.div
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
            variants={progressVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="w-48 h-1 bg-border rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{
                        background:
                            "linear-gradient(90deg, var(--color-ember), var(--color-amber))",
                    }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                        duration: PROGRESS_DURATION,
                        ease: [0.4, 0, 0.2, 1],
                        delay: 0.5,
                    }}
                />
            </div>
            <motion.p
                className="text-center text-dim text-2xs font-body mt-2 tracking-wider uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.3 }}
            >
                Loading menu...
            </motion.p>
        </motion.div>
    );
}

/* --- Ember Glow (ambient background) -------------------- */
function EmberGlow() {
    return (
        <>
            {/* Center glow */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
                style={{
                    width: "500px",
                    height: "500px",
                    background:
                        "radial-gradient(circle, rgba(232,97,42,0.08) 0%, rgba(232,97,42,0.03) 40%, transparent 70%)",
                }}
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.6, 1, 0.6],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            {/* Secondary amber glow */}
            <motion.div
                className="absolute top-1/3 left-1/3 z-0"
                style={{
                    width: "300px",
                    height: "300px",
                    background:
                        "radial-gradient(circle, rgba(242,169,59,0.06) 0%, transparent 60%)",
                }}
                animate={{
                    x: [0, 40, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </>
    );
}

/* --- Main Splash Screen --------------------------------- */
export default function SplashScreen({
    onComplete,
}: {
    onComplete: () => void;
}) {
    const [isVisible, setIsVisible] = useState(true);

    const handleComplete = useCallback(() => {
        setIsVisible(false);
    }, []);

    useEffect(() => {
        const timer = setTimeout(handleComplete, SPLASH_DURATION);
        return () => clearTimeout(timer);
    }, [handleComplete]);

    return (
        <AnimatePresence
            mode="wait"
            onExitComplete={onComplete}
        >
            {isVisible && (
                <motion.div
                    key="splash"
                    className="fixed inset-0 z-splash bg-void flex items-center justify-center overflow-hidden"
                    variants={containerVariants}
                    initial="visible"
                    exit="exit"
                >
                    {/* -- Ambient Effects -------------------------- */}
                    <EmberGlow />
                    <FloatingParticles />

                    {/* -- Top Wave --------------------------------- */}
                    <LiquidWave
                        path1={wavePathTop1}
                        path2={wavePathTop2}
                        position="top"
                        color="rgba(232, 97, 42, 0.1)"
                        secondaryColor="rgba(242, 169, 59, 0.06)"
                        delay={0}
                    />

                    {/* -- Center Content --------------------------- */}
                    <div className="relative z-20 flex flex-col items-center text-center px-6">
                        {/* Coffee Icon */}
                        <motion.div
                            variants={iconVariants}
                            initial="hidden"
                            animate="visible"
                            className="relative mb-8"
                        >
                            {/* Glow ring behind icon */}
                            <motion.div
                                className="absolute inset-0 -m-4 rounded-full"
                                style={{
                                    background:
                                        "radial-gradient(circle, rgba(232,97,42,0.2) 0%, transparent 70%)",
                                }}
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Icon container */}
                            <div className="relative w-20 h-20 rounded-3xl bg-elevated border border-border flex items-center justify-center shadow-ember-md">
                                <motion.span
                                    className="text-4xl"
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    ☕
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* Restaurant Name — Amharic */}
                        <div className="overflow-hidden mb-2">
                            <motion.h1
                                className="text-3xl font-display text-primary tracking-normal"
                                variants={titleVariants}
                                initial="hidden"
                                animate="visible"
                                custom={0}
                            >
                                ጮጮ ኮፈ ሀዉስ
                            </motion.h1>
                        </div>

                        {/* Restaurant Name — Latin */}
                        <div className="overflow-hidden mb-6">
                            <motion.p
                                className="text-lg font-body text-muted tracking-wide"
                                variants={titleVariants}
                                initial="hidden"
                                animate="visible"
                                custom={1}
                            >
                                Choche Takeaway
                            </motion.p>
                        </div>

                        {/* Divider line */}
                        <motion.div
                            className="w-12 h-px mb-6"
                            style={{
                                background:
                                    "linear-gradient(90deg, transparent, var(--color-ember), transparent)",
                            }}
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                        />

                        {/* Tagline */}
                        <motion.p
                            className="text-sm font-body text-dim tracking-widest uppercase mb-8"
                            variants={taglineVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            Scan · Explore · Order
                        </motion.p>

                        {/* Loading Dots */}
                        <LoadingDots />
                    </div>

                    {/* -- Bottom Wave ------------------------------- */}
                    <LiquidWave
                        path1={wavePathBottom1}
                        path2={wavePathBottom2}
                        position="bottom"
                        color="rgba(232, 97, 42, 0.1)"
                        secondaryColor="rgba(242, 169, 59, 0.06)"
                        delay={0.3}
                    />

                    {/* -- Progress Bar ----------------------------- */}
                    <ProgressBar />

                    {/* -- Skip Button (accessibility) -------------- */}
                    <motion.button
                        className="absolute bottom-10 right-6 z-30 text-dim text-xs font-body tracking-wider uppercase
                       hover:text-muted transition-colors duration-200 focus:outline-none focus-visible:text-ember"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 0.3 }}
                        onClick={handleComplete}
                        aria-label="Skip splash animation"
                    >
                        Skip →
                    </motion.button>

                    {/* -- Phone number at bottom -------------------- */}
                    <motion.p
                        className="absolute bottom-10 left-6 z-30 text-dim text-xs font-body tracking-wider"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ delay: 2.2, duration: 0.3 }}
                    >
                        ✆ 0917363738
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
