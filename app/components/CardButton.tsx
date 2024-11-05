import { Flex, Text, UnstyledButton } from "@mantine/core";
import classes from "./CardButton.module.css";

export function CardButton({
  title,
  text,
  onClick,
  icon,
  loading = false,
}: {
  title: string;
  text: string;
  onClick: () => void;
  icon: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <UnstyledButton onClick={onClick} className={classes.button} miw="350px">
      <div>
        <Flex align="center" gap="xs" mb="xs">
          {icon}
          <Text fz="lg" fw={500}>
            {title}
          </Text>
        </Flex>
        <Text fz="sm" c="dimmed">
          {text}
        </Text>
      </div>
    </UnstyledButton>
  );
}
