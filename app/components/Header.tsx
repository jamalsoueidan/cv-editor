import { Container, Group, Title } from "@mantine/core";
import { Authenticated } from "convex/react";
import { FaBeer } from "react-icons/fa";
import classes from "./Header.module.css";
import { HeaderAccount } from "./HeaderAccount";

export function Header() {
  return (
    <header className={classes.header}>
      <Container fluid className={classes.mainSection}>
        <Group justify="space-between">
          <Group>
            <FaBeer />
            <Title order={3}>CV.dk</Title>
          </Group>
          <Authenticated>
            <HeaderAccount />
          </Authenticated>
        </Group>
      </Container>
    </header>
  );
}
