import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { playPause, setActiveSong, setQueue } from '../../redux/features/playerSlice'

const Player = ({ setDuration, seekTime, setCurrentAudioTime, volume, setVolume, isMuted, repeat, shuffle, gotoNext, gotoPrev, setGotoNext, setGotoPrev }) => {
    const { isPlaying, activeSong, queue } = useSelector(state => state.player)

    
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

    useEffect(()=>{
        if(gotoNext){
            nextSong()
            setGotoNext(false)

        }
        if(gotoPrev){
            prevSong()
            setGotoPrev(false)
        }
    }, [gotoNext, gotoPrev])

    // const shuffleQueue = () => {
    //     function shuffleArray(array) {
    //         for (let i = array.length - 1; i > 0; i--) {
    //             const j = Math.floor(Math.random() * (i + 1));
    //             [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    //         }
    //         return array;
    //     }

    //     const shuffledQueue = shuffleArray(queue.data)
    //     dispatch(setQueue())
        
    // }
    const prevSong = () =>{
        dispatch(playPause(false))
        if (activeSong.index > 0) {
            dispatch(setActiveSong(queue.data[activeSong.index - 1])) 
            dispatch(playPause(true));
        }
        else{
            audioRef.current.load()
        }
    }

    const nextSong = () => {
        dispatch(playPause(false))
        if(shuffle){
            dispatch(setActiveSong(queue.data[Math.floor(Math.random() * queue.data.length)]))
            dispatch(playPause(true))
        }
        else{
            if(queue.data.length > 1){
                if (activeSong.index < queue.data.length-1) {
                    dispatch(setActiveSong(queue.data[activeSong.index + 1])) 
                    dispatch(playPause(true));
                }
                else{
                    dispatch(setActiveSong(queue.data[0]))
                    dispatch(playPause(true));
                }
            } 
        }
        
    }


    return (
        <div className=''>
            <audio 
                muted={isMuted} 
                onVolumeChange={(e) => setVolume(audioRef.current.volume * 100)} 
                onTimeUpdate={(e) => setCurrentAudioTime(e.target.currentTime)} 
                ref={audioRef} 
                onLoadedData={(e) => setDuration(audioRef.current.duration)} 
                onEnded={nextSong} 
                loop={repeat} 
                src={activeSong.activeSongAudio}></audio>
        </div>
    )
}

export default Player