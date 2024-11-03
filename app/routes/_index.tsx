import { useAuthActions } from "@convex-dev/auth/react";
import { Button, Container, Divider, Group, rem, Title } from "@mantine/core";
import { Authenticated, Unauthenticated } from "convex/react";
import { FaBeer } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { FrontPage } from "~/components/Frontpage";
import { HeaderAccount } from "~/components/HeaderAccount";
import { Login } from "~/components/Login";

export default function Index() {
  const { signIn } = useAuthActions();

  return (
    <>
      <Container fluid>
        <Group justify="space-between" mih={rem(60)}>
          <Group>
            <FaBeer />
            <Title order={3}>CV Editor</Title>
          </Group>
          <Authenticated>
            <HeaderAccount />
          </Authenticated>
          <Unauthenticated>
            <Button
              onClick={() => void signIn("linkedin")}
              leftSection={<IoLogoLinkedin size="2rem" />}
            >
              Login
            </Button>
          </Unauthenticated>
        </Group>
      </Container>
      <Divider mb="xl" />

      <Authenticated>
        <FrontPage />
      </Authenticated>

      <Unauthenticated>
        <Login />
      </Unauthenticated>
    </>
  );
}
