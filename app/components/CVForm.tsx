import {
  Flex,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { RichTextEditor, Link as RTELink } from "@mantine/tiptap";
import { Link } from "@remix-run/react";

import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { FunctionReturnType } from "convex/server";

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
        console.log(values);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _creationTime, userId, updatedTime, photoUrl, ...rest } =
          values;
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

  return (
    <form>
      <Stack>
        <Title order={3} ta="center" fw="500">
          {data?.title}
        </Title>
        <Stack>
          <Title order={5} fw="500">
            Personlige detaljer
          </Title>
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
            <Text c="dimmed">
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
        </Stack>
      </Stack>
    </form>
  );
}
