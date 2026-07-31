import { motion } from 'framer-motion'
import { timeline } from '../data'

/* Map each timeline event to an illustration */
const eventImages: Record<string, string> = {
  'Gaye Holud': '/images/gaye-holud.png',
  'Guest Arrival': '/images/couple-wedding.png',
  'Shubho Bibaho': '/images/sindoor-ceremony.png',
  'Preetibhoj': '/images/reception-dinner.png',
}

function Timeline() {
  return (
    <section className="relative px-6 py-16 overflow-hidden">
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

      <div className="mx-auto mt-10 max-w-md relative z-10">
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
              <p className="font-elsie text-sm font-bold text-gold">{item.time}</p>
              <p className="font-elsie-swash text-xl font-bold text-maroon">{item.title}</p>
              <p className="font-elsie text-sm text-ink/70">{item.subtitle}</p>

              {/* Expanded illustration card for key events */}
              {(item.title === 'Gaye Holud' || item.title === 'Preetibhoj') && eventImages[item.title] && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                  className="mt-3 rounded-2xl overflow-hidden border border-gold-light/40 bg-cream-warm/90 p-3 shadow-md"
                >
                  <div className="overflow-hidden rounded-xl flex items-center justify-center" style={{ height: '150px' }}>
                    <motion.img
                      src={eventImages[item.title]}
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

      {/* ── Boat illustration at the bottom — transparent background blending ─────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="mt-12 mx-auto max-w-xs relative rounded-2xl p-2"
        style={{
          background: 'linear-gradient(180deg, rgba(254,249,240,0.6) 0%, rgba(253,243,226,0.9) 100%)',
          border: '1px solid rgba(240, 208, 110, 0.3)',
          boxShadow: '0 6px 20px rgba(74, 21, 40, 0.06)',
        }}
      >
        {/* Water shimmer effect behind boat */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 rounded-full -z-10"
          style={{
            background: 'radial-gradient(ellipse, rgba(212,161,42,0.25) 0%, transparent 70%)',
          }}
          animate={{ scaleX: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Boat with gentle rocking GIF animation & multiply blend */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 1.8, -1.8, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="overflow-hidden rounded-xl"
        >
          <img
            src="/images/couple-boat.png"
            alt="Bengali couple on a decorated boat"
            className="w-full h-auto object-contain"
            style={{ mixBlendMode: 'multiply' }}
            loading="lazy"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center font-bangla text-base text-maroon font-semibold mt-3"
        >
          একসাথে জীবনের নৌকায় ভেসে চলা
        </motion.p>
        <p className="text-center font-elsie text-xs italic text-ink/60 mt-0.5">
          Sailing through life together
        </p>
      </motion.div>
    </section>
  )
}

export default Timeline
