import { ConvexError, v } from "convex/values";
import { mutationWithUser, queryWithUser } from "./auth.js";

export const create = mutationWithUser({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("resumes", {
      title: args.title,
      _updatedTime: Date.now(),
      userId: ctx.user,
    });
  },
});

export const get = queryWithUser({
  args: {
    id: v.id("resumes"),
  },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});

export const destroy = mutationWithUser({
  args: {
    id: v.id("resumes"),
  },
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("resumes")
      .withIndex("byUserId", (q) => q.eq("userId", ctx.user))
      .filter((q) => q.eq(q.field("_id"), args.id))
      .unique();
    if (!doc) {
      throw new ConvexError("Not authorized");
    }
    return ctx.db.delete(args.id);
  },
});

export const update = mutationWithUser({
  args: {
    id: v.id("resumes"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("resumes")
      .withIndex("byUserId", (q) => q.eq("userId", ctx.user))
      .filter((q) => q.eq(q.field("_id"), args.id))
      .unique();
    if (!doc) {
      throw new ConvexError("Not authorized");
    }

    const { id, ...rest } = args;
    return ctx.db.patch(id, { ...rest, _updatedTime: Date.now() });
  },
});

export const list = queryWithUser({
  handler: async (ctx) => {
    return ctx.db
      .query("resumes")
      .withIndex("byUserId", (q) => q.eq("userId", ctx.user))
      .collect();
  },
});
