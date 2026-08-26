import { motion } from 'framer-motion'

/* ── Shared marigold garland band — used as a festive top border on major sections ── */
function GarlandBand({ className = '' }: { className?: string }) {
  return (
    <motion.img
      src="/images/garland-strip.png"
      alt=""
      aria-hidden="true"
      className={`w-full h-8 sm:h-10 object-cover object-top pointer-events-none ${className}`}
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    />
  )
}

export default GarlandBand
