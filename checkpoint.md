# 📋 Checkpoint — mochiupiuu Project

> Last updated: 2026-06-26

---

## 🏗️ Tech Stack

- **Framework:** Next.js 16.2.9 (Turbopack, App Router)
- **UI:** React 19 + TailwindCSS v4 + Framer Motion v12
- **Fonts:** Fredoka One, Inter (via Google Fonts)
- **Video Hosting:** Cloudinary
- **Language:** TypeScript

---

## 📁 File Structure (Key Files)

```
app/
  page.tsx          → Root page: tab management, splash screen, isGameActive state
  layout.tsx        → HTML layout, font imports
  globals.css       → Global CSS, custom font tokens

components/
  Sanctuary.tsx     → Tab 2 (tengah): Mochi sanctuary, idle/sleep mode, clickable Mochi
  ForMochi.tsx      → Tab 1 (kiri): Game Center hub + game screen slide-in wrapper
  AslabSimulator.tsx→ Mini-game: swipe kartu laprak (ACC/REVISI)
  Memories.tsx      → Tab 3 (kanan): Video memory player dengan modal via React Portal
  BottomNav.tsx     → Bottom navigation bar (3 tab)
  MochiSVG.tsx      → Animasi Mochi dengan ekspresi: idle, happy, sad, sleepy

data/
  memories.json     → Daftar video kenangan (Cloudinary URLs + startOffset)

public/
  meja.webp         → Tekstur meja kayu 2D vektor (background game Aslab Simulator)
```

---

## ✅ Fitur yang Sudah Selesai

### 1. 🏠 Sanctuary (Tab Utama / Tengah)

- Mochi duduk di tengah layar dengan animasi idle (floating, breathing)
- Tap Mochi → ekspresi berubah, Mochi bounce
- Sleep Mode → Mochi "ketiduran" dengan efek ZZZ
- Background ilustrasi kamar kos bergaya anime (pixel/vektor)
- Progress bar kebahagiaan
- Konten dekoratif (rak buku, kasur, dll.)

### 2. 🎮 Game Center (Tab Kiri)

- Halaman hub dengan daftar game kartu
- Game aktif: **Aslab Simulator**
- Coming soon: **Coffee Break**, **Mochi Memory Match**
- Slide-in animasi saat masuk game

### 3. 📋 Aslab Simulator (Mini-Game)

- **Background:** Tekstur meja kayu (`meja.webp`) — full-screen
- **Mekanisme:** Swipe kiri (Revisi) / swipe kanan (ACC) pada kartu laprak HVS
- **Kartu tersedia (7 kartu):**

  | #   | Nama    | NIM  | Matkul             | Jawaban                                |
  | --- | ------- | ---- | ------------------ | -------------------------------------- |
  | 1   | Hiro    | 2073 | Sains Data         | ACC                                    |
  | 2   | Indah   | 1007 | Penambangan Data   | REVISI (plagiat)                       |
  | 3   | Buk Eva | 3172 | Jaringan Komputer  | REVISI (no halaman)                    |
  | 4   | Siti    | 3129 | Jaringan Komputer  | REVISI (nama italic)                   |
  | 5   | Mas N   | 2103 | Pemrograman Mobile | ACC (easter egg 🍫)                    |
  | 6   | Jelita  | 2049 | Sains Data         | REVISI (lembar pengesahan dibawa Aldi) |
  | 7   | Tanzil  | 1008 | Pengolahan Citra   | REVISI (koding flutter salah matkul)   |

- **Kartu visual:** Tumpukan kertas HVS putih tanpa rounded, dengan decorative sheets
- **Mochi:** Pojok kanan bawah, ukuran besar (w-48 h-48), style "peeking sticker"
- **Bubble chat:** Muncul di atas Mochi hanya saat swipe (auto-hide setelah 1.4 detik), berisi reaksi Mochi yang kontekstual
- **Happiness Bar:** Progress bar kuning horizontal di pojok kiri bawah
- **Score logic:**
  - Jawaban benar → +15 happiness, mochi ekspresi happy, floating hearts
  - Jawaban salah → -10 happiness, mochi ekspresi sad
  - Score ≥ 100 → Victory screen (Mochi bisa pulang ke kos!)
  - Score ≤ 0 → Game over screen

- **Sertifikat Victory:** Card dengan icon SVG medali kustom (bukan emoji), tulisan "Aslab Terbaik!"
- **Navbar Hiding:** Saat game aktif, bottom navbar tersembunyi sepenuhnya (via `isGameActive` state di page.tsx)

### 4. 🎬 Memories (Tab Kanan)

- Grid video kenangan yang bisa diputar
- Tap video → modal player muncul (full-screen dimmed overlay)
- Modal di-render via **React Portal** (`document.body`) untuk menghindari bug scroll/transform
- Support `startOffset` untuk mulai dari detik tertentu
- Video di-host di Cloudinary

### 5. 🧭 Bottom Navigation

- 3 tab: Game, Mochi (Sanctuary), Memori
- **Otomatis tersembunyi** saat Aslab Simulator aktif
- Muncul kembali saat keluar dari game

---

## 🐛 Bug yang Sudah Diperbaiki

| Bug                                                 | Solusi                                                            |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| Video player modal ikut scroll dan nyangkut di atas | Refactor pakai React Portal ke`document.body`                     |
| Bottom navbar menutupi game                         | `isGameActive` state + conditional render BottomNav               |
| `AnimatePresence` duplicate key error               | Tambahkan key unik:`top-${id}-${index}` dan `next-${id}-${index}` |
| `nextCard` / `topCard` undefined (build error)      | Tambahkan deklarasi variabel di body komponen AslabSimulator      |
| JSX syntax error (closing tags terpotong)           | Perbaikan manual per-baris                                        |

---

## 🔜 Belum Dibuat / Potensial Next Steps

- [ ] **Coffee Break** game (coming soon)
- [ ] **Mochi Memory Match** game (coming soon)
- [ ] Tambah lebih banyak video di `memories.json`
- [ ] Sound effects (pen-on-paper, café ambient)
- [ ] Animasi transisi keluar dari game yang lebih halus
- [ ] Persistensi score (localStorage / session)
