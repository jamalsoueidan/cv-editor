import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  Accordion,
  Button,
  Center,
  Flex,
  Input,
  rem,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { FaPlus } from "react-icons/fa";
import { useFormContext } from "~/providers/CVFormProvider";
import { AccordionControlDrag } from "./AccordionControlDrag";
import { DraggableItem } from "./DraggableItem";
import { TitleHover } from "./TitleHover";

export function LanguagesForm() {
  const form = useFormContext();

  const languages = form.getValues().languages.map((item, index) => {
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
                onDestroy={() => form.removeListItem("languages", index)}
              >
                {item.language ? item.language : "(ikke angivet)"}
              </AccordionControlDrag>
              <Accordion.Panel>
                <Stack>
                  <Flex gap="xl">
                    <TextInput
                      withAsterisk
                      label="Language"
                      variant="filled"
                      w="100%"
                      style={{ flex: 1 }}
                      {...form.getInputProps(`languages.${index}.language`)}
                    />
                    <Input.Wrapper
                      label="Level - from 1 to 5"
                      description="5 is best"
                      inputWrapperOrder={[
                        "label",
                        "error",
                        "input",
                        "description",
                      ]}
                      w="50%"
                    >
                      <div style={{ display: "block" }}>
                        <SegmentedControl
                          {...form.getInputProps(`languages.${index}.level`)}
                          data={[
                            {
                              label: <Center miw={rem(15)}>1</Center>,
                              value: "1",
                            },
                            {
                              label: <Center miw={rem(15)}>2</Center>,
                              value: "2",
                            },
                            {
                              label: <Center miw={rem(15)}>3</Center>,
                              value: "3",
                            },
                            {
                              label: <Center miw={rem(15)}>4</Center>,
                              value: "4",
                            },
                            {
                              label: <Center miw={rem(15)}>5</Center>,
                              value: "5",
                            },
                          ]}
                        />
                      </div>
                    </Input.Wrapper>
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
        <TitleHover
          title="Languages"
          onDelete={() => form.setValues({ languagesVisible: false })}
        />

        <Text c="dimmed" fz="sm">
          You can add which languages you speak and your level.
        </Text>
      </Flex>
      {languages.length > 0 && (
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            if (!destination) return;
            const sourceIndex = source.index;
            const destinationIndex = destination.index;
            console.log(form.getValues().workExperiences[sourceIndex]);

            const items = [...form.getValues().languages];

            // Remove the item from the source index and insert it at the destination index
            const [movedItem] = items.splice(sourceIndex, 1);
            items.splice(destinationIndex, 0, movedItem);

            items.forEach((item, index) => {
              item.order = index + 1;
            });

            form.setValues({ languages: items });
          }}
        >
          <Droppable droppableId="languages" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Accordion variant="separated" chevronPosition="left">
                  {languages}
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
            form.insertListItem("languages", {
              key: randomId(),
              language: "",
              level: "3",
            })
          }
          leftSection={<FaPlus />}
        >
          Add one more language
        </Button>
      </Flex>
    </Stack>
  );
}
