"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AslabSimulator from "./AslabSimulator";
import MusicPlayerPage from "./MusicPlayerPage";
import Image from "next/image";

type ActiveGame = null | "aslab" | "music";
type TransitionPhase = null | "loading";

// Custom SVG icons for game cards
function AslabIcon() {
  return (
    <div className="relative w-16 h-16 scale-125 translate-x-1 translate-y-[-2px]">
      <Image
        src="/mochi-aslab.svg"
        alt="Aslab"
        fill
        className="object-contain"
      />
    </div>
  );
}

function MusicIcon() {
  return (
    <div className="relative w-14 h-14 scale-110">
      <Image
        src="/mochi-music.svg"
        alt="Music"
        fill
        className="object-contain"
      />
    </div>
  );
}

function CoffeeIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cup body */}
      <path
        d="M6 12h16v12a4 4 0 01-4 4h-8a4 4 0 01-4-4V12z"
        fill="#FFEFE6"
        stroke="#FF7E53"
        strokeWidth="1.5"
      />
      {/* Handle */}
      <path
        d="M22 15h2a3 3 0 010 6h-2"
        stroke="#FF7E53"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Steam lines */}
      <path
        d="M10 8c0-2 2-2 2-4"
        stroke="#FFDFC6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 8c0-2 2-2 2-4"
        stroke="#FFDFC6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 8c0-2 2-2 2-4"
        stroke="#FFDFC6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Coffee surface */}
      <ellipse cx="14" cy="16" rx="6" ry="1.5" fill="#FFD4B8" />
    </svg>
  );
}

function MemoryMatchIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Card 1 (back) */}
      <rect
        x="3"
        y="5"
        width="14"
        height="18"
        rx="2.5"
        fill="#FFDFC6"
        stroke="#FF7E53"
        strokeWidth="1.2"
        transform="rotate(-8 3 5)"
      />
      {/* Card 2 (front) */}
      <rect
        x="12"
        y="6"
        width="14"
        height="18"
        rx="2.5"
        fill="#FFEFE6"
        stroke="#FF7E53"
        strokeWidth="1.5"
        transform="rotate(5 12 6)"
      />
      {/* Question mark */}
      <text
        x="18"
        y="19"
        fontFamily="Fredoka"
        fontWeight="bold"
        fontSize="10"
        fill="#FF7E53"
        textAnchor="middle"
      >
        ?
      </text>
      {/* Star accent */}
      <circle cx="26" cy="8" r="3" fill="#FFB347" />
      <path
        d="M26 5.5L26.8 7.2L28.5 7.5L27.3 8.7L27.5 10.5L26 9.7L24.5 10.5L24.7 8.7L23.5 7.5L25.2 7.2L26 5.5Z"
        fill="white"
      />
    </svg>
  );
}

// Walking Mochi loading screen
function MochiLoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Dot animation for "..."
  const dots = [0, 1, 2];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF9F6] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Decorative clouds / soft shapes in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-32 h-16 bg-[#FFEFE6] rounded-full opacity-60"
          style={{ top: "15%", left: "-10%" }}
          animate={{ x: [0, 400], opacity: [0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-24 h-12 bg-[#FFDFC6]/40 rounded-full opacity-50"
          style={{ top: "30%", right: "-5%" }}
          animate={{ x: [0, -350], opacity: [0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Road / path line */}
      <div className="absolute bottom-[38%] left-0 right-0 h-[2px] bg-[#FFDFC6]/60" />

      {/* Small house icon on the left (home) */}
      <motion.div
        className="absolute bottom-[40%] left-[8%] text-center flex flex-col items-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="w-8 h-8 mb-1 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5E4E46"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full opacity-60"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <span className="font-fredoka text-[10px] text-[#5E4E46]/50 font-bold">
          Kos
        </span>
      </motion.div>

      {/* Small building icon on the right (lab/lecturer) */}
      <motion.div
        className="absolute bottom-[40%] right-[8%] text-center flex flex-col items-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <div className="w-8 h-8 mb-1 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5E4E46"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full opacity-60"
          >
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <path d="M9 22v-4h6v4"></path>
            <path d="M8 6h.01"></path>
            <path d="M16 6h.01"></path>
            <path d="M12 6h.01"></path>
            <path d="M12 10h.01"></path>
            <path d="M12 14h.01"></path>
            <path d="M16 10h.01"></path>
            <path d="M16 14h.01"></path>
            <path d="M8 10h.01"></path>
            <path d="M8 14h.01"></path>
          </svg>
        </div>
        <span className="font-fredoka text-[10px] text-[#5E4E46]/50 font-bold">
          Kampus
        </span>
      </motion.div>

      {/* Mochi walking across */}
      <motion.div
        className="absolute bottom-[42%] w-20 h-20 flex flex-col items-center justify-end"
        initial={{ x: "-20vw" }}
        animate={{ x: "20vw" }}
        transition={{ duration: 2.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Bounce animation to simulate walking */}
        <motion.div
          className="relative z-10 w-20 h-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/mochi-aslab.svg"
            alt="Mochi walking"
            fill
            className="object-contain scale-x-[-1]"
          />
        </motion.div>

        {/* Dynamic shadow that shrinks when Mochi jumps */}
        <motion.div
          className="absolute bottom-[-2px] w-12 h-[6px] bg-black/20 rounded-[100%] blur-[1px] z-0"
          animate={{ scale: [1, 0.5, 1], opacity: [0.7, 0.2, 0.7] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Text */}
      <motion.div
        className="absolute bottom-[22%] text-center px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <p className="font-fredoka font-bold text-[#5E4E46] text-xl">
          mochi pigi dulu ke lecturer
          {/* Animated dots */}
          <span className="inline-flex ml-0.5">
            {dots.map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              >
                .
              </motion.span>
            ))}
          </span>
        </p>
        <motion.p
          className="font-sans text-sm text-[#5E4E46]/50 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          tunggu sebentar ya~
        </motion.p>
      </motion.div>

      {/* Footprint trail */}
      <div className="absolute bottom-[37%] left-0 right-0 flex justify-center gap-6 pointer-events-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="text-[#FFDFC6] text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{
              duration: 1.5,
              delay: 0.8 + i * 0.35,
              ease: "easeOut",
            }}
          >
            ·
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

interface GameCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  comingSoon?: boolean;
  onClick?: () => void;
}

function GameCard({
  icon,
  title,
  description,
  tag,
  comingSoon,
  onClick,
}: GameCardProps) {
  return (
    <motion.button
      whileTap={!comingSoon ? { scale: 0.97 } : undefined}
      onClick={!comingSoon ? onClick : undefined}
      className={`w-full text-left bg-white border-2 rounded-3xl p-4 flex items-center gap-4 shadow-sm transition-opacity ${
        comingSoon
          ? "border-[#FFDFC6]/40 opacity-60 cursor-default"
          : "border-[#FFDFC6] cursor-pointer hover:border-[#FF7E53]/50"
      }`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#FFEFE6] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-fredoka font-bold text-[#5E4E46] text-base">
            {title}
          </span>
          {comingSoon && (
            <span className="text-[9px] font-fredoka font-bold bg-[#FFDFC6]/60 text-[#FF7E53] px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
          )}
        </div>
        <p className="font-sans text-xs text-[#5E4E46]/60 leading-snug">
          {description}
        </p>
        <span className="inline-block mt-1.5 text-[10px] font-fredoka font-bold text-[#FF7E53] bg-[#FFEFE6] px-2 py-0.5 rounded-full">
          {tag}
        </span>
      </div>
      {!comingSoon && (
        <span className="text-[#FFDFC6] text-xl flex-shrink-0">›</span>
      )}
    </motion.button>
  );
}

interface ForMochiProps {
  onGameActiveChange?: (active: boolean) => void;
}

import { useMusic } from "@/context/MusicContext";

export default function ForMochi({ onGameActiveChange }: ForMochiProps) {
  const [activeGame, setActiveGame] = useState<ActiveGame>(null);
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>(null);
  const { togglePlay, isPlaying } = useMusic();

  useEffect(() => {
    onGameActiveChange?.(activeGame !== null || transitionPhase !== null);
  }, [activeGame, transitionPhase, onGameActiveChange]);

  function handleStartAslab() {
    setTransitionPhase("loading");
  }

  function handleLoadingComplete() {
    setTransitionPhase(null);
    setActiveGame("aslab");
  }

  // ── Game Screen (slide in) ────────────────────────────────────────────
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Game Hub */}
      <motion.div
        className="absolute inset-0 overflow-y-auto"
        animate={{ x: activeGame ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform" }}
      >
        <div className="w-full flex flex-col p-6 pb-28 gap-5 mt-4">
          {/* Header Badge (matching Memories style) */}
          <div className="flex justify-center">
            <div className="bg-[#FF7E53] border-2 border-white rounded-full px-6 py-2.5 shadow-md flex items-center gap-2">
              <span className="font-fredoka text-lg font-bold text-white uppercase tracking-wider">
                biar capeknya mochi ilang
              </span>
            </div>
          </div>

          {/* Game list */}
          <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
            <GameCard
              icon={<AslabIcon />}
              title=" Mochi jadi aslab"
              description="Bantuin mochi meriksa laprak, ngecek acc atau revisi"
              tag="Swipe Card · Gampang ini mah"
              onClick={handleStartAslab}
            />
            <GameCard
              icon={<MusicIcon />}
              title="Mochi dengerin musik"
              description="Ayo mochi idupin musik biar ngga bosen"
              tag={isPlaying ? "Sedang diputar..." : "Kesukaan Mochi"}
              onClick={() => setActiveGame("music")}
            />
            <GameCard
              icon={<CoffeeIcon />}
              title="Coffee Break"
              description="Temenin Mochi istirahat sejenak dari kesibukan aslab-nya."
              tag="Coming Soon"
              comingSoon
            />
            <GameCard
              icon={<MemoryMatchIcon />}
              title="Mochi Memory Match"
              description="Cocokkan kartu ekspresi Mochi sebelum waktu habis!"
              tag="Coming Soon"
              comingSoon
            />
          </div>
        </div>
      </motion.div>

      {/* Loading Screen (Mochi walking gimmick) */}
      <AnimatePresence>
        {transitionPhase === "loading" && (
          <MochiLoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Game Screen (slide from right) */}
      <AnimatePresence>
        {activeGame && (
          <motion.div
            key={activeGame}
            className="fixed inset-0 z-50 overflow-hidden"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform" }}
          >
            {activeGame === "aslab" && (
              <AslabSimulator onBack={() => setActiveGame(null)} />
            )}
            {activeGame === "music" && (
              <MusicPlayerPage onBack={() => setActiveGame(null)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
