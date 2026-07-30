import { motion } from 'framer-motion'
import { guidelines } from '../data'

const cards = [
  { title: 'Dress Code', text: guidelines.dressCode },
  { title: 'Gifts', text: guidelines.gift },
]

function Guidelines() {
  return (
    <section className="grid gap-4 px-6 py-16 sm:mx-auto sm:max-w-md">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 240, damping: 20, delay: i * 0.1 }}
          className="rounded-2xl border border-gold-light bg-blush/30 px-6 py-5 text-center shadow-sm"
        >
          <h3 className="font-serif text-lg font-semibold text-ink">{card.title}</h3>
          <p className="mt-1 text-sm text-ink/70">{card.text}</p>
        </motion.div>
      ))}
    </section>
  )
}

export default Guidelines
