import React from 'react'
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import { FaShuffle, FaRepeat } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { playPause } from '../../redux/features/playerSlice';


const Controls = ({setRepeat, setShuffle, setGotoNext, setGotoPrev, shuffle, repeat}) => {
    const { isPlaying } = useSelector(state => state.player)
    const dispatch = useDispatch()
  return (
    <div className='flex gap-4'>
        <FaShuffle onClick={() => setShuffle(!shuffle)} className='cursor-pointer' color={shuffle? '#FFC94A' : '#EAE1E1'} size={20} />
        <FaStepBackward onClick={() => setGotoPrev(true)} className='cursor-pointer' color='#EAE1E1' size={20} />
        <div>
            {isPlaying 
                ? <FaPause className='cursor-pointer' color='#EAE1E1' onClick={() => dispatch(playPause(false))} size={20} /> 
                :<FaPlay className='cursor-pointer' color='#EAE1E1' onClick={() => dispatch(playPause(true))} size={20} />
            }
            
            
        </div>
        <FaStepForward onClick={() => setGotoNext(true)} className='cursor-pointer' color='#EAE1E1' size={20}/>
        <FaRepeat onClick={() => setRepeat(!repeat)} className='cursor-pointer' color={repeat? '#FFC94A' : '#EAE1E1'} size={20} />
    </div>
  )
}

export default Controls