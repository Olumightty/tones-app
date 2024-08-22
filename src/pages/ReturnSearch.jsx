import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetSearchQuery } from '../redux/services/apiCore'
import Loader from '../components/Loader'
import { data } from '../assets/data'
import { ArtistList, Tracklist } from '../components/SongData'
import Error from '../components/Error'



const ReturnSearch = () => {
    const [option, setOption] = useState('Tracks')
    const { pathname } = useLocation()
    const term = pathname.split('/')[2]

    const {data, isFetching, error} = useGetSearchQuery(term)

    if(isFetching) return <Loader/>

    if(error) return <Error/>
    
    
    return (
        <div className='px-8 pt-8'>
            <div className='pb-4'>
                <ul className='flex items-center gap-4'>
                    <li onClick={(e) => setOption(e.target.textContent)} className={`font-Roboto font-bold cursor-pointer ${option == 'Tracks' ? 'text-dullWhite border-b-2 border-dullWhite' : 'text-grey'}`}>Tracks</li>
                    <li onClick={(e) => setOption(e.target.textContent)} className={`font-Roboto font-bold cursor-pointer ${option == 'Artists' ? 'text-dullWhite border-b-2 border-dullWhite' : 'text-grey'}`}>Artists</li>
                </ul>
            </div>
            {option == 'Artists'
                ? <ArtistList data={data.artists.hits}/>
                : <Tracklist data={data.tracks.hits}/>
            }
        </div>
    )
}

export default ReturnSearch