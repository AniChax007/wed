import { motion } from 'framer-motion'
import coupleImg from '../assets/couple-portrait.jpg'

function CouplePortrait() {
  return (
    <section className="relative px-6 pb-8 pt-4 flex flex-col items-center">
      {/* Decorative gold frame glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative"
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 30px rgba(201,162,39,0.2), 0 0 60px rgba(201,162,39,0.1)',
              '0 0 40px rgba(201,162,39,0.35), 0 0 80px rgba(201,162,39,0.15)',
              '0 0 30px rgba(201,162,39,0.2), 0 0 60px rgba(201,162,39,0.1)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-gold-light"
          style={{
            background: 'linear-gradient(135deg, #fdfbf7 0%, #f6d5d9 100%)',
          }}
        >
          <motion.img
            src={coupleImg}
            alt="Susmita & Animesh – Bengali wedding couple portrait"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.3, ease: 'easeOut' }}
            className="h-full w-full object-cover object-top"
            loading="eager"
          />
        </motion.div>

        {/* Floating sparkles around the portrait */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60) * (Math.PI / 180)
          const radius = 145
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          return (
            <motion.span
              key={i}
              className="absolute text-gold-light pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
                fontSize: 10 + (i % 3) * 4,
              }}
              initial={{ x, y, opacity: 0, scale: 0 }}
              animate={{
                x,
                y,
                opacity: [0, 0.8, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 2.5,
                delay: 0.5 + i * 0.3,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
              aria-hidden="true"
            >
              ✦
            </motion.span>
          )
        })}
      </motion.div>

      {/* Names below the portrait with stagger animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
        className="mt-5 text-center"
      >
        <p className="font-bangla text-sm tracking-wider text-gold/80">
          সুস্মিতা ❤ অনিমেষ
        </p>
      </motion.div>
    </section>
  )
}

export default CouplePortrait
