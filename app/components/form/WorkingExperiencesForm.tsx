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
import type { api } from "convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useRaisedShadow } from "~/hooks/useRaisedShadow";
import { useFormContext } from "../providers/CVFormProvider";
import { AccordionControlDrag } from "./AccordionControlDrag";
import { EditorInput } from "./EditorInput";

export function WorkingExperiencesForm() {
  const form = useFormContext();

  const workExperiences = form
    .getValues()
    .workExperiences.map((item, index) => {
      return <Item item={item} key={item.key} index={index} />;
    });

  return (
    <Stack>
      <Flex direction="column">
        <Title order={3} fw="500">
          Employment History
        </Title>
        <Text c="dimmed" fz="sm">
          Show your relevant experience (last 10 years). Use bullet points to
          note your achievements.
        </Text>
      </Flex>
      {workExperiences.length > 0 && (
        <Reorder.Group
          axis="y"
          values={form.getValues().workExperiences}
          onReorder={(items) => {
            form.setValues({ workExperiences: items });
          }}
          as="div"
        >
          <Accordion variant="separated" chevronPosition="left">
            {workExperiences}
          </Accordion>
        </Reorder.Group>
      )}

      <Flex>
        <Button
          variant="transparent"
          onClick={() =>
            form.insertListItem("workExperiences", {
              key: randomId(),
            })
          }
          leftSection={<FaPlus />}
        >
          Add employment
        </Button>
      </Flex>
    </Stack>
  );
}

function Item({
  item,
  index,
}: {
  item: FunctionReturnType<typeof api.resumes.get>["workExperiences"][0];
  index: number;
}) {
  const form = useFormContext();
  const controls = useDragControls();
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item
      value={item}
      id={item}
      dragListener={false}
      dragControls={controls}
      style={{ boxShadow, y }}
      as="div"
    >
      <Accordion.Item value={item.key}>
        <AccordionControlDrag
          dragControls={controls}
          onDestroy={() => form.removeListItem("workExperiences", index)}
        >
          {item.position ? item.position : "(ikke angivet)"}
        </AccordionControlDrag>
        <Accordion.Panel>
          <Stack>
            <Flex gap="xl">
              <TextInput
                withAsterisk
                label="Job Title"
                variant="filled"
                w="100%"
                style={{ flex: 1 }}
                {...form.getInputProps(`workExperiences.${index}.position`)}
              />
              <TextInput
                withAsterisk
                label="Employer"
                variant="filled"
                w="100%"
                style={{ flex: 1 }}
                {...form.getInputProps(`workExperiences.${index}.company`)}
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
                          `workExperiences.${index}.startDate`,
                          value?.getTime()
                        );
                      }}
                      value={item.startDate ? new Date(item.startDate) : null}
                    />
                    <MonthPickerInput
                      placeholder="MM / YYYY"
                      valueFormat="MM / YYYY"
                      w="50%"
                      variant="filled"
                      clearable
                      onChange={(value) => {
                        form.setFieldValue(
                          `workExperiences.${index}.endDate`,
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
                {...form.getInputProps(`workExperiences.${index}.city`)}
              />
            </Flex>
            <EditorInput
              label="Description"
              description="Recruiter tip: write 200+ characters to increase interview chances"
              {...form.getInputProps(`workExperiences.${index}.description`)}
            />
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Reorder.Item>
  );
}
