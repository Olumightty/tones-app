import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setActiveSong, playPause } from '../redux/features/playerSlice'
import { FaPlay } from 'react-icons/fa6'
import MusicPlaying from './MusicPlaying'
import { useLocation } from 'react-router'

const SongRow = ({song, artistId}) => {
    const {pathname} = useLocation()
    const [empty, route, id] = pathname.split('/') // in order to get the artistId as it is not in the album data
    const minutes = Math.max(0, Math.floor((song.attributes?.durationInMillis)/60000))
    const seconds = Math.max(0, Math.round((song.attributes?.durationInMillis)/1000)%60 )
    const [isHovering, setIsHovering] = useState(false)
    const { activeSong } = useSelector(state => state.player)
    const dispatch = useDispatch()
    function handlePlayPause(){
        dispatch(playPause(true))
        dispatch(setActiveSong({ //this also will be in tr component
          id: song.id,
          title: song.attributes?.name,
          artist: song.attributes?.artistName,
          audio: song.attributes?.previews[0]?.url,
          artistId: route == 'album' ? artistId : song.relationships?.artists?.data[0]?.id,
          imageUrl: song.attributes?.artwork?.url.replace("{w}", "400").replace("{h}", "400"),
        }))
      }
  return(
    <tr
        onMouseOver={() => setIsHovering(true)} 
        onMouseLeave={() => setIsHovering(false)} 
        className={`h-[100px]  cursor-pointer hover:bg-navy ${activeSong.activeSongId == song.attributes?.playParams?.id && 'bg-navy'}`}
    >
        <td className='pl-2 pr-2 w-[5%]'>
            {activeSong.activeSongId == song.attributes?.playParams?.id
                ? <MusicPlaying/>
                : isHovering 
                    ? <FaPlay onClick={handlePlayPause}  color='white'/>
                    : song.attributes?.trackNumber
                }
        </td>
        <td className=''>
            <p className='text-white max-w-[80px]  sm:max-w-[150px] lg:max-w-[350px] md:max-w-[200px] lg:w-[300px]  lg:text-wrap overflow-hidden text-nowrap text-ellipsis'>{song.attributes?.name}</p>
            <span>{song.attributes?.artistName}</span>
        </td>
        <td className='w-[25%] es:max-w-[50px]   md:text-wrap md:w-[25%] overflow-hidden text-ellipsis text-nowrap'>{song.attributes?.albumName}</td>
        <td className='w-[25%] es:max-w-[50px]  md:text-wrap md:w-[25%] overflow-hidden text-ellipsis text-nowrap'>{song.attributes?.genreNames[0]}</td>
        <td className='text-right w-[5%]'>{`${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</td>
    </tr>
  )
}

export default SongRow