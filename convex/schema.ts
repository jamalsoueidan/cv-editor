import { authTables } from "@convex-dev/auth/server";
import { defineSchema } from "convex/server";
import { Resume } from "./tables/resume";

export default defineSchema({
  ...authTables,
  resumes: Resume.table.index("byUserId", ["userId"]),
});
