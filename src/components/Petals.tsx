import { motion } from 'framer-motion'

const PETALS = ['🌸', '🌺', '🌼', '🌹', '✨', '💐'] as const

const particles = Array.from({ length: 22 }).map((_, i) => ({
  left: `${(i * 47) % 100}%`,
  size: 16 + ((i * 31) % 16),
  fallDuration: 8 + ((i * 11) % 7),
  fallDelay: -((i * 4) % 14),
  swayDuration: 2.2 + (i % 3),
  emoji: PETALS[i % PETALS.length],
}))

function Petals({ show = true }: { show?: boolean }) {
  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: p.left,
            fontSize: p.size,
            animationDuration: `${p.fallDuration}s, ${p.swayDuration}s`,
            animationDelay: `${p.fallDelay}s, 0s`,
            opacity: 0.7,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </motion.div>
  )
}

export default Petals
