import {
  AppShell,
  Button,
  Flex,
  Grid,
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
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/dashboard.$id";

import { Link } from "react-router";
import { PDFContainer } from "~/components/PDFContainer";
import { FormProvider } from "~/components/providers/CVFormProvider";

export default function DashboardIndex() {
  const { data } = useOutletContext() as Route.ComponentProps["loaderData"];

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

  return (
    <>
      <AppShell.Main>
        <Grid>
          <Grid.Col span="auto">
            <FormProvider form={form}>
              <form style={{ width: "100%" }}>
                <Stack gap={rem(50)} mb="xl">
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
                                data.photo &&
                                deleteImage({ storageId: data.photo })
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
                </Stack>
              </form>
            </FormProvider>
          </Grid.Col>
          <Grid.Col
            span={4}
            visibleFrom="md"
            style={{ borderLeft: "2px solid #e9ecef" }}
          >
            <PDFContainer
              templateElement={<PDFContainer.Template data={data} />}
            >
              <UnstyledButton w="100%" style={{ userSelect: "none" }}>
                <PDFContainer.Viewer />
              </UnstyledButton>
            </PDFContainer>
          </Grid.Col>
        </Grid>
      </AppShell.Main>

      <AppShell.Footer p="xs">
        <Flex justify="flex-end" align="center">
          <Button size="xl">Næste</Button>
        </Flex>
      </AppShell.Footer>
    </>
  );
}
