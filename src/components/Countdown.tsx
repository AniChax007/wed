import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { weddingDateTime } from '../data'

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
      style={{
        background: 'linear-gradient(180deg, #5c0e24 0%, #7a1e34 40%, #8f2540 60%, #5c0e24 100%)',
      }}
    >
      {/* Decorative gold lines */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(to right, transparent, #f0d06e 30%, #ffd700 50%, #f0d06e 70%, transparent)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(to right, transparent, #f0d06e 30%, #ffd700 50%, #f0d06e 70%, transparent)',
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

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-serif text-sm uppercase tracking-widest text-gold-light"
      >
        The Celebration Begins In
      </motion.p>

      <div className="mx-auto mt-5 flex max-w-sm items-start justify-center gap-2">
        {boxes.map((box, i) => (
          <div key={box.label} className="flex items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="rounded-xl px-3 py-2 min-w-[60px]"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,215,0,0.12) 0%, rgba(240,208,110,0.08) 100%)',
                  border: '1px solid rgba(240,208,110,0.2)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,253,240,0.1)',
                }}
              >
                <p className="font-serif text-3xl font-bold sm:text-4xl" style={{ color: '#ffd700', textShadow: '0 0 20px rgba(255,215,0,0.3)' }}>
                  {String(box.value).padStart(2, '0')}
                </p>
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-gold-light/70">{box.label}</p>
            </motion.div>
            {i < boxes.length - 1 && (
              <motion.p
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="px-1 pt-3 font-serif text-2xl sm:text-3xl"
                style={{ color: '#f0d06e' }}
              >
                :
              </motion.p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Countdown
