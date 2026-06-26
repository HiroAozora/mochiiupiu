"use client";

import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  animate,
} from "framer-motion";
import MochiSVG from "./MochiSVG";

interface LaprakCard {
  id: number;
  studentName: string;
  nim: string;
  matkul: string;
  details: string;
  correctAction: "ACC" | "REVISI";
  mochiReaction: string;
  isEasterEgg?: boolean;
}

type MochiExpression = "idle" | "happy" | "sad" | "sleepy";

// Detail status & reaksi disesuaikan PERSIS dengan tabel di mochi-game.md
const LAPRAK_CARDS: LaprakCard[] = [
  {
    id: 1,
    studentName: "Hiro",
    nim: "2073",
    matkul: "Sains Data",
    details: "Kodingan berjalan lancar, analisa lengkap, TTD aslab lengkap.",
    correctAction: "ACC",
    mochiReaction: "Mantapp",
  },
  {
    id: 2,
    studentName: "Indah",
    nim: "1007",
    matkul: "Penambangan Data",
    details: "Kode program sama persis 100% dengan milik temannya (Plagiat).",
    correctAction: "REVISI",
    mochiReaction: "Mochi gasuka copas",
  },
  {
    id: 3,
    studentName: "Buk Eva",
    nim: "3172",
    matkul: "Jaringan Komputer",
    details: "Laporan sangat tebal (45 halaman), tapi halamannya ga ada",
    correctAction: "REVISI",
    mochiReaction: "Kasih halaman lapraknya ya buk",
  },
  {
    id: 4,
    studentName: "Siti",
    nim: "3129",
    matkul: "Jaringan Komputer",
    details: "Nama Bg Jo dibikin italic",
    correctAction: "REVISI",
    mochiReaction: "Bg Jo kan bukan orang asing sitii",
  },
  {
    id: 5,
    studentName: "Mas N",
    nim: "2103",
    matkul: "Pemrograman Mobile",
    details: "Laporan Lengkap, mas n kasih coklat",
    correctAction: "ACC",
    mochiReaction: "Mochi sayang Mas N",
    isEasterEgg: true,
  },
  {
    id: 6,
    studentName: "Jelita",
    nim: "2049",
    matkul: "Sains Data",
    details: "Lembar pengesahan lapraknya dibawa aldi",
    correctAction: "REVISI",
    mochiReaction: "Mochi gabisa tanda tangan heh",
  },
  {
    id: 7,
    studentName: "Tanzil",
    nim: "1008",
    matkul: "Pengolahan Citra",
    details: "Lapraknya matkul pengolahan citra, tapi kodingannya flutter",
    correctAction: "REVISI",
    mochiReaction: "Kayaknya Tanzil salah dokumen deh",
  },
];

const SWIPE_THRESHOLD = 80;

function FloatingHearts({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div
      className="absolute pointer-events-none z-30"
      style={{
        left: "50%",
        bottom: "80%",
        width: "100px",
        height: "150px",
        transform: "translateX(-50%)",
      }}
    >
      {["🧡", "💛", "🧡", "💖", "✨"].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-xl select-none"
          style={{ left: `${10 + i * 20}px` }}
          initial={{ opacity: 1, y: 0, scale: 0.5 }}
          animate={{ opacity: 0, y: -100, scale: 1.2 }}
          transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}

// Love aura — soft golden shimmer glow around the card area
function LoveAuraBurst({ show }: { show: boolean }) {
  if (!show) return null;

  // Sparkle positions around card edges
  const sparkles = [
    { x: "8%", y: "15%", delay: 0, size: 18 },
    { x: "88%", y: "12%", delay: 0.15, size: 16 },
    { x: "5%", y: "75%", delay: 0.25, size: 14 },
    { x: "92%", y: "70%", delay: 0.1, size: 17 },
    { x: "50%", y: "5%", delay: 0.2, size: 15 },
    { x: "45%", y: "90%", delay: 0.3, size: 16 },
    { x: "15%", y: "45%", delay: 0.08, size: 13 },
    { x: "85%", y: "42%", delay: 0.18, size: 14 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
      {/* Warm golden border glow around card — intensified */}
      <motion.div
        className="absolute inset-[-12px] rounded-lg"
        style={{
          boxShadow:
            "0 0 60px 15px rgba(255,183,71,0.55), 0 0 120px 40px rgba(255,160,50,0.25), 0 0 180px 60px rgba(255,126,83,0.12), inset 0 0 40px 10px rgba(255,183,71,0.15)",
          background: "rgba(255,200,100,0.06)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.75, 1, 0.6, 0] }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      {/* Sparkle twinkles at card edges */}
      {sparkles.map((s, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute select-none"
          style={{ left: s.x, top: s.y, fontSize: s.size }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0.8, 1, 0],
            scale: [0, 1.2, 0.9, 1.1, 0],
            rotate: [0, 15, -10, 5, 0],
          }}
          transition={{ duration: 2, delay: s.delay, ease: "easeInOut" }}
        >
          ✨
        </motion.div>
      ))}

      {/* Couple of floating hearts (very subtle) */}
      {["💖", "🩷", "💖"].map((h, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute select-none"
          style={{
            left: `${25 + i * 25}%`,
            top: "50%",
            fontSize: 14,
          }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{
            opacity: [0, 0.8, 0.6, 0],
            scale: [0, 1, 0.9, 0.5],
            y: [0, -50, -90, -130],
          }}
          transition={{ duration: 2.2, delay: 0.3 + i * 0.2, ease: "easeOut" }}
        >
          {h}
        </motion.div>
      ))}
    </div>
  );
}

// SVG Chocolate icon for easter egg card
function ChocolateIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wrapper/foil */}
      <rect x="4" y="8" width="24" height="18" rx="3" fill="#8B5E3C" />
      <rect
        x="4"
        y="8"
        width="24"
        height="18"
        rx="3"
        stroke="#6B3F1F"
        strokeWidth="1.5"
      />
      {/* Chocolate squares */}
      <line x1="12" y1="8" x2="12" y2="26" stroke="#6B3F1F" strokeWidth="1" />
      <line x1="20" y1="8" x2="20" y2="26" stroke="#6B3F1F" strokeWidth="1" />
      <line x1="4" y1="17" x2="28" y2="17" stroke="#6B3F1F" strokeWidth="1" />
      {/* Shine */}
      <rect
        x="6"
        y="10"
        width="4"
        height="5"
        rx="1"
        fill="#A0714F"
        opacity="0.5"
      />
      {/* Ribbon */}
      <rect x="2" y="14" width="28" height="5" rx="2" fill="#D4395B" />
      <rect x="13" y="6" width="6" height="22" rx="2" fill="#D4395B" />
      {/* Bow */}
      <ellipse cx="16" cy="7" rx="4" ry="2.5" fill="#E85D7A" />
      <circle cx="16" cy="7" r="1.5" fill="#D4395B" />
    </svg>
  );
}

function HappinessBar({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, score));
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-fredoka font-bold text-[#5E4E46]/70">
          Kebahagiaan Mochi
        </span>
        <span className="text-[10px] font-fredoka font-bold text-[#FF7E53]">
          {clamped}%
        </span>
      </div>
      <div className="w-full h-3 bg-[#FFDFC6]/50 rounded-full overflow-hidden border border-[#FFDFC6]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#FF7E53] to-[#FFB347]"
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function SwipeCard({
  card,
  onSwipe,
  isTop,
}: {
  card: LaprakCard;
  onSwipe: (action: "ACC" | "REVISI") => void;
  isTop: boolean;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-18, 0, 18]);
  const accOpacity = useTransform(x, [20, 100], [0, 1]);
  const revisiOpacity = useTransform(x, [-100, -20], [1, 0]);

  if (!isTop) {
    return (
      <div className="absolute inset-0 bg-white border border-[#CBD5E1] rounded-none shadow-sm rotate-[1.5deg] translate-y-0.5 translate-x-0.5 scale-[0.99] origin-center opacity-95" />
    );
  }

  const handleDragEnd = () => {
    const currentX = x.get();
    if (currentX > SWIPE_THRESHOLD) {
      animate(x, 500, { duration: 0.2 }).then(() => {
        onSwipe("ACC");
      });
    } else if (currentX < -SWIPE_THRESHOLD) {
      animate(x, -500, { duration: 0.2 }).then(() => {
        onSwipe("REVISI");
      });
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.02 }}
    >
      <motion.div
        className="absolute top-6 right-4 bg-green-500 text-white font-fredoka font-black text-xl px-4 py-1 rounded-2xl rotate-12 border-2 border-white z-20"
        style={{ opacity: accOpacity }}
      >
        ACC ✓
      </motion.div>
      <motion.div
        className="absolute top-6 left-4 bg-red-500 text-white font-fredoka font-black text-xl px-4 py-1 rounded-2xl -rotate-12 border-2 border-white z-20"
        style={{ opacity: revisiOpacity }}
      >
        REVISI ✗
      </motion.div>

      {/* Pure White HVS Paper Sheet Layout (Sharp corners) */}
      <div className="w-full h-full paper-sheet rounded-none p-6 flex flex-col justify-between select-none overflow-hidden">
        {/* Paper content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-fredoka font-bold text-[#5E4E46] text-2xl">
                  {card.studentName}
                </span>
                <span className="text-sm text-[#5E4E46]/60 font-sans">
                  · NIM. {card.nim}
                </span>
              </div>
              <span className="inline-block bg-[#FFEFE6] text-[#FF7E53] text-xs font-fredoka font-bold px-3 py-1 rounded-full">
                {card.matkul}
              </span>
            </div>
          </div>
          <div className="bg-[#FFF9F6]/80 border border-[#FFDFC6]/40 rounded-2xl p-4 mt-3">
            <p className="font-sans text-sm text-[#5E4E46]/80 leading-relaxed font-bold">
              {card.details}
            </p>
          </div>
        </div>

        {/* Paper footer */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#FFDFC6]/40 relative z-10">
          <div className="flex items-center gap-1">
            <span className="text-red-400 text-sm">←</span>
            <span className="font-fredoka text-sm text-[#5E4E46]/60 font-bold">
              Revisi
            </span>
          </div>
          <span className="font-fredoka text-xs text-[#5E4E46]/40 font-semibold">
            geser untuk memutuskan
          </span>
          <div className="flex items-center gap-1">
            <span className="font-fredoka text-sm text-[#5E4E46]/60 font-bold">
              ACC
            </span>
            <span className="text-green-500 text-sm">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AslabSimulator({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<"playing" | "victory" | "gameover">(
    "playing",
  );
  const [cards, setCards] = useState(
    [...LAPRAK_CARDS].sort(() => Math.random() - 0.5),
  );
  const [cardIndex, setCardIndex] = useState(0);
  const [score, setScore] = useState(30);
  const [expression, setExpression] = useState<MochiExpression>("idle");
  const [lastReaction, setLastReaction] = useState(
    "Ayo bantu aku periksa laprak mahasiswaku! 📝",
  );
  const [showHearts, setShowHearts] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showLoveAura, setShowLoveAura] = useState(false);
  const [isEasterEggBubble, setIsEasterEggBubble] = useState(false);

  const topCard = cards[cardIndex];
  const nextCard = cards[cardIndex + 1];

  function handleSwipe(action: "ACC" | "REVISI") {
    const card = cards[cardIndex];
    const correct = action === card.correctAction;

    if (correct) {
      const next = Math.min(100, score + 15);
      setScore(next);
      setExpression("happy");
      setShowHearts(true);
      setLastReaction(card.mochiReaction);
      setShowBubble(true);
      if (card.isEasterEgg) {
        setShowLoveAura(true);
        setIsEasterEggBubble(true);
        setTimeout(() => setShowLoveAura(false), 2000);
      } else {
        setIsEasterEggBubble(false);
      }
      setTimeout(() => setShowHearts(false), 1400);
      if (next >= 100) {
        setTimeout(() => setPhase("victory"), 1400);
        return;
      }
    } else {
      const next = Math.max(0, score - 10);
      setScore(next);
      setExpression("sad");
      setLastReaction("Eh salah! Coba lebih teliti ya... 😣");
      setShowBubble(true);
      setIsEasterEggBubble(false);
      if (next <= 0) {
        setTimeout(() => setPhase("gameover"), 1400);
        return;
      }
    }

    setTimeout(() => {
      setExpression("idle");
      setShowBubble(false);
      const next = cardIndex + 1;
      if (next >= cards.length) {
        setCards([...LAPRAK_CARDS].sort(() => Math.random() - 0.5));
        setCardIndex(0);
      } else {
        setCardIndex(next);
      }
    }, 1400);
  }

  function restart() {
    setPhase("playing");
    setCards([...LAPRAK_CARDS].sort(() => Math.random() - 0.5));
    setCardIndex(0);
    setScore(30);
    setExpression("idle");
    setLastReaction("Ayo bantu aku periksa laprak mahasiswaku! 📝");
    setShowBubble(false);
    setShowLoveAura(false);
    setIsEasterEggBubble(false);
  }

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden relative select-none"
      style={{
        backgroundImage: "url('/meja.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {phase === "victory" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full flex flex-col items-center justify-center p-6 gap-6 overflow-y-auto bg-black/30 backdrop-blur-xs z-10"
        >
          <div className="w-36 h-36">
            <MochiSVG expression="happy" hideShadow />
          </div>
          <div className="w-full max-w-sm bg-white border-4 border-[#FF7E53] rounded-3xl p-5 text-center shadow-xl">
            <div className="mb-2 flex justify-center">
              <svg
                className="w-16 h-16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ribbon tails */}
                <path
                  d="M8.5 14.5L6.5 22.5L12 19L17.5 22.5L15.5 14.5"
                  fill="#FFA885"
                  stroke="#FF7E53"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Ribbon center accent */}
                <path
                  d="M12 14.5L12 19"
                  stroke="#FF7E53"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Medal Circle */}
                <circle
                  cx="12"
                  cy="9.5"
                  r="5.5"
                  fill="#FFEFE6"
                  stroke="#FF7E53"
                  strokeWidth="2"
                />
                {/* Inner Star */}
                <path
                  d="M12 6.5L13.3 9.1L16.2 9.5L14.1 11.5L14.6 14.4L12 13L9.4 14.4L9.9 11.5L7.8 9.5L10.7 9.1L12 6.5Z"
                  fill="#FF7E53"
                />
              </svg>
            </div>
            <p className="font-sans text-[10px] font-bold text-[#FF7E53] uppercase tracking-widest">
              Sertifikat Resmi
            </p>
            <h2 className="font-fredoka font-bold text-[#5E4E46] text-xl mt-1">
              My Aslab {"<3"}
            </h2>
            <div className="bg-[#FFF9F6] rounded-2xl p-3 mt-3 border border-[#FFDFC6]">
              <p className="font-sans text-xs text-[#5E4E46]/70 leading-relaxed">
                Diberikan kepada{" "}
                <strong className="text-[#FF7E53]">Mochiupiuu</strong> karena
                uda ngaslab dan meriksa laprak. jadi.....
              </p>
              <p className="font-fredoka font-bold text-[#FF7E53] text-base mt-2">
                Mochi juga bisa pulang ke kos sekarang! 🧡
              </p>
              <p className="font-sans text-[10px] text-[#5E4E46]/40 mt-1 italic">
                Tertanda: Hiro
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full max-w-sm">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex-1 bg-white text-[#FF7E53] border-2 border-[#FFDFC6] py-3 rounded-full font-fredoka font-bold text-sm cursor-pointer shadow-md"
            >
              ← Kembali
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={restart}
              className="flex-1 bg-[#FF7E53] text-white py-3 rounded-full font-fredoka font-bold text-sm cursor-pointer shadow-md"
            >
              Main Lagi
            </motion.button>
          </div>
        </motion.div>
      )}

      {phase === "gameover" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-full flex flex-col items-center justify-center p-6 gap-6 bg-black/30 backdrop-blur-xs z-10"
        >
          <div className="w-36 h-36">
            <MochiSVG expression="sad" hideShadow />
          </div>
          <div className="text-center bg-white/95 border-2 border-red-300 rounded-3xl p-6 shadow-xl max-w-sm">
            <h2 className="font-fredoka font-bold text-[#5E4E46] text-2xl">
              Mochi Kelelahan...
            </h2>
            <p className="font-sans text-sm text-[#5E4E46]/60 mt-1">
              Banyak laprak yang salah dinilai nih 😥
            </p>
          </div>
          <div className="flex gap-3 w-full max-w-sm">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex-1 bg-white text-[#FF7E53] border-2 border-[#FFDFC6] py-3 rounded-full font-fredoka font-bold text-sm cursor-pointer shadow-md"
            >
              ← Kembali
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={restart}
              className="flex-1 bg-[#FF7E53] text-white py-3 rounded-full font-fredoka font-bold text-base cursor-pointer shadow-md"
            >
              Coba Lagi
            </motion.button>
          </div>
        </motion.div>
      )}

      {phase === "playing" && (
        <div className="w-full h-full flex flex-col overflow-hidden relative z-10">
          {/* Love Aura Burst (Easter Egg - covers entire screen) */}
          <AnimatePresence>
            {showLoveAura && <LoveAuraBurst show={showLoveAura} />}
          </AnimatePresence>

          {/* Top section with back button + instruction banner */}
          <div className="p-4 pb-0 z-30">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="self-start mb-3 bg-white/90 border border-slate-300 text-slate-700 px-4 py-2 rounded-full font-fredoka font-bold text-sm shadow-md flex items-center gap-1 cursor-pointer backdrop-blur-xs"
            >
              <span>←</span> <span>Game Center</span>
            </motion.button>

            {/* Instruction banner */}
            <div
              className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-md border border-[#FFDFC6]/50 text-center mx-auto"
              style={{ maxWidth: "75%" }}
            >
              <p className="font-fredoka font-bold text-[#5E4E46] text-sm">
                Bantuin Mochi meriksa laprak
              </p>
            </div>
          </div>

          {/* Card stack — shrunk slightly & shifted down to be closer to Mochi */}
          <div
            className="flex-1 relative mx-6 mt-3 mb-[-20px]"
            style={{ maxHeight: "55%" }}
          >
            {/* Bottom-most decorative HVS sheet */}
            <div
              key="decor-bottom"
              className="absolute inset-0 bg-white border border-[#CBD5E1] rounded-none shadow-sm rotate-[3.5deg] translate-y-2.5 translate-x-1.5 origin-center opacity-70"
            />

            {/* Middle decorative HVS sheet */}
            <div
              key="decor-middle"
              className="absolute inset-0 bg-white border border-[#CBD5E1] rounded-none shadow-sm -rotate-[2.5deg] translate-y-1 translate-x-[-2px] origin-center opacity-85"
            />

            <AnimatePresence>
              {nextCard && (
                <SwipeCard
                  key={`next-${nextCard.id}-${cardIndex}`}
                  card={nextCard}
                  onSwipe={() => {}}
                  isTop={false}
                />
              )}
              {topCard && (
                <SwipeCard
                  key={`top-${topCard.id}-${cardIndex}`}
                  card={topCard}
                  onSwipe={handleSwipe}
                  isTop={true}
                />
              )}
            </AnimatePresence>
          </div>

          {/* White-to-transparent gradient fade from bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0) 100%)",
            }}
          />

          {/* Bottom Interface Area — sits ABOVE the gradient */}
          <div className="relative z-40 mt-[-8px] select-none pointer-events-none px-4 pb-2">
            {/* Chat Bubble: Above Mochi */}
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className={`absolute bottom-[120px] right-[10px] rounded-2xl px-4 py-2 shadow-lg max-w-[200px] text-center pointer-events-auto z-50 border ${
                    isEasterEggBubble
                      ? "bg-pink-400 border-pink-500"
                      : "bg-white border-[#CBD5E1]"
                  }`}
                >
                  <div
                    className={`absolute bottom-[-6px] right-[65px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] z-10 ${
                      isEasterEggBubble ? "border-t-pink-400" : "border-t-white"
                    }`}
                  />
                  <div
                    className={`absolute bottom-[-7px] right-[65px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] ${
                      isEasterEggBubble
                        ? "border-t-pink-500"
                        : "border-t-[#CBD5E1]"
                    }`}
                  />
                  <p
                    className={`font-sans text-[11px] font-bold leading-snug ${
                      isEasterEggBubble ? "text-white" : "text-[#5E4E46]"
                    }`}
                  >
                    {lastReaction}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Row: Happiness Bar (left) + Mochi (right) — vertically aligned */}
            <div className="flex items-center justify-between">
              {/* Happiness Bar: solid white pill, clearly visible */}
              <div
                className="bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2.5 shadow-md border border-[#FFDFC6]/60 pointer-events-auto flex-shrink-0"
                style={{ width: "52%" }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-fredoka text-[10px] font-bold text-[#5E4E46]/70 uppercase tracking-wide">
                    Kebahagiaan Mochi
                  </span>
                  <span className="font-fredoka text-[11px] font-bold text-[#FF7E53]">
                    {score}%
                  </span>
                </div>
                <div className="w-full h-3 bg-[#FFDFC6]/50 rounded-full overflow-hidden border border-[#FFDFC6]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF7E53] to-[#FFB347]"
                    animate={{ width: `${Math.max(0, Math.min(100, score))}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Mochi: aligned to same row, overlapping card area above */}
              <div className="relative w-44 h-44 pointer-events-auto overflow-visible flex-shrink-0 mb-[-16px] mr-[-16px]">
                <MochiSVG expression={expression} />
                <FloatingHearts show={showHearts} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
