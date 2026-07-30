import { motion } from 'framer-motion'
import claspedHandsImg from '../assets/clasped-hands.jpg'

function ClaspedHands() {
  return (
    <section className="relative overflow-hidden py-10">
      {/* Decorative divider lines */}
      <div className="flex items-center justify-center gap-4 px-6 mb-6">
        <span className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-gold-light" />
        <span className="text-gold text-lg">✿</span>
        <span className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-gold-light" />
      </div>

      {/* Image container with parallax-like reveal */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative mx-auto max-w-sm px-6"
      >
        {/* Soft background glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 -z-10 mx-6 rounded-3xl blur-2xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(201,162,39,0.15) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* The hands image with elegant border */}
        <div className="overflow-hidden rounded-3xl border-2 border-gold-light/50 shadow-lg">
          <motion.img
            src={claspedHandsImg}
            alt="Wedding hands clasped together – a symbol of eternal bond"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Caption underneath */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 text-center font-serif text-sm italic text-ink/60"
        >
          "Bound by love, together forever"
        </motion.p>
      </motion.div>

      {/* Bottom decorative divider */}
      <div className="flex items-center justify-center gap-4 px-6 mt-6">
        <span className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-gold-light" />
        <span className="text-gold text-lg">✿</span>
        <span className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-gold-light" />
      </div>
    </section>
  )
}

export default ClaspedHands
