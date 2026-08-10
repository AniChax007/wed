import { motion } from 'framer-motion'
import { couple, venue, weddingDateTime } from '../data'

/* ── Closing footer: deep maroon velvet band, matches the Envelope's tone ── */
function Footer() {
  const weddingDate = new Date(weddingDateTime).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <footer
      className="relative px-6 py-14 text-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #5c1226 0%, #3f0c1b 55%, #2d0a14 100%)',
      }}
    >
      {/* Diamond monogram, echoing the wax seal on the envelope */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: 30 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 45 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 180, damping: 16 }}
        className="mx-auto flex h-14 w-14 items-center justify-center border-2 border-gold-light/60"
      >
        <span
          className="font-serif text-xs font-bold tracking-widest text-gold-light"
          style={{ transform: 'rotate(-45deg)' }}
        >
          {couple.initials}
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="mt-5 font-script text-4xl gold-shimmer"
      >
        {couple.brideName} &amp; {couple.groomName}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mx-auto mt-4 max-w-xs font-elsie italic text-sm text-cream/80"
      >
        {couple.quote}
      </motion.p>

      <div className="mx-auto mt-5 flex items-center justify-center gap-3 max-w-[200px]">
        <span className="h-px flex-1 bg-gold-light/30" />
        <span className="sindoor-dot" />
        <span className="h-px flex-1 bg-gold-light/30" />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-5 font-serif text-[11px] uppercase tracking-[0.25em] text-gold-light/70"
      >
        {weddingDate} &middot; {venue.marriageName} &amp; {venue.receptionName}
      </motion.p>
    </footer>
  )
}

export default Footer
