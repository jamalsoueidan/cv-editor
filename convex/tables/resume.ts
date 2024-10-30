import { Table } from "convex-helpers/server";
import { v } from "convex/values";

export const Resume = Table("resumes", {
  title: v.string(),
  userId: v.id("users"),
});
