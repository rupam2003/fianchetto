"use client"

import { api } from '@/convex/_generated/api'
import { useAuthActions } from '@convex-dev/auth/react'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Button } from './ui/button'



const Header = () => {

    const session = useQuery(api.users.viewer)
    return (
    <header className='font-bold border-b-[1px] mb-5 z-50 sticky top-0   w-full  bg-black  '>
      <div className='mx-auto flex justify-between items-center max-w-[650px]'>
        <h1 className='font-semibold text-xl ml-4 m-2.5'>fianchetto</h1>
        {
          <div className='flex gap-3 mr-3'>
            {
                session?.user?.image && 
                <div className='w-9 h-9  relative '>
                    <Image className='rounded-full' src={session?.user?.image} fill objectFit='contain' alt={"profile"}/>
                </div>
            }
            {session?.status == "authenticated" && <SignOut/>}
            {session?.status == "unauthenticated" && <SignInWithGoogle/>}
        </div>
 
        }
      </div>  
    </header>
  )
}

export default Header


function SignOut() {
    const session = useQuery(api.users.viewer)
    const router = useRouter()
    const { signOut } = useAuthActions();
    useEffect(() => {
      if(session?.status == "unauthenticated")
        router.push("/")
      
    }, [session])
    return (
      <Button
        className="flex-1"
        variant="outline"
        type="button"
        onClick={() => {
          signOut()    
        }}
      >
        Sign Out
      </Button>
    );
  }

function SignInWithGoogle() {
    const { signIn } = useAuthActions();
    const session = useQuery(api.users.viewer)
    const router = useRouter()
    useEffect(() => {
      if(session?.status == "unauthenticated")
       {
         router.push("/")
         router.refresh()
      } 
        
      
    }, [session])
    return (
      <Button
        className="flex-1"
        variant="outline"
        type="button"
        onClick={() => void signIn("google", { redirectTo: "/play" })}
      >
        Sign In
      </Button>
    );
  }
