import React, { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import MusicPlaying from './MusicPlaying'
import { useSelector } from 'react-redux'
import { playPause, setActiveSong, setQueue } from '../redux/features/playerSlice'
import { useDispatch } from 'react-redux'
import { useGetSongQuery } from '../redux/services/apiCore'
import MiniMenu from './MiniMenu'

const SongElement = ({index, track}) => {
  const [isHovering, setIsHovering] = useState(false)
  const { activeSong } = useSelector(state => state.player) //for the song to remain highlighted

  const dispatch = useDispatch()

//   const {data, isFetching, error} = useGetSongQuery(track?.track?.hub?.actions[0]?.id)

  //this is the song we will be using
  const songToAdd = {
    // index: queue.data.length,
    id: track?.track?.hub?.actions[0]?.id,
    title: track?.track?.title,
    artist: track?.track?.subtitle,
    audio: track?.track?.hub?.actions[1]?.uri,
    artistId: track?.track?.artists[0]?.adamid,
    imageUrl: track?.track?.images?.coverart,
  }
  function handlePlayPause(song){
      song.index = 0
      dispatch(playPause(true))
      dispatch(setQueue([song]))
      dispatch(setActiveSong(song))
    //   console.log(data)
  }
   
  return (
    <div 
      onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} 
      className={`w-[calc(100vw-100px)] flex items-center relative gap-2 sm:gap-8 mb-4 mt-4 cursor-pointer hover:bg-navy px-2 py-2 ${activeSong.activeSongId == track?.track?.hub?.actions[0]?.id && 'bg-navy'}`}
    >
        <div className='w-6'>
            {activeSong.activeSongId == songToAdd.id
                ? <MusicPlaying/>
                : isHovering 
                    ? <FaPlay onClick={() => handlePlayPause(songToAdd)} color='white'/>
                    : <span className='text-white font-Poppins font-bold text-lg'>{index +1}</span>
            }
        </div>
        <div className='flex items-center gap-2 sm:gap-4'>
            <img className='w-[40px] sm:w-[80px] rounded-lg' src={songToAdd.imageUrl} alt="" />
            <div>
                <p className='text-white font-Poppins font-bold text-lg hover:text-gold sm:text-wrap max-sm:max-w-[100px] text-nowrap overflow-hidden text-ellipsis'>
                  <Link to={`/song/${songToAdd.id}`}>{songToAdd.title}</Link>
                </p>
                <span className='text-grey font-Poppins hover:text-purpleish '><Link to={`/artist/${songToAdd.artistId}`}>{songToAdd.artist}</Link></span>
            </div>
        </div>
        <MiniMenu song={songToAdd}/>
    </div>
  )
}

export default SongElement