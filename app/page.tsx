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
    
    
     
      <motion.div
        className='sm:my-[20vh] my-[10vh]  flex flex-col items-center'
        transition={{ duration: 0.7, ease: [.25,.1,.25,1]}}
        variants={{
          hidden:{filter:"blur(4px)",y:10,opacity:0},
          visible:{filter:"blur(0px)",y:0,opacity:1}
          
        }}
        initial="hidden"
        animate="visible"
      >
        <button className=" bg-slate-800 mb-7  no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
          <span>✨ Introducing Fianchetto</span>
          <svg
            fill="none"
            height="16"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.75 8.75L14.25 12L10.75 15.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
        <h1 className='sm:text-5xl text-3xl text-center font-bold tracking-tight'>Discover the Joy of Chess</h1>
        <h2 className=' sm:text-xl text-lg text-slate-400 text-center mt-1'>Enjoy Smooth Multiplayer Chess Experience with Friends </h2>
      
      

        <Link className='my-5 text-lg font-medium px-4 py-1.5 rounded-md bg-primary text-primary-foreground shadow transition-colors hover:bg-primary/80' href={"/play"}>
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
        
        </motion.div>

      
    
    
  )
}



export default HomePage
