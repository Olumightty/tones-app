import React from 'react'
import SongElement from './SongElement'
import ArtistElement from './ArtistElement'


//Get either the returned artists or returned songs from search

export const ArtistList = ({data}) => {
  // console.log(data)
  return (
    <div className='mt-4 overflow-scroll removeScrollbar flex  flex-wrap gap-8'>
      {data.map((artist, index) => <ArtistElement key={index} artist={artist}/>)}
    </div>
  )
}



export const Tracklist = ({data}) => {
  // console.log(data)

  
  return (
    <div className='overflow-scroll h-[68vh] removeScrollbar'>
        {data.map((track, index) => <SongElement key={index} index ={index} track={track}/>)}
    </div>
  )
}