"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import memoriesData from "../data/memories.json";
import MochiSVG from "./MochiSVG";

interface MemoryItem {
  id: number;
  title: string;
  cloudinaryUrl: string;
  startOffset?: string | number;
}

export default function Memories() {
  const [selectedVideo, setSelectedVideo] = useState<MemoryItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to inject Cloudinary optimization parameters
  const getOptimizedVideo = (rawUrl: string) => {
    if (!rawUrl) return "";
    const url = rawUrl.replace("hhttps://", "https://");
    if (!url.includes("cloudinary.com")) return url;
    // Inject q_auto,f_auto if not already present
    if (url.includes("/upload/q_auto")) return url;
    return url.replace("/upload/", "/upload/q_auto,f_auto/");
  };

  // Helper to auto-generate optimized thumbnail from Cloudinary video URL
  const getAutoThumbnail = (
    rawUrl: string,
    id: number,
    startOffset?: string | number,
  ) => {
    if (!rawUrl) return "";
    const url = rawUrl.replace("hhttps://", "https://");

    // Fallback for demo/placeholder URL to make sure it looks cute with cats
    if (url.includes("demo/video/upload")) {
      const fallbacks = [
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1513360309081-36f5e878fc9e?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop",
      ];
      // Pick deterministically based on video ID to prevent hydration mismatch
      return fallbacks[(id - 1) % fallbacks.length];
    }

    if (!url.includes("cloudinary.com")) {
      // Fallback for general URLs
      return "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop";
    }

    // Keep the 'video/upload' resource type so Cloudinary knows it is a video asset, but change the extension to .jpg so it renders a frame image
    let thumbnailUrl = url.replace(/\.[^/.]+$/, ".jpg"); // replace file extension with .jpg

    // Inject start offset parameter if provided (e.g. so_3 or so_5.5) to capture specific frame
    const offsetParam = startOffset ? `so_${startOffset},` : "";

    // Inject optimization and size parameters for quick mobile load
    return thumbnailUrl.replace(
      "/upload/",
      `/upload/${offsetParam}q_auto,f_auto,w_600,c_scale/`,
    );
  };

  return (
    <div className="w-full min-h-full flex flex-col p-6 pb-32 justify-start gap-6">
      {/* Header Badge */}
      <div className="flex justify-center mt-6">
        <div className="bg-[#FF7E53] border-2 border-white rounded-full px-6 py-2.5 shadow-md flex items-center gap-2">
          <span className="font-fredoka text-lg font-bold text-white uppercase tracking-wider">
            galeri mochi
          </span>
        </div>
      </div>

      {/* Video List */}
      <div className="flex flex-col gap-5 w-full max-w-sm mx-auto">
        {(memoriesData as MemoryItem[]).map((video) => {
          const autoThumbnailUrl = getAutoThumbnail(
            video.cloudinaryUrl,
            video.id,
            video.startOffset,
          );

          return (
            <div
              key={video.id}
              className="relative w-full rounded-3xl border-2 border-[#FFDFC6]/60 bg-[#FFEFE6]/40 shadow-sm mt-4 first:mt-2 overflow-visible"
              style={{ paddingBottom: "56.25%" }}
            >
              {/* Inner wrapper with overflow-hidden to clip the image/video, but keep outer card overflow visible */}
              <div className="absolute inset-0 rounded-[22px] overflow-hidden">
                <div
                  className="relative w-full h-full cursor-pointer group"
                  onClick={() => setSelectedVideo(video)}
                >
                  {/* Background image */}
                  <img
                    src={autoThumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark filter */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-xs border-2 border-[#FF7E53] flex items-center justify-center shadow-lg group-hover:bg-[#FF7E53] transition-colors duration-300"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="text-[#FF7E53] fill-[#FF7E53] group-hover:text-white group-hover:fill-white transition-colors duration-300 ml-1"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Title Capsule (Overlapping the top border) */}
              <div className="absolute -top-3.5 left-5 bg-white border-2 border-[#FFDFC6] rounded-full px-4 py-1 shadow-md flex items-center z-10 pointer-events-none">
                <span className="font-fredoka text-[13px] font-bold text-[#5E4E46]">
                  {video.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="w-full max-w-sm mx-auto bg-[#FFEFE6]/80 backdrop-blur-xs border border-[#FFDFC6]/70 rounded-3xl p-4 flex flex-col items-center text-center gap-1 shadow-sm mt-2">
        <span className="text-xs font-bold text-[#FF7E53] uppercase tracking-wider font-fredoka">
          Tungguin video lainnya yaww
        </span>
        <p className="font-sans text-xs text-[#5E4E46]/80 leading-relaxed">
          Pokoknya isinya mochi dan tetangganya yang entah apa yang dibuatnya
          itu 😊
        </p>
      </div>

      {/* Cute Video Player Modal Overlay rendered in Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedVideo && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                {/* Backdrop Blur Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedVideo(null)}
                  className="absolute inset-0 bg-[#16122c]/85"
                />

                {/* Modal Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: "transform" }}
                  className="bg-white border-4 border-[#FFDFC6] rounded-[36px] p-4 shadow-2xl relative w-full max-w-sm z-10 flex flex-col gap-4 items-center"
                >
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedVideo(null)}
                    className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#FF7E53] border-2 border-white text-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#ff693b] transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </motion.button>

                  {/* Video Player (Maintains original aspect ratio) */}
                  <div className="w-full bg-black/5 rounded-[24px] overflow-hidden border-2 border-[#FFDFC6]/75 shadow-inner flex justify-center items-center">
                    <video
                      src={getOptimizedVideo(selectedVideo.cloudinaryUrl)}
                      controls
                      autoPlay
                      className="max-h-[60vh] w-full h-auto object-contain rounded-[22px]"
                    />
                  </div>

                  {/* Memory Information Card */}
                  <div className="w-full text-center px-2 py-1 flex flex-col gap-2 items-center">
                    <h3 className="font-fredoka text-lg font-bold text-[#5E4E46] leading-snug">
                      {selectedVideo.title}
                    </h3>
                    {/* Cute Mochi SVG icon without shadow */}
                    <div className="w-24 h-24 flex items-center justify-center">
                      <MochiSVG expression="happy" hideShadow={true} />
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
