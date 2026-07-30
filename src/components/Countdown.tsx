import { useEffect, useState } from 'react'
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
    <section className="px-6 pb-16 text-center">
      <p className="font-serif text-sm uppercase tracking-widest text-gold">
        The Celebration Begins In
      </p>
      <div className="mx-auto mt-3 flex max-w-sm items-start justify-center gap-1">
        {boxes.map((box, i) => (
          <div key={box.label} className="flex items-start">
            <div>
              <p className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
                {String(box.value).padStart(2, '0')}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-ink/60">{box.label}</p>
            </div>
            {i < boxes.length - 1 && (
              <p className="px-2 font-serif text-3xl text-gold-light sm:text-4xl">:</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Countdown
