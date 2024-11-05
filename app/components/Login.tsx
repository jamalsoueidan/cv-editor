import { Carousel } from "@mantine/carousel";
import { Button, Container, Flex, Stack, Text, Title } from "@mantine/core";
import { FaHeart } from "react-icons/fa";
import { ClientOnly } from "remix-utils/client-only";
import classes from "./Login.module.css";
import { PDFViewer } from "./PDFViewer";
import { dumbData } from "./dumbData";

export function Login() {
  const resumes = [
    {
      ...dumbData,
      firstname: "Steve",
      lastname: "Jobs",
      position: "CEO Apple",
      template: { ...dumbData.template, name: "Quds", color: "#e64980" },
    },
    {
      ...dumbData,
      firstname: "Jen-Hsun",
      lastname: "Huang",
      position: "CEO Nvidia",
      template: { ...dumbData.template, name: "Gaza", color: "#be4bdb" },
    },
    {
      ...dumbData,
      firstname: "Elon",
      lastname: "Musk",
      position: "CEO Tesla",
      photoUrl:
        "https://nationaltoday.com/wp-content/uploads/2022/05/123-Elon-Musk-150x150.jpg",
      template: { ...dumbData.template, name: "Quds", color: "#7950f2" },
    },
    {
      ...dumbData,
      firstname: "David",
      lastname: "Hansson",
      position: "CEO Basecamp",
      template: { ...dumbData.template, name: "Gaza", color: "#4c6ef5" },
    },
    {
      ...dumbData,
      firstname: "Seth",
      lastname: "Godin",
      position: "Marketing",
      template: { ...dumbData.template, name: "Gaza", color: "#4c6ef5" },
    },
  ];

  const resumeMarkup = resumes?.map((resume, index) => (
    <Carousel.Slide key={index}>
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
          Create CV Easily (FREE OF CHARGE)
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Enter your information or upload your PDF, choose a CV template,
          customize your CV to match your style and personality, and download
          your CV right away.
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

      <Flex justify="center">
        <Button
          component="a"
          variant="subtle"
          href="https://www.linkedin.com/in/jamalsoueidan"
          target="_blank"
          rel="noreferrer"
          leftSection={<FaHeart color="red" />}
        >
          I&apos;m Available for hire
        </Button>
      </Flex>
    </Stack>
  );
}
