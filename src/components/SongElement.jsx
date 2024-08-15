import React, { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import MusicPlaying from './MusicPlaying'
import { useSelector } from 'react-redux'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import { useDispatch } from 'react-redux'
import { useGetSongQuery } from '../redux/services/apiCore'

const SongElement = ({index, track}) => {
  const [isHovering, setIsHovering] = useState(false)
  const { activeSong } = useSelector(state => state.player) //for the song to remain highlighted

  const dispatch = useDispatch()

//   const {data, isFetching, error} = useGetSongQuery(track?.track?.hub?.actions[0]?.id)


  function handlePlayPause(){
      dispatch(playPause(true))
      dispatch(setActiveSong({
        id: track?.track?.hub?.actions[0]?.id,
        title: track?.track?.title,
        artist: track?.track?.subtitle,
        audio: track?.track?.hub?.actions[1]?.uri,
        artistId: track?.track?.artists[0]?.adamid,
        imageUrl: track?.track?.images?.coverart,
      }))
    //   console.log(data)
  }
   
  return (
    <div onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className={`flex items-center gap-8 mb-4 mt-4 cursor-pointer hover:bg-navy px-4 py-2 ${activeSong.activeSongId == track?.track?.hub?.actions[0]?.id && 'bg-navy'}`}>
        <div className='w-6'>
            {activeSong.activeSongId == track?.track?.hub?.actions[0]?.id
                ? <MusicPlaying/>
                : isHovering 
                    ? <FaPlay onClick={handlePlayPause} color='white'/>
                    : <span className='text-white font-Poppins font-bold text-lg'>{index +1}</span>
            }
        </div>
        <div className='flex items-center gap-4'>
            <img className='w-[80px] rounded-lg' src={track?.track?.images?.coverart} alt="" />
            <div>
                <p className='text-white font-Poppins font-bold text-lg hover:text-gold'><Link to={`/song/${track?.track?.hub?.actions[0]?.id}`}>{track?.track?.title}</Link></p>
                <span className='text-grey font-Poppins hover:text-purpleish '><Link to={`/artist/${track?.track?.artists[0]?.adamid}`}>{track?.track?.subtitle}</Link></span>
            </div>
        </div>
    </div>
  )
}

export default SongElement