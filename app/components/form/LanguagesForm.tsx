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

export function LanguagesForm() {
  const form = useFormContext();

  const languages = form.getValues().languages.map((item, index) => {
    return <Item item={item} key={item.key} index={index} />;
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
        <Reorder.Group
          axis="y"
          values={form.getValues().languages}
          onReorder={(items) => {
            form.setValues({ languages: items });
          }}
          as="div"
        >
          <Accordion variant="separated" chevronPosition="left">
            {languages}
          </Accordion>
        </Reorder.Group>
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

function Item({
  item,
  index,
}: {
  item: FunctionReturnType<typeof api.resumes.get>["languages"][0];
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
          onDestroy={() => form.removeListItem("language", index)}
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
                inputWrapperOrder={["label", "error", "input", "description"]}
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
    </Reorder.Item>
  );
}
