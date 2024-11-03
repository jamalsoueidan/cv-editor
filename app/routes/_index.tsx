import { useAuthActions } from "@convex-dev/auth/react";
import { Button, Container, Divider, Group, rem, Title } from "@mantine/core";
import { Authenticated, Unauthenticated } from "convex/react";
import { FaBeer } from "react-icons/fa";
import { FrontPage } from "~/components/Frontpage";
import { HeaderAccount } from "~/components/HeaderAccount";
export default function Index() {
  const { signIn } = useAuthActions();

  return (
    <>
      <Container fluid>
        <Group justify="space-between" mih={rem(60)}>
          <Group>
            <FaBeer />
            <Title order={3}>CV.dk</Title>
          </Group>
          <Authenticated>
            <HeaderAccount />
          </Authenticated>
        </Group>
      </Container>
      <Divider mb="xl" />

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
