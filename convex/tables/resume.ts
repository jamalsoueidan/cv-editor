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
  workExperiences: v.array(
    v.object({
      key: v.string(),
      position: v.optional(v.string()),
      company: v.optional(v.string()),
      startDate: v.optional(v.number()),
      endDate: v.optional(v.number()),
      city: v.optional(v.string()),
      description: v.optional(v.string()),
    })
  ),
  updatedTime: v.number(),
  userId: v.id("users"),
});
