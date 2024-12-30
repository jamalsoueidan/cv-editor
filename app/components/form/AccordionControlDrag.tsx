import {
  Accordion,
  ActionIcon,
  Center,
  type AccordionControlProps,
} from "@mantine/core";
import { DragControls } from "framer-motion";
import { FaGripHorizontal, FaTrash } from "react-icons/fa";

export function AccordionControlDrag({
  onDestroy,
  dragControls,
  ...props
}: AccordionControlProps & {
  onDestroy: () => void;
  dragControls: DragControls;
}) {
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
      <ActionIcon
        size="lg"
        variant="subtle"
        color="gray"
        onPointerDown={(event) => dragControls.start(event)}
        mr="sm"
      >
        <FaGripHorizontal size="1rem" />
      </ActionIcon>
    </Center>
  );
}
