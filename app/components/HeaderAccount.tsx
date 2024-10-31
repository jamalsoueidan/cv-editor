import { useAuthActions } from "@convex-dev/auth/react";
import {
  Avatar,
  Group,
  Menu,
  rem,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import cx from "clsx";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";
import { FaArrowDown, FaHeart, FaStar } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import classes from "./HeaderAccount.module.css";

export function HeaderAccount() {
  const theme = useMantineTheme();

  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { signOut } = useAuthActions();
  const data = useQuery(api.auth.currentUser);

  return (
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
            <Avatar src={data?.image} alt={data?.name} radius="xl" size={20} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {data?.name}
            </Text>
            <FaArrowDown style={{ width: rem(12), height: rem(12) }} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <FaHeart
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.red[6]}
            />
          }
        >
          Cver
        </Menu.Item>
        <Menu.Item
          leftSection={
            <FaStar
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.yellow[6]}
            />
          }
        >
          Ansøgninger
        </Menu.Item>

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          leftSection={
            <VscAccount style={{ width: rem(16), height: rem(16) }} />
          }
        >
          Account settings
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IoIosLogOut style={{ width: rem(16), height: rem(16) }} />
          }
          onClick={signOut}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
