import { useAuthActions } from "@convex-dev/auth/react";
import { Button, Container } from "@mantine/core";
import { Authenticated, Unauthenticated } from "convex/react";
import { FrontPage } from "~/components/Frontpage";
import { Header } from "~/components/Header";
export default function Index() {
  const { signIn } = useAuthActions();

  return (
    <>
      <Header />

      <Authenticated>
        <FrontPage />
      </Authenticated>
      <Container>
        <Unauthenticated>
          <Button onClick={() => void signIn("linkedin")}>
            Sign in with Linkedin
          </Button>
        </Unauthenticated>
      </Container>
    </>
  );
}
