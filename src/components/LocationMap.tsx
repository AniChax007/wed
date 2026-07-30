import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { venue } from '../data'

function LocationMap() {
  return (
    <section className="px-6 py-16 text-center">
      <h2 className="font-script text-4xl text-ink">Venue</h2>
      <p className="mt-2 font-serif text-xl text-ink">{venue.name}</p>
      <p className="text-sm text-ink/70">{venue.address}</p>

      <div className="mx-auto mt-6 max-w-md overflow-hidden rounded-2xl border border-gold-light shadow-sm">
        <iframe
          title="Venue location"
          src={venue.mapsEmbedUrl}
          width="100%"
          height="220"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>

      <motion.a
        href={venue.mapsUrl}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2 font-serif font-semibold text-cream shadow-sm hover:brightness-105"
      >
        <MapPin size={18} /> Open in Maps
      </motion.a>
    </section>
  )
}

export default LocationMap
