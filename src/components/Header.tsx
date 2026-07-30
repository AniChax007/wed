import { motion } from 'framer-motion'
import { couple } from '../data'

function Header() {
  return (
    <section className="px-6 pt-16 pb-10 text-center">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="font-serif text-sm tracking-[0.3em] text-gold"
      >
        {couple.dateBanner}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
        className="font-script text-5xl text-ink sm:text-6xl"
      >
        {couple.brideName} &amp; {couple.groomName}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.25 }}
        className="mx-auto mt-8 max-w-sm rounded-2xl border border-gold-light bg-blush/40 px-6 py-6"
      >
        <p className="font-bangla text-lg text-ink">{couple.blessing}</p>
        <p className="mt-2 font-serif italic text-ink/80">{couple.quote}</p>
      </motion.div>
    </section>
  )
}

export default Header
