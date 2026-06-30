"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMusic } from "@/context/MusicContext";

export default function MusicDynamicIsland({ activeTab }: { activeTab: string }) {
  const { currentTrack, isPlaying, togglePlay, progress, duration, nextTrack, prevTrack } = useMusic();
  const [expanded, setExpanded] = useState(false);

  // Only show on formochi (Mau main) and memories (Momen)
  const isVisible = currentTrack !== null && (activeTab === "formochi" || activeTab === "memories");

  if (!isVisible) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[60] w-full px-4 flex justify-center pointer-events-none">
      <motion.div
        layout
        onClick={() => setExpanded(!expanded)}
        className="pointer-events-auto bg-[#1a1535] text-white rounded-[32px] overflow-hidden flex flex-col items-center justify-center cursor-pointer shadow-xl border border-white/10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1, 
          width: expanded ? 320 : 160,
          height: expanded ? 180 : 44
        }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <AnimatePresence mode="wait">
          {!expanded ? (
            <motion.div
              key="collapsed"
              className="flex items-center gap-3 w-full px-2 py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex-1 w-full flex items-center gap-3">
                {/* Album Cover */}
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 overflow-hidden ml-1">
                  {currentTrack.coverUrl ? (
                     <img src={currentTrack.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                  ) : (
                     <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                       <circle cx="8" cy="10" r="1.5" />
                       <circle cx="16" cy="10" r="1.5" />
                       <path d="M9.5 14c1.5 1.5 3.5 1.5 5 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                     </svg>
                  )}
                </div>
                {/* Text */}
                <div className="flex flex-col flex-1 min-w-0 justify-center">
                  <span className="text-[9px] font-sans text-white/70">Now Playing</span>
                  <span className="text-[11px] font-bold truncate text-white leading-tight">{currentTrack.title}</span>
                </div>
                {/* Waveform */}
                <div className="flex items-center gap-[2px] h-4 shrink-0 mr-3">
                   <motion.div animate={isPlaying ? { height: [4, 12, 4] } : { height: 4 }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-[2.5px] bg-white/80 rounded-full" />
                   <motion.div animate={isPlaying ? { height: [8, 16, 8] } : { height: 8 }} transition={{ repeat: Infinity, duration: 0.9, delay: 0.2 }} className="w-[2.5px] bg-white/80 rounded-full" />
                   <motion.div animate={isPlaying ? { height: [6, 10, 6] } : { height: 6 }} transition={{ repeat: Infinity, duration: 0.7, delay: 0.1 }} className="w-[2.5px] bg-white/80 rounded-full" />
                   <motion.div animate={isPlaying ? { height: [10, 4, 10] } : { height: 10 }} transition={{ repeat: Infinity, duration: 0.85, delay: 0.3 }} className="w-[2.5px] bg-white/80 rounded-full" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              className="flex flex-col w-full h-full p-4 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {/* Info */}
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col flex-1 min-w-0 pr-4">
                  <span className="font-fredoka text-sm font-bold truncate">{currentTrack.title}</span>
                  <span className="font-sans text-[10px] text-white/60 truncate">{currentTrack.artist}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FF7E53] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                   {currentTrack.coverUrl ? (
                     <img src={currentTrack.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                   ) : (
                     <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                       <circle cx="8" cy="10" r="1.5" />
                       <circle cx="16" cy="10" r="1.5" />
                       <path d="M9.5 14c1.5 1.5 3.5 1.5 5 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                     </svg>
                   )}
                </div>
              </div>

              {/* Progress */}
              <div className="mt-4 flex flex-col gap-1 w-full">
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-300 ease-linear" 
                    style={{ width: `${(progress / (duration || 1)) * 100}%` }} 
                  />
                </div>
                <div className="flex justify-between w-full">
                  <span className="text-[9px] font-sans text-white/50">{formatTime(progress)}</span>
                  <span className="text-[9px] font-sans text-white/50">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-auto flex justify-center items-center gap-6 w-full pb-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); prevTrack(); }}
                  className="text-white/80 hover:text-white"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className="w-10 h-10 rounded-full bg-white text-[#1a1535] flex items-center justify-center pl-0.5"
                >
                  {isPlaying ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextTrack(); }}
                  className="text-white/80 hover:text-white"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
