import { motion } from 'framer-motion'
import { Flower2 } from 'lucide-react'
import { timeline } from '../data'

function Timeline() {
  return (
    <section className="bg-blush/30 px-6 py-16">
      <h2 className="text-center font-script text-4xl text-ink">Schedule of Events</h2>
      <div className="mx-auto mt-10 max-w-md">
        {timeline.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22, delay: i * 0.1 }}
            className="relative flex gap-4 pb-10 last:pb-0"
          >
            <div className="flex flex-col items-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-cream text-gold">
                <Flower2 size={18} />
              </span>
              {i < timeline.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-gold-light" aria-hidden="true" />
              )}
            </div>
            <div className="pt-1 text-left">
              <p className="font-serif text-sm font-semibold text-gold">{item.time}</p>
              <p className="font-serif text-lg text-ink">{item.title}</p>
              <p className="text-sm text-ink/60">{item.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Timeline
