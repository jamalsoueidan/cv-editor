import { Grid } from "@mantine/core";
import { useParams } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { ClientOnly } from "remix-utils/client-only";
import { CVForm } from "~/components/CVForm";

import { PDFViewerWithNoSSR } from "~/components/PDFViewerWithNoSSR";

export default function Test() {
  const params = useParams();
  const data = useQuery(api.resumes.get, { id: params.id as Id<"resumes"> });

  if (!data) {
    return <>Loading data</>;
  }

  return (
    <Grid gutter="0">
      <Grid.Col span={6} p="xl">
        <CVForm data={data} />
      </Grid.Col>
      <Grid.Col span={6} h="100vh" bg="gray.1" pos="sticky" top="0">
        <ClientOnly>{() => <PDFViewerWithNoSSR data={data} />}</ClientOnly>
      </Grid.Col>
    </Grid>
  );
}
