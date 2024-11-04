import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Center,
} from "@mantine/core";
import { FaGripHorizontal, FaTrash } from "react-icons/fa";
import classes from "./AccordionControlDrag.module.css";

export function AccordionControlDrag({
  onDestroy,
  dragHandleProps,
  ...props
}: AccordionControlProps & { onDestroy: () => void } & {
  dragHandleProps: DraggableProvidedDragHandleProps | null;
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
      <div {...dragHandleProps} className={classes.dragHandle}>
        <FaGripHorizontal size="1rem" />
      </div>
    </Center>
  );
}
