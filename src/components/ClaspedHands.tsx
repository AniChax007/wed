import { motion } from 'framer-motion'
import { Sparkles, Heart } from 'lucide-react'

function ClaspedHands() {
  return (
    <section className="relative overflow-hidden py-14 px-6 text-center">
      {/* ── Background Ambient Glow ──────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(226,61,40,0.15) 0%, rgba(212,161,42,0.1) 50%, transparent 80%)',
        }}
      />

      {/* Decorative top divider */}
      <div className="flex items-center justify-center gap-4 max-w-xs mx-auto mb-8">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-light" />
        <motion.span
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-gold text-lg"
        >
          ❀
        </motion.span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-light" />
      </div>

      {/* ── Animated Traditional Ritual Container ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative mx-auto max-w-sm rounded-3xl p-6 shadow-2xl overflow-hidden"
        style={{
          background:
            'linear-gradient(145deg, rgba(92, 14, 36, 0.95) 0%, rgba(63, 12, 27, 0.98) 100%)',
          border: '2px solid rgba(240, 208, 110, 0.5)',
          boxShadow:
            '0 15px 40px -10px rgba(74, 21, 40, 0.5), inset 0 1px 0 rgba(255, 253, 240, 0.2)',
        }}
      >
        {/* Floating animated sparkles inside card */}
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3], y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-4 left-4 text-gold-light"
        >
          <Sparkles size={16} />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3], y: [5, -5, 5] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="absolute bottom-4 right-4 text-gold-light"
        >
          <Sparkles size={16} />
        </motion.div>

        {/* ── Main Bengali Quote & Ritual Blessing Banner ────────────── */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="py-6 px-4 flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-12 h-12 rounded-full bg-gold/20 border border-gold-light/40 flex items-center justify-center mb-4 text-gold-bright shadow-lg"
          >
            <Heart size={22} fill="#ffd700" />
          </motion.div>

          <h3 className="font-bangla text-2xl sm:text-3xl text-gold-bright font-semibold leading-relaxed tracking-wide">
            "ধরিয়া রাখিও সোহাগে আদরে"
          </h3>

          <p className="font-elsie text-base text-gold-light/90 italic font-semibold mt-2">
            Hold on to love and affection forever
          </p>

          {/* Golden ornament line */}
          <div className="flex items-center justify-center gap-3 my-4 w-full max-w-[200px]">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-light" />
            <span className="sindoor-dot" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-light" />
          </div>

          <p className="font-elsie text-xs text-cream/70 uppercase tracking-widest">
            Eternal Bonds • Seven Vows
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative bottom divider */}
      <div className="flex items-center justify-center gap-4 max-w-xs mx-auto mt-8">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-light" />
        <motion.span
          animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-gold text-lg"
        >
          ❀
        </motion.span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-light" />
      </div>
    </section>
  )
}

export default ClaspedHands
