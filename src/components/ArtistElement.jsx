import React from 'react'
import { Link } from 'react-router-dom'

const ArtistElement = ({artist}) => {
  return (
    <Link to={`/artist/${artist?.artist?.adamid}`} className='text-white hover:text-gold flex flex-col items-center w-[calc(100vw-100px)]'>
        <img className='w-[200px] rounded-[50%]' loading='lazy' src={artist?.artist?.avatar} alt={artist?.artist?.name} />
        <span className='font-bold font-Poppins'>{artist?.artist?.name}</span>
    </Link>
  )
}

export default ArtistElement