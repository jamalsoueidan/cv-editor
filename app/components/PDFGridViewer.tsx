import {
  Button,
  Flex,
  Grid,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { modals } from "@mantine/modals";
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
    <Grid.Col
      span={5}
      visibleFrom="md"
      style={{
        borderLeft: `2px solid ${
          isDark ? "var(--mantine-color-dark-4)" : "var(--mantine-color-gray-3)"
        }`,
      }}
    >
      <PDFContainer templateElement={<PDFContainer.Template data={data} />}>
        <Flex justify="space-between" align="center" direction="row" mb="sm">
          <Button
            variant="outline"
            size="xs"
            component={Link}
            to="../templates"
          >
            Skift skabelon
          </Button>
          <PDFContainer.DownloadIcon
            title="Download PDF"
            variant="outline"
            size="md"
          />
        </Flex>

        <UnstyledButton
          w="100%"
          style={{ userSelect: "none" }}
          onClick={() =>
            modals.openContextModal({
              size: "90%",
              modal: "pdfModal",
              innerProps: data,
            })
          }
        >
          <PDFContainer.Viewer />
        </UnstyledButton>
        <Flex justify="center">
          <PDFContainer.Pagination />
        </Flex>
      </PDFContainer>
    </Grid.Col>
  );
}
