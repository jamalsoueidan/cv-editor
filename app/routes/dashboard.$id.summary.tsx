import { AppShell, Button, Flex, Grid, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/dashboard.$id";

import { EditorInput } from "~/components/form/EditorInput";
import { PDFGridViewer } from "~/components/PDFGridViewer";
import { FormProvider } from "~/components/providers/CVFormProvider";

export default function DashboardIndex() {
  const { data, onNextStep } =
    useOutletContext() as Route.ComponentProps["loaderData"] & {
      onNextStep: () => void;
    };

  const patch = useMutation(api.resumes.update);

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
                      Briefly tell us about your background
                    </Title>
                    <Text size="lg">
                      Write 2 to 3 sentences about your overall experience.
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <EditorInput
                      description="Recruiter tip: write 400-600 characters to increase interview chances"
                      {...form.getInputProps("content")}
                    />
                  </Grid.Col>
                </Grid>
              </form>
            </FormProvider>
          </Grid.Col>
          <PDFGridViewer data={data} />
        </Grid>
      </AppShell.Main>
      <AppShell.Footer p="xs" hiddenFrom="md">
        <Flex justify="flex-end" align="center" gap="sm">
          <Button variant="default" size="md" onClick={onNextStep}>
            Back
          </Button>
          <Button size="md" onClick={onNextStep}>
            Næste: Om dig selv
          </Button>
        </Flex>
      </AppShell.Footer>
    </>
  );
}
