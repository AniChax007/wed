import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scratchEvents } from '../data'
import { CheckCircle2 } from 'lucide-react'
import OrnamentalDivider from './OrnamentalDivider'

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

/* ── Map each event to its vibrant ritual illustration ───────────────────── */
const eventArtwork: Record<string, string> = {
  wedding: '/images/shubho_drishti_colorful.jpg',
  reception: '/images/bengali_couple_vibrant.jpg',
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
      style={{ background: '#f7f0e5' }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <div className="mb-2 inline-flex items-center gap-2 border-y border-maroon/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-maroon/70">
          Wedding celebrations
        </div>
        <h2 className="font-serif text-3xl font-semibold text-maroon">The Celebration</h2>
        <OrnamentalDivider />
        <p className="mx-auto mt-1 max-w-xs font-bangla text-sm text-ink/75">
          শুভ অনুষ্ঠানের দিনক্ষণ ও স্থান
        </p>
      </motion.div>

      {/* Cards Container */}
      <div className="mx-auto mt-8 flex flex-col gap-6 max-w-sm relative z-10">
        {scratchEvents.map((evt, idx) => {
          const isDone = revealed[evt.id]
          const artwork = eventArtwork[evt.id]

          return (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, #fffcf5 0%, #fef9f0 100%)',
                border: isDone ? `2px solid ${evt.color}` : '1px solid rgba(122, 30, 52, 0.2)',
                boxShadow: isDone
                  ? `0 12px 35px ${evt.color}35`
                  : '0 8px 24px rgba(74, 21, 40, 0.08)',
              }}
            >
              {/* Card top banner */}
              <div
                className="flex items-center justify-between px-5 py-3 text-white"
                style={{
                  background: isDone
                    ? `linear-gradient(90deg, ${evt.color} 0%, #7a1e34 100%)`
                    : 'linear-gradient(90deg, #7a1e34 0%, #5c0e24 100%)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl animate-bounce">{evt.icon}</span>
                  <span className="font-serif font-bold text-sm tracking-wide">
                    {evt.title}
                  </span>
                </div>
                <span className="font-bangla text-xs text-white/90">{evt.bangla}</span>
              </div>

              {/* Card body wrapper */}
              <div className="relative p-4 text-center flex flex-col items-center justify-center min-h-[260px]">
                {/* ── Content revealed underneath canvas ──────────────── */}
                <div className="flex flex-col items-center justify-center w-full">
                  {/* Vibrant Ritual Artwork thumbnail on reveal */}
                  {artwork && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={isDone ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="relative w-full h-36 rounded-xl overflow-hidden mb-3 border border-gold-light/40 shadow-inner group"
                    >
                      <img
                        src={artwork}
                        alt={evt.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-[11px] font-serif">
                        <span className="bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                          ✨ {evt.time}
                        </span>
                        <span className="bg-gold-dark/80 px-2 py-0.5 rounded backdrop-blur-sm text-cream font-bold">
                          {evt.badge}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  <motion.h3
                    animate={isDone ? { scale: [0.95, 1.05, 1] } : {}}
                    className="font-elsie text-2xl font-bold text-maroon"
                  >
                    {evt.date}
                  </motion.h3>

                  <div className="pt-2 border-t border-gold-light/40 w-full mt-2">
                    <p className="font-serif text-xs text-ink/60 uppercase tracking-wider">
                      Venue
                    </p>
                    <p className="font-serif text-sm font-bold text-ink flex items-center justify-center gap-1">
                      <span>📍</span> {evt.location}
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
                        height={265}
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
                    className="absolute top-2 right-2 text-emerald-800 text-xs font-semibold flex items-center gap-1 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Revealed
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
