import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Chess } from 'chess.js'
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";


export const getGame = query({
  args:{
    gameId:v.id("game"),
  },
  handler: async (ctx,args) =>{
    const userId = await getAuthUserId(ctx);
    if(args.gameId == null)
      return null
    if(userId == null)
      return null
    const game = await ctx.db.get(args.gameId)
    return game
  }
})

export const getGameWinner = query({
  args:{
    gameId:v.id("game"),
  },
  handler: async (ctx,args) =>{
    
    if(args.gameId == null)
      return null
    const game = await ctx.db.get(args.gameId)
    if(game?.status !== "over")
      return null;
    const chess = new Chess()
    chess.loadPgn(game.pgn)
    if(chess.isCheckmate())
    {
      return (game.turn == game.player1)? game.player2 : game.player1
    }
    if(chess.isDraw())
    {
      return "draw"
    }
    
    return null
  }
})

export const createGame = mutation({
    
    handler: async (ctx) => {

      const userId = await getAuthUserId(ctx);
      if(userId == null)
        return null
      const board = new Chess()
      
      const newGameId = await ctx.db.insert("game", 
        { 
            player1:userId,
            player2:null,
            status:"waiting",
            turn:userId,
            fen:board.fen(),
            pgn:board.pgn()

        });
      return newGameId;
    },
  });

  export const joinGame = mutation({
    args:{
      gameId:v.string()
    },
    handler: async (ctx,args) => {

      const userId = await getAuthUserId(ctx);
      if(userId == null)
        return null
      const isValid = ctx.db.normalizeId("game",args.gameId)
      if(!isValid)
        return "not-valid"
      const currentGame = await ctx.db.get(args.gameId as Id<"game">);
      if(!currentGame)
        return null
      
      await ctx.db.patch(currentGame._id,{
        player2:userId,
        status:"in-progress"
      })
     return true
    },
  });

  export const performMove = mutation({
    args: { 
      gameId:v.id("game"),
      from:v.any(),
      to:v.any()  
    },
    handler: async (ctx, args) => {
      
      const userId = await getAuthUserId(ctx);
      if(userId == null)
        return null
      const game = new Chess()
      const currentGame = await ctx.db.get(args.gameId);
      if(!currentGame || currentGame.turn != userId || !currentGame.player2)
        return false

      const currState = currentGame.pgn;
      game.loadPgn(currState);
      try {
        game.move({
          from:args.from,
          to:args.to,
          promotion:"q"
        })  
      } catch (error) {
        return false
      }
      const isGameOver = game.isGameOver()


      
      await ctx.db.patch(currentGame._id,{
        fen:game.fen(),
        pgn:game.pgn(),
        turn:(userId == currentGame.player1)? currentGame.player2 : currentGame.player1,
        status:isGameOver?"over":"in-progress"
      })
      return true;
    },
  });