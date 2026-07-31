import { motion } from 'framer-motion'
import { guidelines } from '../data'

const cards = [
  { title: 'Dress Code', emoji: '👗', text: guidelines.dressCode },
  { title: 'Gifts', emoji: '🎁', text: guidelines.gift },
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
          className="rounded-2xl px-6 py-5 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(252,213,216,0.35) 0%, rgba(254,249,240,0.8) 50%, rgba(252,213,216,0.35) 100%)',
            border: '1px solid rgba(240,208,110,0.35)',
            boxShadow: '0 4px 20px -4px rgba(212,161,42,0.12), 0 0 0 1px rgba(240,208,110,0.08)',
          }}
        >
          <span className="text-2xl">{card.emoji}</span>
          <h3 className="font-serif text-lg font-bold text-maroon mt-1">{card.title}</h3>
          <p className="mt-1 text-sm text-ink/70 leading-relaxed">{card.text}</p>
        </motion.div>
      ))}

      {/* Footer blessing */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-light" />
          <span className="text-vermilion text-sm">❀</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-light" />
        </div>
        <p className="font-bangla text-base text-ink/60">
          আপনাদের শুভ আশীর্বাদ ও উপস্থিতি কামনা করি
        </p>
        <p className="font-serif text-xs italic text-ink/40 mt-1">
          We seek your blessings and gracious presence
        </p>
      </motion.div>
    </section>
  )
}

export default Guidelines
