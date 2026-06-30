"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MochiSVG from "./MochiSVG";
import MochiMusicSVG from "./MochiMusicSVG";
import { useMusic } from "@/context/MusicContext";

interface SanctuaryProps {
  isActive?: boolean;
  isSleepMode: boolean;
  setIsSleepMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sanctuary({
  isActive = true,
  isSleepMode,
  setIsSleepMode,
}: SanctuaryProps) {
  const [mochiMood, setMochiMood] = useState<
    "idle" | "happy" | "sad" | "sleepy"
  >("idle");
  const [bubbleText, setBubbleText] = useState(
    "Halo Mochiupiu! Yuk main bareng Mochi 🧡",
  );
  const [showBubble, setShowBubble] = useState(true);

  const { currentTrack, isPlaying, togglePlay, nextTrack, progress, duration } = useMusic();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const returnTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeBubbleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const idleQuotes = [
    "Semangat ya hari ini! Mochi dukung kamu selalu 🧡",
    "Jangan lupa minum air putih yaa biar sehat 🥤",
    "Hari ini capek ya? Santai dulu yuk bareng Mochi...",
    "Mochi sayang banget sama kamu! 🥰",
    "Mochi seneng banget bisa nemenin kamu hari ini ✨",
  ];

  const sadQuotes = [
    "Mochi lagi sedih nih, elus-elus Mochi dong... 🥺",
    "Mochi kangen... tap-tap Mochi biar ceria lagi 👉👈",
    "Boleh minta pukpuk sebentar? Mochi butuh kehangatan 🥺",
  ];

  const sleepyQuotes = [
    "Hoammm... Mochi ngantuk berat... zzz... 😴",
    "Mochi bobo ciang dulu yaa... temenin... 😴",
    "Ngantuk banget... zzz... jangan berisik ya...",
  ];

  const sleepModeQuotes = [
    "zzz... Mochi lagi tidur nyenyak... 💤",
    "sshh... Mochi mimpi indah... 🌙",
    "zzz... jangan ganggu ya... 😴💤",
  ];

  // Helper to trigger bubble fade out for idle states
  const startBubbleFadeTimer = (duration = 5000) => {
    if (fadeBubbleTimerRef.current) {
      clearTimeout(fadeBubbleTimerRef.current);
    }
    fadeBubbleTimerRef.current = setTimeout(() => {
      // Only fade out if not in sad or sleepy state, which require attention
      setMochiMood((currMood) => {
        if (currMood !== "sad" && currMood !== "sleepy") {
          setShowBubble(false);
        }
        return currMood;
      });
    }, duration);
  };

  // Toggle sleep mode
  const toggleSleepMode = () => {
    if (isSleepMode) {
      // Wake up
      setIsSleepMode(false);
      setMochiMood("happy");
      setBubbleText("Hoaaam... Mochi bangun! Selamat pagi! ☀️");
      setShowBubble(true);
      returnTimerRef.current = setTimeout(() => {
        setMochiMood("idle");
        setBubbleText("Mochi lagi santai nih... 🥟");
        startBubbleFadeTimer(4000);
      }, 3500);
    } else {
      // Go to sleep
      setIsSleepMode(true);
      if (returnTimerRef.current) clearTimeout(returnTimerRef.current);
      if (fadeBubbleTimerRef.current) clearTimeout(fadeBubbleTimerRef.current);
      setMochiMood("sleepy");
      const quote =
        sleepModeQuotes[Math.floor(Math.random() * sleepModeQuotes.length)];
      setBubbleText(quote);
      setShowBubble(true);
      // Slowly fade bubble in sleep mode
      fadeBubbleTimerRef.current = setTimeout(() => {
        setShowBubble(false);
      }, 4000);
    }
  };

  // Random state trigger every 12 seconds (disabled during sleep mode)
  useEffect(() => {
    if (isSleepMode) return;

    // Initial fade timer for the welcome bubble
    startBubbleFadeTimer(6000);

    const interval = setInterval(() => {
      if (mochiMood === "happy") return;

      const randomVal = Math.random();
      setShowBubble(true);

      if (randomVal < 0.25) {
        setMochiMood("sleepy");
        const quote =
          sleepyQuotes[Math.floor(Math.random() * sleepyQuotes.length)];
        setBubbleText(quote);
      } else if (randomVal < 0.5) {
        setMochiMood("sad");
        const quote = sadQuotes[Math.floor(Math.random() * sadQuotes.length)];
        setBubbleText(quote);
      } else {
        setMochiMood("idle");
        const quote = idleQuotes[Math.floor(Math.random() * idleQuotes.length)];
        setBubbleText(quote);
        startBubbleFadeTimer(5000);
      }
    }, 12000);

    return () => {
      clearInterval(interval);
      if (fadeBubbleTimerRef.current) clearTimeout(fadeBubbleTimerRef.current);
    };
  }, [mochiMood, isSleepMode]);

  const handleMochiInteraction = (type: "tap" | "pet_start" | "pet_end") => {
    // If sleep mode is on, wake Mochi up on interaction
    if (isSleepMode) {
      toggleSleepMode();
      return;
    }

    if (returnTimerRef.current) {
      clearTimeout(returnTimerRef.current);
    }
    if (fadeBubbleTimerRef.current) {
      clearTimeout(fadeBubbleTimerRef.current);
    }

    const previousMood = mochiMood;
    setMochiMood("happy");
    setShowBubble(true);

    if (type === "pet_start") {
      const petQuotes = [
        "Aww... nyaman banget dielus... 🥰",
        "Enaaak... elus terus yaa... 🧡",
        "Hihi, geli tapi Mochi suka... 🥰",
      ];
      setBubbleText(petQuotes[Math.floor(Math.random() * petQuotes.length)]);
    } else if (type === "pet_end") {
      if (previousMood === "sad") {
        setBubbleText("Yay! Makasih elusannya. Mochi seneng lagi! 🥰");
      } else {
        setBubbleText("Makasih elusannya yaa! Mochi sayang kamu 🧡");
      }

      returnTimerRef.current = setTimeout(() => {
        setMochiMood("idle");
        setBubbleText("Mochi lagi santai nih... 🥟");
        startBubbleFadeTimer(4000);
      }, 3500);
    } else {
      // Tap/click
      if (previousMood === "sad") {
        setBubbleText("Yay! Pukpuknya anget. Mochi ceria lagi! 🥰");
      } else if (previousMood === "sleepy") {
        setBubbleText("Hihi geli! Mochi jadi melek deh 😆");
      } else {
        const happyReplies = [
          "Hihi, sayang Mochi juga ya? 🥰",
          "Pukpuk terus! Mochi suka banget 🧡",
          "Aaa kenyal kan! Main lagi yuk 🥟",
        ];
        setBubbleText(
          happyReplies[Math.floor(Math.random() * happyReplies.length)],
        );
      }

      returnTimerRef.current = setTimeout(() => {
        setMochiMood("idle");
        setBubbleText("Mochi lagi santai nih... 🥟");
        startBubbleFadeTimer(4000);
      }, 3500);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      {/* Floating Stars during sleep mode */}
      <AnimatePresence>
        {isSleepMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none z-[26]"
          >
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-lg select-none"
                style={{
                  left: `${15 + i * 14}%`,
                  top: `${10 + (i % 3) * 15}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.1, 0.8],
                  y: [0, -8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2 + i * 0.4,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              >
                {i % 2 === 0 ? "✨" : "⭐"}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header & Greeting (Stacked badge style - vertically centered alignment) */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-0 left-0 right-0 p-4 pt-8 z-30 pointer-events-none flex items-center justify-between"
      >
        {/* Left: Greeting badges / Music Player */}
        <div className="inline-flex flex-col items-start pointer-events-auto min-w-[200px]">
          {isPlaying || currentTrack ? (
            <motion.div
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col w-full"
            >
              {/* Orange badge - status */}
              <motion.div layout className="bg-[#FF7E53] border-2 border-white rounded-full px-4 py-1.5 shadow-md z-10 relative ml-3 self-start">
                <span className="font-sans text-[10px] font-bold text-white uppercase tracking-wider">
                  mochi lagi dengerin musik 🎧
                </span>
              </motion.div>
              
              {/* White card - mini player */}
              <motion.div layout className="bg-white/90 backdrop-blur-sm border-2 border-[#FFDFC6]/60 rounded-[24px] p-3 shadow-sm -mt-2 w-full flex flex-col gap-2">
                <div className="flex justify-between items-center w-full gap-2">
                  {/* Album Cover */}
                  <div className="w-9 h-9 rounded-full bg-[#FFEFE6] flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                    {currentTrack?.coverUrl ? (
                      <img src={currentTrack.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="#FF7E53" className="w-5 h-5">
                        <circle cx="8" cy="10" r="1.5" />
                        <circle cx="16" cy="10" r="1.5" />
                        <path d="M9.5 14c1.5 1.5 3.5 1.5 5 0" stroke="#FF7E53" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  {/* Text */}
                  <div className="flex flex-col flex-1 min-w-0 pr-1">
                    <span className="font-fredoka text-sm font-bold text-[#5E4E46] truncate leading-tight">{currentTrack?.title}</span>
                    <span className="font-sans text-[10px] text-[#5E4E46]/60 truncate">{currentTrack?.artist}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-[#FF7E53] text-white flex items-center justify-center shadow-sm">
                      {isPlaying ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>
                    <button onClick={nextTrack} className="w-8 h-8 rounded-full bg-[#FFEFE6] text-[#FF7E53] flex items-center justify-center shadow-sm">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                    </button>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1 bg-[#FFDFC6] rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full bg-[#FF7E53] rounded-full transition-all duration-300 ease-linear" 
                    style={{ width: `${(progress / (duration || 1)) * 100}%` }} 
                  />
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div layout className="flex flex-col">
              {/* Orange badge - subtitle */}
              <div className="bg-[#FF7E53] border-2 border-white rounded-full px-4 py-1.5 shadow-md z-10 relative ml-3 self-start">
                <span className="font-sans text-[10px] font-bold text-white uppercase tracking-wider">
                  mochi&apos;s room
                </span>
              </div>
              {/* White card - greeting */}
              <div className="bg-white/90 backdrop-blur-sm border-2 border-[#FFDFC6]/60 rounded-4xl px-5 py-3 shadow-sm -mt-2">
                <h1 className="font-fredoka text-xl font-bold text-[#5E4E46]">
                  aloww mochiupiuu {"<3"}
                </h1>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Sleep Mode Toggle Button (Enlarged and centered) */}
        <motion.button
          onClick={toggleSleepMode}
          whileTap={{ scale: 0.95 }}
          className={`w-[48px] h-[48px] rounded-full border-2 border-white flex items-center justify-center shadow-md pointer-events-auto cursor-pointer transition-colors duration-300 ${
            isSleepMode
              ? "bg-[#2d2660] shadow-[0_4px_15px_rgba(45,38,96,0.4)]"
              : "bg-[#FF7E53] shadow-[0_4px_15px_rgba(254,126,83,0.3)]"
          }`}
        >
          <motion.div
            className="flex items-center justify-center"
            animate={{ rotate: isSleepMode ? 360 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {isSleepMode ? (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Full-Screen Cozy Room Container */}
      <div className="absolute inset-0 flex flex-col justify-end overflow-hidden bg-transparent">
        {/* Mochi Center Placement & Interactive Bubble Chat */}
        <div className="w-full relative flex flex-col items-center justify-end h-3/5 pb-[150px] z-10">
          {/* Animated Bubble Chat (Positioned directly closer to Mochi's head) */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10, x: "-50%" }}
                animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, scale: 0.8, y: 10, x: "-50%" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`absolute bottom-[390px] left-1/2 border py-3 px-4 rounded-2xl shadow-sm text-xs font-semibold text-center min-w-[180px] max-w-[240px] z-30 ${
                  isSleepMode
                    ? "bg-[#2d2660]/90 border-[#4a3f8a] text-white/90"
                    : "bg-white border-[#FFDFC6] text-[#5E4E46]"
                }`}
              >
                <motion.span
                  key={bubbleText}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {bubbleText}
                </motion.span>
                {/* Speech Bubble Tail */}
                <div className={`absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 ${
                  isSleepMode
                    ? "bg-[#2d2660]/90 border-r border-b border-[#4a3f8a]"
                    : "bg-white border-r border-b border-[#FFDFC6]"
                }`} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mochi SVG Component */}
          <div className="z-20 relative w-full flex justify-center">
            <AnimatePresence mode="wait">
              {isPlaying || currentTrack ? (
                <motion.div
                  key="mochi-music"
                  initial={{ opacity: 0, scale: 0.8, filter: "brightness(2)" }}
                  animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
                  exit={{ opacity: 0, scale: 0.8, filter: "brightness(2)" }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <MochiMusicSVG />
                </motion.div>
              ) : (
                <motion.div
                  key="mochi-normal"
                  initial={{ opacity: 0, scale: 0.8, filter: "brightness(2)" }}
                  animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
                  exit={{ opacity: 0, scale: 0.8, filter: "brightness(2)" }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <MochiSVG
                    expression={mochiMood}
                    onInteraction={handleMochiInteraction}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Quick Status / Interaction Hint (Floating) */}
      <div className="absolute bottom-[115px] left-0 right-0 text-center z-30 pointer-events-none">
        <p className={`font-sans text-[11px] ${isSleepMode ? "text-white/40" : "text-[#5E4E46]/50"}`}>
          {isSleepMode
            ? "Mochi sedang tidur nyenyak... 💤🌙"
            : mochiMood === "sad"
              ? "Mochi lagi butuh perhatianmu. Yuk elus Mochi! 🥺"
              : mochiMood === "sleepy"
                ? "Mochi lagi tidur... tap untuk bangunin hihi 😴"
                : "Sentuh atau elus Mochi untuk berinteraksi 🧡"}
        </p>
      </div>
    </div>
  );
}
