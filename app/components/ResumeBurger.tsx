import {
  ActionIcon,
  Button,
  FileButton,
  Group,
  Menu,
  rem,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { Link } from "@remix-run/react";
import { FaClone, FaRegFilePdf, FaTrash } from "react-icons/fa";
import { PiReadCvLogo } from "react-icons/pi";
import { TfiMenu } from "react-icons/tfi";

export function ResumeBurger({
  upload,
  destroy,
  clone,
}: {
  upload: (payload: File | File[] | null) => void;
  destroy: () => void;
  clone: () => void;
}) {
  const openModal = () =>
    modals.openConfirmModal({
      title: "Delete CV",
      children: (
        <Text size="sm">
          Are you sure you want to delete this CV? Once you delete this CV, it
          cannot be restored.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: destroy,
    });

  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <ActionIcon variant="light" size="lg">
          <TfiMenu />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          to="view"
          leftSection={
            <PiReadCvLogo style={{ width: rem(14), height: rem(14) }} />
          }
        >
          View & Download CV
        </Menu.Item>

        <Menu.Item
          leftSection={<FaClone style={{ width: rem(14), height: rem(14) }} />}
          onClick={clone}
        >
          Clone CV
        </Menu.Item>
        <FileButton onChange={upload} accept="application/pdf">
          {(props) => (
            <Button
              variant="subtle"
              {...props}
              pl="xs"
              justify="space-between"
              fullWidth
            >
              <Group gap="xs">
                <FaRegFilePdf style={{ width: rem(14), height: rem(14) }} />
                Import PDF
              </Group>
            </Button>
          )}
        </FileButton>
        <Menu.Item
          leftSection={<FaTrash style={{ width: rem(14), height: rem(14) }} />}
          onClick={openModal}
          c="red"
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
