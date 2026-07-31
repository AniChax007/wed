import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'
import { venue } from '../data'

function LocationMap() {
  return (
    <section
      className="relative px-6 py-16 text-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fef9f0 0%, #fdf3e2 50%, #fef9f0 100%)',
      }}
    >
      {/* Decorative banana trees */}
      <motion.img
        src="/images/banana-tree.png"
        alt=""
        aria-hidden="true"
        className="absolute -left-4 bottom-0 w-20 opacity-15 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        viewport={{ once: true }}
        style={{ filter: 'saturate(0.6)' }}
      />
      <motion.img
        src="/images/banana-tree.png"
        alt=""
        aria-hidden="true"
        className="absolute -right-4 bottom-0 w-20 opacity-15 pointer-events-none -scale-x-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        viewport={{ once: true }}
        style={{ filter: 'saturate(0.6)' }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-script text-4xl text-ink"
      >
        Event Venues
      </motion.h2>

      {/* Venues Grid */}
      <div className="mx-auto mt-6 flex flex-col gap-6 max-w-md">
        {/* Marriage Venue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-5 text-left border border-gold-light/40 bg-white/70 shadow-md relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-dark bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">
              Marriage &amp; Haldi Venue
            </span>
            <span className="text-xs text-ink/50 font-serif">13th Dec</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-maroon">
            {venue.marriageName}
          </h3>
          <p className="text-xs text-ink/70 mt-0.5">{venue.marriageAddress}</p>

          <div className="mt-3 overflow-hidden rounded-xl shadow-inner border border-gold-light/30">
            <iframe
              title="Marriage Venue Map"
              src={venue.mapsEmbedUrl}
              width="100%"
              height="150"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>

          <motion.a
            href={venue.mapsUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl py-2 px-4 font-serif font-bold text-xs text-cream shadow-sm"
            style={{
              background: 'linear-gradient(135deg, #7a1e34 0%, #5c0e24 100%)',
            }}
          >
            <MapPin size={14} /> Navigate to Marriage Hall
          </motion.a>
        </motion.div>

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
