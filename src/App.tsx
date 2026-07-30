import { useRef, useState } from 'react'
import Envelope from './components/Envelope'
import { ENVELOPE_OPEN_MS } from './data'
import AudioPlayer from './components/AudioPlayer'
import Header from './components/Header'
import CouplePortrait from './components/CouplePortrait'
import Countdown from './components/Countdown'
import ClaspedHands from './components/ClaspedHands'
import Timeline from './components/Timeline'
import LocationMap from './components/LocationMap'
import Guidelines from './components/Guidelines'
import Petals from './components/Petals'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  function handleOpenEnvelope() {
    audioRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.log('Audio playback blocked:', err))
    setTimeout(() => setIsOpen(true), ENVELOPE_OPEN_MS)
  }

  function toggleAudio() {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="phone-card relative min-h-screen bg-cream">
      <audio ref={audioRef} src="/audio/wedding-song.mp3" loop />

      {!isOpen ? (
        <Envelope onOpen={handleOpenEnvelope} />
      ) : (
        <>
          <Petals />
          <Header />
          <CouplePortrait />
          <Countdown />
          <ClaspedHands />
          <Timeline />
          <LocationMap />
          <Guidelines />
          <AudioPlayer isPlaying={isPlaying} onToggle={toggleAudio} />
        </>
      )}
    </div>
  )
}

export default App
