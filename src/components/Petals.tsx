const PETALS = ['🌸', '🌺', '🌼'] as const

const particles = Array.from({ length: 14 }).map((_, i) => ({
  left: `${(i * 71) % 100}%`,
  size: 14 + ((i * 37) % 14),
  fallDuration: 9 + ((i * 13) % 8),
  fallDelay: -((i * 5) % 12),
  swayDuration: 2.5 + (i % 3),
  emoji: PETALS[i % PETALS.length],
}))

function Petals() {
  return (
    <div
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
    </div>
  )
}

export default Petals
