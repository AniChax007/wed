import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScratchCard, { Covers, Brushes } from 'react-scratchcard-v2'
import { scratchEvents } from '../data'
import { Sparkles, CheckCircle2 } from 'lucide-react'

function ScratchReveal() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})

  const handleComplete = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <section className="relative px-6 py-14 text-center overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(212,161,42,0.15) 0%, rgba(122,30,52,0.1) 60%, transparent 80%)',
        }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/30 mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Reveal
        </div>
        <h2 className="font-elsie-swash text-4xl text-ink font-black">Scratch to Reveal Dates</h2>
        <p className="mt-1 font-elsie text-sm text-ink/70 max-w-xs mx-auto">
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
                border: isDone
                  ? '2px solid rgba(212, 161, 42, 0.6)'
                  : '2px solid rgba(240, 208, 110, 0.3)',
                boxShadow: isDone
                  ? '0 8px 30px rgba(212, 161, 42, 0.25)'
                  : '0 6px 20px rgba(74, 21, 40, 0.08)',
              }}
            >
              {/* Card top banner */}
              <div
                className="flex items-center justify-between px-5 py-2.5"
                style={{
                  background:
                    'linear-gradient(90deg, #3f0c1b 0%, #5c0e24 50%, #3f0c1b 100%)',
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

                  <p className="font-elsie text-sm font-semibold text-gold-dark">
                    ⏰ {evt.time}
                  </p>

                  <div className="pt-2 border-t border-gold-light/30 w-full mt-2">
                    <p className="font-serif text-xs text-ink/60 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="font-serif text-sm font-bold text-ink">
                      📍 {evt.location}
                    </p>
                  </div>
                </div>

                {/* ── React ScratchCard Overlay using Deep Maroon/Velvet Color ────────── */}
                <AnimatePresence>
                  {!isDone && (
                    <motion.div
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 z-20 flex items-center justify-center rounded-b-2xl overflow-hidden cursor-pointer"
                      style={{ touchAction: 'none' }}
                    >
                      <ScratchCard
                        width={350}
                        height={175}
                        cover={Covers.color('#3f0c1b')}
                        brush={Brushes.circle(25)}
                        finishPercent={35}
                        onComplete={() => handleComplete(evt.id)}
                      >
                        {/* Velvet Maroon cover visual content */}
                        <div
                          className="w-full h-full flex flex-col items-center justify-center p-4 relative"
                          style={{
                            background:
                              'radial-gradient(ellipse at center, #5c0e24 0%, #3f0c1b 70%, #2b0612 100%)',
                            color: '#ffd700',
                          }}
                        >
                          {/* Damask / Alpona Pattern overlay */}
                          <div
                            className="absolute inset-0 opacity-15 pointer-events-none"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='%23ffd700' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                              backgroundSize: '20px 20px',
                            }}
                          />

                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-10 h-10 rounded-full bg-gold/20 border border-gold-light/40 flex items-center justify-center shadow-md mb-2 relative z-10"
                          >
                            <Sparkles className="w-5 h-5 text-gold-bright" />
                          </motion.div>

                          <p className="font-elsie-swash font-bold text-base text-gold-bright relative z-10 tracking-wider">
                            ✨ Scratch Here ✨
                          </p>
                          <p className="font-elsie text-xs text-gold-light/90 relative z-10 italic mt-0.5">
                            Scratch to reveal date &amp; venue
                          </p>
                        </div>
                      </ScratchCard>
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
