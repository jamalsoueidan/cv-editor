import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Center,
  Flex,
  Group,
  Image,
  rem,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { RichTextEditor, Link as RTELink } from "@mantine/tiptap";
import { Link } from "@remix-run/react";

import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { FunctionReturnType } from "convex/server";
import { FaTrash } from "react-icons/fa";

export function CVForm({
  data,
}: {
  data: FunctionReturnType<typeof api.resumes.get>;
}) {
  const patch = useMutation(api.resumes.update);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: data,
    onValuesChange(values) {
      if (data) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _creationTime, userId, updatedTime, photoUrl, ...rest } =
          values;

        /*const workExperiences = values.workExperiences.map((workExperience) => {
          return {
            ...workExperience,
            ...(workExperience.startDate
              ? {
                  startDate: new Date(workExperience.startDate).getTime(),
                }
              : {}),
            ...(workExperience.endDate
              ? {
                  endDate: new Date(workExperience.endDate).getTime(),
                }
              : {}),
          };
        });*/
        patch(rest);
      }
    },
  });

  const editor = useEditor({
    extensions: [StarterKit, RTELink],
    content: data.content,
    onUpdate({ editor }) {
      const content = editor.getHTML();
      form.setFieldValue("content", content);
    },
  });

  function AccordionControl(props: AccordionControlProps & { index: number }) {
    return (
      <Center>
        <Accordion.Control {...props} />
        <ActionIcon
          size="lg"
          variant="subtle"
          color="gray"
          onClick={() => form.removeListItem("employees", props.index)}
          mr="sm"
        >
          <FaTrash size="1rem" />
        </ActionIcon>
      </Center>
    );
  }

  const workExperiences = form
    .getValues()
    .workExperiences.map((item, index) => {
      return (
        <Accordion.Item key={item.key} value={item.key}>
          <AccordionControl index={index}>
            {item.position ? item.position : "(ikke angivet)"}
          </AccordionControl>
          <Accordion.Panel>
            <Stack>
              <Flex gap="xl">
                <TextInput
                  withAsterisk
                  label="Jobtitle"
                  variant="filled"
                  w="100%"
                  style={{ flex: 1 }}
                  {...form.getInputProps(`workExperiences.${index}.position`)}
                />
                <TextInput
                  withAsterisk
                  label="Arbejdsgiver"
                  variant="filled"
                  w="100%"
                  style={{ flex: 1 }}
                  {...form.getInputProps(`workExperiences.${index}.company`)}
                />
              </Flex>
              <Flex gap="xl">
                <Flex direction="column" flex="1">
                  <Text fw="500" fz="sm">
                    Start- og slutdato
                  </Text>
                  <Flex gap="md">
                    <MonthPickerInput
                      placeholder="MM / ÅÅÅÅ"
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
                      placeholder="MM / ÅÅÅÅ"
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
                </Flex>
                <TextInput
                  withAsterisk
                  label="By"
                  variant="filled"
                  w="100%"
                  style={{ flex: 1 }}
                  {...form.getInputProps(`workExperiences.${index}.city`)}
                />
              </Flex>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      );
    });

  return (
    <form>
      <Stack gap={rem(50)}>
        <Title order={3} ta="center" fw="500">
          {data?.title}
        </Title>
        <Stack>
          <Flex direction="column">
            <Title order={5} fw="500">
              Personlige detaljer
            </Title>
            <Text c="dimmed" fz="sm">
              Indtast din personlige detaljer.
            </Text>
          </Flex>
          <Flex gap="xl">
            <TextInput
              label="Jobtitle"
              w="100%"
              key={form.key("position")}
              {...form.getInputProps("position")}
            />
            <UnstyledButton component={Link} to="upload" w="100%">
              <Group>
                <Image src={data.photoUrl || ""} maw="60px" radius="md" />
                <Text>Edit image</Text>
                <Text>Slet</Text>
              </Group>
            </UnstyledButton>
          </Flex>
          <Flex gap="xl">
            <TextInput
              label="Fornavn"
              w="100%"
              key={form.key("firstname")}
              {...form.getInputProps("firstname")}
            />
            <TextInput
              label="Efternavn"
              w="100%"
              key={form.key("lastname")}
              {...form.getInputProps("lastname")}
            />
          </Flex>
          <Flex gap="xl">
            <TextInput
              label="E-mail"
              w="100%"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Telefon"
              w="100%"
              key={form.key("phone")}
              {...form.getInputProps("phone")}
            />{" "}
          </Flex>
          <Flex gap="xl">
            <TextInput
              label="Land"
              w="100%"
              key={form.key("country")}
              {...form.getInputProps("country")}
            />
            <TextInput
              label="By"
              w="100%"
              key={form.key("city")}
              {...form.getInputProps("city")}
            />
          </Flex>
        </Stack>
        <Stack>
          <Flex direction="column">
            <Title order={5} fw="500">
              Professionel profil
            </Title>
            <Text c="dimmed" fz="sm">
              Skriv 2 til 3 sætninger om din samlede erfaring
            </Text>
          </Flex>
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
          </RichTextEditor>
          <Text fz="sm" mt="-10px">
            Ansættelseschefens tip: Skriv 400-600 tegn for at øge dine chancer
            for at blive inviteret til jobsamtale
          </Text>
        </Stack>
        <Stack>
          <Flex direction="column">
            <Title order={5} fw="500">
              Ansættelseshistorik
            </Title>
            <Text c="dimmed" fz="sm">
              Inkluder de sidste 10 år med relevant erfaringer og datoer i denne
              sektion. Anfør din seneste stilling først.
            </Text>
          </Flex>
          {workExperiences.length > 0 && (
            <Accordion
              variant="separated"
              chevronPosition="left"
              defaultValue="Apples"
            >
              {workExperiences}
            </Accordion>
          )}

          <UnstyledButton
            ml="md"
            onClick={() =>
              form.insertListItem("workExperiences", {
                key: randomId(),
              })
            }
          >
            <Text c="blue" fw="500" fz="sm">
              + Tilføj en yderligere ansættelse
            </Text>
          </UnstyledButton>
        </Stack>
      </Stack>
    </form>
  );
}
