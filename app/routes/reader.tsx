import { Container, Grid } from "@mantine/core";
import { PDFViewer } from "@react-pdf/renderer";
import type { MetaFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";

import { MyDocument } from "~/components/MyDocument";

export const meta: MetaFunction = () => {
  return [
    { title: "CV Editor" },
    { name: "description", content: "CV Editor" },
  ];
};

export default function Index() {
  return (
    <Container fluid h="100vh">
      <ClientOnly>
        {() => (
          <Grid>
            <Grid.Col span={6}></Grid.Col>
            <Grid.Col span={6} h="100vh">
              <PDFViewer height="100%" width="100%" showToolbar={false}>
                <MyDocument />
              </PDFViewer>
            </Grid.Col>
          </Grid>
        )}
      </ClientOnly>
    </Container>
  );
}
