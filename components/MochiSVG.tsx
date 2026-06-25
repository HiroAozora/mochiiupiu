"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface MochiSVGProps {
  expression?: "idle" | "happy" | "sad" | "sleepy";
  onInteraction?: (type: "tap" | "pet_start" | "pet_end") => void;
  hideShadow?: boolean;
}

export default function MochiSVG({
  expression = "idle",
  onInteraction,
  hideShadow = false,
}: MochiSVGProps) {
  const eyeControls = useAnimation();
  const [isBouncing, setIsBouncing] = useState(false);
  const [isPetting, setIsPetting] = useState(false);
  const [dragOffset, setDragOffset] = useState(0); // For cursor-following parallax

  const pettingAccumulator = useRef(0);
  const startX = useRef<number | null>(null);
  const lastX = useRef<number | null>(null);
  const isPointerDown = useRef(false);

  useEffect(() => {
    let active = true;
    const blink = async () => {
      while (active) {
        const delay = 2000 + Math.random() * 4000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        if (!active) break;
        
        if (expression === "idle") {
          await eyeControls.start({
            scaleY: [1, 0.1, 1],
            transition: { duration: 0.12, ease: "easeInOut" },
          });
        }
      }
    };

    blink();

    return () => {
      active = false;
    };
  }, [eyeControls, expression]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDown.current = true;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    pettingAccumulator.current = 0;
    setDragOffset(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return;
    
    if (startX.current !== null) {
      const currentOffset = e.clientX - startX.current;
      // Clamp drag offset between -50px and 50px
      const clampedOffset = Math.max(-50, Math.min(50, currentOffset));
      setDragOffset(clampedOffset);
    }

    if (lastX.current !== null) {
      const delta = Math.abs(e.clientX - lastX.current);
      pettingAccumulator.current += delta;

      // Threshold to detect active petting gesture
      if (pettingAccumulator.current > 35) {
        if (!isPetting) {
          setIsPetting(true);
          if (onInteraction) onInteraction("pet_start");
        }
      }
    }
    lastX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    startX.current = null;
    lastX.current = null;
    setDragOffset(0); // Reset drag offset to animate back to center
    
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) {}

    if (isPetting) {
      setIsPetting(false);
      setIsBouncing(true);
      if (onInteraction) onInteraction("pet_end");
    } else {
      setIsBouncing(true);
      if (onInteraction) onInteraction("tap");
    }
  };

  const handleAnimationComplete = () => {
    if (isBouncing) {
      setIsBouncing(false);
    }
  };

  // Render eyes based on expression
  const renderEyes = () => {
    if (expression === "happy") {
      return (
        <g id="mochi-eyes-happy">
          <path
            d="M 64,86 Q 71.7,78 79,86"
            fill="none"
            stroke="#5E4E46"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 121,86 Q 128.7,78 136,86"
            fill="none"
            stroke="#5E4E46"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      );
    }

    if (expression === "sad") {
      return (
        <g id="mochi-eyes-sad">
          <path
            d="M 64,82 Q 71.7,90 79,82"
            fill="none"
            stroke="#5E4E46"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 121,82 Q 128.7,90 136,82"
            fill="none"
            stroke="#5E4E46"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      );
    }

    if (expression === "sleepy") {
      return (
        <g id="mochi-eyes-sleepy">
          <line
            x1="64"
            y1="84.5"
            x2="79"
            y2="84.5"
            stroke="#5E4E46"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="121"
            y1="84.5"
            x2="136"
            y2="84.5"
            stroke="#5E4E46"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      );
    }

    return (
      <motion.g
        id="mochi-eyes-idle"
        animate={eyeControls}
        style={{ transformOrigin: "100.22px 84.5px" }}
      >
        <ellipse cx="71.7202" cy="84.5" rx="7" ry="7.5" fill="#5E4E46" />
        <ellipse cx="128.72" cy="84.5" rx="7" ry="7.5" fill="#5E4E46" />
      </motion.g>
    );
  };

  // Render mouth based on expression
  const renderMouth = () => {
    if (expression === "sad") {
      return (
        <path
          id="mochi-mouth"
          d="M 94,97 Q 100,91 106,97"
          fill="none"
          stroke="#5E4E46"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      );
    }

    if (expression === "sleepy") {
      return <ellipse cx="100" cy="94" rx="2.5" ry="3.5" fill="#5E4E46" />;
    }

    if (expression === "happy") {
      return (
        <path
          id="mochi-mouth"
          d="M 94,92 Q 100,105 106,92 Z"
          fill="#5E4E46"
        />
      );
    }

    return (
      <path
        id="mochi-mouth"
        d="M100.089 95.4798C91.4569 91.6673 90.7929 93.7007 90.7929 94.7173C89.465 99.2923 106.728 103.867 108.72 94.7173C107.392 90.1424 104.736 96.2423 100.089 95.4798Z"
        fill="#5E4E46"
      />
    );
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="w-full max-w-[290px] aspect-square flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-none"
    >
      {/* Expanded viewBox (-20 to 220 width) to give side buffer and prevent clipping when petted */}
      <svg viewBox="-20 0 240 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Floor Shadow */}
        {!hideShadow && (
          <motion.ellipse
            id="mochi-floor-shadow"
            cx="103"
            cy="154.5"
            rx="78"
            ry="15.5"
            fill="#5E4E46"
            initial={{ opacity: 0.16 }}
            animate={
              isPetting
                ? { 
                    scaleX: 1.1, 
                    scaleY: 1.02, 
                    opacity: 0.22,
                    x: dragOffset * 0.12 // Shadow follows body movement
                  }
                : isBouncing
                ? {
                    scale: [1.1, 1.25, 0.6, 0.9, 0.95, 1],
                    opacity: [0.22, 0.26, 0.05, 0.12, 0.15, 0.16],
                    x: 0
                  }
                : { scaleX: 1, scaleY: 1, opacity: 0.16, x: 0 }
            }
            transition={
              isPetting
                ? { type: "spring", stiffness: 150, damping: 15 }
                : { duration: 0.6, ease: "easeInOut" }
            }
          />
        )}

        {/* Breathing Group (Body + Face) with Petting & Bounce Animation */}
        <motion.g
          animate={
            isPetting
              ? {
                  scaleY: 0.83, // Less flat than 0.74 (looks more natural)
                  scaleX: 1.17, // Less wide than 1.26 (prevents cutoffs)
                  y: 8,        // Couch down gently
                  x: dragOffset * 0.12, // Leans left/right with cursor
                  rotate: dragOffset * 0.15 // Body rotates slightly with pointer movement
                }
              : isBouncing
              ? {
                  scaleY: [0.83, 1.25, 0.9, 1.05, 1],
                  scaleX: [1.17, 0.8, 1.1, 0.95, 1],
                  y: [8, -22, 4, -2, 0],
                  x: 0,
                  rotate: 0
                }
              : {
                  scaleY: [1, 1.03, 1],
                  scaleX: 1,
                  y: 0,
                  x: 0,
                  rotate: 0
                }
          }
          transition={
            isPetting
              ? { type: "spring", stiffness: 150, damping: 15 } // Spring transition resolves snapping blink
              : isBouncing
              ? { duration: 0.6, ease: "easeInOut" }
              : {
                  scaleY: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }
          }
          onAnimationComplete={handleAnimationComplete}
          style={{ transformOrigin: "100px 157px" }}
        >
          {/* Mochi Body Group */}
          <g id="mochi-body-group">
            {/* Mochi Skin */}
            <path
              id="mochi-skin"
              d="M180.227 100.89C180.594 108.24 184.82 151.755 104.584 157.151C24.347 162.547 19.6176 115.011 19.889 108.354C20.1605 101.697 27.6851 47.993 97.9091 42.8551C168.133 37.7173 179.86 93.5403 180.227 100.89Z"
              fill="#FFFFFF"
              stroke="#5E4E46"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Mochi Body Mask for Shading */}
            <mask
              id="mochi-body-mask"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="19"
              y="42"
              width="162"
              height="116"
            >
              <path d="M180.227 100.89C180.594 108.24 184.82 151.755 104.584 157.151C24.347 162.547 19.6176 115.011 19.889 108.354C20.1605 101.697 27.6851 47.993 97.9091 42.8551C168.133 37.7173 179.86 93.5403 180.227 100.89Z" fill="white" />
            </mask>

            {/* Shading */}
            <g mask="url(#mochi-body-mask)">
              <path
                d="M103.742 163.203C63.9708 167.848 32.651 142.088 32.651 142.088C4.97682 125.549 24.5 128.5 24.5 128.5C113.5 180.5 195.713 110.945 182.787 125.725C169.862 140.505 153.456 157.396 103.742 163.203Z"
                fill="#FCA385"
                opacity="0.18"
              />
            </g>
          </g>

          {/* Mochi Face Group - with additional Parallax shifts */}
          <motion.g
            id="mochi-face-group"
            animate={
              isPetting
                ? { x: dragOffset * 0.08 } // Parallax: face moves slightly more than body
                : { x: 0 }
            }
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            {/* Blush */}
            <g id="mochi-blush">
              <ellipse cx="63.2202" cy="100" rx="9.5" ry="8" fill="#FCA385" />
              <ellipse cx="138.72" cy="100" rx="9" ry="8" fill="#FCA385" />
            </g>

            {/* Mouth */}
            {renderMouth()}

            {/* Eyes Group with blink animation */}
            {renderEyes()}
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
