import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronDown, CircleX } from 'lucide-react'
import { useState, useEffect } from 'react'
import { setQueue, showQueue, updateWindowWidth } from '../redux/features/playerSlice'
import QueueSong from './QueueSong'

const RightBar = () => {
    const dispatch = useDispatch()

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const {queue, isShuffling} = useSelector(state => state.player)

    useEffect(() => {
        // Function to update window width state
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            dispatch(updateWindowWidth(window.innerWidth));
        };

        // Add event listener on mount
        window.addEventListener('resize', handleResize);

        // Clean up event listener on unmount
        return () => {
            
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const { queue: {data}, activeSong } = useSelector((state) => state.player)
    
    const upNext = data.filter((song) => song.index > activeSong.index)

    const deleteFromQueue = (id) => {
        const updatedQueue = data.filter((song) => song.id != id)

        dispatch(setQueue(updatedQueue.map((song, index) => {// dispatch to the queue
            return {
              index,
              id: song.id,
              title: song.title,
              artist: song.artist,
              audio: song.audio,
              artistId: song.artistId,
              imageUrl: song.imageUrl,
            }
          })))
    }
    
  return (
    
    <>
        {queue.isShowing &&
            <aside className={`bg-gradientNavy w-[250px] sm:w-[300px] p-2 right-2 transition-all rounded-lg absolute bottom-[14vh] h-[50vh] sm:h-[85vh]`}>
                <CircleX className='cursor-pointer absolute right-2 top-2' onClick={() => dispatch(showQueue(false))} color='#FFC94A'/>
                <h1 className='font-Poppins text-14 text-gold font-semibold mt-3 pl-2 mb-3'>Up Next</h1>
                <section className='flex flex-col gap-4 h-[88%] overflow-scroll removeScrollbar cursor-pointer'>
                    {!isShuffling?
                    
                    upNext.length > 0
                        ?upNext.map((song) =>
                            <QueueSong deleteFromQueue={deleteFromQueue} song={song}/> 
                        )
                        : <h1 className='font-Roboto text-grey text-[35px] sm:text-[50px] text-center flex justify-center items-center opacity-30'>
                            No songs in queue, add songs to queue now!
                        </h1>
                    : <h1 className='font-Roboto text-grey text-[35px] sm:text-[50px] text-center flex justify-center items-center opacity-30'>
                            Shuffle is on, It's a suprise!
                        </h1>
                    }
                </section>
                
            </aside>
            
        }
    </>

  )
}

export default RightBar