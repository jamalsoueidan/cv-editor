import { AppShell, Flex, Grid, Stack, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/dashboard.$id";

import { EditorInput } from "~/components/form/EditorInput";
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
              </form>
            </FormProvider>
          </Grid.Col>{" "}
          <Grid.Col
            span={4}
            visibleFrom="md"
            style={{ borderLeft: "2px solid #e9ecef" }}
          >
            <PDFContainer
              templateElement={<PDFContainer.Template data={data} />}
            >
              <PDFContainer.Viewer />
            </PDFContainer>
          </Grid.Col>
        </Grid>
      </AppShell.Main>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </>
  );
}
