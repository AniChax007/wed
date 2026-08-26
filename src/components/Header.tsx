import { motion } from 'framer-motion'
import { couple } from '../data'
import OrnamentalDivider from './OrnamentalDivider'
import GarlandBand from './GarlandBand'

function Header() {
  return (
    <section className="relative pt-0 pb-8 text-center overflow-hidden">
      {/* ── Canopy arch banner, opening the card ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative w-full overflow-hidden"
      >
        <img src="/images/curtain-arch.png" alt="" aria-hidden="true" className="w-full h-auto object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 60%, var(--color-cream) 100%)' }} />
      </motion.div>
      <GarlandBand />

      <div className="relative px-6 pt-6">
      {/* ── Animated banana trees on sides (Transparent blending + Swaying GIF motion) ── */}
      <motion.img
        src="/images/banana-tree.png"
        alt=""
        aria-hidden="true"
        className="absolute -left-6 top-0 w-28 sm:w-32 pointer-events-none sway-garland"
        initial={{ opacity: 0, x: -40, y: 20 }}
        animate={{ opacity: 0.55, x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <motion.img
        src="/images/banana-tree.png"
        alt=""
        aria-hidden="true"
        className="absolute -right-6 top-0 w-28 sm:w-32 pointer-events-none -scale-x-100 sway-garland"
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 0.55, x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
      />

      {/* Subtle radial glow behind the header */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(246,213,217,0.4) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Sindoor pot medallion — framed as a gold locket, not a bare photo ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        className="mx-auto mb-3 relative w-24 h-24"
      >
        {/* Soft glow ring behind the medallion */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              '0 0 20px 4px rgba(255,215,0,0.25)',
              '0 0 30px 8px rgba(255,153,51,0.35)',
              '0 0 20px 4px rgba(255,215,0,0.25)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            border: '3px solid transparent',
            backgroundImage:
              'linear-gradient(#fffcf5, #fffcf5), linear-gradient(145deg, #ffd700, #d4a12a 50%, #ffd700)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 4px 16px rgba(74,21,40,0.25), inset 0 1px 2px rgba(255,255,255,0.6)',
          }}
          animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src="/images/sindoor-pot.png"
            alt="Sindoor pot"
            className="w-full h-full object-cover scale-125"
          />
        </motion.div>
      </motion.div>

      {/* শুভ বিবাহ (Shubho Bibaho) */}
      <motion.p
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="font-bangla text-base text-gold/90 tracking-wider font-semibold"
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

      {/* Date banner with Elsie font */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}
        className="font-elsie text-sm tracking-[0.3em] font-black text-gold"
      >
        {couple.dateBanner}
      </motion.p>

      <OrnamentalDivider />

      {/* Couple names — framed as a soft nameplate card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.2 }}
        className="relative mx-auto max-w-xs rounded-2xl royal-border px-6 py-5"
        style={{ background: 'linear-gradient(145deg, rgba(255,215,0,0.06) 0%, rgba(252,213,216,0.15) 100%)' }}
      >
        <span className="absolute left-3 top-2 text-gold-light/50 text-sm" aria-hidden="true">❦</span>
        <span className="absolute right-3 bottom-2 text-gold-light/50 text-sm" aria-hidden="true">❦</span>
        <h1 className="font-elsie-swash text-4xl sm:text-5xl font-black leading-tight tracking-wide">
          <span className="gold-shimmer">{couple.brideName}</span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-2xl text-gold my-1 inline-block"
          >
            ❈
          </motion.span>
          <br />
          <span className="gold-shimmer">{couple.groomName}</span>
        </h1>
      </motion.div>

      <OrnamentalDivider />

      {/* Blessing card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.4 }}
        className="mx-auto mt-4 max-w-sm rounded-2xl royal-border bg-gradient-to-b from-blush/30 to-cream px-6 py-5 shadow-lg"
      >
        <p className="font-bangla text-lg text-ink leading-relaxed">{couple.blessing}</p>
        <div className="flex items-center justify-center gap-3 my-2">
          <span className="h-px w-8 bg-gold-light/50" />
          <span className="sindoor-dot" />
          <span className="h-px w-8 bg-gold-light/50" />
        </div>
        <p className="font-elsie italic text-ink/80 text-sm font-semibold">{couple.quote}</p>
      </motion.div>
      </div>
    </section>
  )
}

export default Header
