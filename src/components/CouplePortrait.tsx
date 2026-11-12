import { motion } from 'framer-motion'

const portraits = [
  {
    src: '/images/bengali_couple_vibrant.jpg',
    alt: 'Bengali Bride and Groom in Wedding Mandap',
    className: 'col-span-2 aspect-[4/3] sm:aspect-[16/9]',
    caption: 'শুভ বিবাহ • The Auspicious Union',
  },
  {
    src: '/images/romantic-couple.png',
    alt: 'Romantic Bengali Couple Portrait',
    className: 'aspect-[4/3]',
    caption: 'চিরন্তন প্রেম • Endless Love',
  },
  {
    src: '/images/couple-boat.png',
    alt: 'Animated Couple in Festive Mayurpankhi Boat',
    className: 'aspect-[4/3]',
    caption: 'একসাথে পথচলা • Journey Together',
  },
]

function CouplePortrait() {
  return (
    <section className="px-5 pb-12 pt-2 sm:px-6">
      <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:gap-4">
        {portraits.map((portrait, index) => (
          <motion.figure
            key={portrait.src}
            initial={{ opacity: 0, y: 22, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
            className={`group relative overflow-hidden rounded-2xl border-2 border-gold-light/60 shadow-lg bg-cream ${portrait.className}`}
          >
            {/* The Photo */}
            <img
              src={portrait.src}
              alt={portrait.alt}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            {/* Subtle Royal Vignette & Gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80 pointer-events-none"
              aria-hidden="true"
            />

            {/* Floating Golden Corner Accent */}
            <div className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-cream/75 backdrop-blur-xs border border-gold-light/70 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">
              <span className="text-[11px] text-gold-dark">✦</span>
            </div>

            {/* Romantic Caption Overlay */}
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-serif">
              <span className="font-serif italic drop-shadow-md text-white/95 text-[11px] sm:text-xs">
                {portrait.caption}
              </span>
              <span className="text-gold-light text-xs opacity-75 group-hover:opacity-100">
                ♡
              </span>
            </div>
          </motion.figure>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex flex-col items-center justify-center"
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-light" />
          <p className="font-bangla text-lg font-bold text-maroon tracking-wide">
            একসাথে, আজীবন
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-light" />
        </div>
        <p className="font-serif italic text-xs text-ink/65 mt-1">
          Forever and Always, Hand in Hand
        </p>
      </motion.div>
    </section>
  )
}

export default CouplePortrait