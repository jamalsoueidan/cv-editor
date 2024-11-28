import {
  Button,
  Flex,
  Group,
  Image,
  rem,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { Link } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { FunctionReturnType } from "convex/server";
import { useState } from "react";
import { FaEdit, FaLanguage, FaLink, FaSchool } from "react-icons/fa";
import { FormProvider } from "../providers/CVFormProvider";
import { EditorInput } from "./form/EditorInput";
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
    250
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
      <form style={{ width: "100%" }}>
        <Stack gap={rem(50)} mb="xl">
          <Flex justify="center" direction="column" gap="0">
            <Flex justify="center">
              {!focused ? (
                <Button variant="light" onClick={() => setFocused(true)}>
                  <Group>
                    <Title order={3}>{data.title}</Title>
                    <FaEdit />
                  </Group>
                </Button>
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
              <Title order={3} fw="500">
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

          <Stack>
            <Flex direction="column">
              <Title order={5} fw="500">
                Professional Summary
              </Title>
              <Text c="dimmed" fz="sm">
                Write 2 to 3 sentences about your overall experience.
              </Text>
            </Flex>

            <EditorInput
              description="Recruiter tip: write 400-600 characters to increase interview chances"
              {...form.getInputProps("content")}
            />
          </Stack>

          <WorkingExperiencesForm />
          <EducationsForm />
          {data.skillsVisible && <SkillsForm />}
          {data.socialProfilesVisible && <LinksForm />}
          {data.languagesVisible && <LanguagesForm />}

          <Stack>
            <Flex direction="column">
              <Title order={3} fw="500">
                Add Section
              </Title>{" "}
              <Text c="dimmed" fz="sm">
                You can add more sectionds to your CV
              </Text>
            </Flex>

            <Flex gap="md" wrap="wrap">
              <Button
                variant="light"
                onClick={() =>
                  form.setValues({ languagesVisible: !data.languagesVisible })
                }
                leftSection={<FaLanguage />}
                disabled={data.languagesVisible}
              >
                Languages
              </Button>
              <Button
                variant="light"
                onClick={() =>
                  form.setValues({
                    socialProfilesVisible: !data.socialProfilesVisible,
                  })
                }
                leftSection={<FaLink />}
                disabled={data.socialProfilesVisible}
              >
                Social Links
              </Button>
              <Button
                variant="light"
                onClick={() =>
                  form.setValues({
                    skillsVisible: !data.skillsVisible,
                  })
                }
                leftSection={<FaSchool />}
                disabled={data.skillsVisible}
              >
                Skills
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
}
