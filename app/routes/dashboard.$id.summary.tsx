import {
  AppShell,
  Button,
  Flex,
  Grid,
  Progress,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/dashboard.$id";

import { useTranslation } from "react-i18next";
import { EditorInput } from "~/components/form/EditorInput";
import { FormProvider } from "~/components/providers/CVFormProvider";
import { ShellFooter } from "~/components/ShellFooter";

export default function DashboardIndex() {
  const { t } = useTranslation();
  const { data, onNextStep, onPrevStep } =
    useOutletContext() as Route.ComponentProps["loaderData"] & {
      onNextStep: () => void;
      onPrevStep: () => void;
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
              <Grid.Col span={12}>
                <Flex justify="flex-end" align="center" visibleFrom="md">
                  <Button onClick={onNextStep}>
                    {t("makecv.footer.next")}
                  </Button>
                </Flex>
              </Grid.Col>
            </Grid>
          </form>
        </FormProvider>
      </AppShell.Main>

      <ShellFooter
        hiddenFrom="md"
        upperSection={<Progress radius="0" size="md" value={25} />}
      >
        <Button variant="subtle" onClick={onPrevStep}>
          {t("makecv.footer.back")}
        </Button>

        <Button onClick={onNextStep}>{t("makecv.footer.next")}</Button>
      </ShellFooter>
    </>
  );
}
