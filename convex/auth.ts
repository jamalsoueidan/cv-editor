import Linkedin from "@auth/core/providers/linkedin";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Linkedin],
});
