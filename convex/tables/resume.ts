import { Table } from "convex-helpers/server";
import { v } from "convex/values";

export const Resume = Table("resumes", {
  title: v.string(),
  position: v.optional(v.string()),
  firstname: v.optional(v.string()),
  lastname: v.optional(v.string()),
  email: v.optional(v.string()),
  phone: v.optional(v.string()),
  country: v.optional(v.string()),
  city: v.optional(v.string()),
  content: v.optional(v.string()),
  photo: v.optional(v.id("_storage")),
  updatedTime: v.number(),
  userId: v.id("users"),
});
