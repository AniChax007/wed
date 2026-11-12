import { motion } from 'framer-motion'
import { Navigation } from 'lucide-react'
import { venue } from '../data'
import OrnamentalDivider from './OrnamentalDivider'

function LocationMap() {
  return (
    <section
      className="relative px-6 py-16 text-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fef9f0 0%, #fdf3e2 50%, #fef9f0 100%)',
      }}
    >
      {/* Decorative botanical accents */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 bottom-0 h-20 w-20 opacity-15"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        viewport={{ once: true }}
        style={{
          background: 'radial-gradient(circle at 50% 100%, rgba(97, 145, 79, 0.8), transparent 55%)',
          borderRadius: '50% 50% 0 0',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 bottom-0 h-20 w-20 opacity-15"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        viewport={{ once: true }}
        style={{
          background: 'radial-gradient(circle at 50% 100%, rgba(97, 145, 79, 0.8), transparent 55%)',
          borderRadius: '50% 50% 0 0',
          transform: 'scaleX(-1)',
        }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-script text-4xl text-ink"
      >
        Event Venues
      </motion.h2>
      <OrnamentalDivider />

      {/* Venues Grid */}
      <div className="mx-auto mt-6 max-w-md">
        {/* Reception Venue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl p-5 text-left border border-gold-light/40 bg-white/70 shadow-md relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-200">
              Reception Venue
            </span>
            <span className="text-xs text-ink/50 font-serif">15th Dec</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-maroon">
            {venue.receptionName}
          </h3>
          <p className="text-xs text-ink/70 mt-0.5">{venue.receptionAddress}</p>

          <div className="mt-3 overflow-hidden rounded-xl shadow-inner border border-gold-light/30">
            <iframe
              title="Reception Venue Map"
              src={venue.receptionMapsEmbedUrl}
              width="100%"
              height="150"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>

          <motion.a
            href={venue.receptionMapsUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl py-2 px-4 font-serif font-bold text-xs text-cream shadow-sm"
            style={{
              background: 'linear-gradient(135deg, #d4a12a 0%, #a67c10 100%)',
            }}
          >
            <Navigation size={14} /> Open Maity Palace on Maps
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default LocationMap
