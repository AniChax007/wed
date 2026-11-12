import { motion } from 'framer-motion'

/* ── Shared marigold garland band — used as a festive top border on major sections ── */
function GarlandBand({ className = '' }: { className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none h-8 w-full overflow-hidden sm:h-10 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="h-full w-full"
        style={{
          background: 'linear-gradient(90deg, rgba(122,30,52,0.12) 0%, rgba(212,161,42,0.25) 20%, rgba(122,30,52,0.12) 40%, rgba(212,161,42,0.25) 60%, rgba(122,30,52,0.12) 80%, rgba(212,161,42,0.25) 100%)',
          maskImage: 'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)',
        }}
      />
    </motion.div>
  )
}

export default GarlandBand
