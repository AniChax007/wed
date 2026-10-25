import { motion } from 'framer-motion'

const portraits = [
  {
    src: '/images/shoot1%20(2).jpeg',
    alt: 'Susmita and Animesh together outdoors',
    className: 'col-span-2 aspect-[4/3] sm:aspect-[16/9]',
  },
  {
    src: '/images/shoot1%20(1).jpeg',
    alt: 'Susmita and Animesh beneath a bridge',
    className: 'aspect-[4/3]',
  },
  {
    src: '/images/shoot22.jpeg',
    alt: 'Susmita and Animesh at Victoria Memorial',
    className: 'aspect-[4/3]',
  },
]

function CouplePortrait() {
  return (
    <section className="px-5 pb-12 pt-2 sm:px-6">
      <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:gap-4">
        {portraits.map((portrait, index) => (
          <motion.figure
            key={portrait.src}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: index * 0.1, ease: 'easeOut' }}
            className={`overflow-hidden ${portrait.className}`}
          >
            <img
              src={portrait.src}
              alt={portrait.alt}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </motion.figure>
        ))}
      </div>
      <p className="mt-5 text-center font-bangla text-base text-maroon/85">
        একসাথে, আজীবন
      </p>
    </section>
  )
}

export default CouplePortrait