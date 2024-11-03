import { Table } from "convex-helpers/server";
import { v } from "convex/values";

export const Template = Table("templates", {
  name: v.string(),
  color: v.string(),
  lineHeight: v.string(),
  fontSize: v.string(),
  fontFamily: v.string(),
});
