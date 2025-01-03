import { Burger, Card, Group, Menu } from "@mantine/core";

import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router";
import { Logo } from "./Logo";

export function Header() {
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Card bg="white" py="xs" mt="md" radius="lg">
      <Group justify="space-between">
        <Logo />

        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: "pop-top-right" }}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          withinPortal
        >
          <Menu.Target>
            <Burger opened={userMenuOpened} size="lg" />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<FaHome size={16} />}
              component={Link}
              to="/"
            >
              Home
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Card>
  );
}
