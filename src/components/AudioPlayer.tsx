import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

function AudioPlayer({ isPlaying, onToggle }: { isPlaying: boolean; onToggle: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pulsing glow ring while music plays */}
      {isPlaying && (
        <motion.span
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.5), transparent 70%)' }}
        />
      )}
      <motion.button
        type="button"
        onClick={onToggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-ink/85 text-cream shadow-lg backdrop-blur-sm"
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={isPlaying ? { duration: 6, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>
    </div>
  )
}

export default AudioPlayer
