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
              viewBox="0 0 200 200"
              width="28"
              height="28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-0.5"
            >
              {/* Mochi Body Outline */}
              <path
                d="M191.982 101.006C192.403 109.438 197.252 159.363 105.197 165.554C13.142 171.745 7.71601 117.207 8.02747 109.57C8.33894 101.932 16.9718 40.3176 97.5393 34.423C178.107 28.5283 191.56 92.5737 191.982 101.006Z"
                stroke="currentColor"
                strokeWidth="12"
              />
              
              {/* Bottom shade (semi-transparent) */}
              <mask
                id="mochi-bottom-mask"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="8"
                y="34"
                width="185"
                height="133"
              >
                <path
                  d="M191.982 101.006C192.403 109.438 197.252 159.363 105.197 165.554C13.142 171.745 7.71601 117.207 8.02747 109.57C8.33894 101.932 16.9718 40.3176 97.5393 34.423C178.107 28.5283 191.56 92.5737 191.982 101.006Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mochi-bottom-mask)">
                <path
                  d="M104.231 172.497C58.6021 177.826 22.6691 148.272 22.6691 148.272C-9.08121 129.297 13.3176 132.683 13.3176 132.683C115.427 192.342 209.749 112.541 194.919 129.499C180.09 146.456 161.268 165.835 104.231 172.497Z"
                  fill="currentColor"
                  opacity="0.15"
                />
              </g>

              {/* Mouth */}
              <path
                d="M100.04 94.7988C90.1367 90.4248 89.375 92.7577 89.375 93.9241C87.8514 99.1729 107.657 104.422 109.943 93.9241C108.419 88.6752 105.372 95.6736 100.04 94.7988Z"
                fill="currentColor"
              />

              {/* Blush (Opacity adjusted to match theme) */}
              <ellipse cx="57.7409" cy="99.9848" rx="10.8993" ry="9.17834" fill="currentColor" opacity="0.4" />
              <ellipse cx="144.361" cy="99.9848" rx="10.3256" ry="9.17834" fill="currentColor" opacity="0.4" />

              {/* Eyes */}
              <ellipse cx="67.4929" cy="82.2018" rx="8.03104" ry="8.60469" fill="currentColor" />
              <ellipse cx="132.889" cy="82.2018" rx="8.03104" ry="8.60469" fill="currentColor" />
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
