import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronDown, CircleX } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { updateWindowWidth } from '../redux/features/playerSlice'

const RightBar = () => {
    const dispatch = useDispatch()

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [collapse, setCollapse] = useState(true);

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
    const {expanded, activeSong} = useSelector((state) => state.player)
  return (
    <>
        { !expanded && activeSong.activeSongId &&
            <aside className={`bg-gradientNavy w-[300px] p-2 right-2 transition-all rounded-xl absolute  ${collapse   ? 'bottom-[14vh] h-[200px]' : ' top-2  h-[85vh] transition-all ' }`}>
                {collapse
                        ? <ChevronUp className='cursor-pointer absolute right-2 top-0' onClick={() => setCollapse(false)} color='#FFC94A'/>
                        : <ChevronDown className='cursor-pointer absolute right-2 top-0' onClick={() => setCollapse(true)}  color='#FFC94A' /> 
                    
                }
                <div className='flex'>
                    <img className='w-[180px] self-center rounded-full' src="https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/d6/3d/2a/d63d2a28-7a81-d532-0f00-7d0f35a4eaa2/mza_4715395746223917563.png/800x800bb.jpg" alt="" />
                </div>
            </aside>
            
        }
    </>

  )
}

export default RightBar