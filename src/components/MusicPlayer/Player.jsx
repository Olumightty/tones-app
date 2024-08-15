import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { playPause } from '../../redux/features/playerSlice'

const Player = ({ setDuration, seekTime, setCurrentAudioTime, volume, setVolume, isMuted }) => {
    const { isPlaying, activeSong } = useSelector(state => state.player)

    
    const dispatch = useDispatch()
    const audioRef = useRef(null)

    //we use a useEffect hook to implement play and pause for the audio only when isPlaying changes since the audioref variable has to be mouted first with audio tag before we can actively set it to pause or play
    if(audioRef.current){
        if(isPlaying){
            audioRef.current.play()
        }
        else{
            audioRef.current.pause()
        }
    }

    useEffect(()=> {
        audioRef.current.currentTime = seekTime
    }, [seekTime])

    useEffect(()=> {
        audioRef.current.volume = volume / 100 //note, the set volume must be between 0 or 1
    }, [volume])
    
    
    return (
        <div className=''>
            <audio 
                muted={isMuted} 
                onVolumeChange={(e) => setVolume(audioRef.current.volume * 100)} 
                onTimeUpdate={(e) => setCurrentAudioTime(e.target.currentTime)} 
                ref={audioRef} 
                onLoadedData={(e) => setDuration(audioRef.current.duration)} 
                onEnded={(e) => dispatch(playPause(false))} 
                loop={false} 
                src={activeSong.activeSongAudio}></audio>
        </div>
    )
}

export default Player