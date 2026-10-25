import { motion } from 'framer-motion'

function CouplePortrait() {
  return (
    <section className="relative px-6 pb-10 pt-4 flex flex-col items-center overflow-hidden">
      {/* ── Personalised arch banner (peacocks + marigold garland) ──── */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative mx-auto w-full max-w-md rounded-2xl overflow-hidden royal-border shadow-lg mb-8"
      >
        <motion.img
          src="/images/shoot1%20(1).jpeg"
          alt="Animesh and Susmita beneath a bridge"
          className="w-full h-auto object-cover"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          loading="eager"
        />
      </motion.div>

      {/* ── Romantic couple painting with Ken Burns cinematic zoom ──── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative mx-auto w-72 sm:w-80"
      >
        {/* Outer pulsating gold glow */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 25px rgba(212,161,42,0.2), 0 0 50px rgba(122,30,52,0.15)',
              '0 0 40px rgba(255,215,0,0.35), 0 0 70px rgba(212,161,42,0.25)',
              '0 0 25px rgba(212,161,42,0.2), 0 0 50px rgba(122,30,52,0.15)',
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-2xl overflow-hidden border-2 border-gold-light/60"
        >
          {/* Ken Burns slow zoom & pan effect — feels like a video GIF */}
          <div className="relative overflow-hidden rounded-xl" style={{ height: '320px' }}>
            <motion.img
              src="/images/shoot1%20(2).jpeg"
              alt="Animesh and Susmita sharing a quiet moment outdoors"
              className="w-full h-full object-cover photo-filter"
              animate={{
                scale: [1, 1.08, 1.04, 1.1, 1],
                x: [0, 8, -5, 3, 0],
                y: [0, -5, 3, -8, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              loading="eager"
            />
            <div className="photo-vignette" aria-hidden="true" />
            <div className="photo-grain" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Floating sparkles around the portrait */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180)
          const radius = 160
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          return (
            <motion.span
              key={i}
              className="absolute text-gold-bright pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
                fontSize: 8 + (i % 3) * 4,
              }}
              initial={{ x, y, opacity: 0, scale: 0 }}
              animate={{
                x,
                y,
                opacity: [0, 0.9, 0],
                scale: [0, 1.4, 0],
              }}
              transition={{
                duration: 3,
                delay: 0.5 + i * 0.35,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'easeInOut',
              }}
              aria-hidden="true"
            >
              ✦
            </motion.span>
          )
        })}
      </motion.div>

      {/* ── Couple portrait + bridal blessing, side by side ─────────── */}
      <div className="mt-8 flex flex-wrap items-start justify-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative w-48 sm:w-56 overflow-hidden rounded-2xl royal-border shadow-md"
        >
          <img
            src="/images/shoot22.jpeg"
            alt="Animesh and Susmita at Victoria Memorial"
            className="h-52 w-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Bridal blessing illustration, gentle float */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
          className="w-40 sm:w-48 rounded-2xl overflow-hidden royal-border shadow-md"
        >
          <motion.img
            src="/images/crown-blessing.jpeg"
            alt="Bridal blessing — mother placing the ceremonial crown"
            className="w-full h-auto object-cover"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Names below in Elsie Swash Caps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
        className="mt-5 text-center"
      >
        <p className="font-elsie-swash text-lg font-bold tracking-wider text-gold-dark">
          সুস্মিতা ❤ অনিমেষ
        </p>
      </motion.div>
    </section>
  )
}

export default CouplePortrait
