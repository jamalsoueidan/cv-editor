import {
  Button,
  Flex,
  Group,
  Image,
  rem,
  Stack,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { Link } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { FunctionReturnType } from "convex/server";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FormProvider } from "../providers/CVFormProvider";
import { EducationsForm } from "./form/EducationsForm";
import { LanguagesForm } from "./form/LanguagesForm";
import { LinksForm } from "./form/LinksForm";
import { SkillsForm } from "./form/SkillsForm";
import { WorkingExperiencesForm } from "./form/WorkingExperiencesForm";
import { LangSelect } from "./LangSelect";

export function CVForm({
  data,
}: {
  data: FunctionReturnType<typeof api.resumes.get>;
}) {
  const patch = useMutation(api.resumes.update);
  const deleteImage = useMutation(api.resumes.deleteImage);

  const save = useDebouncedCallback(
    async (values: FunctionReturnType<typeof api.resumes.get>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _creationTime, userId, updatedTime, photoUrl, ...rest } = values;

      patch(rest);
    },
    500
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: data,
    onValuesChange(values) {
      if (data) {
        save(values);
      }
    },
  });

  const [focused, setFocused] = useState(false);

  return (
    <FormProvider form={form}>
      <form>
        <Stack gap={rem(50)} mb="xl">
          <Flex justify="center" direction="column" gap="0">
            <Flex justify="center">
              {!focused ? (
                <UnstyledButton onClick={() => setFocused(true)}>
                  <Group>
                    <Title order={3}>{data.title}</Title>
                    <FaEdit />
                  </Group>
                </UnstyledButton>
              ) : (
                <TextInput
                  styles={{
                    input: {
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: rem(24),
                    },
                  }}
                  {...form.getInputProps("title")}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  autoComplete="nope"
                  data-floating={focused}
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                />
              )}
            </Flex>
            <Flex justify="center">
              <LangSelect {...form.getInputProps("templateLanguage")} />
            </Flex>
          </Flex>
          <Stack>
            <Flex direction="column">
              <Title order={5} fw="500">
                Personal details
              </Title>
            </Flex>
            <Flex gap="xl" align="flex-end">
              <TextInput
                label="Job title"
                w="100%"
                variant="filled"
                key={form.key("position")}
                {...form.getInputProps("position")}
              />

              <Group w="100%" mih="36px">
                <Image
                  src={data.photoUrl}
                  fallbackSrc="https://placehold.co/60x60?text=IMG"
                  maw="40px"
                  radius="md"
                />
                {data.photoUrl ? (
                  <>
                    <Button
                      variant="subtle"
                      component={Link}
                      to="upload"
                      size="compact-xs"
                    >
                      Change image
                    </Button>
                    <Button
                      variant="subtle"
                      onClick={() =>
                        data.photo && deleteImage({ storageId: data.photo })
                      }
                      size="compact-xs"
                    >
                      Delete image
                    </Button>
                  </>
                ) : (
                  <Button variant="subtle" component={Link} to="upload">
                    Add image
                  </Button>
                )}
              </Group>
            </Flex>
            <Flex gap="xl">
              <TextInput
                label="First Name"
                w="100%"
                variant="filled"
                key={form.key("firstname")}
                {...form.getInputProps("firstname")}
              />
              <TextInput
                label="Last Name"
                w="100%"
                variant="filled"
                key={form.key("lastname")}
                {...form.getInputProps("lastname")}
              />
            </Flex>
            <Flex gap="xl">
              <TextInput
                label="E-mail"
                w="100%"
                variant="filled"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Phone"
                w="100%"
                variant="filled"
                key={form.key("phone")}
                {...form.getInputProps("phone")}
              />{" "}
            </Flex>
            <Flex gap="xl">
              <TextInput
                label="Country"
                w="100%"
                variant="filled"
                key={form.key("country")}
                {...form.getInputProps("country")}
              />
              <TextInput
                label="City"
                w="100%"
                variant="filled"
                key={form.key("city")}
                {...form.getInputProps("city")}
              />
            </Flex>
          </Stack>

          <WorkingExperiencesForm />
          <EducationsForm />
          <SkillsForm />
          <LinksForm />
          <LanguagesForm />
        </Stack>
      </form>
    </FormProvider>
  );
}
