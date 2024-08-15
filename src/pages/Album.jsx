import React from 'react'
import { useLocation } from 'react-router'
import { useGetAlbumQuery } from '../redux/services/apiCore'
import Loader from '../components/Loader'
import {album} from '../assets/dataalbum'
import { Table } from './SongDetails'
import { Link } from 'react-router-dom'
import Error from '../components/Error'

const Album = () => {
    const {pathname} = useLocation()
    const term = pathname.split('/')[2]
    // const {data, isFetching, error} = useGetAlbumQuery(term)
    // if(isFetching) return  <Loader/>
    // if(error) return <Error/>
    // console.log(data)
    // const album = data
    const imageUrl = album.data[0]?.attributes?.artwork?.url.replace("{w}", 300).replace("{h}", 300)
 
    return (
    <div className='px-8 pt-8 '>
        <div className='flex flex-col md:flex-row gap-4'>
            <div className='w-[200px] md:w-[300px] flex flex-row gap-4 md:flex-col md:max-h-fit md:mr-24'>
                <div className='flex w-[200px]  items-start'>
                    <img className='rounded-xl max-w-[200px] md:max-w-[250px] lg:max-w-[300px]' src={imageUrl} alt={album.data[0]?.attributes?.name} />
                </div>
                <section>
                    <div>
                        <h1 className='text-xl md:text-3xl font-Poppins font-bold text-dullWhite md:max-w-[550px]'>{album.data[0]?.attributes?.name}</h1>
                        {album.data[0]?.attributes?.genreNames.map((genre, index) => <span key={index} className='text-grey font-Roboto mr-4 font-semibold'>{genre}</span>)}
                    </div>
                    <p className=''>
                        <Link to={`/artist/${album.data[0]?.relationships?.artists?.data[0].id}`}><span className='font-Poppins text-gold mr-4 font-semibold'>{album.data[0]?.attributes?.artistName}</span></Link>
                        <span className='font-Poppins text-grey font-semibold'>Tracks: {album.data[0]?.attributes?.trackCount}</span>
                    </p>
                </section>
                <div className='mt-4 '>
                    <p className='font-Roboto text-dullWhite'><span className='text-grey'>{album.data[0]?.attributes?.recordLabel}</span></p>
                    <p className='font-Roboto text-dullWhite max-w-0 overflow-hidden  md:max-w-[200px] '><span className='text-grey'>{album.data[0]?.attributes?.copyright}</span></p>
                </div>
            </div>
            <Table songs={album.data[0]?.relationships?.tracks?.data} artistId={album.data[0]?.relationships?.artists?.data[0].id}/>
        </div>
    </div>
  )
}

export default Album