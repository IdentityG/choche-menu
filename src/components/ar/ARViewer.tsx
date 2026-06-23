"use client";

import { Suspense, useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
  MeshDistortMaterial,
  RoundedBox,
  Text,
  ContactShadows,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  RotateCcw,
  Maximize2,
  Smartphone,
  Box,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion";
import { isMobile, supportsAR } from "@/lib/utils";
import type { EnrichedMenuItem } from "@/hooks/useMenuFilter";

/* ─── Category → 3D Color Map ──────────────────────────── */
const categoryColors: Record<string, string> = {
  fastfood: "#E8612A",
  cold: "#3BA8C4",
  hot: "#C4703B",
  juice: "#5CB85C",
  breakfast: "#C4A83B",
  main: "#C43B3B",
};

const categorySecondaryColors: Record<string, string> = {
  fastfood: "#F2A93B",
  cold: "#7DD3E8",
  hot: "#E8A060",
  juice: "#90D890",
  breakfast: "#E8D060",
  main: "#E87070",
};

/* ─── Props ────────────────────────────────────────────── */
interface ARViewerProps {
  item: EnrichedMenuItem;
  isOpen: boolean;
  onClose: () => void;
}

/* ─── Overlay Variants ─────────────────────────────────── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springs.gentle,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.25 },
  },
};

/* ═════════════════════════════════════════════════════════
   3D FOOD MODEL — Placeholder geometry
   ═════════════════════════════════════════════════════════ */
function FoodModel({
  categoryId,
  icon,
}: {
  categoryId: string;
  icon: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const color = categoryColors[categoryId] || "#E8612A";
  const secondaryColor = categorySecondaryColors[categoryId] || "#F2A93B";

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Main dish body */}
        <group position={[0, 0, 0]}>
          {/* Plate */}
          <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1.4, 1.5, 0.08, 64]} />
            <meshStandardMaterial
              color="#f5f0e8"
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>

          {/* Plate rim */}
          <mesh position={[0, -0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.4, 0.04, 16, 64]} />
            <meshStandardMaterial
              color="#e8e0d0"
              roughness={0.4}
              metalness={0.05}
            />
          </mesh>

          {/* Main food shape — organic blob */}
          <mesh ref={meshRef} position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.7, 64, 64]} />
            <MeshDistortMaterial
              color={color}
              roughness={0.5}
              metalness={0.05}
              distort={0.25}
              speed={1.5}
            />
          </mesh>

          {/* Topping 1 */}
          <mesh position={[0.3, 0.55, 0.2]}>
            <sphereGeometry args={[0.18, 32, 32]} />
            <MeshDistortMaterial
              color={secondaryColor}
              roughness={0.6}
              distort={0.3}
              speed={2}
            />
          </mesh>

          {/* Topping 2 */}
          <mesh position={[-0.25, 0.5, -0.15]}>
            <sphereGeometry args={[0.14, 32, 32]} />
            <MeshDistortMaterial
              color={secondaryColor}
              roughness={0.6}
              distort={0.35}
              speed={1.8}
            />
          </mesh>

          {/* Topping 3 */}
          <mesh position={[0.05, 0.6, -0.25]}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial
              color="#5CB85C"
              roughness={0.7}
            />
          </mesh>

          {/* Garnish accent */}
          <mesh position={[0, 0.75, 0]} rotation={[0.2, 0, 0.3]}>
            <RoundedBox args={[0.3, 0.03, 0.15]} radius={0.01} smoothness={4}>
              <meshStandardMaterial color="#4a7c3f" roughness={0.8} />
            </RoundedBox>
          </mesh>
        </group>
      </Float>

      {/* Contact shadow on plate */}
      <ContactShadows
        position={[0, -0.35, 0]}
        opacity={0.4}
        scale={4}
        blur={2.5}
        far={4}
      />
    </group>
  );
}

/* ═════════════════════════════════════════════════════════
   SCENE — Canvas setup with lights + environment
   ═════════════════════════════════════════════════════════ */
function Scene({ categoryId, icon }: { categoryId: string; icon: string }) {
  const color = categoryColors[categoryId] || "#E8612A";

  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={0.4} />

      {/* Key light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Fill light with category color tint */}
      <pointLight
        position={[-3, 3, -3]}
        intensity={0.5}
        color={color}
      />

      {/* Rim light */}
      <pointLight
        position={[0, 5, -5]}
        intensity={0.3}
        color="#f5f0e8"
      />

      {/* Environment map */}
      <Environment preset="studio" />

      {/* Food model */}
      <FoodModel categoryId={categoryId} icon={icon} />

      {/* Orbit controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={2}
        maxDistance={6}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 6}
        autoRotate
        autoRotateSpeed={1.5}
        dampingFactor={0.05}
        enableDamping
      />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          intensity={0.3}
        />
      </EffectComposer>
    </>
  );
}

/* ═════════════════════════════════════════════════════════
   LOADING FALLBACK — Shown while Three.js loads
   ═════════════════════════════════════════════════════════ */
function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/80 z-10">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-8 h-8 text-ember" strokeWidth={2} />
      </motion.div>
      <p className="text-sm font-body text-muted mt-3">
        Loading 3D preview...
      </p>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   AR LAUNCH BUTTON — Opens MyWebAR
   ═════════════════════════════════════════════════════════ */
function ARLaunchButton({ item }: { item: EnrichedMenuItem }) {
  const isARDevice = isMobile();

  const handleLaunchAR = () => {
    if (item.arUrl) {
      window.open(item.arUrl, "_blank", "noopener,noreferrer");
    } else {
      // Default MyWebAR demo URL (replace with real project URLs)
      const demoUrl = `https://mywebar.com/p/Project_0_kizildel3b`;
      window.open(demoUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.button
      onClick={handleLaunchAR}
      className={cn(
        "relative w-full overflow-hidden",
        "flex items-center justify-center gap-3",
        "py-4 rounded-2xl",
        "font-body font-semibold text-base",
        "cursor-pointer select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber",
        isARDevice
          ? "text-white"
          : "text-muted border border-border bg-elevated hover:text-primary"
      )}
      style={
        isARDevice
          ? {
              background:
                "linear-gradient(135deg, var(--color-ember), var(--color-amber))",
              boxShadow: "0 0 30px rgba(232, 97, 42, 0.35)",
            }
          : undefined
      }
      whileHover={{
        scale: 1.02,
        boxShadow: isARDevice
          ? "0 0 50px rgba(232, 97, 42, 0.5)"
          : "none",
      }}
      whileTap={{ scale: 0.98 }}
      transition={springs.snappy}
    >
      {/* Shimmer (AR devices only) */}
      {isARDevice && (
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["200% center", "-200% center"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
        />
      )}

      <Smartphone className="w-5 h-5 relative z-10" strokeWidth={2} />
      <span className="relative z-10">
        {isARDevice ? "Launch AR on Table" : "Open AR (Mobile Only)"}
      </span>
      <ExternalLink className="w-4 h-4 relative z-10 opacity-60" strokeWidth={2} />
    </motion.button>
  );
}

/* ═════════════════════════════════════════════════════════
   CONTROLS BAR — Reset view, fullscreen
   ═════════════════════════════════════════════════════════ */
function ControlsBar() {
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
      <AnimatePresence>
        {hint && (
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-xs font-body text-muted"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <RotateCcw className="w-3.5 h-3.5 text-ember" strokeWidth={2} />
            <span>Drag to rotate · Pinch to zoom</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   MAIN AR VIEWER MODAL
   ═════════════════════════════════════════════════════════ */
export default function ARViewer({ item, isOpen, onClose }: ARViewerProps) {
  /* ── Lock body scroll ──────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  /* ── ESC handler ───────────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          className="fixed inset-0 z-modal flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`3D preview of ${item.name_ao}`}
        >
          {/* ── Backdrop ──────────────────────────── */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-lg"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* ── Modal Panel ───────────────────────── */}
          <motion.div
            className={cn(
              "relative z-10 w-full max-w-lg",
              "bg-surface rounded-3xl overflow-hidden",
              "border border-white/[0.06]",
              "shadow-modal"
            )}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* ── Header ─────────────────────────── */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${item.categoryColorHex}15`,
                    border: `1px solid ${item.categoryColorHex}30`,
                  }}
                >
                  <Box
                    className="w-5 h-5"
                    style={{ color: item.categoryColorHex }}
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <h3 className="text-base font-body font-semibold text-primary leading-tight">
                    3D Preview
                  </h3>
                  <p className="text-2xs font-body text-dim">
                    Interactive model
                  </p>
                </div>
              </div>

              <motion.button
                onClick={onClose}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center",
                  "bg-elevated border border-border",
                  "hover:bg-white/[0.06] transition-colors duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={springs.snappy}
                aria-label="Close 3D viewer"
              >
                <X className="w-4 h-4 text-muted" strokeWidth={2} />
              </motion.button>
            </div>

            {/* ── 3D Canvas ──────────────────────── */}
            <div className="relative w-full aspect-square bg-void/50 mx-0">
              {/* Background grid */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle, ${item.categoryColorHex}40 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />

              <Suspense fallback={<CanvasLoader />}>
                <Canvas
                  camera={{
                    position: [0, 2, 4],
                    fov: 45,
                    near: 0.1,
                    far: 100,
                  }}
                  gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                  }}
                  dpr={[1, 2]}
                  shadows
                >
                  <Scene
                    categoryId={item.categoryId}
                    icon={item.categoryIcon}
                  />
                </Canvas>
              </Suspense>

              {/* Controls hint */}
              <ControlsBar />

              {/* Category badge on canvas */}
              <div className="absolute top-4 left-4 z-20">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-body font-medium glass"
                  style={{ color: item.categoryColorHex }}
                >
                  <span className="text-sm">{item.categoryIcon}</span>
                  {item.categoryName}
                </span>
              </div>
            </div>

            {/* ── Info Section ────────────────────── */}
            <div className="px-5 pt-4 pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-display font-bold text-primary leading-tight mb-0.5">
                    {item.name_ao}
                  </h4>
                  <p className="text-sm font-body text-muted">
                    {item.name_am}
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full",
                    "text-sm font-body font-bold flex-shrink-0 ml-3",
                    "bg-ember/10 border border-ember/25 text-amber"
                  )}
                >
                  {item.price.toLocaleString()} ETB
                </span>
              </div>
            </div>

            {/* ── AR Launch Button ────────────────── */}
            <div className="px-5 pb-3">
              <ARLaunchButton item={item} />
            </div>

            {/* ── Device Info ─────────────────────── */}
            <div className="px-5 pb-5">
              <DeviceInfo />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ═════════════════════════════════════════════════════════
   DEVICE INFO — Shows AR capability status
   ═════════════════════════════════════════════════════════ */
function DeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobileDevice: false,
    hasAR: false,
  });

  useEffect(() => {
    setDeviceInfo({
      isMobileDevice: isMobile(),
      hasAR: supportsAR(),
    });
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            deviceInfo.isMobileDevice ? "bg-category-juice" : "bg-dim"
          )}
        />
        <span className="text-2xs font-body text-dim">
          {deviceInfo.isMobileDevice ? "Mobile" : "Desktop"}
        </span>
      </div>

      <div className="w-px h-3 bg-border" />

      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            deviceInfo.hasAR ? "bg-category-juice" : "bg-dim"
          )}
        />
        <span className="text-2xs font-body text-dim">
          {deviceInfo.hasAR ? "AR Ready" : "3D Only"}
        </span>
      </div>

      <div className="w-px h-3 bg-border" />

      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-category-juice" />
        <span className="text-2xs font-body text-dim">WebGL Active</span>
      </div>
    </div>
  );
}