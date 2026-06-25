# 📝 Product Requirement Document (PRD)

## Project Name: Mochiupiu Sanctuary

**Author:** Hiro
**Target Platform:** Mobile-First Web Application
**Tech Stack:** Next.js (App Router), Tailwind CSS, Framer Motion, Cloudinary (Media Hosting)

---

## 1. 🎯 Project Overview & Goals

*Mochiupiu Sanctuary* adalah sebuah platform web interaktif personal yang dirancang khusus sebagai ruang pelarian mini (*healing space*) untuk meredakan stres (*anti-burnout*). Fokus utama proyek ini adalah menyajikan interaksi mikro yang menggemaskan melalui karakter Mochi berbasis SVG, serta galeri memori video yang ringan dan cepat diakses melalui perangkat *mobile*.

---

## 2. 👥 User Persona & Core Experience

- **User:** Tetangga terdekat yang sedang mengalami kelelahan mental/fisik akibat aktivitas harian.
- **Core Experience:**
  - Mendapatkan kepuasan instan (*instant dopamine loop*) melalui interaksi taktil dengan Mochi.
  - Merasa rileks dengan fitur pemandu napas dan suara latar (*ambient sound*).
  - Bernostalgia secara nyaman lewat potongan video pendek kenangan tanpa hambatan *buffering*.

---

## 3. 🛠️ Functional Requirements (Features & Scope)

### Tab 1: Sanctuary Room (Home Screen)

- **Interactive SVG Mochi:**
  - Karakter Mochi harus merespons sentuhan (*Tap/Click*) dengan animasi memantul kenyal (*Squash & Stretch*).
  - Memiliki sistem ekspresi (*State Expression*) yang berubah dari `idle` ke `happy` saat menerima interaksi, dan kembali ke `idle` otomatis setelah 2 detik.
  - Memiliki animasi bernapas (*breathing*) dan kedip mata (*blinking*) otomatis saat status `idle`.

- **Stress Relief Tools:**
  - **Breathing Guide:** Tombol panduan latihan pernapasan 1 menit menggunakan animasi lingkaran/Mochi yang membesar-mengecil (*Inhale, Hold, Exhale*).
  - **Ambient Soundboard:** Tombol pemicu suara latar penenang (contoh: *Lo-Fi Rain*) dengan fungsi *Play/Pause*.

### Tab 2: For Mochiupiu (Special Message)

- **Encouragement Generator:**
  - Menampilkan antarmuka berbentuk amplop surat atau kartu polaroid estetik.
  - Ketika diklik, memicu animasi *flip/open* dan menampilkan satu kalimat penyemangat acak dari kumpulan data teks (*array of quotes*) lokal.

### Tab 3: Memories (Video Gallery)

- **Video Grid Layout:** Menyajikan 3–4 video kenangan berdurasi pendek (15–30 detik) dalam bentuk grid vertikal yang nyaman di-scroll via jempol.
- **Cloudinary Proxy Link:** Semua video dipanggil dari URL Cloudinary dengan tambahan transformasi parameter `f_auto,q_auto` untuk kompresi otomatis berbasis gawai pengguna.

---

## 4. 🎛️ Technical Specifications & Optimization

### Media & Privacy Specification

- **Hosting Video:** Cloudinary (Free Tier).
- **Privacy Layer:** File video wajib menggunakan nama acak (*obfuscated*) saat di-upload. Halaman web dilarang diindeks oleh mesin pencari melalui tag HTML:

```html
<meta name="robots" content="noindex, nofollow" />
```

- **Performance Rule:** Setiap tag `<video>` wajib menggunakan atribut `preload="none"` dan `playsInline` untuk mencegah pengunduhan otomatis sebelum video diputar, guna menghemat kuota dan memori HP.

### UI Specs (Neo-Brutalism Light)

- **Border Thickness:** `1.5px solid #4A4A4A` untuk semua komponen utama.
- **Taktil Shadow:** `box-shadow: 4px 4px 0px 0px #4A4A4A;`
- **Typography Hierarchy:** `Fredoka` untuk Heading/Tombol, `Plus Jakarta Sans` untuk teks deskripsi/surat.

---

## 5. 🗺️ Application Flow (User Journey)

```text
[ User Opens Web URL ]
          │
          ▼
┌────────────────────────────────────────┐
│  Default Page: Tab 1 (Sanctuary)       │
│  - Mochi blinks & breathes (Idle)      │
│  - User taps Mochi -> Animates Happy   │
└──────────────────┬─────────────────────┘
                   │
         [ Bottom Navbar Navigation ]
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
┌──────────────────┐ ┌──────────────────┐
│ Tab 2: For Mochi │ │ Tab 3: Memories  │
│ - Tap Letter     │ │ - View Grid      │
│ - Show Quote     │ │ - Tap Play Video │
└──────────────────┘ └──────────────────┘
```

---

## 6. 🚀 Future Roadmap & Gimmick Expansion

- **Phase 2 (Optional):** Mengintegrasikan API WhatsApp pada tab khusus untuk fitur *gimmick* "Mochi's Delivery" — memesan bantuan riil seperti "Kopi Susu Gratis" atau "Ditemani Ngobrol" yang langsung mengirim teks otomatis ke WhatsApp Creator.
