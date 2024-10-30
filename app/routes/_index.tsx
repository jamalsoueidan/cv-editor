import { useAuthActions } from "@convex-dev/auth/react";
import { Button, Container } from "@mantine/core";
import { Link } from "@remix-run/react";
import { Authenticated, Unauthenticated } from "convex/react";
import { HeaderSimple } from "~/components/HeaderSimple";
import { ResumesList } from "~/components/ResumesList";
import { SignOut } from "~/components/Signout";

export default function Index() {
  const { signIn } = useAuthActions();
  return (
    <Container>
      <HeaderSimple />
      <Authenticated>
        <SignOut />
        <ResumesList />
        <br />
        <Link to="/reader">Reader</Link>
        <Link to="/test">Test</Link>
      </Authenticated>

      <Unauthenticated>
        <Button onClick={() => void signIn("linkedin")}>
          Sign in with Linkedin
        </Button>
      </Unauthenticated>
    </Container>
  );
}
