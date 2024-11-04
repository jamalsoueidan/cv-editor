import { ActionIcon, Group, Title, Transition } from "@mantine/core";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export function TitleHover({
  title,
  onDelete,
}: {
  title: string;
  onDelete: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Group
      align="center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Title order={3} fw="500">
        {title}
      </Title>
      {onDelete ? (
        <Transition
          mounted={hovered}
          transition="fade"
          duration={200}
          timingFunction="ease"
        >
          {(styles) => (
            <ActionIcon variant="subtle" style={styles} onClick={onDelete}>
              <FaTrash />
            </ActionIcon>
          )}
        </Transition>
      ) : null}
    </Group>
  );
}
