import React from 'react'
import {active}  from '../assets/active'
import { useGetSongQuery } from '../redux/services/apiCore'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { Table } from '@/components/Table'

const SongDetails = () => {
  const { pathname } = useLocation()
  const term = pathname.split('/')[2]
  const {data, isFetching, error} = useGetSongQuery(term)
  

  if(isFetching) return <Loader/>

  if(error) return <Error/>
  const active = data
  const imageUrl = active.data[0]?.attributes?.artwork?.url.replace("{w}", "300").replace("{h}", "300")
  
  return (
    <div className='px-8 pt-8'>
      <div className='flex gap-4'>
        <section>
          <div className='flex items-center '>
            <img className='rounded-xl max-w-[200px] md:max-w-[300px]' src={imageUrl} alt={active.data[0]?.attributes?.name} />
          </div>
          <Link to={`/album/${active.data[0]?.relationships?.albums?.data[0]?.id}`}>
            <button  
              className='bg-gold p-2 rounded-xl mt-6 font-Roboto font-semibold hover:scale-110 transition-all'
            >
              View Full Album
            </button>
          </Link>
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

export default SongDetails