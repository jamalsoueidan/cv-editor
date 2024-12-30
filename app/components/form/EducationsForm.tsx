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

import type { api } from "convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useRaisedShadow } from "~/hooks/useRaisedShadow";
import { useFormContext } from "../providers/CVFormProvider";
import { AccordionControlDrag } from "./AccordionControlDrag";

export function EducationsForm() {
  const form = useFormContext();

  const educations = form.getValues().educations.map((item, index) => {
    return <Item item={item} key={item.key} index={index} />;
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
        <Reorder.Group
          axis="y"
          values={form.getValues().educations}
          onReorder={(items) => {
            form.setValues({ educations: items });
          }}
          as="div"
        >
          <Accordion variant="separated" chevronPosition="left">
            {educations}
          </Accordion>
        </Reorder.Group>
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

function Item({
  item,
  index,
}: {
  item: FunctionReturnType<typeof api.resumes.get>["educations"][0];
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
    </Reorder.Item>
  );
}
