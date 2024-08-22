import React from 'react'
import { useGetLatestReleaseQuery } from '../redux/services/apiCore'
import { latestRelease } from '../assets/latestRealease'
import { useLocation } from 'react-router'
import Loader from './Loader'
import Error from './Error'

const LatestRelease = () => {

  const { pathname } = useLocation()
  const [empty, route, id] = pathname.split('/')
  const {data, isFetching, error} = useGetLatestReleaseQuery(id)

  if(isFetching) return <Loader/>
  if(error) return <Error/>
  const latestRelease = data
  return (
    <div className=''> 
      <h1 className='font-Roboto text-xl text-white font-semibold mb-4'>Latest Release</h1>
      <div className='flex flex-col sm:flex-row gap-4'>
        <img className='rounded-xl max-w-[400px]' src={latestRelease.data[0]?.attributes?.artwork?.url.replace("{w}", "200").replace("{h}", "200")} alt="" />
        <section >
          <p className='text-white text-sm font-Poppins font-bold text-nowrap'>{latestRelease.data[0]?.attributes.releaseDate.slice(0,4)}</p>
          <p className='text-white text-sm font-Poppins font-bold xs:w-[150px]'>{latestRelease.data[0]?.attributes?.name}</p>
          <p className='text-white text-sm font-Poppins font-bold'>{latestRelease.data[0]?.attributes?.genreNames.map((genre, index) => <span key={index} className='text-grey font-Roboto mr-4 font-semibold'>{genre}</span>)}</p>
          <p className='text-grey text-sm font-Poppins font-bold'>Tracks: {latestRelease.data[0]?.attributes?.trackCount}</p>
        </section>                 
      </div>
    </div>
  )
}

export default LatestRelease