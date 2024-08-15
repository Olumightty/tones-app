import React, { useState } from 'react'
import { topSongs } from '../assets/topSongs'
import { FaPlay } from 'react-icons/fa6'
import { useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import MusicPlaying from './MusicPlaying'
import { useGetTopSongsQuery } from '../redux/services/apiCore'
import Loader from './Loader'
import Error from './Error'

const TopSongs = () => {
  const { pathname } = useLocation()
  const [empty, route, id]= pathname.split('/')
  // const {data, isFetching, error} = useGetTopSongsQuery(id)

  // if(isFetching) return <Loader/>
  // if(error) return <Error/>
  // const topSongs = data
  return (
    <div className={`w-[70vw] md:w-[57vw] pr-8`}>
      <h1 className='font-Roboto text-xl text-white font-semibold mb-4'>Top Songs</h1>
      <div className='overflow-scroll removeScrollbar grid grid-flow-col grid-rows-3 gap-4 '>
          {
            topSongs.data.map((song, index) => (
              <SongBlock key={index} song={song} artistid={id}/>
             ))
          }
      </div>
    </div>
  )
}

const SongBlock = ({song, artistid}) =>{
    const dispatch = useDispatch()
    const {activeSong} = useSelector(state => state.player)
    function handlePlayPause(){
      dispatch(playPause(true))
      dispatch(setActiveSong({
        id: song.id,
        title: song?.attributes?.name,
        artist: song?.attributes?.artistName,
        audio: song?.attributes?.previews[0]?.url,
        artistId: artistid,
        imageUrl: imageUrl,
      }))
    }
    const [isHovering, setIsHovering] = useState(false)
    const imageUrl = song.attributes?.artwork?.url.replace("{w}", 50).replace("{h}", 50)
    return (
        <div 
          onMouseOver={() => setIsHovering(true)} 
          onMouseLeave={() => setIsHovering(false)} 
          className='flex gap-4 relative items-center border-grey border-b-[1px] w-[300px] cursor-default'
        >
            <img src={imageUrl} alt="" />
            <div>
                <h1 className='font-Poppins text-sm font-semibold text-grey '>{song?.attributes?.name}</h1>
                <p className='font-Poppins text-xs text-grey'>{song?.attributes?.artistName}</p>
            </div>
            {song.id == activeSong.activeSongId
              ? <div className='absolute left-4 cursor-pointer'><MusicPlaying/></div>
              : isHovering &&
                <FaPlay onClick={handlePlayPause} className='absolute left-4 cursor-pointer' color='#FFC94A' size={20}/>
            }
        </div>
    )
}


export default TopSongs