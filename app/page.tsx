"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav, { TabType } from "@/components/BottomNav";
import Sanctuary from "@/components/Sanctuary";
import ForMochi from "@/components/ForMochi";
import Memories from "@/components/Memories";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("sanctuary");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSleepMode, setIsSleepMode] = useState(false);

  // Trigger splash screen exit after page mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="h-full w-full flex flex-col relative overflow-hidden bg-[#FFFDFB]">
      {/* Splash Screen Greetings Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 bg-[#FFFDFB] z-50 flex flex-col items-center justify-center gap-4"
          >
            {/* Cute bouncing dumpling loader */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                scaleY: [1, 0.85, 1.1, 1],
                scaleX: [1, 1.15, 0.9, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut"
              }}
              className="text-5xl select-none"
            >
              🥟
            </motion.div>
            <div className="text-center select-none">
              <h2 className="font-fredoka text-xl font-bold text-[#5E4E46]">
                Halo Mochiupiu! 🧡
              </h2>
              <p className="font-sans text-xs text-[#5E4E46]/60 mt-1">
                Mochi sedang menyiapkan ruangan...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Cozy Room Shared Background (GPU-Accelerated Panning) */}
      <motion.div
        className="absolute inset-y-0 -left-[30%] w-[160%] select-none pointer-events-none z-0"
        animate={{
          x:
            activeTab === "formochi"
              ? "18%" // Pan right to reveal left side
              : activeTab === "memories"
              ? "-18%" // Pan left to reveal right side
              : "0%", // Center
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform" }}
      >
        <img
          src="/background.svg"
          alt="Room Background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Tab Panels Stack (Absolute layers for 3D Parallax Depth) */}
      <div className="flex-1 w-full h-full overflow-hidden relative z-20">
        {/* Page 2: Sanctuary (Center Mochi tab - Deeper layer) */}
        <motion.div
          className="absolute inset-0 h-full w-full overflow-hidden z-10"
          initial={{ x: "0%" }}
          animate={{
            x:
              activeTab === "formochi"
                ? "65%"  // Slides right to peek on the right edge
                : activeTab === "memories"
                ? "-65%" // Slides left to peek on the left edge
                : "0%",  // Fully centered
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: "transform" }}
        >
          <Sanctuary
            isActive={activeTab === "sanctuary"}
            isSleepMode={isSleepMode}
            setIsSleepMode={setIsSleepMode}
          />
        </motion.div>

        {/* Global Sleep Mode Dark Overlay - sits on top of Sanctuary background but below cards */}
        <motion.div
          className="absolute inset-0 bg-[#1a1535] pointer-events-none z-[15]"
          animate={{ opacity: isSleepMode ? 0.55 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Page 1: For Mochi (Left tab - Slides on top of Mochi) */}
        <motion.div
          className="absolute inset-0 h-full w-full overflow-y-auto z-20"
          initial={{ x: "-100%" }}
          animate={{
            x: activeTab === "formochi" ? "0%" : "-100%",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: "transform" }}
        >
          <ForMochi />
        </motion.div>

        {/* Page 3: Memories (Right tab - Slides on top of Mochi) */}
        <motion.div
          className="absolute inset-0 h-full w-full overflow-y-auto z-30"
          initial={{ x: "100%" }}
          animate={{
            x: activeTab === "memories" ? "0%" : "100%",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: "transform" }}
        >
          <Memories />
        </motion.div>
      </div>

      {/* Fixed top & bottom gradients - always visible to soften background edges */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FFF9F6]/60 via-[#FFF9F6]/25 to-transparent pointer-events-none z-[15]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FFF9F6]/70 via-[#FFF9F6]/30 to-transparent pointer-events-none z-[15]" />

      {/* Floating Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}
