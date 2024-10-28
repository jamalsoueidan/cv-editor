import { Grid } from "@mantine/core";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { ClientOnly } from "remix-utils/client-only";

import { PDFViewerWithNoSSR } from "~/components/PDFViewerWithNoSSR";

export default function Test() {
  const text = useQuery(api.text.getAll);

  return (
    <Grid gutter="0">
      <Grid.Col span={6}></Grid.Col>
      <Grid.Col span={6} h="100vh" bg="gray.1">
        <ClientOnly>{() => <PDFViewerWithNoSSR text={text} />}</ClientOnly>
      </Grid.Col>
    </Grid>
  );
}
