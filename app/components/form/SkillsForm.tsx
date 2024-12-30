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
import type { api } from "convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useRaisedShadow } from "~/hooks/useRaisedShadow";
import { useFormContext } from "../providers/CVFormProvider";
import { AccordionControlDrag } from "./AccordionControlDrag";
import { TitleHover } from "./TitleHover";

export function SkillsForm() {
  const form = useFormContext();

  const skills = form.getValues().skills.map((item, index) => {
    return <Item item={item} key={item.key} index={index} />;
  });

  return (
    <Stack>
      <Flex direction="column">
        <TitleHover
          title="Skills"
          onDelete={() => form.setValues({ skillsVisible: false })}
        />
        <Text c="dimmed" fz="sm">
          Choose 5 important skills that show you fit the position. Make sure
          they match the key skills mentioned in the job listing (especially
          when applying via an online system).
        </Text>
        <Flex mt="md" gap="xs" wrap="wrap">
          <Button
            size="xs"
            variant="light"
            onClick={() =>
              form.insertListItem("skills", {
                key: randomId(),
                title: "Teamwork Skills",
                level: "3",
              })
            }
            rightSection={<FaPlus />}
          >
            Teamwork Skills
          </Button>
          <Button
            size="xs"
            variant="light"
            onClick={() =>
              form.insertListItem("skills", {
                key: randomId(),
                title: "Critical Thinking",
                level: "3",
              })
            }
            rightSection={<FaPlus />}
          >
            Critical Thinking
          </Button>
          <Button
            size="xs"
            variant="light"
            onClick={() =>
              form.insertListItem("skills", {
                key: randomId(),
                title: "Customer Service",
                level: "3",
              })
            }
            rightSection={<FaPlus />}
          >
            Customer Service
          </Button>
          <Button
            size="xs"
            variant="light"
            onClick={() =>
              form.insertListItem("skills", {
                key: randomId(),
                title: "",
                level: "3",
              })
            }
            rightSection={<FaPlus />}
          >
            Add one more skill
          </Button>
        </Flex>
      </Flex>
      {skills.length > 0 && (
        <Reorder.Group
          axis="y"
          values={form.getValues().skills}
          onReorder={(items) => {
            form.setValues({ skills: items });
          }}
          as="div"
        >
          <Accordion variant="separated" chevronPosition="left">
            {skills}
          </Accordion>
        </Reorder.Group>
      )}
    </Stack>
  );
}

function Item({
  item,
  index,
}: {
  item: FunctionReturnType<typeof api.resumes.get>["skills"][0];
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
          onDestroy={() => form.removeListItem("skills", index)}
        >
          {item.title ? item.title : "(ikke angivet)"}
        </AccordionControlDrag>
        <Accordion.Panel>
          <Stack>
            <Flex gap="xl">
              <TextInput
                withAsterisk
                label="Skill"
                variant="filled"
                w="100%"
                style={{ flex: 1 }}
                {...form.getInputProps(`skills.${index}.title`)}
              />
              <Input.Wrapper
                label="Level - from 1 to 5"
                description="5 is best"
                inputWrapperOrder={["label", "error", "input", "description"]}
                w="50%"
              >
                <div style={{ display: "block" }}>
                  <SegmentedControl
                    {...form.getInputProps(`skills.${index}.level`)}
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
    </Reorder.Item>
  );
}
