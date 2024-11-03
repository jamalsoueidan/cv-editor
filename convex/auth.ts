import Linkedin from "@auth/core/providers/linkedin";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import {
  customAction,
  customCtx,
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions";
import { ConvexError } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { MutationCtx } from "./_generated/server.d";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Linkedin],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx: MutationCtx, { userId }) {
      const resumes = await ctx.db
        .query("resumes")
        .withIndex("byUserId", (q) => q.eq("userId", userId))
        .collect();
      if (resumes.length === 0) {
        await ctx.db.insert("resumes", {
          userId,
          title: "Untitled",
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
            name: "quds",
            color: "#ffe14c",
            lineHeight: "1.5",
            fontSize: "12",
            fontFamily: "Arial",
          },
          updatedTime: Date.now(),
        });
      }
    },
  },
});

export const mutationWithUser = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const user = await getAuthUserId(ctx);
    if (!user) {
      throw new ConvexError("User must be logged in.");
    }

    return { user };
  })
);

export const actionWithUser = customAction(
  action,
  customCtx(async (ctx) => {
    const user = await getAuthUserId(ctx);
    if (!user) {
      throw new ConvexError("User must be logged in.");
    }

    return { user };
  })
);

export const queryWithUser = customQuery(
  query,
  customCtx(async (ctx) => {
    const user = await getAuthUserId(ctx);
    if (!user) {
      throw new ConvexError("User must be logged in.");
    }

    return { user };
  })
);

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    return userId !== null ? ctx.db.get(userId) : null;
  },
});
