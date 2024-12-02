import { Migrations } from "@convex-dev/migrations";
import { nanoid } from "nanoid";
import { components, internal } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";

export const migrations = new Migrations<DataModel>(components.migrations);

export const setKeyValues = migrations.define({
  table: "resumes",
  migrateOne: async (ctx, doc) => {
    if (doc.key === undefined) {
      await ctx.db.patch(doc._id, { key: nanoid(8) });
    }
  },
});

export const runIt = migrations.runner(internal.migrations.setKeyValues);
