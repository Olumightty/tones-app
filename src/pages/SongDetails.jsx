import React, { act, useEffect, useState } from 'react'
import {active}  from '../assets/active'
import { useGetSongQuery } from '../redux/services/apiCore'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import SongRow from '../components/SongRow'
import { Clock10 } from 'lucide-react'
import Error from '../components/Error'
import { useDispatch } from 'react-redux'
import { setQueue } from '../redux/features/playerSlice'

const SongDetails = () => {
  const { pathname } = useLocation()
  const term = pathname.split('/')[2]
  // const {data, isFetching, error} = useGetSongQuery(term)
  

  // if(isFetching) return <Loader/>

  // if(error) return <Error/>
  // const active = data
  const imageUrl = active.data[0]?.attributes?.artwork?.url.replace("{w}", "300").replace("{h}", "300")
  
  return (
    <div className='px-8 pt-8'>
      <div className='flex gap-4'>
        <section>
          <div className='flex items-center '>
            <img className='rounded-xl max-w-[200px] md:max-w-[300px]' src={imageUrl} alt={active.data[0]?.attributes?.name} />
          </div>
          <Link to={`/album/${active.data[0]?.relationships?.albums?.data[0]?.id}`}><button className='bg-gold p-2 rounded-xl mt-6 font-Roboto font-semibold hover:scale-110 transition-all'>View Full Album</button></Link>
          <div className='mt-4 max-w-[300px]'>
                <p className='font-Roboto text-dullWhite'>Composed by: <span className='text-grey'>{active.data[0]?.attributes?.composerName}</span></p>
                <p className='font-Roboto text-dullWhite'>Released: <span className='text-grey'>{active.data[0]?.attributes?.releaseDate}</span></p>
          </div>
        </section>
        
        <section className='flex flex-col relative'>
          <div className='mb-10'>
            <span className='text-lg font-Roboto font-semibold text-grey'>From</span>
            <h1 className='text-4xl md:text-7xl font-Poppins font-bold text-dullWhite'>{active.data[0]?.attributes?.albumName}</h1>
          </div>
          <Table songs={active.data} artistId={active.data[0]?.relationships?.artists?.data[0]?.id}/>
        </section>
      </div>
    </div>
  )
}

export const Table = ({songs, artistId}) =>{
  const [playFromAlbum, setPlayFromAlbum] = useState(false)
  const dispatch = useDispatch()

  // const newQueue = () =>{
  //   dispatch(setQueue({ //this also will be in tr component
  //     id: song.id,
  //     title: song.attributes?.name,
  //     artist: song.attributes?.artistName,
  //     audio: song.attributes?.previews[0]?.url,
  //     artistId: route == 'album' ? artistId : song.relationships?.artists?.data[0]?.id,
  //     imageUrl: song.attributes?.artwork?.url.replace("{w}", "400").replace("{h}", "400"),
  //   }))
  // }

  useEffect(() => {
    playFromAlbum
      ? dispatch(setQueue(songs.map((song, index) => {
          return {
            index,
            id: song.id,
            title: song.attributes?.name,
            artist: song.attributes?.artistName,
            audio: song.attributes?.previews[0]?.url,
            artistId: artistId,
            imageUrl: song.attributes?.artwork?.url.replace("{w}", "400").replace("{h}", "400"),
          }
        })))
      : null
      setPlayFromAlbum(false)
  }, [playFromAlbum])
  
  return(
    <table className='table-fixed ss:w-full  h-fit mb-4 overflow-scroll md:w-full'>
      <thead className='text-left font-semibold font-Roboto text-gold border-b-2 border-grey h-10 block'>
        <tr>
          <th className='w-[5%] pl-2'>#</th>
          <th className='w-[40%]  lg:min-w-[300px]'>Song Title</th>
          <th className='w-[25%]'>Album</th>
          <th className='w-[25%]'>Genre</th>
          <th className='w-[5%] pl-[18.5px]'><Clock10 /></th>
        </tr>
      </thead>
      <tbody className='font-Roboto text-grey font-semibold overflow-scroll removeScrollbar h-[38vh] md:h-[68vh] block'>
          {songs.map((song, index) => <SongRow setPlayFromAlbum={setPlayFromAlbum} artistId={artistId} key={index} song={song} index={index}/>)}
      </tbody>
    </table>
          

  )
}

export default SongDetails