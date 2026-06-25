"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ForMochi() {
  return (
    <div className="w-full min-h-full flex flex-col p-6 pb-28 justify-between">
      {/* Header */}
      <div className="text-center mt-4">
        <span className="font-sans text-xs font-bold text-[#FF7E53] uppercase tracking-wider">
          Pesan Spesial 🧡
        </span>
        <h1 className="font-fredoka text-3xl font-bold text-[#5E4E46] tracking-wide mt-1">
          Untuk Mochi
        </h1>
        <p className="font-sans text-sm text-[#5E4E46]/70 mt-2 max-w-xs mx-auto px-4">
          Sebuah pesan kecil hangat yang menunggumu hari ini.
        </p>
      </div>

      {/* Envelope Card */}
      <div className="my-6 w-full flex items-center justify-center">
        <div className="cute-card p-8 flex flex-col items-center justify-center w-full max-w-[300px]">
          <div className="w-16 h-16 rounded-full bg-[#FFEFE6] flex items-center justify-center text-3xl mb-4 shadow-sm">
            💌
          </div>
          <h2 className="font-fredoka font-bold text-[#5E4E46] text-lg text-center">
            Kamu Dapat Surat!
          </h2>
          <p className="font-sans text-xs text-[#5E4E46]/60 text-center mt-2 max-w-[180px] leading-relaxed">
            Surat digital dan generator kalimat penyemangat sedang kami rangkai.
          </p>
          
          {/* Main Button (Inspired by dark button in reference) */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-[#5E4E46] text-white py-3 px-8 rounded-full font-fredoka font-bold text-sm shadow-[0_4px_14px_rgba(94,78,70,0.15)] cursor-pointer"
          >
            Buka Surat
          </motion.button>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="w-full bg-[#FFEFE6] border border-[#FFDFC6]/70 rounded-3xl p-4 flex flex-col items-center text-center gap-1 shadow-sm">
        <span className="text-xs font-bold text-[#FF7E53] uppercase tracking-wider font-fredoka">
          Catatan Hati
        </span>
        <p className="font-sans text-xs text-[#5E4E46]/80 leading-relaxed">
          Surat interaktif & kartu polaroid penyemangat saat ini sedang disiapkan.
        </p>
      </div>
    </div>
  );
}
