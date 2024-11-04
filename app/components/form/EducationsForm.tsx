import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  Accordion,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { randomId } from "@mantine/hooks";
import { FaPlus } from "react-icons/fa";
import { useFormContext } from "~/providers/CVFormProvider";
import { AccordionControlDrag } from "./AccordionControlDrag";
import { DraggableItem } from "./DraggableItem";

export function EducationsForm() {
  const form = useFormContext();

  const educations = form.getValues().educations.map((item, index) => {
    return (
      <Draggable key={item.key} index={index} draggableId={item.key}>
        {(provided, snapshot) => (
          <DraggableItem
            isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Accordion.Item key={item.key} value={item.key}>
              <AccordionControlDrag
                dragHandleProps={provided.dragHandleProps}
                onDestroy={() => form.removeListItem("educations", index)}
              >
                {item.school ? item.school : "(ikke angivet)"}
              </AccordionControlDrag>
              <Accordion.Panel>
                <Stack>
                  <Flex gap="xl">
                    <TextInput
                      withAsterisk
                      label="School"
                      variant="filled"
                      w="100%"
                      style={{ flex: 1 }}
                      {...form.getInputProps(`educations.${index}.school`)}
                    />
                    <TextInput
                      withAsterisk
                      label="Degree"
                      variant="filled"
                      w="100%"
                      style={{ flex: 1 }}
                      {...form.getInputProps(`educations.${index}.degree`)}
                    />
                  </Flex>
                  <Flex gap="xl">
                    <Flex direction="column" flex="1">
                      <Input.Wrapper label="Start- & end date">
                        <Flex gap="md">
                          <MonthPickerInput
                            placeholder="MM / YYYY"
                            valueFormat="MM / YYYY"
                            w="50%"
                            variant="filled"
                            clearable
                            onChange={(value) => {
                              form.setFieldValue(
                                `educations.${index}.startDate`,
                                value?.getTime()
                              );
                            }}
                            value={
                              item.startDate ? new Date(item.startDate) : null
                            }
                          />
                          <MonthPickerInput
                            placeholder="MM / YYYY"
                            valueFormat="MM / YYYY"
                            w="50%"
                            variant="filled"
                            clearable
                            onChange={(value) => {
                              form.setFieldValue(
                                `educations.${index}.endDate`,
                                value?.getTime()
                              );
                            }}
                            value={item.endDate ? new Date(item.endDate) : null}
                          />
                        </Flex>
                      </Input.Wrapper>
                    </Flex>
                    <TextInput
                      withAsterisk
                      label="City"
                      variant="filled"
                      w="100%"
                      style={{ flex: 1 }}
                      {...form.getInputProps(`educations.${index}.city`)}
                    />
                  </Flex>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          </DraggableItem>
        )}
      </Draggable>
    );
  });

  return (
    <Stack>
      <Flex direction="column">
        <Title order={3} fw="500">
          Education
        </Title>{" "}
        <Text c="dimmed" fz="sm">
          A varied education on your resume sums up the value that your
          learnings and background will bring to job.
        </Text>
      </Flex>
      {educations.length > 0 && (
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            if (!destination) return;
            const sourceIndex = source.index;
            const destinationIndex = destination.index;
            console.log(form.getValues().workExperiences[sourceIndex]);

            const items = [...form.getValues().educations];

            // Remove the item from the source index and insert it at the destination index
            const [movedItem] = items.splice(sourceIndex, 1);
            items.splice(destinationIndex, 0, movedItem);

            items.forEach((item, index) => {
              item.order = index + 1;
            });

            form.setValues({ educations: items });
          }}
        >
          <Droppable droppableId="educations" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Accordion variant="separated" chevronPosition="left">
                  {educations}
                </Accordion>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <Flex>
        <Button
          variant="transparent"
          onClick={() =>
            form.insertListItem("educations", {
              key: randomId(),
            })
          }
          leftSection={<FaPlus />}
        >
          Add education
        </Button>
      </Flex>
    </Stack>
  );
}
