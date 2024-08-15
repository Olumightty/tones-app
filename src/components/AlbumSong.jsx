import React from 'react'
import { Link } from 'react-router-dom'

const AlbumSong = ({album, song}) => {
  return (
    <>
        {album &&
            <div className='w-[200px] md:w-[300px]'>
                <Link to={`/album/${album.id}`}><img className='rounded-xl min-w-[200px] mb-4 cursor-pointer hover:opacity-60 hover:scale-[1.1] transition' src={album.attributes?.artwork?.url.replace("{w}", "200").replace("{h}", "200")} alt={album.attributes?.name} /></Link>
                <div className='cursor-pointer'>
                    <Link to={`/album/${album.id}`}><h1 className='font-Poppins text-sm font-semibold text-grey hover:underline'>{album.attributes?.name}</h1></Link>
                    <p className='font-Poppins text-xs text-grey'>{album.attributes?.releaseDate.slice(0,4)}</p>
                </div>
            </div>
        }  
        {song &&
            <div className='w-[200px] md:w-[300px]'>
                <Link to={`/song/${song.id}`}><img className='rounded-xl min-w-[200px] mb-4 hover:opacity-60 hover:scale-[1.1] transition' src={song.attributes?.artwork?.url.replace("{w}", "200").replace("{h}", "200")} alt={song.attributes?.name} /></Link>
                <div className=''>
                    <Link to={`/song/${song.id}`}><h1 className='font-Poppins text-sm font-semibold text-grey hover:underline'>{song.attributes?.name}</h1></Link>
                    <p className='font-Poppins text-xs text-grey'>{song.attributes?.releaseDate.slice(0,4)}</p>
                </div>
            </div>
        }  
    </>
    
  )
}

export default AlbumSong