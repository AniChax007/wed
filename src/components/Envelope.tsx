import { useState } from 'react'
import { motion } from 'framer-motion'
import { couple, ENVELOPE_OPEN_MS } from '../data'

const OPEN_S = ENVELOPE_OPEN_MS / 1000

const doorFluting = {
  backgroundImage:
    'repeating-linear-gradient(90deg, rgba(201,162,39,0.12) 0px, rgba(201,162,39,0.12) 2px, transparent 2px, transparent 34px)',
}

function Envelope({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<'closed' | 'opening'>('closed')

  function handleClick() {
    if (phase !== 'closed') return
    setPhase('opening')
    onOpen()
  }

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-gradient-to-b from-blush to-cream">
      {/* Left gate door */}
      <motion.div
        animate={{ x: phase === 'opening' ? '-100%' : 0 }}
        transition={{ duration: OPEN_S, ease: 'easeInOut' }}
        className="absolute inset-y-0 left-0 w-1/2 border-r-4 border-gold-light bg-cream"
        style={doorFluting}
      >
        <span className="absolute left-6 top-6 text-2xl opacity-40" aria-hidden="true">🌸</span>
        <span className="absolute bottom-6 left-6 text-2xl opacity-40" aria-hidden="true">🌼</span>
      </motion.div>

      {/* Right gate door */}
      <motion.div
        animate={{ x: phase === 'opening' ? '100%' : 0 }}
        transition={{ duration: OPEN_S, ease: 'easeInOut' }}
        className="absolute inset-y-0 right-0 w-1/2 border-l-4 border-gold-light bg-cream"
        style={doorFluting}
      >
        <span className="absolute right-6 top-6 text-2xl opacity-40" aria-hidden="true">🌸</span>
        <span className="absolute bottom-6 right-6 text-2xl opacity-40" aria-hidden="true">🌼</span>
      </motion.div>

      {/* Soft radial glow through the widening seam */}
      <motion.div
        animate={{
          opacity: phase === 'opening' ? [0, 1, 0] : 0,
          scale: phase === 'opening' ? [0.5, 1.6, 2.4] : 0.5,
        }}
        transition={{ duration: OPEN_S, times: [0, 0.35, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, #f6d98a 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Light-ray burst */}
      <motion.div
        animate={{
          opacity: phase === 'opening' ? [0, 0.7, 0] : 0,
          rotate: phase === 'opening' ? 90 : 0,
        }}
        transition={{ duration: OPEN_S, times: [0, 0.4, 1], ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0 blur-md"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, #ffe9a8 10deg, transparent 20deg, transparent 90deg, #ffe9a8 100deg, transparent 110deg, transparent 180deg, #ffe9a8 190deg, transparent 200deg, transparent 270deg, #ffe9a8 280deg, transparent 290deg, transparent 360deg)',
        }}
        aria-hidden="true"
      />

      {/* Couple names revealed as the gate parts */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={
          phase === 'opening'
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.85 }
        }
        transition={{ duration: OPEN_S * 0.75, delay: OPEN_S * 0.25, ease: 'easeOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg border border-gold-light bg-cream px-8 py-6 shadow-xl"
      >
        <p className="font-script text-3xl text-ink">{couple.brideName}</p>
        <p className="text-[10px] uppercase tracking-widest text-gold">&amp;</p>
        <p className="font-script text-3xl text-ink">{couple.groomName}</p>
      </motion.div>

      {/* Wax seal — the gate's lock */}
      <motion.button
        type="button"
        onClick={handleClick}
        animate={
          phase === 'closed'
            ? { scale: [1, 1.05, 1] }
            : { scale: [1, 1.3, 0.6], opacity: [1, 1, 0] }
        }
        transition={
          phase === 'closed'
            ? { repeat: Infinity, duration: 2.2 }
            : { duration: OPEN_S * 0.5 }
        }
        whileTap={
          phase === 'closed'
            ? { scale: 0.92, transition: { type: 'spring', stiffness: 500, damping: 15 } }
            : undefined
        }
        aria-label="Tap the seal to open the gate"
        className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-gold-light font-script text-2xl text-cream shadow-[0_0_25px_rgba(201,162,39,0.55)]"
        style={{ background: 'radial-gradient(circle at 35% 30%, #e2c25a, #a9791b 75%)' }}
      >
        {couple.initials}
      </motion.button>

      <p className="absolute bottom-16 left-1/2 -translate-x-1/2 font-serif text-xs uppercase tracking-widest text-ink/70">
        Tap the seal to open
      </p>
    </div>
  )
}

export default Envelope
