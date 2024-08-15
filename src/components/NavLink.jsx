import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const NavLink = ({link, children, text}) => {
    const { pathname } = useLocation()
    console.log(pathname)
    const {expanded} = useSelector(state => state.player)
    const [isHover, setIsHover] = useState(false)
    return (
        <li className={`transition-all flex items-center group ${pathname == link ? 'text-gold' : 'text-white' }`}>
            <Link onMouseOut={() => setIsHover(false)} onMouseOver={() => setIsHover(true)} className='transition-all font-Poppins flex gap-2 items-center' to={link}>
                {children}
                <span className={`transition-all ${!expanded && `overflow-hidden w-0`}`}>{text}</span>
            </Link>
            {!expanded && isHover && 
                <div className='absolute left-full rounded-md px-2 py-1 bg-navy'>{text}</div>
            }
        </li>
  )
}

export default NavLink