import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
export default defineSchema({
  ...authTables,
  messages: defineTable({
    userId: v.id("users"),
    body: v.string(),
  }),
  game: defineTable({
    fen: v.string(),
    pgn: v.string(),
    player1: v.id("users"),
    player2: v.union(v.id("users"),v.null()),
    status: v.union(
      v.literal("waiting"),
      v.literal("in-progress"),
      v.literal("over"),
    ),
    turn: v.id("users"),
  }),
});
