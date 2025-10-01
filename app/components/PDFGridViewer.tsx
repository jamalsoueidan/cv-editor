import {
  AppShell,
  Button,
  Flex,
  ScrollArea,
  useMantineColorScheme,
} from "@mantine/core";
import type { api } from "convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import { Link } from "react-router";
import { PDFContainer } from "~/components/PDFContainer";

export function PDFGridViewer({
  data,
}: {
  data: FunctionReturnType<typeof api.resumes.get>;
}) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <PDFContainer templateElement={<PDFContainer.Template data={data} />}>
      <AppShell.Section p="sm">
        <Flex justify="space-between" align="center">
          <Button
            variant="outline"
            size="sm"
            component={Link}
            to="../templates"
          >
            Skift skabelon
          </Button>
          <PDFContainer.Download size="sm" variant="outline" />
        </Flex>
      </AppShell.Section>

      <AppShell.Section grow component={ScrollArea} px="sm">
        <PDFContainer.Viewer />
      </AppShell.Section>
      <AppShell.Section p="sm">
        <PDFContainer.Pagination />
      </AppShell.Section>
    </PDFContainer>
  );
}
