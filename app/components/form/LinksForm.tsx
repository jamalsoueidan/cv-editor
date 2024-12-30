import { Accordion, Button, Flex, Stack, Text, TextInput } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import type { api } from "convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useRaisedShadow } from "~/hooks/useRaisedShadow";
import { useFormContext } from "../providers/CVFormProvider";
import { AccordionControlDrag } from "./AccordionControlDrag";
import { TitleHover } from "./TitleHover";

export function LinksForm() {
  const form = useFormContext();

  const socialProfiles = form.getValues().socialProfiles.map((item, index) => {
    return <Item item={item} key={item.key} index={index} />;
  });

  return (
    <Stack>
      <Flex direction="column">
        <TitleHover
          title="Social Links"
          onDelete={() => form.setValues({ socialProfilesVisible: false })}
        />
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
        <Reorder.Group
          axis="y"
          values={form.getValues().socialProfiles}
          onReorder={(items) => {
            form.setValues({ socialProfiles: items });
          }}
          as="div"
        >
          <Accordion variant="separated" chevronPosition="left">
            {socialProfiles}
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
  item: FunctionReturnType<typeof api.resumes.get>["socialProfiles"][0];
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
    </Reorder.Item>
  );
}
