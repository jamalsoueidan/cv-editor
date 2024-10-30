import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@mantine/core";
import { Link } from "@remix-run/react";
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
        <br />
        <Link to="/reader">Reader</Link>
        <br />
        <Link to="/test">Test</Link>
      </Authenticated>

      <Unauthenticated>
        <Button onClick={() => void signIn("linkedin")}>
          Sign in with Linkedin
        </Button>
      </Unauthenticated>
    </div>
  );
}
