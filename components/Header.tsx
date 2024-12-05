"use client"

import { api } from '@/convex/_generated/api'
import { useAuthActions } from '@convex-dev/auth/react'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { GitHubLogoIcon } from '@radix-ui/react-icons'


const Header = () => {

    const session = useQuery(api.users.viewer)
    return (
    <header className='font-bold rounded-xl border-[1px] mb-5 flex justify-between items-center z-50 sticky top-2 mt-2  w-full mx-auto bg-black max-w-[800px] '>
        <h1 className='font-semibold text-xl ml-4 m-2'>Shatranj</h1>
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
        <GitHubLogoIcon className="mr-2 h-4 w-4" />Sign In
      </Button>
    );
  }