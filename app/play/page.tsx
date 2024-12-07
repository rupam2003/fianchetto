'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/toaster'
import { Id } from '@/convex/_generated/dataModel'
import { redirect, useRouter } from 'next/navigation'


const Page = () => {
  const [gameId, setGameId] = useState("")
  const router = useRouter()
  const joinGame = useMutation(api.games.joinGame)
  
  const handleJoin = async (e:any) =>{
    e.preventDefault()
    const res = await joinGame({gameId:gameId})
    if(res == "not-valid")
      setGameId("") 
    else if(res === true)
      router.push(`/game/${gameId}`)

  }
  

  return (
    <div className='my-10 mx-4 flex flex-col gap-x-20 gap-y-10 md:flex-row justify-center items-center'>
      
      <figure className=' relative sm:w-[450px] w-[340px] aspect-square'>
        <Image 
        draggable={false}
        className='border-[10px] border-border rounded-[7px] '
        fill
        src={"/chess.png"}
        alt='chess'
        />
      </figure>
      
      <div className='flex flex-col items-center'>
        <CreateButton/>
        <LineDivider/>
        <div className='flex flex-row w-80 gap-1 justify-between'>
          <Input
          onChange={(e) =>{setGameId(e.target.value)}}
          value={gameId}
          className='flex-1 h-10 font-medium'
          placeholder='Enter Game ID'
          />
              
          <Button
            className="font-bold h-10"
            variant="default"
            type="button"
            onClick={handleJoin}
          >
            Join
          </Button>
        </div>
       
      </div>
      
    </div>
  )
}

export default Page




const LineDivider = () => {
  return (
    <h3 className="flex items-center my-3 w-full">
      <span className="flex-grow bg-gray-200 rounded h-1"></span>
      <span className="mx-3 text-lg font-medium">OR</span>
      <span className="flex-grow bg-gray-200 rounded h-1"></span>
  </h3>
  )
}

const CreateButton = () => {
  const createGame = useMutation(api.games.createGame)
  const [gameId, setGameId] = useState<Id<"game">>()
  useEffect(() => {
    if(gameId)
      redirect(`/game/${gameId}`) 
  }, [gameId])
  
  const handleCreate = async (e:any) =>{
    e.preventDefault()
    const gameId = await createGame()
    gameId && setGameId(gameId)
    
  }
  return (
    <Button
    className="font-bold text-xl w-80 h-10"
    variant="default"
    
    type="button"
    onClick={handleCreate}
  >
    Create a Match
  </Button>
  )
}

