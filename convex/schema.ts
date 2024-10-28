import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  text: defineTable({
    body: v.string(),
  }),
});
