"use client"


import { Chess } from 'chess.js'
import React, { useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { DotBackgroundDemo } from '@/components/ui/grid';
import {motion} from "framer-motion"
const HomePage = () => {
 
  const game = new Chess()
  return (
    
    <div className='sm:my-[25vh] my-[10vh] flex flex-col items-center gap-5'>
     
      <motion.div
        variants={{
          hidden:{opacity:0,scale:0.90},
          visible:{opacity:1,scale:1}
          
        }}
        initial="hidden"
        animate="visible"
      >
        <h1 className='sm:text-5xl text-3xl text-center font-bold tracking-tight'>Discover the Joy of Chess</h1>
        <h2 className=' sm:text-xl text-lg text-slate-400 text-center mt-1'>Enjoy Smooth Multiplayer Chess Experience with Friends </h2>
      
      </motion.div>
      

        <Link className='my-3 text-lg font-medium px-4 py-1.5 rounded-md bg-primary text-primary-foreground shadow transition-colors hover:bg-primary/80' href={"/play"}>
          Get Started
        </Link>
        <figure className=' relative  sm:w-[450px] w-[340px] aspect-square'>
        <Image 
        draggable={false}
        className='border-[10px] border-border rounded-[7px] '
        fill
        src={"/chess.png"}
        alt='chess'
        />
      </figure>
        

      
    </div>
    
  )
}



export default HomePage
