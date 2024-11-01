"use node";
import { v } from "convex/values";
import { Jimp } from "jimp";
import { action } from "./_generated/server";

export const convert = action({
  args: {
    buffer: v.bytes(),
  },
  handler: async (ctx, args) => {
    const image = await Jimp.read(args.buffer);
    image.resize({ h: 150 });
    const processedImageBuffer = await image.getBuffer("image/png");

    const processedImageBlob = new Blob([processedImageBuffer], {
      type: "image/png",
    });

    return await ctx.storage.store(processedImageBlob);
  },
});
