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
      console.log(values);
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

  function AccordionControl(props: AccordionControlProps) {
    return (
      <Center>
        <Accordion.Control {...props} />
        <ActionIcon
          size="lg"
          variant="subtle"
          color="gray"
          onClick={props.onClick}
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
            onClick={() => form.removeListItem("employees", index)}
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
        <AccordionControl onClick={() => form.removeListItem("skills", index)}>
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
      <Stack gap={rem(50)}>
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
              Personlige detaljer
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
                    Ændre billed
                  </Button>
                  <Button
                    variant="subtle"
                    onClick={() =>
                      data.photo && deleteImage({ storageId: data.photo })
                    }
                  >
                    Slet
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
              Professionel profil
            </Title>
            <Text c="dimmed" fz="sm">
              Skriv 2 til 3 sætninger om din samlede erfaring
            </Text>
          </Flex>

          <EditorInput
            description="Ansættelseschefens tip: Skriv 400-600 tegn for at øge dine chancer
            for at blive inviteret til jobsamtale"
            {...form.getInputProps("content")}
          />
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
        <Stack>
          <Flex direction="column">
            <Title order={5} fw="500">
              Færdigheder
            </Title>
            <Text c="dimmed" fz="sm">
              Anfør dine kompetencer og erfaringsniveauer for at tydeliggøre
              dine styrker og optimere dine nøgleord.
            </Text>
            <Flex mt="md" gap="xs" wrap="wrap">
              <Button
                size="xs"
                variant="light"
                onClick={() =>
                  form.insertListItem("skills", {
                    key: randomId(),
                    title: "Kommunikationsegenskaber",
                    level: 3,
                  })
                }
                rightSection={<FaPlus />}
              >
                Kommunikationsegenskaber
              </Button>
              <Button
                size="xs"
                variant="light"
                onClick={() =>
                  form.insertListItem("skills", {
                    key: randomId(),
                    title: "God holdspiller",
                    level: "3",
                  })
                }
                rightSection={<FaPlus />}
              >
                God holdspiller
              </Button>
              <Button
                size="xs"
                variant="light"
                onClick={() =>
                  form.insertListItem("skills", {
                    key: randomId(),
                    title: "Velorganiseret",
                    level: "3",
                  })
                }
                rightSection={<FaPlus />}
              >
                Velorganiseret
              </Button>
            </Flex>
          </Flex>
          {skills.length > 0 && (
            <Accordion
              variant="separated"
              chevronPosition="left"
              defaultValue="Apples"
            >
              {skills}
            </Accordion>
          )}
        </Stack>
      </Stack>
    </form>
  );
}
