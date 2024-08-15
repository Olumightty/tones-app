import React from 'react'
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import { FaShuffle, FaRepeat } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { playPause } from '../../redux/features/playerSlice';


const Controls = () => {
    const { isPlaying } = useSelector(state => state.player)
    const dispatch = useDispatch()
  return (
    <div className='flex gap-4'>
        <FaShuffle color='#EAE1E1' size={20} />
        <FaStepBackward color='#EAE1E1' size={20} />
        <div>
            {isPlaying 
                ? <FaPause color='#EAE1E1' onClick={() => dispatch(playPause(false))} size={20} /> 
                :<FaPlay color='#EAE1E1' onClick={() => dispatch(playPause(true))} size={20} />
            }
            
            
        </div>
        <FaStepForward color='#EAE1E1' size={20}/>
        <FaRepeat color='#EAE1E1' size={20} />
    </div>
  )
}

export default Controls