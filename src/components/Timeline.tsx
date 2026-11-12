import { motion } from 'framer-motion'
import { timeline } from '../data'
import OrnamentalDivider from './OrnamentalDivider'
import AmbientVideo from './AmbientVideo'

function Timeline() {
  return (
    <section className="relative py-16 overflow-hidden">
      <AmbientVideo
        src="/videos/pexels-floral-arrangement.mp4"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-[#fffdf8]/80" aria-hidden="true" />
      <div className="relative px-6 pt-6">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(254,249,240,0.8) 0%, rgba(253,243,226,0.5) 100%)',
        }}
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
            {/* Timeline node with colorful animated ring */}
            <div className="flex flex-col items-center">
              <motion.div
                whileInView={{ scale: [0.6, 1.15, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 shadow-md bg-cream relative"
                style={{ borderColor: item.color }}
              >
                <span className="text-xl">{item.icon || '✦'}</span>
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
                  style={{ background: item.color }}
                />
              </motion.div>
              {i < timeline.length - 1 && (
                <motion.span
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
                  className="mt-1 w-0.5 flex-1 origin-top"
                  style={{
                    background: `linear-gradient(to bottom, ${item.color}, ${timeline[i + 1]?.color || '#d4a12a'})`,
                  }}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Event details */}
            <div className="pt-0.5 text-left flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white shadow-sm"
                  style={{ backgroundColor: item.color }}
                >
                  {item.time}
                </span>
                <span className="font-bangla text-xs text-maroon font-semibold">
                  {item.bangla}
                </span>
              </div>
              <p className="font-elsie-swash text-xl font-bold text-maroon">{item.title}</p>
              <p className="font-elsie text-sm text-ink/75 mt-0.5">{item.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  )
}

export default Timeline
