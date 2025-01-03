import {
  Avatar,
  Container,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";

import { useAuthActions } from "@convex-dev/auth/react";
import cx from "clsx";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { TbFileCv } from "react-icons/tb";
import { Link } from "react-router";
import classes from "./Header.module.css";

export function Header() {
  const { signOut } = useAuthActions();
  const data = useQuery(api.auth.currentUser);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Container size="xl">
      <Group justify="space-between">
        <UnstyledButton component={Link} to="/">
          <Group gap="0">
            <Text fz="xl" tt="uppercase">
              Gratis
            </Text>
            <TbFileCv
              size={48}
              style={{
                strokeWidth: 1,
                stroke: "var(--mantine-color-blue-6)",
                marginLeft: "-4px",
                marginRight: "-4px",
                marginBottom: "5.4px",
              }}
            />
            <Text fz="xl" tt="uppercase">
              Online
            </Text>
          </Group>
        </UnstyledButton>

        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: "pop-top-right" }}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton
              className={cx(classes.user, {
                [classes.userActive]: userMenuOpened,
              })}
            >
              <Group gap={7}>
                <Avatar alt={data?.name} radius="xl" size={30} />
                <Text fw={500} size="sm" lh={1} mr={3}>
                  {data?.name}
                </Text>
                <FaChevronDown size={12} />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item leftSection={<IoMdLogOut size={16} />} onClick={signOut}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Container>
  );
}
