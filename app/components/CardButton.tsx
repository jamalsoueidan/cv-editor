import { Text, UnstyledButton } from "@mantine/core";
import classes from "./CardButton.module.css";

export function CardButton({
  title,
  text,
  onClick,
  loading = false,
}: {
  title: string;
  text: string;
  onClick: () => void;
  loading?: boolean;
}) {
  return (
    <UnstyledButton onClick={onClick} className={classes.button} miw="350px">
      <div>
        <Text fw={500} mb={7} lh={1}>
          {title}
        </Text>
        <Text fz="sm" c="dimmed">
          {text}
        </Text>
      </div>
    </UnstyledButton>
  );
}
