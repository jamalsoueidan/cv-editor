import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Center,
} from "@mantine/core";
import { FaTrash } from "react-icons/fa";

export function AccordionControl({
  onDestroy,
  ...props
}: AccordionControlProps & { onDestroy: () => void }) {
  return (
    <Center>
      <Accordion.Control {...props} />
      <ActionIcon
        size="lg"
        variant="subtle"
        color="gray"
        onClick={onDestroy}
        mr="sm"
      >
        <FaTrash size="1rem" />
      </ActionIcon>
    </Center>
  );
}
