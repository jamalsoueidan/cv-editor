import { AppShell } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/dashboard.$id";

import { SkillsForm } from "~/components/form/SkillsForm";
import { PDFContainer } from "~/components/PDFContainer";
import { FormProvider } from "~/components/providers/CVFormProvider";

export default function DashboardIndex() {
  const { data } = useOutletContext() as Route.ComponentProps["loaderData"];

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
            <SkillsForm />
          </form>
        </FormProvider>
      </AppShell.Main>
      <AppShell.Aside p="xs">
        <PDFContainer templateElement={<PDFContainer.Template data={data} />}>
          <PDFContainer.Viewer />
        </PDFContainer>
      </AppShell.Aside>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </>
  );
}
