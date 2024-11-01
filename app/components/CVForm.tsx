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
import { Link } from "@remix-run/react";
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _creationTime, userId, updatedTime, photoUrl, ...rest } =
          values;
        patch(rest);
      }
    },
  });

  return (
    <form>
      <Stack>
        <Title order={3} ta="center" fw="500">
          {data?.title}
        </Title>
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
    </form>
  );
}
