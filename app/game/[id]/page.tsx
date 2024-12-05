"use client"

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Chessboard } from "react-chessboard";
import { Chess } from 'chess.js'
import Image from 'next/image';
import { useMutation, useQuery } from 'convex/react'
import React, { useEffect, useMemo } from 'react'
import { Id } from '@/convex/_generated/dataModel';


const Page = ({params}:any) => {
  const session = useQuery(api.users.viewer)
  const board = useQuery(api.games.getGame,{gameId:params.id})
  const boardOrientation = (session?.user?._id == board?.player1)? "white":"black"
  const winner = useQuery(api.games.getGameWinner,{gameId:params.id})
  const game = new Chess()
  const pieces = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];
  const customPieces = useMemo(() => {
    const pieceComponents:any = {};
    pieces.forEach(piece => {
      pieceComponents[piece] = ({
        squareWidth
      }:any) => <div style={{
        width: squareWidth,
        height: squareWidth,
        backgroundImage: `url(/${piece}.png)`,
        backgroundSize: "100%"
      }} />;
    });
    return pieceComponents;
  }, []);
  
  const move = useMutation(api.games.performMove).withOptimisticUpdate(
    (localStore, args) =>{
      const gameData = localStore.getQuery(api.games.getGame,{gameId:params.id as Id<"game">});
      if(!gameData)
        return
      if(gameData.turn != session?.user?._id || !gameData.player2)
        return
      const game = new Chess(gameData.fen)
      try {
        game.move({
          from:args.from,
          to:args.to,
          promotion:'q'
        })

      gameData.fen = game.fen()
      gameData.pgn = game.pgn()
      localStore.setQuery(api.games.getGame,{gameId:params.id as Id<"game">},gameData);
      } catch (error) {
        console.log("Invalid Move")
      }
      
    }
  )
  
  function onDrop(sourceSquare:string, targetSquare:string) {
    try {
      let result = move({
        gameId:params.id,
        from:sourceSquare,
        to:targetSquare
      })
      
    } catch (error) {
      return false
    }
    return true
  }
  if(!session && !board)
    return<></>

  if(!board?.player2)
    return <h1 className='mt-20 text-center text-slate-400 text-lg'><span className='text-white text-2xl'>{params.id}</span><br/> Send this code to a friend and they can join using it</h1>
  

  return (
    
    <main className='flex flex-col justify-center items-center'>
      {(session?.user?._id == board.player1)
      ?<PlayerBanner userId={board.player2}/>
      :<PlayerBanner userId={board.player1}/>
      } 
    
      {board && <div className='w-[350px] sm:w-[450px] relative aspect-square border-border border-[10px] rounded-[7px]'> 
        
      {/* Win or lose banner */}

        {winner && winner !== "draw" &&
        <h1 className='absolute z-50 top-[47%] tracking-tight  left-0 right-0 text-center bg-border text-2xl font-bold'>
          {winner == session?.user?._id? "You win" : "You Lost"}
        </h1>
        }

      {/* Draw banner */}

        {winner && winner === "draw" &&
        <h1 className='absolute z-50 top-[47%] tracking-tight  left-0 right-0 text-center bg-border text-2xl font-bold'>
          Draw
        </h1>
        }
        
       
      <Chessboard 
        boardOrientation={boardOrientation}
        customBoardStyle={{
        
          // boxShadow: "0px 2px 30px rgba(255, 255, 255, 0.5)"
        }}
        position={board?.fen}
        onPieceDrop={onDrop}
        customPieces={customPieces}
        customLightSquareStyle={{ backgroundColor: '#EBECD0' }}
        customDarkSquareStyle={{ backgroundColor: '#779556' }}
      />
      </div>}
      
      
      {session?.user?._id && <PlayerBanner userId={session?.user?._id}/>}
    </main>
  )
}

interface Props{
  userId:Id<"users">
}

const PlayerBanner = ({userId}:Props) => {
  const player = useQuery(api.users.getUserData,{userId:userId})
  return (
    <div className='bg-border p-2 rounded-md w-[350px] sm:w-[450px] flex items-center gap-3 my-2 text-lg font-medium text-slate-200'>
       {player?.image && <Image className='rounded-full' width={30} height={30} src={player.image} alt=''/>}
      <h1>{player?.name}</h1>
    </div>
  )
}



export default Page