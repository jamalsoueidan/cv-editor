import { omit } from "convex-helpers";
import { ConvexError, v } from "convex/values";
import { mutationWithUser, queryWithUser } from "./auth.js";
import { Resume } from "./tables/resume";

export const create = mutationWithUser({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("resumes", {
      title: args.title,
      updatedTime: Date.now(),
      userId: ctx.user,
    });
  },
});

export const get = queryWithUser({
  args: {
    id: v.id("resumes"),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db.get(args.id);
    if (!data) {
      throw new ConvexError("not found");
    }
    return data;
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
  args: omit(Resume.withSystemFields, [
    "_creationTime",
    "userId",
    "updatedTime",
  ]),
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("resumes")
      .withIndex("byUserId", (q) => q.eq("userId", ctx.user))
      .filter((q) => q.eq(q.field("_id"), args._id))
      .unique();
    if (!doc) {
      throw new ConvexError("Not authorized");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = args;
    return ctx.db.patch(_id, { ...rest, updatedTime: Date.now() });
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
