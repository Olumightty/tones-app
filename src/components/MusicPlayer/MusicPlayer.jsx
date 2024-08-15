import React, { useState } from 'react'
import Controls from './Controls'
import Player from './Player'
import SeekBar from './SeekBar'
import TrackInfo from './TrackInfo'
import VolumeBar from './VolumeBar'
import { PiQueueBold } from "react-icons/pi";

const MusicPlayer = () => {
  const [duration, setDuration] = useState(0)
  const [seekTime, setSeekTime] = useState(0)
  const [currentAudioTime, setCurrentAudioTime] = useState(0)
  const [volume, setVolume] = useState(30)
  const [isMuted, setIsMuted] = useState(false)
  return (
    <div className='grid grid-cols-6 h-[10vh] items-center absolute bottom-0 px-4 py-2 w-full box-border rounded-xl bg-gradientPurple'>
        <TrackInfo/>
        <div className='flex flex-col items-center col-span-4'>
          <Controls/>
          <SeekBar
            duration={duration}
            setDuration={setDuration}
            seekTime={seekTime}
            setSeekTime={setSeekTime}
            currentAudioTime={currentAudioTime}
          />
          <Player
            setDuration={setDuration}
            seekTime={seekTime}
            setCurrentAudioTime={setCurrentAudioTime}
            volume={volume}
            setVolume={setVolume}
            isMuted={isMuted}
          />
        </div>
        <div className='flex items-center gap-4 justify-self-end'>
          <PiQueueBold color='#EAE1E1' size={25}/>
          <VolumeBar
          volume={volume}
          setVolume={setVolume}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          />
        </div>
        
        
    </div>
  )
}

export default MusicPlayer