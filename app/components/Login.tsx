import { Carousel } from "@mantine/carousel";
import { Container, Flex, Stack, Text, Title } from "@mantine/core";
import { ClientOnly } from "remix-utils/client-only";
import classes from "./Login.module.css";
import { PDFViewer } from "./PDFViewer";
import { dumbData } from "./dumbData";

export function Login() {
  const resumes = [dumbData, dumbData, dumbData, dumbData, dumbData];

  const resumeMarkup = resumes?.map((resume) => (
    <Carousel.Slide key={resume._id}>
      <Flex direction="column" align="center" gap="xs">
        <Title order={4} c="gray.6" fw="500">
          {resume.title}
        </Title>

        <ClientOnly>
          {() => (
            <PDFViewer
              data={resume}
              height={500}
              withControls={false}
              withPagning={false}
              withBorder={true}
              shadow="sm"
            />
          )}
        </ClientOnly>
      </Flex>
    </Carousel.Slide>
  ));

  return (
    <Stack gap="xl">
      <Container size="lg">
        <Title order={2} className={classes.title} ta="center" mt="sm">
          Lav et professionelt CV nemt og hurtigt
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Indtast dine oplysninger, vælg en CV-skabelon, og tilpas dit CV alt
          efter din stil og personlighed og download dit CV med det samme.
        </Text>
      </Container>

      <Carousel
        withIndicators={resumes && resumes.length >= 2}
        withControls={resumes && resumes.length >= 2}
        height={520}
        slideSize={{
          base: "60%",
          sm: "40%",
          md: "25%",
        }}
        slideGap={{ base: "sm", sm: "md" }}
        loop
        initialSlide={2}
        align="center"
      >
        {resumeMarkup}
      </Carousel>
    </Stack>
  );
}
