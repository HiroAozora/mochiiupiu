"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMusic } from "@/context/MusicContext";

export default function MochiMusicSVG({ hideShadow = false }: { hideShadow?: boolean }) {
  const { isPlaying } = useMusic();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full max-w-[290px] aspect-square flex items-center justify-center select-none pointer-events-none">
      <svg viewBox="-20 0 240 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        {/* Floor Shadow */}
        {!hideShadow && (
          <motion.ellipse
            cx="103"
            cy="154.5"
            rx="78"
            ry="15.5"
            fill="#5E4E46"
            initial={{ opacity: 0.16 }}
            animate={
              isPlaying
                ? { scale: [1, 0.95, 1], opacity: [0.16, 0.2, 0.16] }
                : { scale: 1, opacity: 0.16 }
            }
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Mochi Bopping Group */}
        <motion.g
          animate={
            isPlaying
              ? { y: [0, -8, 0], scaleY: [1, 0.96, 1], scaleX: [1, 1.02, 1] }
              : { y: [0, 2, 0], scaleY: [1, 0.98, 1], scaleX: [1, 1.01, 1] }
          }
          transition={{
            duration: isPlaying ? 0.6 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "100px 157px" }}
        >
          {/* Mochi Skin & Shade */}
          <g>
            <path
              d="M180.227 100.89C180.594 108.24 184.82 151.755 104.584 157.151C24.347 162.547 19.6176 115.011 19.889 108.354C20.1605 101.697 27.6851 47.993 97.9091 42.8551C168.133 37.7173 179.86 93.5403 180.227 100.89Z"
              fill="white"
              stroke="#5E4E46"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <mask id="mochi-music-mask" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="19" y="42" width="162" height="116">
              <path d="M180.227 100.89C180.594 108.24 184.82 151.755 104.584 157.151C24.347 162.547 19.6176 115.011 19.889 108.354C20.1605 101.697 27.6851 47.993 97.9091 42.8551C168.133 37.7173 179.86 93.5403 180.227 100.89Z" fill="white" />
            </mask>
            <g mask="url(#mochi-music-mask)">
              <path
                d="M103.742 169.588C63.9708 174.233 32.651 148.474 32.651 148.474C4.97681 131.934 24.5 134.885 24.5 134.885C113.5 186.885 195.713 117.33 182.787 132.11C169.862 146.89 153.456 163.781 103.742 169.588Z"
                fill="#FCA385"
                opacity="0.18"
              />
            </g>
          </g>

          {/* Headphones */}
          <g>
            <path d="M25 77C61.1612 22.1421 146.657 21.7472 177.5 77L176 78C144.5 26.5 61.5 28 27 78L25 77Z" fill="#A3A3A3" />
            <path d="M14.8299 76.9466C15.6734 75.679 17.1348 75 18.6574 75H25.0432C28.051 75 30.3724 77.6373 30.0461 80.6273C28.3999 95.7131 28.4328 105.947 30.032 120.359C30.3642 123.353 28.0421 126 25.0295 126H18.1301C16.0891 126 14.2391 124.761 13.5478 122.84C6.98224 104.599 7.62576 87.7732 14.8299 76.9466Z" fill="#C2C1C1" />
            <path d="M13.9528 77.2068C14.7613 75.7858 16.3181 75 17.953 75H20.9522C24.3965 75 26.7975 78.3996 25.8431 81.7091C22.0752 94.7735 22.0827 104.756 26.0665 119.449C26.9511 122.711 24.556 126 21.176 126H17.575C15.4536 126 13.5501 124.663 12.9171 122.638C7.28366 104.62 7.81157 88.0013 13.9528 77.2068Z" fill="#D9D9D9" />
            <path d="M186.17 76.9466C185.327 75.679 183.865 75 182.343 75H176.161C173.083 75 170.743 77.7582 171.164 80.8077C173.181 95.4153 173.1 105.614 171.13 120.228C170.72 123.265 173.056 126 176.121 126H182.87C184.911 126 186.761 124.761 187.452 122.84C194.018 104.599 193.374 87.7732 186.17 76.9466Z" fill="#C2C1C1" />
            <path d="M186.726 77.1065C185.903 75.7439 184.382 75 182.79 75H179.599C176.005 75 173.593 78.6814 174.784 82.0721C179.655 95.9338 179.212 105.766 174.622 119.06C173.465 122.413 175.873 126 179.42 126H183.221C185.313 126 187.196 124.7 187.852 122.714C193.827 104.61 193.257 87.9133 186.726 77.1065Z" fill="#D9D9D9" />
          </g>

          {/* Face (bops slightly more when playing) */}
          <motion.g
            animate={
              isPlaying ? { y: [0, -4, 0] } : { y: 0 }
            }
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Blushes */}
            <ellipse cx="63.2202" cy="113" rx="9.5" ry="8" fill="#FCA385" />
            <ellipse cx="138.72" cy="113" rx="9" ry="8" fill="#FCA385" />

            {/* Mouth */}
            <path d="M100.807 109.771C93.6139 107.048 93.0606 108.5 93.0606 109.227C91.954 112.494 106.34 115.762 108 109.227C106.893 105.959 104.68 110.316 100.807 109.771Z" fill="#5E4E46" />

            {/* Eyes (Switch to straight line when not playing) */}
            {isPlaying ? (
              <>
                <path d="M73 95.4317C78.5 93.582 81.1176 93.1332 81.0854 94.1493C82.2679 98.764 64.8685 102.79 63.1672 93.582C64.6392 89.0514 68.3304 96.0467 73 95.4317Z" fill="#5E4E46" />
                <path d="M129.5 94.4291C138.248 90.8918 138.118 92.1307 138.085 93.1468C139.268 97.7615 121.869 101.788 120.167 92.5795C121.639 88.0488 124.83 95.0442 129.5 94.4291Z" fill="#5E4E46" />
              </>
            ) : (
              <>
                <line x1="64" y1="95" x2="79" y2="95" stroke="#5E4E46" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="121" y1="95" x2="136" y2="95" stroke="#5E4E46" strokeWidth="3.5" strokeLinecap="round" />
              </>
            )}
          </motion.g>

        </motion.g>
      </svg>
    </div>
  );
}
