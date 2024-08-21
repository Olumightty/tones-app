import React from 'react'


const MiniMenuButtons = ({children}) => {
  return (
    <button className='text-nowrap text-right text-white hover:opacity-70'>
        {children}
    </button>
  )
}

export default MiniMenuButtons