import { motion } from 'framer-motion'
import { timeline } from '../data'
import OrnamentalDivider from './OrnamentalDivider'
import GarlandBand from './GarlandBand'

/* Map each timeline event to a thumbnail illustration */
const eventImages: Record<string, string> = {
  'Reception': '/images/reception-dinner.png',
}

/* Larger illustration shown in the expanded card below each event */
const expandedImages: Record<string, string> = {
  'Reception': '/images/reception-dinner.png',
}

function Timeline() {
  return (
    <section className="relative py-16 overflow-hidden">
      <GarlandBand />
      <div className="relative px-6 pt-6">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(254,249,240,0.8) 0%, rgba(253,243,226,0.5) 100%)',
        }}
      />

      {/* ── Banana trees as entrance decoration on sides (Swaying GIF animation) ── */}
      <motion.img
        src="/images/banana-tree.png"
        alt=""
        aria-hidden="true"
        className="absolute left-0 bottom-0 w-24 sm:w-28 opacity-30 pointer-events-none sway-garland"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 0.3, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        style={{ mixBlendMode: 'multiply' }}
      />
      <motion.img
        src="/images/banana-tree.png"
        alt=""
        aria-hidden="true"
        className="absolute right-0 bottom-0 w-24 sm:w-28 opacity-30 pointer-events-none -scale-x-100 sway-garland"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 0.3, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
        style={{ mixBlendMode: 'multiply' }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center font-elsie-swash text-4xl text-ink font-black"
      >
        Schedule of Events
      </motion.h2>
      <OrnamentalDivider />

      <div className="mx-auto mt-10 max-w-md sm:max-w-xl lg:max-w-4xl relative z-10">
        {timeline.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22, delay: i * 0.12 }}
            className="relative flex gap-4 pb-10 last:pb-0"
          >
            {/* Timeline node with illustration thumbnail */}
            <div className="flex flex-col items-center">
              <motion.div
                whileInView={{ scale: [0.6, 1.1, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-cream overflow-hidden shadow-md"
              >
                {eventImages[item.title] ? (
                  <motion.img
                    src={eventImages[item.title]}
                    alt={item.title}
                    className="w-full h-full object-cover object-top"
                    style={{ mixBlendMode: 'multiply' }}
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                    loading="lazy"
                  />
                ) : (
                  <span className="text-gold text-xl">✦</span>
                )}
              </motion.div>
              {i < timeline.length - 1 && (
                <motion.span
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
                  className="mt-1 w-px flex-1 bg-gold-light origin-top"
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Event details */}
            <div className="pt-2 text-left flex-1">
              <p className="font-elsie-swash text-xl font-bold text-maroon">{item.title}</p>
              <p className="font-elsie text-sm text-ink/70">{item.subtitle}</p>

              {/* Expanded illustration card for key events */}
              {expandedImages[item.title] && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                  className="mt-3 rounded-2xl overflow-hidden border border-gold-light/40 bg-cream-warm/90 p-3 shadow-md"
                >
                  <div className="overflow-hidden rounded-xl flex items-center justify-center" style={{ height: '150px' }}>
                    <motion.img
                      src={expandedImages[item.title]}
                      alt={item.title}
                      className="w-full h-full object-contain"
                      style={{ mixBlendMode: 'multiply' }}
                      animate={{
                        scale: [1, 1.08, 1],
                        rotate: [0, 1.5, -1.5, 0],
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  )
}

export default Timeline
