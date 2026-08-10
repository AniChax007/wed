import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scratchEvents } from '../data'
import { Sparkles, CheckCircle2 } from 'lucide-react'
import OrnamentalDivider from './OrnamentalDivider'

/* Small keepsake illustration per event, shown once the card is revealed */
const revealImages: Record<string, string> = {
  wedding: '/images/sindoor-ceremony.png',
  reception: '/images/reception-dinner.png',
}

/* Confetti chips scattered behind the section — royal gold/maroon/emerald palette */
const CONFETTI_COLORS = ['#d4a12a', '#7a1e34', '#2d8a5e', '#f0d06e', '#dc3530', '#ff9933']
const confettiPieces = Array.from({ length: 18 }).map((_, i) => ({
  left: `${(i * 53) % 100}%`,
  size: 6 + ((i * 7) % 10),
  round: i % 2 === 0,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  fallDuration: 7 + ((i * 11) % 8),
  fallDelay: -((i * 4) % 12),
  swayDuration: 2 + (i % 3),
}))

/* ── Custom HTML5 Canvas ScratchCard Component (Zero External Dependencies) ── */
interface CustomScratchCardProps {
  width: number
  height: number
  coverColor?: string
  finishPercent?: number
  onComplete: () => void
}

function CustomScratchCard({
  width,
  height,
  coverColor = '#3f0c1b',
  finishPercent = 35,
  onComplete,
}: CustomScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)
  const isCompletedRef = useRef(false)

  // Draw initial velvet maroon cover on canvas
  const drawCover = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    ctx.save()
    ctx.globalCompositeOperation = 'source-over'

    // Deep Velvet Maroon Radial Gradient
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      10,
      width / 2,
      height / 2,
      Math.max(width, height) / 1.2
    )
    gradient.addColorStop(0, '#5c0e24')
    gradient.addColorStop(0.7, coverColor)
    gradient.addColorStop(1, '#2b0612')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Gold decorative border inside canvas
    ctx.strokeStyle = 'rgba(240, 208, 110, 0.4)'
    ctx.lineWidth = 2
    ctx.strokeRect(6, 6, width - 12, height - 12)

    // Sparkle icon circle background
    ctx.fillStyle = 'rgba(212, 161, 42, 0.25)'
    ctx.beginPath()
    ctx.arc(width / 2, height / 2 - 20, 22, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'rgba(240, 208, 110, 0.6)'
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Gold Sparkle star symbol
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 20px serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✦', width / 2, height / 2 - 20)

    // "✨ Scratch Here ✨" text
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 15px "Elsie Swash Caps", "Cormorant Garamond", serif'
    ctx.fillText('✨ Scratch Here ✨', width / 2, height / 2 + 15)

    // Subtitle
    ctx.fillStyle = 'rgba(240, 208, 110, 0.85)'
    ctx.font = 'italic 12px "Elsie", "Cormorant Garamond", serif'
    ctx.fillText('Scratch to reveal date & venue', width / 2, height / 2 + 35)

    ctx.restore()
  }, [width, height, coverColor])

  useEffect(() => {
    drawCover()
  }, [drawCover])

  // Calculate percentage erased
  const checkCompletion = useCallback(() => {
    if (isCompletedRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, width, height)
    const pixels = imageData.data
    let transparentCount = 0

    // Sample every 4th pixel for high performance
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) {
        transparentCount++
      }
    }

    const totalSampled = pixels.length / 16
    const percentErased = (transparentCount / totalSampled) * 100

    if (percentErased >= finishPercent) {
      isCompletedRef.current = true
      onComplete()
    }
  }, [width, height, finishPercent, onComplete])

  // Erase pixels along mouse/touch path
  const scratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current
      if (!canvas || isCompletedRef.current) return
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      ctx.save()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = 45 // Brush radius

      ctx.beginPath()
      if (lastPointRef.current) {
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y)
        ctx.lineTo(x, y)
      } else {
        ctx.arc(x, y, 22.5, 0, Math.PI * 2)
      }
      ctx.stroke()
      ctx.restore()

      lastPointRef.current = { x, y }
      checkCompletion()
    },
    [checkCompletion]
  )

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    let clientX = 0
    let clientY = 0

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else if ('clientX' in e) {
      clientX = e.clientX
      clientY = e.clientY
    } else {
      return null
    }

    return {
      x: (clientX - rect.left) * (width / rect.width),
      y: (clientY - rect.top) * (height / rect.height),
    }
  }

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawingRef.current = true
    const coords = getCanvasCoords(e)
    if (coords) {
      lastPointRef.current = coords
      scratch(coords.x, coords.y)
    }
  }

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current) return
    const coords = getCanvasCoords(e)
    if (coords) {
      scratch(coords.x, coords.y)
    }
  }

  const handlePointerUp = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      className="w-full h-full cursor-pointer touch-none select-none"
    />
  )
}

/* ── Main Scratch Reveal Section ───────────────────────────────────────────── */
function ScratchReveal() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})

  const handleComplete = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <section
      className="relative px-6 py-14 text-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #5c1226 0%, #3f0c1b 55%, #2d0a14 100%)',
      }}
    >
      {/* Ambient gold glow — same velvet-maroon tone as the opening envelope */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(212,161,42,0.22) 0%, rgba(122,30,52,0.15) 60%, transparent 80%)',
        }}
      />

      {/* Colorful confetti rain, scoped to this section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {confettiPieces.map((c, i) => (
          <span
            key={i}
            className={`confetti-piece ${c.round ? 'rounded-full' : 'rounded-sm'}`}
            style={{
              left: c.left,
              width: c.size,
              height: c.size,
              backgroundColor: c.color,
              opacity: 0.55,
              animationDuration: `${c.fallDuration}s, ${c.swayDuration}s`,
              animationDelay: `${c.fallDelay}s, 0s`,
            }}
          />
        ))}
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-light bg-gold/15 border border-gold/40 mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Reveal
        </div>
        <h2 className="font-elsie-swash text-4xl font-black gold-shimmer">Scratch to Reveal Dates</h2>
        <OrnamentalDivider />
        <p className="mt-1 font-elsie text-sm text-cream/75 max-w-xs mx-auto">
          Scratch the velvet cards below with your finger or mouse to unveil the wedding events &amp; venue details!
        </p>
      </motion.div>

      {/* Cards Container */}
      <div className="mx-auto mt-8 flex flex-col gap-6 max-w-sm relative z-10">
        {scratchEvents.map((evt, idx) => {
          const isDone = revealed[evt.id]

          return (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #fffcf5 0%, #fef9f0 100%)',
                border: isDone ? `2px solid ${evt.color}99` : '2px solid rgba(240, 208, 110, 0.3)',
                boxShadow: isDone
                  ? `0 8px 30px ${evt.color}40`
                  : '0 6px 20px rgba(74, 21, 40, 0.08)',
              }}
            >
              {/* Card top banner — blends the maroon base with the event's own color */}
              <div
                className="flex items-center justify-between px-5 py-2.5"
                style={{
                  background: `linear-gradient(90deg, #3f0c1b 0%, #5c0e24 45%, ${evt.color} 130%)`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{evt.icon}</span>
                  <span className="font-elsie font-bold text-sm text-gold-light tracking-wide">
                    {evt.title}
                  </span>
                </div>
                <span className="font-bangla text-xs text-cream/80">{evt.bangla}</span>
              </div>

              {/* Card body wrapper */}
              <div className="relative p-5 text-center flex flex-col items-center justify-center min-h-[170px]">
                {/* ── Content revealed underneath canvas ──────────────── */}
                <div className="flex flex-col items-center justify-center space-y-1.5 w-full">
                  {isDone && revealImages[evt.id] && (
                    <motion.img
                      src={revealImages[evt.id]}
                      alt=""
                      aria-hidden="true"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 rounded-full object-cover border-2 shadow-sm"
                      style={{ borderColor: evt.color, mixBlendMode: 'multiply' }}
                      loading="lazy"
                    />
                  )}

                  <motion.div
                    animate={isDone ? { scale: [0.9, 1.05, 1] } : {}}
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: evt.color }}
                  >
                    {evt.badge}
                  </motion.div>

                  <h3 className="font-elsie text-2xl font-bold text-maroon pt-1">
                    {evt.date}
                  </h3>

                  <div className="pt-2 border-t border-gold-light/30 w-full mt-2">
                    <p className="font-serif text-xs text-ink/60 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="font-serif text-sm font-bold text-ink">
                      📍 {evt.location}
                    </p>
                  </div>
                </div>

                {/* ── Zero-Dependency HTML5 Canvas Scratch Overlay ────────────── */}
                <AnimatePresence>
                  {!isDone && (
                    <motion.div
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 z-20 flex items-center justify-center rounded-b-2xl overflow-hidden"
                    >
                      <CustomScratchCard
                        width={350}
                        height={175}
                        coverColor="#3f0c1b"
                        finishPercent={35}
                        onComplete={() => handleComplete(evt.id)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Success badge after reveal */}
                {isDone && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-2 right-2 text-emerald text-xs font-semibold flex items-center gap-1 bg-emerald/10 px-2.5 py-0.5 rounded-full border border-emerald/20"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Revealed
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default ScratchReveal
