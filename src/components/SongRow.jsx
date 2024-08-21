import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setActiveSong, playPause } from '../redux/features/playerSlice'
import { FaPlay } from 'react-icons/fa6'
import MusicPlaying from './MusicPlaying'
import { TableCell, TableRow } from './ui/table'
import MiniMenu from './MiniMenu'

const SongRow = ({song, artistId, index, setPlayFromAlbum}) => {
    const minutes = Math.max(0, Math.floor((song.attributes?.durationInMillis)/60000))
    const seconds = Math.max(0, Math.round((song.attributes?.durationInMillis)/1000)%60 )
    const [isHovering, setIsHovering] = useState(false)
    const { activeSong } = useSelector(state => state.player)
    const dispatch = useDispatch()
    
    const songToAdd = {
        index,
        id: song.id,
        title: song.attributes?.name,
        artist: song.attributes?.artistName,
        audio: song.attributes?.previews[0]?.url,
        artistId: artistId,
        imageUrl: song.attributes?.artwork?.url.replace("{w}", "400").replace("{h}", "400"),
    }
    function handlePlayPause(song){
        setPlayFromAlbum(true)//this will dispatch the music array into the queue
        dispatch(playPause(true))
        dispatch(setActiveSong(song))
        
      }
  return(
    <TableRow
        onMouseOver={() => setIsHovering(true)} 
        onMouseLeave={() => setIsHovering(false)} 
        className={`h-[100px] border-none cursor-pointer hover:bg-navy ${activeSong.activeSongId == song.attributes?.playParams?.id && 'bg-navy'}`}
    >
        <TableCell className=' text-grey font-Poppins font-semibold'>
            {activeSong.activeSongId == song.attributes?.playParams?.id
                ? <MusicPlaying/>
                : isHovering 
                    ? <FaPlay onClick={() => handlePlayPause(songToAdd)}  color='white'/>
                    : song.attributes?.trackNumber
                }
        </TableCell>
        <TableCell className=''>
            <p className='text-white font-Poppins font-bold text-md max-w-[150px]  sm:max-w-[150px] lg:max-w-[350px] md:max-w-[200px] lg:w-[300px]  lg:text-wrap overflow-hidden text-nowrap text-ellipsis '>{song.attributes?.name}</p>
            <span className='text-grey font-Poppins font-semibold'>{song.attributes?.artistName}</span>
        </TableCell>
        <TableCell className='md:text-wrap overflow-hidden text-ellipsis text-nowrap text-grey font-Poppins font-semibold max-sm:max-w-[100px] max-xs:hidden'>{song.attributes?.albumName}</TableCell>
        <TableCell className='md:text-wrap overflow-hidden text-ellipsis text-nowrap text-grey font-Poppins font-semibold max-sm:hidden '>{song.attributes?.genreNames[0]}</TableCell>
        <TableCell className=' text-grey font-Poppins font-semibold'>{`${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</TableCell>
        <div className='absolute'>
            <MiniMenu song={songToAdd}/>
        </div>
    </TableRow>
  )
}

export default SongRow