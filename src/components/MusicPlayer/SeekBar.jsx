import React, { useEffect, useRef } from 'react'


const SeekBar = ({ duration, setSeekTime, currentAudioTime }) => {
  const seekRef = useRef()
  const remainingMinutes = Math.max(0, Math.floor((duration -currentAudioTime)/60))
  const remainingSeconds = Math.max(0, Math.round((duration -currentAudioTime) % 60))
  
  useEffect(() => {
    seekRef.current.value = currentAudioTime
  }, [currentAudioTime])
  //Note: Any change in state will affect every variableconcerning that state no matter what
  const currentMinutes = Math.floor(currentAudioTime/60)
  const currentSeconds = Math.round(currentAudioTime % 60)

  //This is to ensure that during calculation of remaining minutes and seconds, it will not fall below 0
  return (
    <div className='flex items-center gap-2'>
      <span className='font-Roboto text-dullWhite text-[12px] sm:text-[16px]'>{`${currentMinutes < 10 ? '0' + currentMinutes : currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`}</span>
      <input 
        ref={seekRef} 
        className='p-0 h-1 max-md:max-w-[200px] lg:w-[500px] sm:w-[350px]'
        type="range" 
        min={0} 
        max={duration} 
        onInput={(e) => setSeekTime(e.target.value)}  />
      <span className='font-Roboto text-dullWhite text-[12px] sm:text-[16px]'>{`${remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`}</span>
    </div>
    
  )
}

export default SeekBar