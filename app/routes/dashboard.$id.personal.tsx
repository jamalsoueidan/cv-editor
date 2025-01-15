import {
  AppShell,
  Button,
  Flex,
  Grid,
  Image,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { useTranslation } from "react-i18next";
import { Link, useOutletContext } from "react-router";
import { PDFGridViewer } from "~/components/PDFGridViewer";
import { FormProvider } from "~/components/providers/CVFormProvider";
import type { Route } from "./+types/dashboard.$id";

export default function DashboardIndex() {
  const { t } = useTranslation();
  const { data, onNextStep } =
    useOutletContext() as Route.ComponentProps["loaderData"] & {
      onNextStep: () => void;
    };

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
          <Grid.Col span="auto" pr="md">
            <FormProvider form={form}>
              <form style={{ width: "100%" }}>
                <Grid gutter="xl">
                  <Grid.Col span={12}>
                    <Title order={2} fw="500">
                      What’s the best way for employers to contact you?
                    </Title>
                    <Text size="lg">
                      We suggest including an email and phone number.
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: "content" }}>
                    <Grid>
                      <Grid.Col span={{ base: 6, md: 12 }}>
                        <Image
                          src={data.photoUrl}
                          fallbackSrc="https://placehold.co/60x60?text=IMG"
                          radius="md"
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 6, md: 12 }}>
                        {data.photoUrl ? (
                          <>
                            <Button
                              variant="subtle"
                              component={Link}
                              to="upload"
                              size="compact-xs"
                              fullWidth
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
                              fullWidth
                            >
                              Delete image
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="subtle"
                            component={Link}
                            to="upload"
                            fullWidth
                          >
                            Add image
                          </Button>
                        )}
                      </Grid.Col>
                    </Grid>
                  </Grid.Col>
                  <Grid.Col span="auto">
                    <Grid>
                      <Grid.Col span={12}>
                        <TextInput
                          label="Job title"
                          variant="filled"
                          key={form.key("position")}
                          {...form.getInputProps("position")}
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="First Name"
                          variant="filled"
                          key={form.key("firstname")}
                          {...form.getInputProps("firstname")}
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Last Name"
                          variant="filled"
                          key={form.key("lastname")}
                          {...form.getInputProps("lastname")}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="E-mail"
                          variant="filled"
                          key={form.key("email")}
                          {...form.getInputProps("email")}
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Phone"
                          variant="filled"
                          key={form.key("phone")}
                          {...form.getInputProps("phone")}
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Country"
                          variant="filled"
                          key={form.key("country")}
                          {...form.getInputProps("country")}
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="City"
                          variant="filled"
                          key={form.key("city")}
                          {...form.getInputProps("city")}
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Flex
                          justify="flex-end"
                          align="center"
                          visibleFrom="md"
                        >
                          <Button size="md" onClick={onNextStep}>
                            {t("makecv.footer.next")}:{" "}
                            {t("makecv.navbar.summary")}
                          </Button>
                        </Flex>
                      </Grid.Col>
                    </Grid>
                  </Grid.Col>
                </Grid>
              </form>
            </FormProvider>
          </Grid.Col>
          <PDFGridViewer data={data} />
        </Grid>
      </AppShell.Main>

      <AppShell.Footer p="xs" hiddenFrom="md">
        <Flex justify="flex-end" align="center">
          <Button size="md" onClick={onNextStep}>
            {t("makecv.footer.next")}: {t("makecv.navbar.summary")}
          </Button>
        </Flex>
      </AppShell.Footer>
    </>
  );
}
