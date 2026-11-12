import { motion } from 'framer-motion'
import { couple } from '../data'
import AmbientVideo from './AmbientVideo'

function Header() {
  return (
    <section className="relative pb-12 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative h-36 w-full overflow-hidden sm:h-48"
      >
        <AmbientVideo
          src="/videos/pexels-marigold-invitation.mp4"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(255,252,245,0.04) 25%, var(--color-cream) 100%)' }}
          aria-hidden="true"
        />
      </motion.div>

      <div className="mx-auto max-w-2xl px-6 pt-6 sm:pt-8">
        {/* Auspicious Lord Ganesha Motif with Animated Golden Halo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mx-auto mb-4 flex justify-center"
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing Sacred Golden Aura */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 -m-3 rounded-full blur-md pointer-events-none"
              style={{
                background: 'radial-gradient(circle, #ffd700 0%, #ff9933 50%, transparent 75%)',
              }}
              aria-hidden="true"
            />
            {/* Rotating Sunburst / Mandala Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 rounded-full border border-dashed border-gold-light/60 pointer-events-none"
              aria-hidden="true"
            />
            {/* Lord Ganesha Image */}
            <motion.img
              src="/images/ganesh.jpg"
              alt="Lord Ganesha"
              className="relative h-24 w-24 sm:h-28 sm:w-28 object-contain rounded-full border-2 border-gold-light/60 shadow-md bg-cream"
              style={{ mixBlendMode: 'multiply' }}
              whileHover={{ scale: 1.08 }}
            />
          </div>
        </motion.div>

        <p className="font-bangla text-sm text-maroon/75">{couple.blessing}</p>

        {/* Auspicious Shubho Bibaho Banner with Animated Diyas */}
        <div className="mt-3 flex items-center justify-center gap-3">
          <motion.span
            animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xl filter drop-shadow-[0_0_8px_rgba(255,153,51,0.8)]"
          >
            🪔
          </motion.span>
          <p className="font-bangla text-2xl font-bold text-vermilion tracking-wide">
            শুভ বিবাহ
          </p>
          <motion.span
            animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="text-xl filter drop-shadow-[0_0_8px_rgba(255,153,51,0.8)]"
          >
            🪔
          </motion.span>
        </div>
        <div className="mx-auto my-4 flex max-w-xs items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-gold-light" />
          <span className="text-xs text-vermilion">✿</span>
          <span className="h-px flex-1 bg-gold-light" />
        </div>

        <h1 className="font-script text-6xl leading-[1.08] text-maroon sm:text-7xl">
          <span className="block">{couple.brideName}</span>
          <span className="my-1 block font-serif text-2xl text-gold-dark">&amp;</span>
          <span className="block">{couple.groomName}</span>
        </h1>
        <p className="mt-3 font-bangla text-lg text-ink/80">
          {couple.brideBangla} ও {couple.groomBangla}
        </p>

        <div className="mx-auto mt-6 inline-flex items-center gap-3 border-y border-maroon/20 py-2 font-serif text-xs uppercase tracking-[0.2em] text-maroon/80">
          <span>Sunday</span>
          <span className="text-gold-dark" aria-hidden="true">✦</span>
          <time dateTime="2026-12-13">13 December 2026</time>
        </div>

        <p className="mx-auto mt-5 max-w-md font-serif text-sm italic text-ink/65">
          {couple.quote}
        </p>
      </div>
    </section>
  )
}

export default Header