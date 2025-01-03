import { Group, Text, UnstyledButton } from "@mantine/core";

import { TbFileCv } from "react-icons/tb";
import { Link } from "react-router";

export function Logo() {
  return (
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
  );
}
