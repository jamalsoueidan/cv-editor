import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Button,
  Center,
  Flex,
  Group,
  Image,
  Input,
  rem,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { randomId, useDebouncedCallback } from "@mantine/hooks";
import { Link } from "@remix-run/react";

import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { FunctionReturnType } from "convex/server";
import { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { EditorInput } from "./EditorInput";
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

  function AccordionControl(
    props: AccordionControlProps & { onDelete: () => void }
  ) {
    return (
      <Center>
        <Accordion.Control {...props} />
        <ActionIcon
          size="lg"
          variant="subtle"
          color="gray"
          onClick={props.onDelete}
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
          <AccordionControl
            onDelete={() => form.removeListItem("employees", index)}
          >
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
                    Start- og end date
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
              <EditorInput
                label="Beskrivelse"
                description="Ansættelseschefers tip: Skriv 200+ tegn for at øge dine chancer for at blive inviteret til jobsamtale"
                {...form.getInputProps(`workExperiences.${index}.description`)}
              />
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      );
    });

  const skills = form.getValues().skills.map((item, index) => {
    return (
      <Accordion.Item key={item.key} value={item.key}>
        <AccordionControl onDelete={() => form.removeListItem("skills", index)}>
          {item.title ? item.title : "(ikke angivet)"}
        </AccordionControl>
        <Accordion.Panel>
          <Stack>
            <Flex gap="xl">
              <TextInput
                withAsterisk
                label="Evne"
                variant="filled"
                w="100%"
                style={{ flex: 1 }}
                {...form.getInputProps(`skills.${index}.title`)}
              />
              <Input.Wrapper
                label="Niveau - Ekspert"
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
    );
  });

  const [focused, setFocused] = useState(false);

  return (
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
              label="Jobtitle"
              w="100%"
              variant="filled"
              key={form.key("position")}
              {...form.getInputProps("position")}
            />

            <Group w="100%" mih="36px">
              <Image
                src={data.photoUrl}
                fallbackSrc="https://placehold.co/60x60?text=IMG"
                maw="60px"
                radius="md"
              />
              {data.photoUrl ? (
                <>
                  <Button variant="subtle" component={Link} to="upload">
                    Change image
                  </Button>
                  <Button
                    variant="subtle"
                    onClick={() =>
                      data.photo && deleteImage({ storageId: data.photo })
                    }
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
              label="Fornavn"
              w="100%"
              variant="filled"
              key={form.key("firstname")}
              {...form.getInputProps("firstname")}
            />
            <TextInput
              label="Efternavn"
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
              label="Telefon"
              w="100%"
              variant="filled"
              key={form.key("phone")}
              {...form.getInputProps("phone")}
            />{" "}
          </Flex>
          <Flex gap="xl">
            <TextInput
              label="Land"
              w="100%"
              variant="filled"
              key={form.key("country")}
              {...form.getInputProps("country")}
            />
            <TextInput
              label="By"
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
        <Stack>
          <Flex direction="column">
            <Title order={5} fw="500">
              Employment History
            </Title>
            <Text c="dimmed" fz="sm">
              Show your relevant experience (last 10 years). Use bullet points
              to note your achievements.
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

          <Flex>
            <Button
              variant="transparent"
              onClick={() =>
                form.insertListItem("workExperiences", {
                  key: randomId(),
                })
              }
              leftSection={<FaPlus />}
            >
              Add employment
            </Button>
          </Flex>
        </Stack>
        <Stack>
          <Flex direction="column">
            <Title order={5} fw="500">
              Skills
            </Title>
            <Text c="dimmed" fz="sm">
              Choose 5 important skills that show you fit the position. Make
              sure they match the key skills mentioned in the job listing
              (especially when applying via an online system).
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
            </Flex>
          </Flex>
          {skills.length > 0 && (
            <Accordion variant="separated" chevronPosition="left">
              {skills}
            </Accordion>
          )}
        </Stack>
      </Stack>
    </form>
  );
}
