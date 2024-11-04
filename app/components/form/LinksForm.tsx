import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  Accordion,
  Button,
  Flex,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { FaPlus } from "react-icons/fa";
import { useFormContext } from "~/providers/CVFormProvider";
import { AccordionControlDrag } from "./AccordionControlDrag";
import { DraggableItem } from "./DraggableItem";

export function LinksForm() {
  const form = useFormContext();

  const socialProfiles = form.getValues().socialProfiles.map((item, index) => {
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
                onDestroy={() => form.removeListItem("socialProfiles", index)}
              >
                {item.label ? item.label : "(ikke angivet)"}
              </AccordionControlDrag>
              <Accordion.Panel>
                <Stack>
                  <Flex gap="xl">
                    <TextInput
                      withAsterisk
                      label="Label"
                      variant="filled"
                      w="100%"
                      style={{ flex: 1 }}
                      {...form.getInputProps(`socialProfiles.${index}.label`)}
                    />
                    <TextInput
                      withAsterisk
                      label="Link"
                      variant="filled"
                      placeholder="https://example.com"
                      w="100%"
                      style={{ flex: 1 }}
                      {...form.getInputProps(`socialProfiles.${index}.url`)}
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
        <Title order={5} fw="500">
          Social Links
        </Title>
        <Text c="dimmed" fz="sm">
          You can add links to websites you want hiring managers to see! Perhaps
          It will be a link to your portfolio, LinkedIn profile, or personal
          website
        </Text>
        <Flex mt="md" gap="xs" wrap="wrap">
          <Button
            size="xs"
            variant="light"
            onClick={() =>
              form.insertListItem("socialProfiles", {
                key: randomId(),
                label: "LinkedIn",
                url: "",
              })
            }
            rightSection={<FaPlus />}
          >
            Linkedin
          </Button>
          <Button
            size="xs"
            variant="light"
            onClick={() =>
              form.insertListItem("socialProfiles", {
                key: randomId(),
                label: "Blog",
                url: "",
              })
            }
            rightSection={<FaPlus />}
          >
            Blog
          </Button>
          <Button
            size="xs"
            variant="light"
            onClick={() =>
              form.insertListItem("socialProfiles", {
                key: randomId(),
                title: "",
                url: "",
              })
            }
            rightSection={<FaPlus />}
          >
            Add one more link
          </Button>
        </Flex>
      </Flex>
      {socialProfiles.length > 0 && (
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            if (!destination) return;
            const sourceIndex = source.index;
            const destinationIndex = destination.index;
            console.log(form.getValues().workExperiences[sourceIndex]);

            const items = [...form.getValues().socialProfiles];

            // Remove the item from the source index and insert it at the destination index
            const [movedItem] = items.splice(sourceIndex, 1);
            items.splice(destinationIndex, 0, movedItem);

            items.forEach((item, index) => {
              item.order = index + 1;
            });

            form.setValues({ socialProfiles: items });
          }}
        >
          <Droppable droppableId="socialProfiles" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Accordion variant="separated" chevronPosition="left">
                  {socialProfiles}
                </Accordion>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Stack>
  );
}
