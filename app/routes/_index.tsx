import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignOut } from "~/components/Signout";

export default function Index() {
  const { signIn } = useAuthActions();
  return (
    <div>
      <h1>Index Route</h1>
      <Authenticated>
        <SignOut />
        Logged in
      </Authenticated>

      <Unauthenticated>
        <div>
          <button onClick={() => void signIn("linkedin")}>
            Sign in with GitHub
          </button>
        </div>
      </Unauthenticated>
    </div>
  );
}
