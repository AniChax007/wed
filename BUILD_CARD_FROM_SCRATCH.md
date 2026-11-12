# How to Build This Interactive Digital Wedding Card from Scratch

A complete, step-by-step developer guide to recreating this interactive Bengali wedding invitation web card from scratch using **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**.

---

## Table of Contents

1. [Architecture & Features Overview](#1-architecture--features-overview)
2. [Project Setup & Dependencies](#2-project-setup--dependencies)
3. [Typography & HTML Configuration (`index.html`)](#3-typography--html-configuration-indexhtml)
4. [Vite & Tailwind CSS v4 Configuration](#4-vite--tailwind-css-v4-configuration)
5. [Global CSS Design System & Micro-Animations (`src/index.css`)](#5-global-css-design-system--micro-animations-srcindexcss)
6. [Central Data Store (`src/data.ts`)](#6-central-data-store-srcdatats)
7. [Asset Directory Structure (`public/`)](#7-asset-directory-structure-public)
8. [Core Components Breakdown](#8-core-components-breakdown)
   - [Envelope & Wax-Seal Unboxing (`Envelope.tsx`)](#81-envelope--wax-seal-unboxing-envelopetsx)
   - [Custom HTML5 Canvas Scratch Reveal (`ScratchReveal.tsx`)](#82-custom-html5-canvas-scratch-reveal-scratchrevealtsx)
   - [Header & Ambient Video Hero (`Header.tsx`)](#83-header--ambient-video-hero-headertsx)
   - [Couple Portraits Gallery (`CouplePortrait.tsx`)](#84-couple-portraits-gallery-coupleportraittsx)
   - [Live Auspicious Countdown (`Countdown.tsx`)](#85-live-auspicious-countdown-countdowntsx)
   - [Ritual Blessing & Quotes (`ClaspedHands.tsx`)](#86-ritual-blessing--quotes-claspedhandstsx)
   - [Ceremony Schedule Timeline (`Timeline.tsx`)](#87-ceremony-schedule-timeline-timelinetsx)
   - [Venue Map & Direct Navigation (`LocationMap.tsx`)](#88-venue-map--direct-navigation-locationmaptsx)
   - [Ambient Audio Player (`AudioPlayer.tsx`)](#89-ambient-audio-player-audioplayertsx)
   - [Shared Visual Enhancers (Dividers, Garlands, Petals, Videos)](#810-shared-visual-enhancers)
   - [Closing Royal Footer (`Footer.tsx`)](#811-closing-royal-footer-footertsx)
9. [Main Application Orchestration (`App.tsx`)](#9-main-application-orchestration-apptsx)
10. [Running, Building, & Deploying](#10-running-building--deploying)

---

## 1. Architecture & Features Overview

This digital card is engineered with a mobile-first, high-luxury aesthetic featuring traditional Bengali wedding motifs:

- **Interactive Royal Envelope**: Guests receive an envelope with gold filigree corner ornaments and a wax seal monogram. Clicking it triggers an unfolding animation, plays background music, and reveals the card.
- **HTML5 Canvas Scratch-to-Reveal Cards**: Guests scratch off custom velvet-textured cards (`Shubho Bibaho` & `Reception`) to reveal event dates, times, and venue badges. Includes automatic threshold detection (reveals completely past 35% scratched) and celebratory confetti.
- **Autoplay-Safe Audio Engine**: Handles browser autoplay restrictions by triggering playback during the user's initial tap on the wax seal. Includes a floating audio controller with a pulsing gold glow and vinyl spin animation.
- **Ambient Video Integration**: Seamless, looping, muted background videos with lazy-loading through `IntersectionObserver` to preserve battery life and performance.
- **Live Auspicious Countdown**: Real-time counter calculating Days, Hours, Minutes, and Seconds until the ceremony.
- **Maps & Direct Action Links**: Responsive Google Maps iframes with direct Google Maps directions links.

---

## 2. Project Setup & Dependencies

### Step 2.1 — Create the Vite React TypeScript Project

```bash
npm create vite@latest wedding-card -- --template react-ts
cd wedding-card
```

### Step 2.2 — Install Production & Dev Dependencies

Install the necessary libraries:
- **`framer-motion`**: For physics-based spring animations, envelope unfoldings, and scroll reveals.
- **`lucide-react`**: For sleek vector UI icons (Volume, Navigation, Heart, Sparkles, etc.).
- **`@tailwindcss/vite` & `tailwindcss` (v4)**: Modern high-performance styling engine.

```bash
npm install framer-motion lucide-react
npm install -D @tailwindcss/vite tailwindcss
```

---

## 3. Typography & HTML Configuration (`index.html`)

Add Google Fonts in `index.html` to load the Bengali serif, display, script, and ceremonial fonts:
- **`Elsie` & `Elsie Swash Caps`**: Luxury editorial serif with swashes.
- **`Great Vibes`**: Calligraphic cursive for couple names.
- **`Cormorant Garamond`**: Classic high-end editorial body text.
- **`Tiro Bangla`**: Elegant traditional Bengali typography.

Replace `index.html` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>শুভ বিবাহ — Susmita &amp; Animesh</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Elsie:wght@400;900&family=Elsie+Swash+Caps:wght@400;900&family=Great+Vibes&family=Cormorant+Garamond:wght@400;500;600;700&family=Tiro+Bangla&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 4. Vite & Tailwind CSS v4 Configuration

### `vite.config.ts`

Set up Tailwind v4 via the official Vite plugin:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

## 5. Global CSS Design System & Micro-Animations (`src/index.css`)

Create `src/index.css` with the royal Bengali wedding theme tokens, custom animations, and utilities:

```css
@import 'tailwindcss';

@theme {
  /* ── Bengali Wedding Color Palette ── */
  --color-cream: #fef9f0;
  --color-cream-warm: #fdf3e2;
  --color-ivory: #fffcf5;
  --color-blush: #fcd5d8;
  --color-blush-deep: #f2a3ae;
  --color-rose: #e88d9a;
  --color-gold: #d4a12a;
  --color-gold-light: #f0d06e;
  --color-gold-dark: #a67c10;
  --color-gold-bright: #ffd700;
  --color-ink: #4a1528;
  --color-maroon: #7a1e34;
  --color-maroon-deep: #5c0e24;
  --color-vermilion: #dc3530;
  --color-vermilion-bright: #f04040;
  --color-ruby: #9b111e;
  --color-saffron: #ff9933;
  --color-emerald: #2d8a5e;

  /* ── Typography Tokens ── */
  --font-elsie: 'Elsie', serif;
  --font-elsie-swash: 'Elsie Swash Caps', serif;
  --font-script: 'Great Vibes', cursive;
  --font-serif: 'Cormorant Garamond', serif;
  --font-bangla: 'Tiro Bangla', serif;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--color-cream);
  font-family: var(--font-elsie);
  color: var(--color-ink);
}

/* ── Micro-Animations ── */
@keyframes float-gif {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-6px) rotate(1.5deg); }
  50% { transform: translateY(-12px) rotate(0deg); }
  75% { transform: translateY(-6px) rotate(-1.5deg); }
}

@keyframes diya-flicker {
  0%, 100% { opacity: 1; filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.8)); transform: scale(1); }
  33% { opacity: 0.82; filter: drop-shadow(0 0 18px rgba(255, 153, 51, 0.9)); transform: scale(1.05); }
  66% { opacity: 0.95; filter: drop-shadow(0 0 12px rgba(240, 64, 64, 0.85)); transform: scale(0.98); }
}

@keyframes petal-fall {
  from { transform: translateY(-10vh) rotate(0deg); }
  to { transform: translateY(110vh) rotate(200deg); }
}

@keyframes petal-sway {
  from { margin-left: -18px; }
  to { margin-left: 18px; }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.gold-shimmer {
  background: linear-gradient(
    90deg,
    var(--color-gold-dark) 0%,
    var(--color-gold) 20%,
    var(--color-gold-bright) 40%,
    #fff8dc 50%,
    var(--color-gold-bright) 60%,
    var(--color-gold) 80%,
    var(--color-gold-dark) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3.5s ease-in-out infinite;
}

.petal {
  position: absolute;
  top: 0;
  animation-name: petal-fall, petal-sway;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-direction: normal, alternate;
}

.confetti-piece {
  position: absolute;
  top: 0;
  animation-name: petal-fall, petal-sway;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-direction: normal, alternate;
}

.sindoor-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  background: radial-gradient(circle, var(--color-vermilion-bright), var(--color-vermilion));
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(240, 64, 64, 0.5), 0 0 12px rgba(220, 53, 48, 0.25);
}

.royal-border {
  border: 1px solid var(--color-gold-light);
  box-shadow:
    0 0 0 1px rgba(212, 161, 42, 0.12),
    0 4px 24px -4px rgba(212, 161, 42, 0.18),
    inset 0 1px 0 rgba(255, 253, 240, 0.4);
}
```

---

## 6. Central Data Store (`src/data.ts`)

Keep all customizable wedding content in one configuration file:

```ts
export const ENVELOPE_OPEN_MS = 2200

export const couple = {
  brideName: 'Susmita',
  brideBangla: 'সুস্মিতা',
  groomName: 'Animesh',
  groomBangla: 'অনিমেষ',
  initials: 'S & A',
  dateBanner: '13.12.26',
  blessing: '॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥',
  quote: 'Two Souls, One Destiny, A Lifetime Written in the Stars.',
}

export const weddingDateTime = '2026-12-13T12:00:00+05:30'

export const venue = {
  marriageName: 'Abhinaba Marriage Hall',
  marriageAddress: 'Nari More, Kalna Link Road, Burdwan',
  receptionName: 'Maity Palace',
  receptionAddress: 'JP38+X23, Daspur, West Bengal 721211',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Abhinaba+Marriage+Hall+Nari+More+Kalna+Link+Road+Burdwan&output=embed',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Abhinaba+Marriage+Hall+Nari+More+Kalna+Link+Road+Burdwan',
  receptionMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=JP38%2BX23%2C+Daspur%2C+West+Bengal+721211',
  receptionMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1046.0569536007747!2d87.71490330275164!3d22.60524978994635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f809f13b36714b%3A0x2aeaa1a0868c7ca2!2sBanquet!5e0!3m2!1sen!2sin!4v1787716698147!5m2!1sen!2sin',
  contact: '9007742744 / 7003384848',
}

export const scratchEvents = [
  {
    id: 'wedding',
    title: 'Shubho Bibaho',
    bangla: 'শুভ বিবাহ',
    date: '13th December',
    time: 'Evening',
    location: 'Abhinaba Marriage Hall',
    badge: '13 DEC • WEDDING',
    icon: '🌺',
    color: '#dc2626',
  },
  {
    id: 'reception',
    title: 'Preetibhoj & Reception',
    bangla: 'প্রীতিভোজ ও বৌভাত',
    date: '15th December',
    time: '7:00 PM Onwards',
    location: 'Maity Palace, Daspur (PIN 721211)',
    badge: '15 DEC • RECEPTION',
    icon: '🎉',
    color: '#9333ea',
  },
]

export const timeline = [
  { time: '7:00 PM', title: 'Reception', subtitle: '15th Dec · Maity Palace, Daspur' },
]

export const guidelines = {
  dressCode:
    'We kindly ask guests to avoid deep red and maroon attire, as these shades are reserved for the bride.',
  gift: 'Your blessings mean more to us than gifts. Kindly, no boxed gifts please.',
}
```

---

## 7. Asset Directory Structure (`public/`)

Create the following files and folders under `public/`:

```
public/
├── audio/
│   └── wedding-song.mp3           # Ambient shehnai / instrumental wedding melody
├── images/
│   ├── ganesh.jpg                 # Auspicious golden Lord Ganesha header crest
│   ├── shubho_drishti_colorful.jpg # Vibrant Shubho Drishti ritual painting
│   ├── bengali_couple_vibrant.jpg # Royal Bengali bride & groom mandap art
│   ├── kanya_sampradan_hands.jpg  # Clasped hands holy fire ritual illustration
│   ├── banana-tree.png            # Traditional ceremonial decorative motif
│   ├── garland-strip.png          # Marigold garland decorative border
│   ├── pexels-floral-mandap.jpeg  # Video poster placeholder
│   ├── pexels-marigold-arrangement.jpeg
│   ├── reception-dinner.png       # Keepsake illustration for Reception
│   ├── sindoor-ceremony.png       # Keepsake illustration for Wedding
│   ├── shoot1 (1).jpeg            # Couple portrait photo 1
│   ├── shoot1 (2).jpeg            # Couple portrait photo 2
│   └── shoot22.jpeg               # Couple portrait photo 3
└── videos/
    ├── pexels-floral-arrangement.mp4
    ├── pexels-lotus-decor.mp4
    └── pexels-marigold-invitation.mp4
```

> **Tip:** You can replace audio with any royalty-free shehnai track or sitar song, and images with couple photographs.

---

## 8. Core Components Breakdown

### 8.1 Envelope & Wax-Seal Unboxing (`src/components/Envelope.tsx`)

The envelope uses Framer Motion 3D rotations (`rotateX`, `perspective`) to fold the top flap open, slide up the inner wedding card, and trigger the main content after `ENVELOPE_OPEN_MS`.

Key mechanics:
- **Wax Seal Stamp**: Features the couple's monogram (`S & A`) with a radial gold and deep ruby gradient.
- **Baroque Ornaments**: Scalable inline SVG scrollwork across all 4 corners.
- **Click Trigger**: Tapping the seal triggers `onOpen()`, which starts audio playback on the same user gesture.

```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { couple, ENVELOPE_OPEN_MS } from '../data'

const OPEN_S = ENVELOPE_OPEN_MS / 1000

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false)

  function handleClick() {
    if (opening) return
    setOpening(true)
    onOpen()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b0813] px-4">
      {/* ── Envelope Body ── */}
      <motion.div
        className="relative w-full max-w-sm rounded-2xl bg-[#5c0e24] p-8 shadow-2xl border-2 border-gold-light/40 text-center cursor-pointer select-none"
        whileHover={{ scale: opening ? 1 : 1.02 }}
        onClick={handleClick}
      >
        <p className="font-bangla text-xs text-gold-light/80">{couple.blessing}</p>
        <h2 className="mt-4 font-script text-4xl text-gold-bright">{couple.brideName} &amp; {couple.groomName}</h2>
        <p className="mt-1 font-bangla text-sm text-gold-light/90">শুভ বিবাহ আমন্ত্রণ</p>

        {/* Wax Seal Button */}
        <div className="my-8 flex justify-center">
          <motion.div
            className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold-bright bg-gradient-to-br from-[#dc2626] to-[#7f1d1d] shadow-lg text-gold-bright font-serif font-bold text-lg"
            animate={opening ? { scale: 0.8, opacity: 0 } : { scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {couple.initials}
          </motion.div>
        </div>

        <p className="font-serif text-xs uppercase tracking-widest text-gold-light/70 animate-pulse">
          Tap seal to open invitation
        </p>
      </motion.div>
    </div>
  )
}
```

---

### 8.2 Custom HTML5 Canvas Scratch Reveal (`src/components/ScratchReveal.tsx`)

This component provides a scratch-card experience with **zero external libraries**:

1. A `<canvas>` element draws a velvet maroon background with gold borders and a sparkle symbol.
2. When the user touches or drags over the canvas, coordinates are tracked via pointer/touch events.
3. Points are erased using:
   ```ts
   ctx.globalCompositeOperation = 'destination-out'
   ctx.arc(x, y, 22, 0, Math.PI * 2)
   ctx.fill()
   ```
4. `ctx.getImageData()` computes the percentage of pixels cleared (`alpha === 0`).
5. When cleared pixels exceed **35%**, `onComplete()` automatically reveals the entire card with a celebratory confetti particle burst.

```tsx
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scratchEvents } from '../data'
import { CheckCircle2 } from 'lucide-react'
import OrnamentalDivider from './OrnamentalDivider'

interface ScratchCardProps {
  width: number
  height: number
  coverColor?: string
  finishPercent?: number
  onComplete: () => void
}

function CustomScratchCard({
  width,
  height,
  coverColor = '#3f0c1b',
  finishPercent = 35,
  onComplete,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const isCompletedRef = useRef(false)

  const drawCover = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    ctx.save()
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = coverColor
    ctx.fillRect(0, 0, width, height)

    // Gold border
    ctx.strokeStyle = '#f0d06e'
    ctx.lineWidth = 2
    ctx.strokeRect(6, 6, width - 12, height - 12)

    // Scratch prompt
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 15px serif'
    ctx.textAlign = 'center'
    ctx.fillText('✨ Scratch Here ✨', width / 2, height / 2)
    ctx.restore()
  }, [width, height, coverColor])

  useEffect(() => {
    drawCover()
  }, [drawCover])

  const checkCompletion = useCallback(() => {
    if (isCompletedRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const imgData = ctx.getImageData(0, 0, width, height)
    const pixels = imgData.data
    let transparentCount = 0
    const totalPixels = pixels.length / 4

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) transparentCount++
    }

    const percent = (transparentCount / (totalPixels / 4)) * 100
    if (percent >= finishPercent) {
      isCompletedRef.current = true
      onComplete()
    }
  }, [width, height, finishPercent, onComplete])

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 22, 0, Math.PI * 2)
    ctx.fill()
    checkCompletion()
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 z-20 cursor-pointer touch-none"
      onMouseDown={() => (isDrawingRef.current = true)}
      onMouseUp={() => (isDrawingRef.current = false)}
      onMouseMove={(e) => isDrawingRef.current && scratch(e.clientX, e.clientY)}
      onTouchMove={(e) => {
        const touch = e.touches[0]
        scratch(touch.clientX, touch.clientY)
      }}
    />
  )
}
```

---

### 8.3 Header & Ambient Video Hero (`src/components/Header.tsx`)

Combines a muted looping marigold video background with the auspicious Bengali shloka, the couple's English & Bengali names, and a romantic quote.

```tsx
import { motion } from 'framer-motion'
import { couple } from '../data'
import AmbientVideo from './AmbientVideo'

export default function Header() {
  return (
    <section className="relative pb-12 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-40 w-full overflow-hidden">
        <AmbientVideo
          src="/videos/pexels-marigold-invitation.mp4"
          poster="/images/pexels-marigold-arrangement.jpeg"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fef9f0]" />
      </motion.div>

      <div className="mx-auto max-w-2xl px-6 pt-6">
        {/* Auspicious Lord Ganesha Motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto mb-4 flex justify-center"
        >
          <div className="relative">
            <div
              className="absolute inset-0 -m-2 rounded-full blur-md opacity-35 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, #ffd700 0%, #d4a12a 50%, transparent 75%)',
              }}
              aria-hidden="true"
            />
            <img
              src="/images/ganesh.jpg"
              alt="Lord Ganesha"
              className="relative h-20 w-20 sm:h-24 sm:w-24 object-contain rounded-full border border-gold-light/40 shadow-sm transition-transform duration-500 hover:scale-105"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
        </motion.div>

        <p className="font-bangla text-sm text-maroon/75">{couple.blessing}</p>
        <p className="mt-3 font-bangla text-lg text-vermilion">শুভ বিবাহ</p>

        <h1 className="font-script text-6xl text-maroon mt-4">
          <span>{couple.brideName}</span>
          <span className="mx-2 text-gold-dark">&amp;</span>
          <span>{couple.groomName}</span>
        </h1>
        <p className="mt-2 font-bangla text-lg text-ink/80">
          {couple.brideBangla} ও {couple.groomBangla}
        </p>

        <div className="mx-auto mt-5 inline-flex items-center gap-3 border-y border-maroon/20 py-2 font-serif text-xs uppercase tracking-widest text-maroon/80">
          <span>Sunday</span>
          <span className="text-gold-dark">✦</span>
          <time>13 December 2026</time>
        </div>

        <p className="mt-4 font-serif text-sm italic text-ink/65">{couple.quote}</p>
      </div>
    </section>
  )
}
```

---

### 8.4 Couple Portraits Gallery (`src/components/CouplePortrait.tsx`)

Renders a 2-column responsive photo grid with subtle zoom-on-hover effects:

```tsx
import { motion } from 'framer-motion'

const portraits = [
  {
    src: '/images/bengali_couple_vibrant.jpg',
    alt: 'Bengali Bride and Groom in Wedding Mandap',
    className: 'col-span-2 aspect-[4/3] sm:aspect-[16/9]',
    caption: 'শুভ বিবাহ • The Auspicious Union',
  },
  {
    src: '/images/romantic-couple.png',
    alt: 'Romantic Bengali Couple Portrait',
    className: 'aspect-[4/3]',
    caption: 'চিরন্তন প্রেম • Endless Love',
  },
  {
    src: '/images/couple-boat.png',
    alt: 'Animated Couple in Festive Mayurpankhi Boat',
    className: 'aspect-[4/3]',
    caption: 'একসাথে পথচলা • Journey Together',
  },
]

export default function CouplePortrait() {
  return (
    <section className="px-5 pb-12 pt-2 sm:px-6">
      <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:gap-4">
        {portraits.map((portrait, index) => (
          <motion.figure
            key={portrait.src}
            initial={{ opacity: 0, y: 22, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
            className={`group relative overflow-hidden rounded-2xl border-2 border-gold-light/60 shadow-lg bg-cream ${portrait.className}`}
          >
            <img
              src={portrait.src}
              alt={portrait.alt}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-cream/75 backdrop-blur-xs border border-gold-light/70 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">
              <span className="text-[11px] text-gold-dark">✦</span>
            </div>
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-serif">
              <span className="font-serif italic drop-shadow-md text-white/95 text-[11px] sm:text-xs">
                {portrait.caption}
              </span>
              <span className="text-gold-light text-xs opacity-75 group-hover:opacity-100">
                ♡
              </span>
            </div>
          </motion.figure>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex flex-col items-center justify-center"
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-light" />
          <p className="font-bangla text-lg font-bold text-maroon tracking-wide">
            একসাথে, আজীবন
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-light" />
        </div>
        <p className="font-serif italic text-xs text-ink/65 mt-1">
          Forever and Always, Hand in Hand
        </p>
      </motion.div>
    </section>
  )
}
```

---

### 8.5 Live Auspicious Countdown (`src/components/Countdown.tsx`)

Calculates remaining time till `weddingDateTime` and updates every 1,000ms:

```tsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { weddingDateTime } from '../data'
import OrnamentalDivider from './OrnamentalDivider'

function getRemaining() {
  const diff = Math.max(0, new Date(weddingDateTime).getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Countdown() {
  const [remaining, setRemaining] = useState(getRemaining)

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  const boxes = [
    { label: 'Days', value: remaining.days },
    { label: 'Hours', value: remaining.hours },
    { label: 'Minutes', value: remaining.minutes },
    { label: 'Seconds', value: remaining.seconds },
  ]

  return (
    <section className="relative px-6 py-12 text-center bg-[#fdf8f0]">
      <h2 className="font-script text-4xl text-maroon">Counting the Moments</h2>
      <OrnamentalDivider />
      <div className="mx-auto mt-6 flex max-w-sm justify-center gap-3">
        {boxes.map((b) => (
          <div key={b.label} className="flex-1 rounded-xl bg-white/80 p-3 shadow-md border border-gold-light/30">
            <span className="block font-serif text-3xl font-bold text-maroon">{b.value}</span>
            <span className="text-[10px] uppercase tracking-wider text-ink/60">{b.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

### 8.6 Ritual Blessing & Quotes (`src/components/ClaspedHands.tsx`)

Displays the sacred vow `"ধরিয়া রাখিও সোহাগে আদরে"` (*Hold on to love and affection forever*) inside a deep maroon card with floating sparkle icons.

```tsx
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

export default function ClaspedHands() {
  return (
    <section className="py-12 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-sm rounded-3xl p-6 bg-gradient-to-b from-[#5c0e24] to-[#3f0c1b] border-2 border-gold-light/40 shadow-xl text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold-bright mb-3">
          <Heart size={22} fill="#ffd700" />
        </div>
        <h3 className="font-bangla text-2xl text-gold-bright">"ধরিয়া রাখিও সোহাগে আদরে"</h3>
        <p className="font-serif italic text-gold-light/90 text-sm mt-1">Hold on to love and affection forever</p>
      </motion.div>
    </section>
  )
}
```

---

### 8.7 Ceremony Schedule Timeline (`src/components/Timeline.tsx`)

Displays the itinerary of wedding milestones connected by vertical gold lines.

```tsx
import { motion } from 'framer-motion'
import { timeline } from '../data'
import OrnamentalDivider from './OrnamentalDivider'

export default function Timeline() {
  return (
    <section className="py-12 px-6">
      <h2 className="text-center font-elsie-swash text-3xl text-maroon font-bold">Schedule of Events</h2>
      <OrnamentalDivider />
      <div className="mx-auto mt-8 max-w-md">
        {timeline.map((item) => (
          <div key={item.title} className="flex gap-4 pb-6">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full border-2 border-gold bg-[#fef9f0] flex items-center justify-center text-gold font-bold">
                ✦
              </div>
            </div>
            <div className="text-left">
              <span className="text-xs uppercase font-bold text-vermilion">{item.time}</span>
              <h4 className="font-serif text-lg font-bold text-maroon">{item.title}</h4>
              <p className="text-xs text-ink/70">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

### 8.8 Venue Map & Direct Navigation (`src/components/LocationMap.tsx`)

Embeds the Google Maps iframe and provides direct tap-to-navigate buttons for mobile guests:

```tsx
import { Navigation } from 'lucide-react'
import { venue } from '../data'
import OrnamentalDivider from './OrnamentalDivider'

export default function LocationMap() {
  return (
    <section className="px-6 py-12 text-center bg-[#fef9f0]">
      <h2 className="font-script text-4xl text-ink">Event Venues</h2>
      <OrnamentalDivider />

      <div className="mx-auto mt-6 max-w-md rounded-2xl p-5 border border-gold-light/40 bg-white/80 shadow-md text-left">
        <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-2 py-0.5 rounded-full">
          Reception Venue
        </span>
        <h3 className="font-serif text-xl font-bold text-maroon mt-2">{venue.receptionName}</h3>
        <p className="text-xs text-ink/70">{venue.receptionAddress}</p>

        <div className="mt-3 overflow-hidden rounded-xl border border-gold-light/30">
          <iframe
            title="Reception Venue Map"
            src={venue.receptionMapsEmbedUrl}
            width="100%"
            height="150"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>

        <a
          href={venue.receptionMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2 px-4 bg-gradient-to-r from-[#d4a12a] to-[#a67c10] text-cream font-serif font-bold text-xs shadow-sm hover:opacity-95"
        >
          <Navigation size={14} /> Open Location in Google Maps
        </a>
      </div>
    </section>
  )
}
```

---

### 8.9 Ambient Audio Player (`src/components/AudioPlayer.tsx`)

A floating fixed controller in the bottom-right corner that spins like a vinyl record while playing and pulses with a golden glow:

```tsx
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

export default function AudioPlayer({ isPlaying, onToggle }: { isPlaying: boolean; onToggle: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isPlaying && (
        <motion.span
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.5), transparent 70%)' }}
        />
      )}
      <motion.button
        type="button"
        onClick={onToggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-ink/85 text-cream shadow-lg backdrop-blur-sm"
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={isPlaying ? { duration: 6, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>
    </div>
  )
}
```

---

### 8.10 Shared Visual Enhancers

#### `OrnamentalDivider.tsx`
```tsx
import { motion } from 'framer-motion'

export default function OrnamentalDivider({ glyph = '❦' }: { glyph?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-light" />
      <span className="text-gold text-sm">{glyph}</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-light" />
    </div>
  )
}
```

#### `AmbientVideo.tsx`
Uses `IntersectionObserver` to only stream and play video when visible in the viewport:

```tsx
import { useEffect, useRef, useState } from 'react'

export default function AmbientVideo({ src, poster, className }: { src: string; poster: string; className: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: '100px' })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isVisible) void video.play().catch(() => {})
    else video.pause()
  }, [isVisible])

  return (
    <video ref={videoRef} src={src} poster={poster} preload="none" loop muted playsInline className={className} />
  )
}
```

#### `Petals.tsx`
Drops subtle animated flower petals (`🌸`, `🌺`, `🌼`) across the screen using the CSS keyframes defined in `index.css`.

---

### 8.11 Closing Royal Footer (`src/components/Footer.tsx`)

Deep maroon footer echoing the wax-seal initials with wedding date and couple names in shimmering gold.

```tsx
import { couple, venue, weddingDateTime } from '../data'

export default function Footer() {
  const weddingDate = new Date(weddingDateTime).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <footer className="relative py-14 text-center bg-[#3f0c1b] text-cream">
      <div className="mx-auto flex h-12 w-12 rotate-45 items-center justify-center border-2 border-gold-light/60">
        <span className="-rotate-45 font-serif text-xs font-bold text-gold-light">{couple.initials}</span>
      </div>
      <p className="mt-4 font-script text-4xl gold-shimmer">{couple.brideName} &amp; {couple.groomName}</p>
      <p className="mt-2 text-xs italic text-cream/80 max-w-xs mx-auto">{couple.quote}</p>
      <p className="mt-4 text-[11px] uppercase tracking-widest text-gold-light/70">
        {weddingDate} &middot; {venue.marriageName} &amp; {venue.receptionName}
      </p>
    </footer>
  )
}
```

---

## 9. Main Application Orchestration (`App.tsx`)

`App.tsx` ties together the initial envelope state, the audio playback reference, and the full wedding page reveal:

```tsx
import { useRef, useState } from 'react'
import Envelope from './components/Envelope'
import { ENVELOPE_OPEN_MS } from './data'
import AudioPlayer from './components/AudioPlayer'
import Header from './components/Header'
import Countdown from './components/Countdown'
import ScratchReveal from './components/ScratchReveal'
import ClaspedHands from './components/ClaspedHands'
import LocationMap from './components/LocationMap'
import Footer from './components/Footer'
import Petals from './components/Petals'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  function handleOpenEnvelope() {
    audioRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.log('Audio playback blocked:', err))
    setTimeout(() => setIsOpen(true), ENVELOPE_OPEN_MS)
  }

  function toggleAudio() {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div
      className="relative min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #fffcf5 0%, #fef9f0 30%, #fdf3e2 70%, #fef9f0 100%)',
      }}
    >
      <audio ref={audioRef} src="/audio/wedding-song.mp3" loop />

      {!isOpen ? (
        <Envelope onOpen={handleOpenEnvelope} />
      ) : (
        <>
          <Petals show={isOpen} />
          <Header />
          <Countdown />
          <ScratchReveal />
          <ClaspedHands />
          <LocationMap />
          <Footer />
          <AudioPlayer isPlaying={isPlaying} onToggle={toggleAudio} />
        </>
      )}
    </div>
  )
}
```

---

## 10. Running, Building, & Deploying

### Test Locally
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to experience the unboxing and scratch-off interactions.

### Production Build
```bash
npm run build
```
This builds an optimized production bundle inside `dist/`.

### Deployment Options
1. **Vercel**: Run `npx vercel` or link your GitHub repo.
2. **Netlify**: Connect repository or run `netlify deploy --prod`.
3. **GitHub Pages**: Add `base: './'` in `vite.config.ts` and deploy `dist/`.
