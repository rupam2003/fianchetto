import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return {
        user:null,
        status:"unauthenticated"
      };
    }
    const user = await ctx.db.get(userId);
    if (user === null) {
      return {
        user:null,
        status:"unauthenticated"
      };
    }
    return {
      user:user,
      status:"authenticated"
    };
  },
});

export const getUserData = query({
  args: {
    userId:v.id("users")
  },
  handler: async (ctx,args) => {
    
    const user = await ctx.db.get(args.userId);
    if (user === null) {
      return null
    }
    return user
  },
});
