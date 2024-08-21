import { X } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { playPause, setActiveSong } from '../redux/features/playerSlice'

const QueueSong = ({song, deleteFromQueue}) => {
    const dispatch = useDispatch()


    const nextOnQueue = () => {
        dispatch(setActiveSong({
            index: song.index,
            id: song?.id,
            title: song?.title,
            artist: song?.artist,
            audio: song?.audio,
            artistId: song.artistId,
            imageUrl: song.imageUrl,
        }))
        dispatch(playPause(true))
    }
    
  return (
    <div className={`flex items-center justify-between pr-4 hover:bg-gradientNavyLighter`}>
        <div onClick={nextOnQueue} className='flex flex-col p-4 max-w-[200px]'>
            <p className='text-dullWhite font-Roboto text-[14px] font-semibold text-ellipsis overflow-hidden text-nowrap'>{song.title}</p>
            <p className='text-grey font-Roboto text-[12px] font-semibold'>{song.artist}</p>
        </div>
        <X onClick={()=> deleteFromQueue(song.id)} color='white' size={16} className='hover:opacity-80'/>
    </div>
  )
}

export default QueueSong