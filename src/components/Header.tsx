import { motion } from 'framer-motion'
import { couple } from '../data'

function Header() {
  return (
    <section className="relative pb-12 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative h-36 w-full overflow-hidden sm:h-48"
      >
        <video
          src="/videos/pexels-marigold-invitation.mp4"
          poster="/images/pexels-marigold-arrangement.jpeg"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(255,252,245,0.04) 25%, var(--color-cream) 100%)' }}
          aria-hidden="true"
        />
      </motion.div>

      <div className="mx-auto max-w-2xl px-6 pt-6 sm:pt-8">
        <p className="font-bangla text-sm text-maroon/75">{couple.blessing}</p>
        <p className="mt-3 font-bangla text-lg text-vermilion">শুভ বিবাহ</p>
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