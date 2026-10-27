import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { weddingDateTime } from '../data'
import OrnamentalDivider from './OrnamentalDivider'
import AmbientVideo from './AmbientVideo'

function getRemaining() {
  const diff = Math.max(0, new Date(weddingDateTime).getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Countdown() {
  const [remaining, setRemaining] = useState(getRemaining)

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  const boxes = [
    { label: 'Days', value: remaining.days },
    { label: 'Hours', value: remaining.hours },
    { label: 'Minutes', value: remaining.minutes },
    { label: 'Seconds', value: remaining.seconds },
  ]

  return (
    <section
      className="relative px-6 pb-16 pt-10 text-center overflow-hidden"
      style={{ background: '#f7f0e5' }}
    >
      <AmbientVideo
        src="/videos/pexels-lotus-decor.mp4"
        poster="/images/pexels-floral-mandap.jpeg"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-[#fffdf8]/75" aria-hidden="true" />
      {/* Decorative gold lines */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(to right, transparent, #9b263b 30%, #d4a12a 50%, #9b263b 70%, transparent)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(to right, transparent, #9b263b 30%, #d4a12a 50%, #9b263b 70%, transparent)',
        }}
      />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffd700'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='60' cy='0' r='2'/%3E%3Ccircle cx='0' cy='60' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px',
        }}
        aria-hidden="true"
      />

      {/* Diya glow icon, matching Header's motif language */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative mx-auto mb-2 text-2xl"
      >
        🪔
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative font-bangla text-base text-maroon tracking-wide"
      >
        বিবাহের শুভক্ষণ আসছে
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative font-serif text-sm uppercase tracking-widest text-maroon/70 mt-1"
      >
        The Celebration Begins In
      </motion.p>

      <div className="relative mx-auto mt-2">
        <OrnamentalDivider glyph="✦" />
      </div>

      <div className="relative mx-auto mt-3 flex max-w-sm items-start justify-center gap-2">
        {boxes.map((box, i) => (
          <div key={box.label} className="flex items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div
                className="min-w-[60px] rounded-sm border border-maroon/15 px-3 py-2"
                style={{
                  background: 'rgba(255,253,248,0.86)',
                }}
              >
                <p className="font-serif text-3xl font-bold text-maroon sm:text-4xl">
                  {String(box.value).padStart(2, '0')}
                </p>
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-gold-light/70">{box.label}</p>
            </motion.div>
            {i < boxes.length - 1 && (
              <motion.p
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.15, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="px-1 pt-3 text-lg text-gold-dark sm:text-xl"
              >
                ❈
              </motion.p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Countdown
