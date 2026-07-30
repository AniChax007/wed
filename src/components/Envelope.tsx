import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { couple, ENVELOPE_OPEN_MS } from '../data'

const OPEN_S = ENVELOPE_OPEN_MS / 1000

/* ── SVG Mandala Component ─────────────────────────────────────────── */
function Mandala({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring of petals */}
      {Array.from({ length: 16 }).map((_, i) => (
        <g key={`outer-${i}`} transform={`rotate(${i * 22.5} 200 200)`}>
          <path
            d="M200 60 Q220 120 200 140 Q180 120 200 60Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <circle cx="200" cy="75" r="4" fill="currentColor" opacity="0.5" />
        </g>
      ))}

      {/* Middle ring — lotus-style petals */}
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={`mid-${i}`} transform={`rotate(${i * 30} 200 200)`}>
          <path
            d="M200 90 Q225 140 200 160 Q175 140 200 90Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            opacity="0.8"
          />
          <path
            d="M200 100 Q215 135 200 150 Q185 135 200 100Z"
            fill="currentColor"
            opacity="0.08"
          />
        </g>
      ))}

      {/* Inner decorative circles */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15) * (Math.PI / 180)
        const cx = 200 + Math.cos(angle) * 110
        const cy = 200 + Math.sin(angle) * 110
        return (
          <circle
            key={`dot-outer-${i}`}
            cx={cx}
            cy={cy}
            r={i % 2 === 0 ? 3.5 : 2}
            fill="currentColor"
            opacity={i % 2 === 0 ? 0.6 : 0.35}
          />
        )
      })}

      {/* Inner ring of petals (smaller) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={`inner-${i}`} transform={`rotate(${i * 45} 200 200)`}>
          <path
            d="M200 125 Q218 158 200 175 Q182 158 200 125Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.75"
          />
          <path
            d="M200 130 Q212 152 200 165 Q188 152 200 130Z"
            fill="currentColor"
            opacity="0.1"
          />
        </g>
      ))}

      {/* Innermost decorative circle ring */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 22.5) * (Math.PI / 180)
        const cx = 200 + Math.cos(angle) * 82
        const cy = 200 + Math.sin(angle) * 82
        return (
          <circle
            key={`dot-inner-${i}`}
            cx={cx}
            cy={cy}
            r={2.5}
            fill="currentColor"
            opacity="0.5"
          />
        )
      })}

      {/* Scalloped inner border */}
      <circle cx="200" cy="200" r="68" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="200" cy="200" r="72" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.25" strokeDasharray="4 4" />
    </svg>
  )
}

/* ── Floating gold particles ───────────────────────────────────────── */
function GoldParticles() {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    left: `${(i * 47 + 13) % 100}%`,
    top: `${(i * 31 + 7) % 100}%`,
    size: 2 + (i % 4),
    delay: i * 0.4,
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
            background: 'radial-gradient(circle, #e9cd7a, #c9a227)',
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
            y: [0, -30, -60],
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

/* ── Corner ornament SVG ───────────────────────────────────────────── */
function CornerOrnament({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Paisley-inspired corner flourish */}
      <path
        d="M10 110 Q10 60 40 35 Q55 22 75 20 Q60 35 55 55 Q52 70 58 80 Q65 90 80 85 Q70 100 50 100 Q30 100 15 90Z"
        fill="currentColor"
        opacity="0.08"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M5 105 Q8 70 30 45 Q45 30 65 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />
      <path
        d="M15 110 Q18 80 35 55 Q45 42 60 35"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.25"
      />
      <circle cx="65" cy="25" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="60" cy="35" r="2" fill="currentColor" opacity="0.3" />
      {/* Small decorative dots along the curve */}
      <circle cx="25" cy="55" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="35" cy="42" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="48" cy="33" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

/* ── Vertical ornamental border pattern ────────────────────────────── */
function DoorOrnaments({ side }: { side: 'left' | 'right' }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Subtle vertical fluting lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(201,162,39,0.06) 0px, rgba(201,162,39,0.06) 1px, transparent 1px, transparent 28px)',
        }}
      />

      {/* Gold border edge */}
      <div
        className={`absolute inset-y-0 w-[3px] ${side === 'left' ? 'right-0' : 'left-0'}`}
        style={{
          background: 'linear-gradient(to bottom, transparent, #c9a227 20%, #e9cd7a 50%, #c9a227 80%, transparent)',
        }}
      />

      {/* Corner ornaments */}
      <CornerOrnament
        className={`absolute w-24 h-24 text-gold ${
          side === 'left' ? 'top-4 left-4' : 'top-4 right-4 -scale-x-100'
        }`}
      />
      <CornerOrnament
        className={`absolute w-24 h-24 text-gold ${
          side === 'left'
            ? 'bottom-4 left-4 -scale-y-100'
            : 'bottom-4 right-4 -scale-x-100 -scale-y-100'
        }`}
      />

      {/* Vertical decorative motif (paisley chain) */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 ${
          side === 'left' ? 'right-5' : 'left-5'
        }`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gold/30" />
            <div className="w-px h-4 bg-gold/15" />
          </div>
        ))}
      </div>
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
      {/* Cream textured background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(175deg, #fefcf5 0%, #faf5ea 40%, #f8f1e0 100%)',
        }}
      />

      {/* Subtle paper texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c9a227\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
        aria-hidden="true"
      />

      {/* ── Left Gate Door ────────────────────────────────────────── */}
      <motion.div
        animate={{ x: phase === 'opening' ? '-100%' : 0 }}
        transition={{ duration: OPEN_S, ease: [0.77, 0, 0.175, 1] }}
        className="absolute inset-y-0 left-0 w-1/2"
        style={{
          background: 'linear-gradient(135deg, #fefcf5 0%, #faf6ec 50%, #f5edd5 100%)',
        }}
      >
        <DoorOrnaments side="left" />
      </motion.div>

      {/* ── Right Gate Door ───────────────────────────────────────── */}
      <motion.div
        animate={{ x: phase === 'opening' ? '100%' : 0 }}
        transition={{ duration: OPEN_S, ease: [0.77, 0, 0.175, 1] }}
        className="absolute inset-y-0 right-0 w-1/2"
        style={{
          background: 'linear-gradient(225deg, #fefcf5 0%, #faf6ec 50%, #f5edd5 100%)',
        }}
      >
        <DoorOrnaments side="right" />
      </motion.div>

      {/* ── Golden light burst on opening ─────────────────────────── */}
      <motion.div
        animate={{
          opacity: phase === 'opening' ? [0, 0.9, 0] : 0,
          scale: phase === 'opening' ? [0.3, 2, 3.5] : 0.3,
        }}
        transition={{ duration: OPEN_S * 1.2, times: [0, 0.3, 1], ease: 'easeOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(233,205,122,0.6) 0%, rgba(201,162,39,0.2) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Conic light rays on opening ───────────────────────────── */}
      <motion.div
        animate={{
          opacity: phase === 'opening' ? [0, 0.5, 0] : 0,
          rotate: phase === 'opening' ? 120 : 0,
        }}
        transition={{ duration: OPEN_S * 1.3, times: [0, 0.35, 1], ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0 blur-sm"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(233,205,122,0.4) 8deg, transparent 16deg, transparent 45deg, rgba(233,205,122,0.4) 53deg, transparent 61deg, transparent 90deg, rgba(233,205,122,0.4) 98deg, transparent 106deg, transparent 135deg, rgba(233,205,122,0.4) 143deg, transparent 151deg, transparent 180deg, rgba(233,205,122,0.4) 188deg, transparent 196deg, transparent 225deg, rgba(233,205,122,0.4) 233deg, transparent 241deg, transparent 270deg, rgba(233,205,122,0.4) 278deg, transparent 286deg, transparent 315deg, rgba(233,205,122,0.4) 323deg, transparent 331deg, transparent 360deg)',
        }}
        aria-hidden="true"
      />

      {/* ── Couple names revealed behind gates ────────────────────── */}
      <AnimatePresence>
        {phase === 'opening' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: OPEN_S * 0.6, delay: OPEN_S * 0.3, ease: 'easeOut' }}
            className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
          >
            <p className="font-bangla text-sm tracking-wider text-gold/80">শুভ বিবাহ</p>
            <p className="font-script text-4xl text-ink">{couple.brideName}</p>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold-light" />
              <span className="text-xs uppercase tracking-widest text-gold">&amp;</span>
              <span className="h-px w-10 bg-gold-light" />
            </div>
            <p className="font-script text-4xl text-ink">{couple.groomName}</p>
            <p className="mt-1 font-serif text-xs tracking-[0.3em] text-gold/70">{couple.dateBanner}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating gold particles (only when closed) ────────────── */}
      {phase === 'closed' && <GoldParticles />}

      {/* ── Top decorative text ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute left-1/2 top-[12%] -translate-x-1/2 text-center pointer-events-none z-20"
      >
        <p className="font-bangla text-sm text-gold/60 tracking-wider">
          শুভ বিবাহ
        </p>
        <p className="font-serif text-[10px] uppercase tracking-[0.4em] text-gold/40 mt-1">
          Wedding Invitation
        </p>
      </motion.div>

      {/* ── Mandala behind the seal ────────────────────────────────── */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[5]"
        initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
        animate={
          phase === 'closed'
            ? { opacity: 1, scale: 1, rotate: 0 }
            : { opacity: 0, scale: 1.8, rotate: 45 }
        }
        transition={
          phase === 'closed'
            ? { duration: 1.5, ease: 'easeOut' }
            : { duration: OPEN_S * 0.6 }
        }
      >
        {/* Slowly rotating mandala */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <Mandala className="w-64 h-64 sm:w-72 sm:h-72 text-gold" />
        </motion.div>
      </motion.div>

      {/* ── Second mandala ring (counter-rotating, more transparent) ─ */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[4]"
        initial={{ opacity: 0, scale: 0.5, rotate: 30 }}
        animate={
          phase === 'closed'
            ? { opacity: 0.4, scale: 1.15, rotate: 0 }
            : { opacity: 0, scale: 2, rotate: -30 }
        }
        transition={
          phase === 'closed'
            ? { duration: 1.8, ease: 'easeOut', delay: 0.3 }
            : { duration: OPEN_S * 0.5 }
        }
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          <Mandala className="w-72 h-72 sm:w-80 sm:h-80 text-gold-light" />
        </motion.div>
      </motion.div>

      {/* ── Pulsating glow behind the seal ─────────────────────────── */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[3]"
        animate={
          phase === 'closed'
            ? {
                boxShadow: [
                  '0 0 40px 10px rgba(201,162,39,0.15)',
                  '0 0 60px 20px rgba(201,162,39,0.25)',
                  '0 0 40px 10px rgba(201,162,39,0.15)',
                ],
              }
            : { opacity: 0 }
        }
        transition={
          phase === 'closed'
            ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.5 }
        }
        style={{ width: 120, height: 120, borderRadius: '50%' }}
        aria-hidden="true"
      />

      {/* ── The gold seal button — S | A ──────────────────────────── */}
      <motion.button
        type="button"
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0 }}
        animate={
          phase === 'closed'
            ? { opacity: 1, scale: [0, 1.1, 1] }
            : { scale: [1, 1.4, 0], opacity: [1, 1, 0] }
        }
        transition={
          phase === 'closed'
            ? { duration: 0.8, delay: 0.8, ease: 'easeOut' }
            : { duration: OPEN_S * 0.5 }
        }
        whileHover={
          phase === 'closed'
            ? { scale: 1.08, transition: { type: 'spring', stiffness: 300, damping: 15 } }
            : undefined
        }
        whileTap={
          phase === 'closed'
            ? { scale: 0.92, transition: { type: 'spring', stiffness: 500, damping: 15 } }
            : undefined
        }
        aria-label="Tap the seal to open the invitation"
        className="absolute left-1/2 top-1/2 z-20 flex h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_4px_30px_rgba(201,162,39,0.45)]"
        style={{
          background: 'conic-gradient(from 0deg, #b8860b, #e2c25a 30%, #f5e6a3 50%, #e2c25a 70%, #b8860b 100%)',
          border: '3px solid rgba(233,205,122,0.7)',
        }}
      >
        {/* Inner circle with text */}
        <div
          className="flex h-[72px] w-[72px] items-center justify-center rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #e8d078, #b8860b 90%)',
            boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.3), inset 0 -2px 6px rgba(0,0,0,0.15)',
          }}
        >
          <span className="font-serif text-xl font-semibold tracking-wider text-cream/95">
            S<span className="mx-[3px] text-cream/50">|</span>A
          </span>
        </div>
      </motion.button>

      {/* ── Pulse ring animation around the seal ──────────────────── */}
      {phase === 'closed' && (
        <>
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30 pointer-events-none z-[15]"
            style={{ width: 100, height: 100 }}
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 pointer-events-none z-[15]"
            style={{ width: 100, height: 100 }}
            animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
            transition={{ duration: 2, delay: 0.6, repeat: Infinity, ease: 'easeOut' }}
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Bottom text — "Tap to open" with animation ────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'closed' ? 1 : 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-[14%] left-1/2 -translate-x-1/2 text-center z-20"
      >
        <motion.p
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="font-serif text-[11px] uppercase tracking-[0.3em] text-gold/60"
        >
          Tap to Open
        </motion.p>
        {/* Small upward arrow */}
        <motion.span
          animate={{ y: [0, -3, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-2 block text-gold/40 text-lg"
          aria-hidden="true"
        >
          ꕥ
        </motion.span>
      </motion.div>

      {/* ── Bottom decorative border ──────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to right, transparent, #c9a227 30%, #e9cd7a 50%, #c9a227 70%, transparent)',
          opacity: 0.3,
        }}
        aria-hidden="true"
      />

      {/* ── Top decorative border ─────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to right, transparent, #c9a227 30%, #e9cd7a 50%, #c9a227 70%, transparent)',
          opacity: 0.3,
        }}
        aria-hidden="true"
      />
    </div>
  )
}

export default Envelope
