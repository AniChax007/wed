import { Volume2, VolumeX } from 'lucide-react'

function AudioPlayer({ isPlaying, onToggle }: { isPlaying: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-ink/85 text-cream shadow-lg backdrop-blur-sm transition active:scale-95"
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  )
}

export default AudioPlayer
