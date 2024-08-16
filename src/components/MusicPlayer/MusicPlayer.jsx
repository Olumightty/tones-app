import React, { useDebugValue, useState } from 'react'
import Controls from './Controls'
import Player from './Player'
import SeekBar from './SeekBar'
import TrackInfo from './TrackInfo'
import VolumeBar from './VolumeBar'
import { PiQueueBold } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux'
import { showQueue } from '../../redux/features/playerSlice'

const MusicPlayer = () => {
  const [duration, setDuration] = useState(0)
  const [seekTime, setSeekTime] = useState(0)
  const [currentAudioTime, setCurrentAudioTime] = useState(0)
  const [volume, setVolume] = useState(30)
  const [isMuted, setIsMuted] = useState(false)
  const [gotoNext, setGotoNext] = useState(false)
  const [gotoPrev, setGotoPrev] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const dispatch = useDispatch()
  const {queue} = useSelector(state => state.player)
  return (
    <div className='grid grid-cols-6 h-[10vh] items-center absolute bottom-0 px-4 py-2 w-full box-border rounded-xl bg-gradientPurple'>
        <TrackInfo/>
        <div className='flex flex-col items-center col-span-4'>
          <Controls
            setGotoNext={setGotoNext}
            setShuffle={setShuffle}
            setRepeat={setRepeat}
            setGotoPrev={setGotoPrev}
            repeat={repeat}
            shuffle={shuffle}
          />
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
            gotoNext={gotoNext}
            setGotoNext={setGotoNext}
            gotoPrev = {gotoPrev}
            setGotoPrev={setGotoPrev}
            shuffle={shuffle}
            repeat={repeat}
          />
        </div>
        <div className='flex items-center gap-4 justify-self-end'>
          <PiQueueBold 
            className='cursor-pointer hover:bg-navy rounded-xl' 
            onClick={() => dispatch(showQueue(!queue.isShowing))} 
            color={queue.isShowing? '#FFC94A' : '#EAE1E1'}
            size={25}
          />
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