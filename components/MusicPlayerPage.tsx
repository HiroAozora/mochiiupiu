"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMusic, Track } from "@/context/MusicContext";

interface MusicPlayerPageProps {
  onBack: () => void;
}

interface LyricLine {
  start: number;
  end: number;
  text: string;
}

export default function MusicPlayerPage({ onBack }: MusicPlayerPageProps) {
  const { playlist, currentTrack, isPlaying, playTrack, togglePlay, stopMusic, progress, duration, seek, nextTrack, prevTrack } = useMusic();
  const [view, setView] = useState<"playlist" | "player">("playlist");
  
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);



  // Format time (e.g. 145 -> 2:25)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seek(percent * duration);
  };

  // LRC Parser
  useEffect(() => {
    const fetchLyrics = async () => {
      if (!currentTrack?.lyricsUrl) {
        setLyrics([]);
        return;
      }
      try {
        const res = await fetch(currentTrack.lyricsUrl);
        const text = await res.text();
        
        const lines = text.split('\n');
        const parsed = lines.map(line => {
          const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
          if (match) {
            const mins = parseInt(match[1], 10);
            const secs = parseInt(match[2], 10);
            const ms = parseInt(match[3].padEnd(3, '0'), 10);
            const time = mins * 60 + secs + ms / 1000;
            return { start: time, text: match[4].trim() };
          }
          return null;
        }).filter(Boolean) as {start: number, text: string}[];

        // LRC end time is the start of the next lyric
        const withEndTimes = parsed.map((lyric, index) => {
          return {
            start: lyric.start,
            end: parsed[index + 1] ? parsed[index + 1].start : lyric.start + 10,
            text: lyric.text
          };
        });
        setLyrics(withEndTimes);
      } catch (err) {
        console.error("Failed to load lyrics:", err);
        setLyrics([]);
      }
    };
    fetchLyrics();
  }, [currentTrack?.lyricsUrl]);

  const activeLyricIndex = lyrics.findIndex(l => progress >= l.start && progress <= l.end);

  // Auto-scroll lyrics without scrolling the whole page!
  useEffect(() => {
    if (lyricsContainerRef.current) {
      const container = lyricsContainerRef.current;
      const activeLine = container.querySelector('.active-lyric') as HTMLElement;
      if (activeLine) {
        container.scrollTo({
          top: activeLine.offsetTop - (container.clientHeight / 2) + (activeLine.clientHeight / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [activeLyricIndex]);

  const handleTrackClick = (track: Track) => {
    if (currentTrack?.id !== track.id) {
      playTrack(track);
    }
    setView("player");
  };

  if (view === "playlist") {
    return (
      <div className="w-full h-full bg-[#FFF9F6] flex flex-col z-50 overflow-hidden relative">
        <div className="flex items-center justify-between p-6 pb-2 shrink-0">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border-2 border-[#FFDFC6] flex items-center justify-center text-[#FF7E53] shadow-sm active:scale-95 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <span className="font-fredoka text-lg font-bold text-[#5E4E46]">Playlist Santai</span>
          <div className="w-10" />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 pb-32">
          <div className="flex flex-col items-center justify-center mb-8 mt-2">
            <div className="w-32 h-32 bg-[#FF7E53] rounded-3xl mb-4 flex items-center justify-center shadow-lg overflow-hidden">
               <svg viewBox="0 0 24 24" fill="white" className="w-12 h-12 opacity-80">
                  <path d="M9 18V5l12-2v13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
            </div>
            <h2 className="font-fredoka text-xl font-bold text-[#5E4E46]">Lagu Mochi</h2>
            <p className="font-sans text-sm text-[#5E4E46]/60">Nyalain lagu biar Mochi nyantai</p>
          </div>

          <div className="flex flex-col gap-3">
            {playlist.map((track, index) => {
              const isActive = currentTrack?.id === track.id;
              return (
                <motion.button key={track.id} whileTap={{ scale: 0.98 }} onClick={() => handleTrackClick(track)} className={`w-full flex items-center p-3 rounded-2xl border-2 transition-colors text-left ${isActive ? "bg-[#FFEFE6] border-[#FF7E53] shadow-sm" : "bg-white border-[#FFDFC6]/50 hover:border-[#FFDFC6]"}`}>
                  <div className="w-10 h-10 rounded-xl bg-[#FFDFC6] text-[#FF7E53] flex items-center justify-center font-fredoka font-bold mr-4 shrink-0 overflow-hidden">
                    {track.coverUrl ? (
                      <img src={track.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                    ) : isActive && isPlaying ? (
                       <div className="flex gap-1 items-end h-4">
                         <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-[#FF7E53] rounded-full" />
                         <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.9, delay: 0.2 }} className="w-1 bg-[#FF7E53] rounded-full" />
                         <motion.div animate={{ height: [6, 10, 6] }} transition={{ repeat: Infinity, duration: 0.7, delay: 0.1 }} className="w-1 bg-[#FF7E53] rounded-full" />
                       </div>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pr-2">
                    <div className={`font-fredoka font-bold text-[15px] truncate ${isActive ? "text-[#FF7E53]" : "text-[#5E4E46]"}`}>{track.title}</div>
                    <div className="font-sans text-xs text-[#5E4E46]/60 truncate">{track.artist}</div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Floating Mini Player / Stop */}
        <AnimatePresence>
          {currentTrack && (
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-2">
              <div onClick={() => setView("player")} className="bg-[#5E4E46] text-white rounded-[24px] p-3 shadow-xl flex items-center justify-between cursor-pointer border-2 border-white/10">
                 <div className="flex items-center gap-3 min-w-0 flex-1">
                   <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden shrink-0 flex items-center justify-center">
                      {currentTrack.coverUrl ? (
                        <img src={currentTrack.coverUrl} alt="cover" className="w-full h-full object-cover" />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><circle cx="8" cy="10" r="2"/><circle cx="16" cy="10" r="2"/><path d="M9.5 15c1.5 1.5 3.5 1.5 5 0" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
                      )}
                   </div>
                   <div className="flex flex-col min-w-0 flex-1">
                     <span className="font-fredoka font-bold text-sm truncate">{currentTrack.title}</span>
                     <span className="font-sans text-[10px] text-white/60 truncate">{currentTrack.artist}</span>
                   </div>
                 </div>
                 <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="w-10 h-10 rounded-full bg-white text-[#5E4E46] flex items-center justify-center shrink-0">
                    {isPlaying ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>}
                 </button>
              </div>
              <button onClick={stopMusic} className="bg-red-100 text-red-500 rounded-[20px] py-2 font-fredoka font-bold text-sm shadow-md border-2 border-red-200 active:scale-95 transition-transform flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>
                Matikan Musik Total
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- LYRICS VIEW (SCROLLING FULL PAGE) ---
  if (view === "lyrics") {
    return (
      <div className="w-full h-full relative z-50 text-[#5E4E46] overflow-hidden bg-[#FFEFE6] flex flex-col">
        {/* Background shadow/texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F6] to-[#FFEFE6] pointer-events-none" />

        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20">
          <button onClick={() => setView("player")} className="w-10 h-10 rounded-full bg-white border-2 border-[#FFDFC6] flex items-center justify-center text-[#FF7E53] active:scale-95 transition-transform shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <span className="font-fredoka text-lg font-bold text-[#5E4E46]">Lirik</span>
          <div className="w-10" />
        </div>

        {/* Scrolling Lyrics (Manually Scrollable & Centered) */}
        <div ref={lyricsContainerRef} className="flex-1 overflow-y-auto mt-16 mb-24 z-10 px-6 py-32 scroll-smooth">
          <div className="flex flex-col items-center justify-center w-full min-h-full gap-2">
            {lyrics.length > 0 ? (
              lyrics.map((line, i) => {
                const isActive = i === activeLyricIndex;
                const isPassed = i < activeLyricIndex;
                return (
                  <div 
                    key={i} 
                    className={`min-h-[44px] flex items-center justify-center text-center font-fredoka text-[18px] transition-all duration-300 ${
                      isActive ? "active-lyric text-[#FF7E53] font-bold scale-[1.05]" : 
                      isPassed ? "text-[#5E4E46]/50" : "text-[#5E4E46]/40"
                    }`}
                  >
                    {line.text}
                  </div>
                );
              })
            ) : (
              <div className="font-fredoka text-xl text-[#5E4E46]/40 text-center mt-20">
                Belum ada lirik
              </div>
            )}
          </div>
        </div>

        {/* Mini Controls at Bottom */}
        <div className="absolute bottom-6 left-6 right-6 z-20 bg-white rounded-3xl p-4 flex items-center justify-between shadow-lg border-2 border-[#FFDFC6]/50">
          <div className="flex items-center gap-3 min-w-0">
             <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FFEFE6] shrink-0">
               {currentTrack.coverUrl && <img src={currentTrack.coverUrl} alt="Cover" className="w-full h-full object-cover" />}
             </div>
             <div className="flex flex-col min-w-0">
               <span className="font-fredoka font-bold text-sm text-[#5E4E46] truncate">{currentTrack.title}</span>
               <span className="font-sans text-[10px] text-[#5E4E46]/60 truncate">{currentTrack.artist}</span>
             </div>
          </div>
          <button onClick={togglePlay} className="w-12 h-12 rounded-full bg-[#FF7E53] text-white flex items-center justify-center shrink-0 shadow-md">
            {isPlaying ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>}
          </button>
        </div>
      </div>
    );
  }

  // --- NOW PLAYING PLAYER VIEW (SCROLLABLE PAGE) ---
  if (!currentTrack) return null;

  return (
    <div className="w-full h-[100dvh] relative z-50 text-[#5E4E46] overflow-y-auto scroll-smooth bg-[#FFF9F6]">
      {/* Background fixed behind content */}
      <div className="fixed top-0 left-0 right-0 h-[100dvh] pointer-events-none z-0">
         {currentTrack.coverUrl && (
           <div className="absolute inset-0 bg-top bg-cover bg-no-repeat scale-100" style={{ backgroundImage: `url(${currentTrack.coverUrl})` }} />
         )}
         <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F6]/20 via-[#FFF9F6]/60 to-[#FFF9F6]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-full pb-8 pt-24">
        
        {/* Header (Fixed) */}
        <div className="fixed top-0 left-0 right-0 p-6 flex items-center justify-between z-30">
          <button onClick={() => setView("playlist")} className="w-10 h-10 flex items-center justify-center text-[#5E4E46] active:scale-95 transition-transform drop-shadow-sm">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          </button>
          <div className="flex flex-col items-center drop-shadow-sm">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#5E4E46]/80 font-bold">Sedang Diputar</span>
            <span className="font-sans font-bold text-sm text-[#5E4E46]">Mochi's Mix</span>
          </div>
          <div className="w-10 h-10 flex items-center justify-center text-[#5E4E46] drop-shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
          </div>
        </div>

        {/* Spacer to push controls down */}
        <div className="flex-1 min-h-[30vh]"></div>

        {/* Canvas Scrolling Lyrics (Left aligned, above track info) */}
        <div 
          className="px-6 mb-8 h-[60px] overflow-hidden pointer-events-none relative z-10"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)', maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}
        >
          <motion.div 
            className="flex flex-col items-start w-full"
            animate={{ y: activeLyricIndex !== -1 ? -(activeLyricIndex * 36) + 12 : 12 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {lyrics.length > 0 && lyrics.map((line, i) => {
              const isActive = i === activeLyricIndex;
              return (
                <div 
                  key={i} 
                  className={`h-[36px] flex items-center justify-start text-left font-fredoka transition-all duration-300 ${
                    isActive ? "text-[#5E4E46] font-bold text-[20px] scale-[1.02] drop-shadow-sm origin-left" : 
                    "text-[#5E4E46]/40 text-[16px] scale-100 origin-left"
                  }`}
                >
                  <span className="line-clamp-1">{line.text}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Controls Area (Main Player) */}
        <div className="px-6 flex flex-col mb-8">
          {/* Track Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#FFEFE6] shrink-0 shadow-md">
                {currentTrack.coverUrl ? (
                  <img src={currentTrack.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#FF7E53]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <h2 className="font-fredoka text-xl font-bold truncate text-[#5E4E46]">{currentTrack.title}</h2>
                <p className="font-sans text-sm text-[#5E4E46]/70 truncate">{currentTrack.artist}</p>
              </div>
            </div>
            <button className="text-[#FF7E53]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
            </button>
          </div>

          {/* Seekbar */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="w-full h-1.5 bg-[#FFDFC6]/60 rounded-full cursor-pointer relative overflow-hidden group" onClick={handleSeek}>
              <div className="absolute top-0 left-0 h-full bg-[#FF7E53] rounded-full transition-all duration-300 ease-linear pointer-events-none" style={{ width: `${(progress / (duration || 1)) * 100}%` }} />
            </div>
            <div className="flex justify-between font-sans text-[11px] text-[#5E4E46]/60 font-bold">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-between">
            <button className="text-[#5E4E46]/40 hover:text-[#FF7E53]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
            </button>
            <div className="flex items-center gap-6">
              <button onClick={prevTrack} className="text-[#FF7E53] hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
              </button>
              <button onClick={togglePlay} className="w-16 h-16 rounded-full bg-[#FF7E53] text-white flex items-center justify-center hover:scale-105 shadow-lg shadow-[#FF7E53]/30 transition-transform">
                {isPlaying ? <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>}
              </button>
              <button onClick={nextTrack} className="text-[#FF7E53] hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
              </button>
            </div>
            <button className="text-[#5E4E46]/40 hover:text-[#FF7E53]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2l4 4-4 4M3 11v-1a4 4 0 014-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 01-4 4H3"/></svg>
            </button>
          </div>
        </div>

        {/* THE LYRICS BOX (Scroll down to see this) */}
        <div className="px-4 mt-4 mb-10 relative z-20">
          <div className="w-full bg-[#FFEFE6] rounded-[24px] p-6 shadow-md border border-[#FFDFC6]/50 flex flex-col h-[65vh]">
            {/* Lirik Header */}
            <div className="flex justify-between items-center mb-4 shrink-0">
              <span className="font-fredoka font-bold text-[#FF7E53] text-lg">Lirik</span>
              <button onClick={() => setView("lyrics")} className="flex gap-4 text-[#FF7E53] hover:scale-110 transition-transform p-2 -mr-2">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              </button>
            </div>
            
            {/* Lyrics List Container (Scrollable) */}
            <div ref={lyricsContainerRef} className="flex-1 overflow-y-auto scroll-smooth -mx-6 px-6 relative" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)', maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)' }}>
              <div className="flex flex-col gap-6 pb-[40vh] pt-6">
                {lyrics.length > 0 ? (
                  lyrics.map((line, i) => {
                    const isActive = i === activeLyricIndex;
                    const isPassed = i < activeLyricIndex;
                    return (
                      <div 
                        key={i} 
                        className={`font-fredoka text-[22px] leading-tight text-left transition-all duration-300 ${
                          isActive ? "active-lyric text-[#FF7E53] font-bold" : 
                          isPassed ? "text-[#5E4E46]/60" : "text-[#5E4E46]/40"
                        }`}
                      >
                        {line.text}
                      </div>
                    );
                  })
                ) : (
                  <div className="font-fredoka text-lg text-[#5E4E46]/40 text-left">Belum ada lirik</div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
