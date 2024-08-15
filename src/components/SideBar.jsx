import React, { useEffect, useState } from 'react'
import { FaMusic } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { DiscAlbum, BarChart, Telescope, GalleryVerticalEnd, ChevronFirst, ChevronLast, CircleUserRound, EllipsisVertical } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { expand } from '../redux/features/playerSlice';
import NavLink from './NavLink';


const SideBar = () => {
    const dispatch = useDispatch()
    const { windowWidth } = useSelector(state => state.player)
    const { expanded } = useSelector(state => state.player)
    const { pathname } = useLocation()

    useEffect(() => {
        windowWidth < 620 && dispatch(expand(false))
    }, [windowWidth])

    
  return (
    <aside className={`flex flex-col bg-gradientNavyLighter fixed top-0 transition-all h-full rounded-xl z-10 py-4 ${expanded ? 'min-w-[210px] pl-4' : 'px-2'}`}>
        <div className={`flex ${expanded ? 'gap-8' : 'gap-1 justify-center'}`} >
            <div className={`flex gap-2 items-center`}>
                <FaMusic size={25} color='grey'/>
                <span className={`font-Roboto font-bold  text-gold ${!expanded && 'w-0 overflow-hidden transition-all'}`}>Tones</span>
            </div>
            {
                expanded 
                ? <ChevronFirst className='cursor-pointer absolute -right-6 z-10' onClick={() => dispatch(expand(false))} color='#000'/>  
                : <ChevronLast className='cursor-pointer absolute -right-6 z-10' onClick={() => dispatch(expand(true))} color='#000'/>
            }
                
        </div>
        <nav className='transition-all mt-8'>
            {/* <span className='text-grey font-Roboto mb-2'>Menu</span> */}
            <hr className='text-grey mb-4' />
            <ul className={`flex flex-col gap-4 ${!expanded && 'items-center'}`}>
                <NavLink
                    link='/discover'
                    text='Discover'
                >
                    <Telescope className='transition-all' size={`${expanded ? 30: 30}`} />
                </NavLink>
                <NavLink
                    link='/charts'
                    text='Charts'
                >
                    <BarChart className='transition-all' size={`${expanded ? 30: 30}`} />
                </NavLink>
                <NavLink
                    link='/genre'
                    text='Genre'
                >
                    <GalleryVerticalEnd className='transition-all' size={`${expanded ? 30: 30}`} />
                </NavLink>
                <NavLink
                    link='/albums'
                    text='Albums'
                >
                    <DiscAlbum className='transition-all' size={`${expanded ? 30: 30}`} />
                </NavLink>
            </ul>
        </nav>
        <div className='mt-[54vh] cursor-pointer transition-all'>
            <nav className='flex flex-col gap-1 transition-all'>
                <div className='transition-all flex gap-1 items-center'>
                    <CircleUserRound  color='gold' size={expanded ? 50 : 30} />
                    <p className='flex flex-col transition-all'>
                        <span className={`transition-all text-white font-Roboto font-bold text-lg text-wrap ${!expanded && 'w-0 overflow-hidden ml-0'}`}>Sign-In</span>
                    </p>
                    <button><EllipsisVertical className={`transition-all hover:opacity-80 ${expanded && 'ml-2'}`} color='white' size={25} /></button>
                </div>
                <span className={`transition-all text-grey text-xs hover:text-white ${!expanded && 'w-0 overflow-hidden'}`}>Don't have an account?</span>
            </nav>
        </div>
    </aside>
  )
}

export default SideBar