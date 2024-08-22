import React from 'react'
import { motion } from "framer-motion"

const svgVariant ={
  hidden:{
    opacity: 0,
    pathLength: 0,
  },
  visible:{
    opacity: 1,
    pathLength: 1,
  }
}

const circleVariant ={
  hidden:{
    opacity: 0,
    pathLength: 0,
  },
  visible:{
    opacity: 1,
    pathLength: 1,
  }
}





const Loader = () => {
  return (
    <motion.div className='flex justify-center items-center max-w-[calc(100vw-100px)]'>
      {[1,2,3].map((a,i)=> 
      <motion.svg
        xmlns="http://www.w3.org/2000/svg" 
        width="100" 
        height="100" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={i == 1 ? '#FFC94A' : '#758694'}
        stroke-width="1" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        class={`lucide lucide-music ${i==1 && 'mt-8'}`}
      >
        <motion.path 
          d="M9 18V5l12-2v13"
          initial='hidden'
          animate='visible'
          variants={svgVariant}
          transition={{
            default: {duration: i == 1? .8 : i==2? .6 : .9, ease: "easeInOut", repeat: Infinity, repeatType: "reverse"},
            fill: {duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse"},
          }}
        />
        <motion.circle 
          cx="6" 
          cy="18" 
          r="3"
          initial = 'hidden'
          variants={circleVariant}
          animate='visible'
          transition={{
            default: {duration: i == 1? .9 : i==2? .7 : 1, ease:'linear', repeat: Infinity, repeatType: 'reverse'},
            fill: {duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse"},
          }}
        />
        <motion.circle 
          cx="18" 
          cy="16" 
          r="3"
          initial = 'hidden'
          variants={circleVariant}
          animate='visible'
          transition={{
            default: {duration: i == 1? .9 : i==2? .7 : 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse"},
            fill: {duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse"},
          }}
        />
      </motion.svg>
      )}
    </motion.div>
    
  )
    
   
}

export default Loader