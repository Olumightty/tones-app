import React, { useEffect, useRef } from 'react'
import { FaVolumeUp, FaVolumeDown, FaVolumeOff, FaVolumeMute } from "react-icons/fa";


const VolumeBar = ({ volume, setVolume, isMuted, setIsMuted}) => {
  const volumeBarRef = useRef(null)

  useEffect(()=> {
    volumeBarRef.current.value = volume
  }, [volume])
  return (
    <div className='flex items-center'>
      <div onClick={() => setIsMuted(!isMuted)} className='flex justify-center w-[35px]'>
        {isMuted 
          ? <FaVolumeMute color='#EAE1E1' size={25} />
          : volume > 10 
            ? volume >= 60 
              ? <FaVolumeUp color='#EAE1E1' size={25} />
              : <FaVolumeDown color='#EAE1E1' size={25} />
            :<FaVolumeOff color='#EAE1E1' size={25} />
        }
      </div>
      <input 
        type="range" 
        min={0} max={100} 
        ref={volumeBarRef}
        className='p-0 h-[2px] w-[50px]'
        onInput={(e) => setVolume(e.target.value)} />
    </div>
    

  )
}

export default VolumeBar