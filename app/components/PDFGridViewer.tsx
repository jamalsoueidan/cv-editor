import { Grid, UnstyledButton, useMantineColorScheme } from "@mantine/core";
import { modals } from "@mantine/modals";
import type { api } from "convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import { PDFContainer } from "~/components/PDFContainer";

export function PDFGridViewer({
  data,
}: {
  data: FunctionReturnType<typeof api.resumes.get>;
}) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <Grid.Col
      span={4}
      visibleFrom="md"
      style={{
        borderLeft: `2px solid ${
          isDark ? "var(--mantine-color-dark-4)" : "var(--mantine-color-gray-3)"
        }`,
      }}
    >
      <PDFContainer templateElement={<PDFContainer.Template data={data} />}>
        <UnstyledButton
          w="100%"
          style={{ userSelect: "none" }}
          onClick={() =>
            modals.openContextModal({
              size: "lg",
              modal: "pdfModal",
              innerProps: data,
            })
          }
        >
          <PDFContainer.Viewer />
        </UnstyledButton>
      </PDFContainer>
    </Grid.Col>
  );
}
