import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { couple, ENVELOPE_OPEN_MS } from '../data'

const OPEN_S = ENVELOPE_OPEN_MS / 1000

/* ── Baroque Corner Ornament SVG ──────────────────────────────────── */
function BaroqueCorner({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main scrollwork */}
      <path
        d="M10 190 C10 140, 20 100, 50 70 C65 52, 85 40, 110 35 C90 55, 80 75, 82 95 C84 110, 95 120, 110 118 C125 116, 130 100, 125 88 C120 78, 108 75, 100 80"
        stroke="url(#goldGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M15 185 C18 150, 30 115, 55 85 C68 70, 82 58, 100 50"
        stroke="url(#goldGrad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Outer curl */}
      <path
        d="M5 195 C5 130, 25 80, 65 50 C85 35, 115 25, 150 25 C130 40, 118 55, 115 72 C112 88, 120 100, 135 95"
        stroke="url(#goldGrad)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Inner flourish */}
      <path
        d="M25 175 C30 145, 45 115, 70 90 C82 78, 95 70, 108 68 C95 80, 90 92, 93 102 C96 112, 105 115, 112 110"
        stroke="url(#goldGrad)"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Leaf/acanthus details */}
      <path
        d="M50 70 C45 60, 55 48, 65 50 C72 52, 68 62, 60 65"
        stroke="url(#goldGrad)"
        strokeWidth="2"
        fill="url(#goldGradFill)"
        fillOpacity="0.3"
      />
      <path
        d="M110 35 C115 25, 130 22, 135 30 C138 36, 128 42, 118 38"
        stroke="url(#goldGrad)"
        strokeWidth="2"
        fill="url(#goldGradFill)"
        fillOpacity="0.3"
      />
      <path
        d="M150 25 C158 18, 170 20, 168 30 C166 38, 155 35, 152 28"
        stroke="url(#goldGrad)"
        strokeWidth="1.8"
        fill="url(#goldGradFill)"
        fillOpacity="0.25"
      />
      {/* Small scroll detail */}
      <path
        d="M65 50 C75 42, 90 38, 100 42"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M135 95 C145 88, 155 90, 152 100 C150 108, 140 105, 138 98"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
        fill="url(#goldGradFill)"
        fillOpacity="0.2"
      />
      {/* Decorative dots */}
      <circle cx="100" cy="80" r="3" fill="url(#goldGradFill)" opacity="0.6" />
      <circle cx="125" cy="88" r="2.5" fill="url(#goldGradFill)" opacity="0.5" />
      <circle cx="60" cy="65" r="2" fill="url(#goldGradFill)" opacity="0.5" />
      <circle cx="140" cy="30" r="2.5" fill="url(#goldGradFill)" opacity="0.5" />
      <circle cx="80" cy="55" r="1.8" fill="url(#goldGradFill)" opacity="0.4" />
      {/* Additional filigree lines */}
      <path
        d="M30 160 C35 140, 50 125, 60 118"
        stroke="url(#goldGrad)"
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M8 180 C12 160, 22 140, 40 120"
        stroke="url(#goldGrad)"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b8860b" />
          <stop offset="30%" stopColor="#d4a832" />
          <stop offset="50%" stopColor="#f5e6a3" />
          <stop offset="70%" stopColor="#d4a832" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
        <linearGradient id="goldGradFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a227" />
          <stop offset="50%" stopColor="#e9cd7a" />
          <stop offset="100%" stopColor="#c9a227" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ── Floating gold particles ───────────────────────────────────────── */
function GoldParticles() {
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    left: `${(i * 47 + 13) % 100}%`,
    top: `${(i * 31 + 7) % 100}%`,
    size: 2 + (i % 3),
    delay: i * 0.5,
    duration: 3 + (i % 3),
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, #f5e6a3, #c9a227)',
          }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1.3, 0],
            y: [0, -25, -50],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

/* ── Main Envelope Component ───────────────────────────────────────── */
function Envelope({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<'closed' | 'opening'>('closed')

  function handleClick() {
    if (phase !== 'closed') return
    setPhase('opening')
    onOpen()
  }

  return (
    <div className="envelope-wrapper fixed inset-0 h-screen w-screen overflow-hidden">
      {/* ── Deep burgundy velvet background ─────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, #4a0e1e 0%, #2d0a14 40%, #1a0610 100%)',
        }}
      />

      {/* ── Damask rose pattern overlay ─────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23f5e6a3' stroke-width='0.8'%3E%3Ccircle cx='100' cy='100' r='8'/%3E%3Ccircle cx='100' cy='100' r='16'/%3E%3Ccircle cx='100' cy='100' r='28'/%3E%3Cpath d='M100 72 Q108 85 100 92 Q92 85 100 72Z'/%3E%3Cpath d='M100 108 Q108 115 100 128 Q92 115 100 108Z'/%3E%3Cpath d='M72 100 Q85 92 92 100 Q85 108 72 100Z'/%3E%3Cpath d='M108 100 Q115 92 128 100 Q115 108 108 100Z'/%3E%3Cpath d='M78 78 Q90 85 88 92 Q82 90 78 78Z'/%3E%3Cpath d='M122 78 Q110 85 112 92 Q118 90 122 78Z'/%3E%3Cpath d='M78 122 Q90 115 88 108 Q82 110 78 122Z'/%3E%3Cpath d='M122 122 Q110 115 112 108 Q118 110 122 122Z'/%3E%3Cpath d='M100 60 Q106 68 100 72 Q94 68 100 60Z'/%3E%3Cpath d='M100 128 Q106 136 100 140 Q94 136 100 128Z'/%3E%3Cpath d='M60 100 Q68 94 72 100 Q68 106 60 100Z'/%3E%3Cpath d='M128 100 Q136 94 140 100 Q136 106 128 100Z'/%3E%3Ccircle cx='100' cy='60' r='3' fill='%23f5e6a3' fill-opacity='0.3'/%3E%3Ccircle cx='100' cy='140' r='3' fill='%23f5e6a3' fill-opacity='0.3'/%3E%3Ccircle cx='60' cy='100' r='3' fill='%23f5e6a3' fill-opacity='0.3'/%3E%3Ccircle cx='140' cy='100' r='3' fill='%23f5e6a3' fill-opacity='0.3'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
        aria-hidden="true"
      />

      {/* ── Velvet texture noise ────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* ── Vignette effect ────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,3,6,0.6) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Baroque corner ornaments ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
      >
        {/* Top-left */}
        <BaroqueCorner className="absolute top-2 left-2 w-28 h-28 sm:w-36 sm:h-36" />
        {/* Top-right */}
        <BaroqueCorner className="absolute top-2 right-2 w-28 h-28 sm:w-36 sm:h-36 -scale-x-100" />
        {/* Bottom-left */}
        <BaroqueCorner className="absolute bottom-2 left-2 w-28 h-28 sm:w-36 sm:h-36 -scale-y-100" />
        {/* Bottom-right */}
        <BaroqueCorner className="absolute bottom-2 right-2 w-28 h-28 sm:w-36 sm:h-36 -scale-x-100 -scale-y-100" />
      </motion.div>

      {/* ── Gold border lines ──────────────────────────────────────── */}
      <div
        className="absolute inset-3 sm:inset-4 pointer-events-none z-[8] rounded-sm"
        style={{
          border: '1px solid rgba(201, 162, 39, 0.15)',
        }}
        aria-hidden="true"
      />

      {/* ── Floating gold particles ────────────────────────────────── */}
      {phase === 'closed' && <GoldParticles />}

      {/* ── Top decorative text ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute left-1/2 top-[10%] -translate-x-1/2 text-center pointer-events-none z-20"
      >
        <p className="font-bangla text-sm text-gold/70 tracking-wider">
          শুভ বিবাহ
        </p>
        <p className="font-serif text-[10px] uppercase tracking-[0.4em] text-gold/40 mt-1">
          Wedding Invitation
        </p>
      </motion.div>

      {/* ── The Envelope ───────────────────────────────────────────── */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={
          phase === 'closed'
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 1.2, y: -40 }
        }
        transition={
          phase === 'closed'
            ? { duration: 1, delay: 0.4, ease: 'easeOut' }
            : { duration: OPEN_S * 0.5 }
        }
      >
        <button
          type="button"
          onClick={handleClick}
          aria-label="Tap the envelope to open the invitation"
          className="relative cursor-pointer group"
          style={{ outline: 'none', border: 'none', background: 'none' }}
        >
          {/* Envelope shadow */}
          <div
            className="absolute -inset-4 rounded-lg"
            style={{
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
              filter: 'blur(15px)',
              transform: 'translateY(8px)',
            }}
          />

          {/* Envelope body */}
          <div
            className="relative w-[280px] h-[180px] sm:w-[320px] sm:h-[200px] rounded-sm overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #f5efe0 0%, #ede4d0 30%, #e8dcc5 60%, #e2d5ba 100%)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.35), 0 2px 10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            {/* Paper texture on envelope */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='t'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23t)' opacity='0.15'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Envelope flap (triangle) */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: '55%',
                clipPath: 'polygon(0 0, 50% 65%, 100% 0)',
                background: 'linear-gradient(180deg, #e8dcc5 0%, #ddd0b5 50%, #d5c8a8 100%)',
                borderBottom: '1px solid rgba(180, 160, 120, 0.3)',
              }}
            />

            {/* Envelope fold lines from bottom corners to center */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              {/* Left fold line */}
              <line
                x1="0" y1="100%" x2="50%" y2="35%"
                stroke="rgba(180, 160, 120, 0.25)"
                strokeWidth="1"
              />
              {/* Right fold line */}
              <line
                x1="100%" y1="100%" x2="50%" y2="35%"
                stroke="rgba(180, 160, 120, 0.25)"
                strokeWidth="1"
              />
            </svg>

            {/* ── Wax Seal ─────────────────────────────────────────── */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 z-10"
              style={{ top: '28%' }}
              animate={
                phase === 'closed'
                  ? { scale: [1, 1.04, 1] }
                  : {}
              }
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'conic-gradient(from 0deg, #8B4513, #a0522d 20%, #cd853f 40%, #a0522d 60%, #8B4513 80%, #6b3410 100%)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,255,0.2)',
                  border: '2px solid rgba(139,69,19,0.6)',
                }}
              >
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle at 35% 30%, #cd853f, #8B4513 70%, #6b3410 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  <span className="font-serif text-sm sm:text-base font-semibold tracking-wider" style={{ color: '#f5e6a3', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    S<span className="mx-[2px] opacity-50">|</span>A
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </button>
      </motion.div>

      {/* ── Golden light burst on opening ─────────────────────────── */}
      <motion.div
        animate={{
          opacity: phase === 'opening' ? [0, 0.8, 0] : 0,
          scale: phase === 'opening' ? [0.3, 2, 3.5] : 0.3,
        }}
        transition={{ duration: OPEN_S * 1.2, times: [0, 0.3, 1], ease: 'easeOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full z-30"
        style={{
          background:
            'radial-gradient(circle, rgba(233,205,122,0.6) 0%, rgba(201,162,39,0.2) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Couple names revealed on opening ──────────────────────── */}
      <AnimatePresence>
        {phase === 'opening' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: OPEN_S * 0.6, delay: OPEN_S * 0.3, ease: 'easeOut' }}
            className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 z-30"
          >
            <p className="font-bangla text-sm tracking-wider text-gold/80">শুভ বিবাহ</p>
            <p className="font-script text-4xl text-cream">{couple.brideName}</p>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold-light" />
              <span className="text-xs uppercase tracking-widest text-gold">&amp;</span>
              <span className="h-px w-10 bg-gold-light" />
            </div>
            <p className="font-script text-4xl text-cream">{couple.groomName}</p>
            <p className="mt-1 font-serif text-xs tracking-[0.3em] text-gold/70">{couple.dateBanner}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Pulse ring around envelope ─────────────────────────────── */}
      {phase === 'closed' && (
        <>
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gold/20 pointer-events-none z-[15]"
            style={{ width: 300, height: 210 }}
            animate={{ scale: [1, 1.15], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Bottom text — "Tap to open" ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'closed' ? 1 : 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-[12%] left-1/2 -translate-x-1/2 text-center z-20"
      >
        <motion.p
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="font-serif text-[11px] uppercase tracking-[0.3em] text-gold/60"
        >
          Tap to Open
        </motion.p>
        <motion.span
          animate={{ y: [0, -3, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-2 block text-gold/40 text-lg"
          aria-hidden="true"
        >
          ꕥ
        </motion.span>
      </motion.div>
    </div>
  )
}

export default Envelope
