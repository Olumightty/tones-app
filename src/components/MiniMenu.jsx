import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setQueue } from '@/redux/features/playerSlice'
import { Link } from 'react-router-dom'
import MiniMenuButtons from './MiniMenuButtons'


const MiniMenu = ({song}) => {
  const dispatch = useDispatch()
  const {queue} = useSelector(state => state.player)

  function addToQueue(song) {
    song.index = queue.data.length
    dispatch(setQueue([...queue.data, song]))
  }
  return (
    <div className='absolute right-5 hover:opacity-70'>
        <DropdownMenu>
          <DropdownMenuTrigger><Ellipsis className='hover:opacity-70' color='white'/></DropdownMenuTrigger>
          <DropdownMenuContent className='bg-gradientMain absolute right-0 border-grey'>
            <DropdownMenuLabel className='text-grey font-Roboto'>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-grey' />
            <DropdownMenuItem className='hover:bg-gradientMain cursor-pointer' onClick={() => addToQueue(song)}>
              <MiniMenuButtons>
                Add to queue
              </MiniMenuButtons>
            </DropdownMenuItem >
            <DropdownMenuItem className='hover:bg-gradientMain cursor-pointer'>
              <MiniMenuButtons>
                Add to Playlist
              </MiniMenuButtons>
            </DropdownMenuItem>
            <DropdownMenuItem className='hover:bg-gradientMain cursor-pointer'>
              <Link to={`/artist/${song.artistId}`}>
                <MiniMenuButtons>
                  Go to Artist page
                </MiniMenuButtons>             
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default MiniMenu