import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { useGetSummaryQuery} from '../redux/services/apiCore'
import Loader from '../components/Loader'
import { data } from '../assets/dataart'
import { FaPlayCircle } from "react-icons/fa";
import { summary } from '../assets/summary'
import { useSelector, useDispatch } from 'react-redux'
import TopSongs from '../components/TopSongs'
import LatestRelease from '../components/LatestRelease'
import Discography from '../components/Discography'
import { playPause, setActiveSong, setQueue } from '../redux/features/playerSlice'
import { IoMdArrowBack } from "react-icons/io"
import { Link } from 'react-router-dom'
import { FaPlay } from 'react-icons/fa6'
import MusicPlaying from '../components/MusicPlaying'
import EditorialNotes from '../components/EditorialNotes'
import Error from '../components/Error'


const ArtistDetails = () => {
    const { pathname } = useLocation()
    const [empty, route, id] = pathname.split('/')
    const {windowWidth, activeSong} = useSelector(state => state.player)
    const [playFromSongView, setPlayFromSongView] = useState(false)
    const [songView, setSongView] = useState(false) // to be able to get full song list when user clicks 'See More' button 
    const dispatch = useDispatch()


    // const {data, isFetching, error} = useGetSummaryQuery(id)

    // if(isFetching) return <Loader/>

    // if(error) return <Error/>

    // const summary = data 

    //Picture on click, editoral note will be a modal 
    //Top songs
    //Latest release
    //Tabs for songs albums
    //Create a modal for artis editoral notes
    const artistID = Object.keys(summary.resources.artists)[0]
    const songsIds = Object.keys(summary.resources.songs)
    const albumIds = Object.keys(summary.resources.albums)
    //Get array of albumsID and songsID
    useEffect(() => {
        playFromSongView
          ? dispatch(setQueue(songsIds.map((songId, index) => {// dispatch to the queue
              return {
                index,
                id: songId,
                title: summary.resources?.songs[songId].attributes?.name,
                artist: summary.resources?.songs[songId].attributes?.artistName,
                audio: summary.resources?.songs[songId].attributes?.previews[0]?.url,
                artistId: id,
                imageUrl: summary.resources?.songs[songId].attributes?.artwork?.url.replace("{w}", "400").replace("{h}", "400"),
              }
            })))
          : null
          setPlayFromSongView(false)
      }, [playFromSongView])

    return (
        <div className={`pt-8 relative overflow-y-scroll h-[76vh]`}>
            {!songView
                ? <>

                    <div className='flex gap-8 bg-gradientTransparent flex-col-reverse sm:flex-row px-8 items-baseline pb-4 justify-between'>
                        <section className='flex  items-center'>
                            <button className='mr-4'><FaPlayCircle color='#758694' className='border-gold bg-gold border-2 rounded-full' size={50} /></button>
                            <h1 className='font-Poppins text-3xl font-semibold text-white '>{summary.resources.artists[artistID].attributes.name}</h1>
                        </section>
                        <img className='rounded-full w-[150px] sm:w-[200px] ' src={summary.resources.artists[artistID].attributes.artwork.url.replace("{w}", "200").replace("{h}", "200")} alt="" />
                    </div>
                    <div className='px-8 pt-8 bg-gradientMain'>
                        <div className='flex gap-8 flex-col justify-between  md:flex-row  '>
                            <LatestRelease/>
                            <TopSongs/>
                        </div>
                        {/* <div>
                            <h1 className='font-Poppins text-2xl font-semibold text-white mb-4'>Editorial Notes</h1>
                            <div className='text-xl text-white'>{summary.resources.artists[artistID].attributes.editorialNotes.standard}</div>
                        </div> */}
                        
                        <Discography data={summary} albumIds={albumIds} songIds={songsIds} setSongView={setSongView}/>
                    </div>
                    {/* <EditorialNotes note={summary.resources.artists[artistID].attributes.editorialNotes}/> */}
                </>
                :<>
                    
                    <IoMdArrowBack onClick={() => setSongView(false)} color='white' size={20} className='fixed top-10 left-[106px] cursor-pointer'/>
                    {songsIds.map((songId, index) => <SongBlock setPlayFromSongView={setPlayFromSongView} song={summary.resources.songs[songId]} key={songId} index={index} artistId={id}/>)}
                </>
                
            }
            
        </div>
    )
}

const SongBlock = ({song, index, artistId, setPlayFromSongView}) => {
    //For 'See More' page
    const [isHovering, setIsHovering] = useState(false)
    const { activeSong } = useSelector(state => state.player) //for the song to remain highlighted
    const minutes = Math.max(0, Math.floor((song.attributes?.durationInMillis)/60000))
    const seconds = Math.max(0, Math.round((song.attributes?.durationInMillis)/1000)%60 )
    const dispatch = useDispatch()
    const imageUrl = song.attributes?.artwork?.url.replace("{w}", 80).replace("{h}", 80)

    function handlePlayPause(){
        setPlayFromSongView(true)
        dispatch(playPause(true))
        dispatch(setActiveSong({
            index,
            id: song?.id,
            title: song?.attributes?.name,
            artist: song?.attributes?.artistName,
            audio: song?.attributes?.previews[0]?.url,
            artistId: artistId,
            imageUrl: imageUrl,
        }))
        //   console.log(data)
    }
    
    return (
        <div 
            onMouseOver={() => setIsHovering(true)} 
            onMouseLeave={() => setIsHovering(false)} 
            className={` grid grid-cols-2 sm:grid-cols-9 gap-0 md:gap-4 font-Roboto text-grey font-semibold justify-center  text-lg items-center mb-4 mt-4 cursor-pointer hover:bg-navy px-2 sm:px-4 py-2 ${activeSong.activeSongId == song.id && 'bg-navy'}`}
        >
            <div className='flex col-span-1 gap-8 sm:gap-2 md:gap-8 sm:col-span-4 items-center'>
                <div className='w-6'>
                    {activeSong.activeSongId == song?.id
                        ? <MusicPlaying/>
                        : isHovering 
                            ? <FaPlay onClick={handlePlayPause} color='white'/>
                            : <span className='text-white font-Poppins font-bold text-lg'>{index +1}</span>
                    }
                </div>
                <div className='flex items-center gap-4'>
                    <img className='w-[80px] sm:w-[50px] rounded-lg md:w-[80px]' src={imageUrl} alt="" />
                    <div>
                        <p className='text-white font-Poppins font-bold text-lg hover:text-gold w-[250px]  sm:w-[200px] sm:text-nowrap  md:w-[200px] lg:w-fit lg:text-wrap sm:overflow-hidden text-ellipsis'><Link to={`/song/${song?.id}`}>{song?.attributes?.name}</Link></p>
                        <p className='text-grey text-base font-Poppins hover:text-purpleish w-[100px] md:w-fit md:text-wrap overflow-hidden text-ellipsis text-nowrap'><Link to={`/artist/${artistId}`}>{song?.attributes?.artistName}</Link></p>
                    </div>
                </div>
            </div>
            <p className='gap-8 sm:col-span-2 w-0 sm:w-[100px] md:w-fit md:text-wrap overflow-hidden text-ellipsis text-nowrap'>{song?.attributes?.albumName}</p>
            <p className='gap-8 sm:col-span-2 w-0 sm:w-[100px] md:w-fit md:text-wrap overflow-hidden text-ellipsis text-nowrap'>{song.attributes?.genreNames[0]}</p>
            <p className='w-0 overflow-hidden sm:w-[100px]'>{`${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</p>
        </div>
    )
    
}

export default ArtistDetails