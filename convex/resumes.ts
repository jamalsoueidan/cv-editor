import { asyncMap, omit } from "convex-helpers";
import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { internalMutation, query } from "./_generated/server";
import { actionWithUser, mutationWithUser, queryWithUser } from "./auth";
import { Resume } from "./tables/resume";

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
      skills: [],
      skillsVisible: false,
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
      workExperiences: data.workExperiences.sort((a, b) => {
        const aSort = a.order !== undefined ? a.order : Infinity;
        const bSort = b.order !== undefined ? b.order : Infinity;

        return aSort - bSort;
      }),
      ...(data.photo ? { photoUrl: await ctx.storage.getUrl(data.photo) } : {}),
    };
  },
});

export const clone = actionWithUser({
  args: {
    id: v.id("resumes"),
  },
  handler: async (ctx, args) => {
    const data = await ctx.runQuery(api.resumes.get, { id: args.id });
    const response: string = await ctx.runMutation(api.resumes.create, {
      title: data.title,
    });

    if (data.photo && data.photoUrl) {
      const response = await fetch(data.photoUrl);
      const image = await response.blob();
      data.photo = await ctx.storage.store(image);
    }

    await ctx.runMutation(api.resumes.update, {
      _id: response as Id<"resumes">,
      ...omit({ ...data, title: "Clone of " + data.title }, [
        "_id",
        "_creationTime",
        "updatedTime",
        "photoUrl",
        "userId",
      ]),
    });

    return response;
  },
});

export const destroy = internalMutation({
  args: {
    id: v.id("resumes"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("resumes")
      .withIndex("byUserId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("_id"), args.id))
      .unique();
    if (!doc) {
      throw new ConvexError("Not authorized");
    }
    return ctx.db.delete(args.id);
  },
});

export const asyncDestroy = actionWithUser({
  args: {
    id: v.id("resumes"),
  },
  handler: async (ctx, args) => {
    await ctx.scheduler.runAfter(250, internal.resumes.destroy, {
      id: args.id,
      userId: ctx.user,
    });
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
    template: v.object({
      color: v.string(),
      fontFamily: v.string(),
      fontSize: v.string(),
      lineHeight: v.string(),
      name: v.string(),
    }),
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
