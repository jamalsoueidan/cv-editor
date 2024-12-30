import { Carousel } from "@mantine/carousel";
import { Container, Grid } from "@mantine/core";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { PDFContainer } from "~/components/PDFContainer";
import type { Route } from "./+types/canvas";

// Create styles
const styles = StyleSheet.create({
  document: {},
  page: {},
  section: {},
});

// Create Document Component
export const MyDocument = () => {
  return (
    <Document>
      <Page size="A4">
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_VERCEL };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <Container size="xl">
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <PDFContainer templateElement={<MyDocument />}>
            <PDFContainer.Viewer />
            <PDFContainer.Download />
          </PDFContainer>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <PDFContainer templateElement={<MyDocument />}>
            <PDFContainer.Viewer />
            <PDFContainer.Download />
          </PDFContainer>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <PDFContainer templateElement={<MyDocument />}>
            <PDFContainer.Viewer />
            <PDFContainer.Download />
          </PDFContainer>
        </Grid.Col>
      </Grid>

      <Carousel
        withIndicators
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        slideGap={{ base: 0, sm: "md" }}
        loop
        align="start"
      >
        <Carousel.Slide>
          <PDFContainer templateElement={<MyDocument />}>
            <PDFContainer.Viewer />
            <PDFContainer.Download />
          </PDFContainer>
        </Carousel.Slide>
        <Carousel.Slide>
          <PDFContainer templateElement={<MyDocument />}>
            <PDFContainer.Viewer />
            <PDFContainer.Download />
          </PDFContainer>
        </Carousel.Slide>
        <Carousel.Slide>
          <PDFContainer templateElement={<MyDocument />}>
            <PDFContainer.Viewer />
            <PDFContainer.Download />
          </PDFContainer>
        </Carousel.Slide>
      </Carousel>
    </Container>
  );
}
