import { Grid } from "@mantine/core";
import { ClientOnly } from "remix-utils/client-only";

import { PDFViewerWithNoSSR } from "~/components/PDFViewerWithNoSSR";

export default function Test() {
  return (
    <Grid gutter="0">
      <Grid.Col span={6}></Grid.Col>
      <Grid.Col span={6} h="100vh" bg="gray.1">
        <ClientOnly>{() => <PDFViewerWithNoSSR />}</ClientOnly>
      </Grid.Col>
    </Grid>
  );
}
