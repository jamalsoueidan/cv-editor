import { queryWithUser } from "./auth";

export const list = queryWithUser(
  async (ctx) => await ctx.db.query("templates").collect()
);
