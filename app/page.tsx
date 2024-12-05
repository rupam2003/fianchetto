"use client"

import { Button } from '@/components/ui/button'
import { Chess } from 'chess.js'
import React, { useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { DotBackgroundDemo } from '@/components/ui/grid';
import {motion} from "framer-motion"
const HomePage = () => {
 
  const game = new Chess()
  return (
    
    <div className='mt-[25vh] flex flex-col items-center gap-5'>
     
      <motion.div
        variants={{
          hidden:{opacity:0,scale:0.90},
          visible:{opacity:1,scale:1}
          
        }}
        initial="hidden"
        animate="visible"
      >
        <h1 className='sm:text-5xl text-3xl text-center font-bold tracking-tight'>Welcome!Play Chess Online</h1>
        <h2 className=' sm:text-xl text-lg text-slate-400 text-center font-medium '>Enjoy Smooth Multiplayer Chess Experience with Friends </h2>
      
      </motion.div>
      

        <Link className=' text-lg font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground shadow transition-colors hover:bg-primary/80' href={"/play"}>
        Get Started
        </Link>
        

      
    </div>
    
  )
}



export default HomePage