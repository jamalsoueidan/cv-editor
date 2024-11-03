import { asyncMap, omit } from "convex-helpers";
import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { mutationWithUser, queryWithUser } from "./auth";
import { Resume } from "./tables/resume";
import { Template } from "./tables/template";

export const create = mutationWithUser({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("resumes", {
      title: args.title,
      updatedTime: Date.now(),
      workExperiences: [],
      educations: [],
      socialProfiles: [],
      socialProfilesVisible: false,
      languages: [],
      languagesVisible: false,
      references: [],
      referencesVisible: false,
      courses: [],
      coursesVisible: false,
      internships: [],
      internshipsVisible: false,
      template: {
        name: "Gaza",
        color: "#ffe14c",
        lineHeight: "1.5",
        fontSize: "12",
        fontFamily: "Arial",
      },
      userId: ctx.user,
    });
  },
});

export const get = query({
  args: {
    id: v.id("resumes"),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db.get(args.id);
    if (!data) {
      throw new ConvexError("not found");
    }

    return {
      ...data,
      ...(data.photo ? { photoUrl: await ctx.storage.getUrl(data.photo) } : {}),
    };
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

export const updateTemplate = mutationWithUser({
  args: {
    _id: v.id("resumes"),
    template: v.object(Template.withoutSystemFields),
  },
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
    const resumes = await ctx.db
      .query("resumes")
      .withIndex("byUserId", (q) => q.eq("userId", ctx.user))
      .collect();

    return asyncMap(resumes, async (data) => {
      return {
        ...data,
        ...(data.photo
          ? { photoUrl: await ctx.storage.getUrl(data.photo) }
          : {}),
      };
    });
  },
});

export const generateUploadUrl = mutationWithUser(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const sendImage = mutationWithUser({
  args: { storageId: v.id("_storage"), id: v.id("resumes") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      photo: args.storageId,
    });
  },
});

export const deleteImage = mutationWithUser({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.storageId);
  },
});
