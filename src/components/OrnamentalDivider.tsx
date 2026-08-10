import { motion } from 'framer-motion'

/* ── Shared ornamental divider: gold line — motif — gold line ─────────────── */
function OrnamentalDivider({ glyph = '❦' }: { glyph?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <motion.span
        className="h-px w-12 bg-gradient-to-r from-transparent to-gold-light"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <motion.span
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-gold text-sm"
      >
        {glyph}
      </motion.span>
      <motion.span
        className="h-px w-12 bg-gradient-to-l from-transparent to-gold-light"
        initial={{ scaleX: 0, originX: 1 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
    </div>
  )
}

export default OrnamentalDivider
