import { Flex, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
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
        const { _creationTime, userId, updatedTime, ...rest } = values;
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
      </Stack>
    </form>
  );
}
