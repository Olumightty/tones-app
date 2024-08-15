import React, { useState } from 'react'
import AlbumSong from './AlbumSong'
import { SpaceIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Discography = ({data, albumIds, songIds, setSongView}) => {
    const [option, setOption] = useState('albums')
    function shuffleArray(array) {
        const shuffledArray = array.slice(); // Create a copy of the array
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      }
    const shuffleASongIds = shuffleArray(songIds) //Prevent the same array of songs from showing up on each view by shuffling them
    const randomIndex = Math.floor(Math.random() * (songIds.length - 10)+1)
    
  return (
    <div className='py-8 font-Poppins text-lg font-semibold text-grey mb-4'>
        <div className='flex gap-2 items-baseline'>
            <div className='flex gap-8'>
                <button onClick={() => setOption('albums')} className={`${option == 'albums' && 'border-b-2 border-gold text-dullWhite'} `}>Albums</button>
                <button onClick={() => setOption('songs')} className={`${option == 'songs' && 'border-b-2 border-gold text-dullWhite'} `}>Songs</button>
            </div>
            {option == 'songs' && <p className='text-sm' onClick={() => setSongView(true)}>(<span className='hover:underline cursor-pointer'>See More</span>)</p>}
            
        </div>
        <div className='flex overflow-scroll removeScrollbar xs:max-w-[66vw] sm:max-w-[68vw] md:max-w-[77vw] lg:max-w-[80vw] mt-4 gap-4'>
            {option == 'albums' &&
                albumIds.map((albumId) => <AlbumSong album={data.resources.albums[albumId]} key={albumId}/>)
            }
            {option =='songs' &&
                shuffleASongIds.slice(randomIndex,randomIndex+6).map((songId) => <AlbumSong song={data.resources.songs[songId]} key={songId}/>) // returns random 10 songs
            }
        </div>
    </div>
  )
}

export default Discography