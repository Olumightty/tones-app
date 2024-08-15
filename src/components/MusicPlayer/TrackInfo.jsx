import React from 'react'
import image from '../../assets/broken.jpg'
import { useSelector } from 'react-redux'
import svg from '../../assets/defaultart.svg'
import { Link } from 'react-router-dom'


const TrackInfo = () => {
  const {isPlaying, activeSong} = useSelector(state => state.player)
  return (
    <div className='flex gap-2 items-center'>
      <div className='flex justify-center w-[60px] items-center'>
        <img className={`${isPlaying ? 'animate-disc-spin' : null} rounded-full w-[60px] `} src={activeSong.activeSongId ?activeSong.imageUrl : svg} alt="Album Art" />
      </div>
      {
        activeSong.activeSongId &&
        <div>
          <p className='font-Poppins font-bold text-white overflow-hidden text-ellipsis text-nowrap max-w-[110px]'><Link to={`/song/${activeSong.activeSongId}`}>{activeSong.activeSongTitle}</Link></p>
          <p className='font-Poppins text-grey text-sm'><Link to={`/artist/${activeSong.activeArtistId}`}>{activeSong.activeSongArtist}</Link></p>
        </div>
      }
    </div>
  )
}

export default TrackInfo