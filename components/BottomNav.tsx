"use client";

import React from "react";
import { motion } from "framer-motion";

export type TabType = "sanctuary" | "formochi" | "memories";

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[360px] px-4 z-50">
      {/* Navbar Container */}
      <nav className="bg-[#FFFFFF]/90 backdrop-blur-md border border-[#FFE0D3]/60 rounded-full h-16 px-6 flex justify-between items-center cute-shadow-nav relative">
        {/* Left Tab: Untuk Mochi */}
        <motion.button
          onClick={() => setActiveTab("formochi")}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-center w-16 h-12 cursor-pointer select-none"
        >
          <span
            className={`transition-colors duration-200 ${activeTab === "formochi" ? "text-[#FF7E53]" : "text-[#5E4E46]/60"}`}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="6" width="20" height="12" rx="3" />
              <circle
                cx="8.5"
                cy="12"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
              <path d="M16 10.5v3" />
              <path d="M14.5 12h3" />
            </svg>
          </span>
          <span
            className={`text-[10px] font-sans font-bold mt-0.5 ${activeTab === "formochi" ? "text-[#FF7E53]" : "text-[#5E4E46]/50"}`}
          >
            Game
          </span>
        </motion.button>

        {/* Center Tab: Mochi (Floating Circle) */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-5 flex flex-col items-center">
          <motion.button
            onClick={() => setActiveTab("sanctuary")}
            whileTap={{ scale: 0.92, y: 1 }}
            className={`w-14 h-14 rounded-full flex items-center justify-center border-2 border-white cursor-pointer select-none shadow-[0_5px_15px_rgba(254,126,83,0.3)] transition-all duration-200 ${
              activeTab === "sanctuary"
                ? "bg-[#FF7E53] text-white"
                : "bg-[#FFEFE6] text-[#5E4E46]"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </motion.button>
          <span
            className={`text-[10px] font-sans font-black mt-1 ${activeTab === "sanctuary" ? "text-[#FF7E53]" : "text-[#5E4E46]/50"}`}
          >
            Mochi
          </span>
        </div>

        {/* Right Tab: Memori */}
        <motion.button
          onClick={() => setActiveTab("memories")}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-center w-16 h-12 cursor-pointer select-none"
        >
          <span
            className={`transition-colors duration-200 ${activeTab === "memories" ? "text-[#FF7E53]" : "text-[#5E4E46]/60"}`}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h20v18H2z" />
              <path d="M6 3v18" />
              <path d="M18 3v18" />
              <path d="M2 7h4" />
              <path d="M18 7h4" />
              <path d="M2 12h20" />
              <path d="M2 17h4" />
              <path d="M18 17h4" />
            </svg>
          </span>
          <span
            className={`text-[10px] font-sans font-bold mt-0.5 ${activeTab === "memories" ? "text-[#FF7E53]" : "text-[#5E4E46]/50"}`}
          >
            Momen²
          </span>
        </motion.button>
      </nav>
    </div>
  );
}
