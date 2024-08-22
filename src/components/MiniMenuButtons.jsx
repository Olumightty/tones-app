import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'


const MiniMenuButtons = ({songName='nil', where='nil', children}) => {
  const {activeSong} = useSelector(state => state.player)
  return (
    <button 
      onClick={() =>
        (!activeSong.activeSongId || activeSong == {})   && where=='queue'
        ? toast(`Song not added to ${where}`, {
          description: "Ensure you are currently playing a song",
        })
        : toast(`${songName} added to ${where}`, {
          description: "Keep jamming!!",
        })
      }
      className='text-nowrap text-right text-white hover:opacity-70'
    >
        {children}
    </button>
  )
}

export default MiniMenuButtons