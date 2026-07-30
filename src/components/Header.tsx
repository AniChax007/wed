import { motion } from 'framer-motion'
import { couple } from '../data'

/* ── Decorative ornamental divider ─────────────────────────────────── */
function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <motion.span
        className="h-px w-12 bg-gradient-to-r from-transparent to-gold-light"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.span
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
        className="text-gold text-sm"
      >
        ❦
      </motion.span>
      <motion.span
        className="h-px w-12 bg-gradient-to-l from-transparent to-gold-light"
        initial={{ scaleX: 0, originX: 1 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
    </div>
  )
}

function Header() {
  return (
    <section className="relative px-6 pt-14 pb-8 text-center overflow-hidden">
      {/* Subtle radial glow behind the header */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(246,213,217,0.4) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* শুভ বিবাহ (Shubho Bibaho) */}
      <motion.p
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="font-bangla text-base text-gold/70 tracking-wider"
      >
        শুভ বিবাহ
      </motion.p>

      {/* Sindoor dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
        className="flex justify-center my-2"
      >
        <span className="sindoor-dot" />
      </motion.div>

      {/* Date banner */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}
        className="font-serif text-sm tracking-[0.3em] text-gold"
      >
        {couple.dateBanner}
      </motion.p>

      <OrnamentalDivider />

      {/* Couple names with gold shimmer */}
      <motion.h1
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.2 }}
        className="font-script text-5xl sm:text-6xl leading-tight"
      >
        <span className="gold-shimmer">{couple.brideName}</span>
        <br />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-xl font-serif tracking-widest text-gold/60"
        >
          &amp;
        </motion.span>
        <br />
        <span className="gold-shimmer">{couple.groomName}</span>
      </motion.h1>

      <OrnamentalDivider />

      {/* Blessing card with royal border */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.4 }}
        className="mx-auto mt-4 max-w-sm rounded-2xl royal-border bg-gradient-to-b from-blush/30 to-cream px-6 py-5"
      >
        <p className="font-bangla text-lg text-ink leading-relaxed">{couple.blessing}</p>
        <div className="flex items-center justify-center gap-3 my-2">
          <span className="h-px w-8 bg-gold-light/50" />
          <span className="sindoor-dot" />
          <span className="h-px w-8 bg-gold-light/50" />
        </div>
        <p className="font-serif italic text-ink/70 text-sm">{couple.quote}</p>
      </motion.div>
    </section>
  )
}

export default Header
