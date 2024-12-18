import { useAuthActions } from "@convex-dev/auth/react";
import { Carousel } from "@mantine/carousel";
import {
  Button,
  Container,
  Flex,
  Grid,
  rem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMemo } from "react";
import { FaHeart, FaLinkedin } from "react-icons/fa";
import { PiReadCvLogo } from "react-icons/pi";
import { ClientOnly } from "remix-utils/client-only";
import { useCreateResume } from "~/hooks/useCreateResume";
import { CardButton } from "./CardButton";
import classes from "./Login.module.css";
import { PDFViewer } from "./PDFViewer";
import { dumbData } from "./dumbData";

const resumes = [
  {
    ...dumbData,
    firstname: "Steve",
    lastname: "Jobs",
    position: "CEO Apple",
    template: { ...dumbData.template, name: "Copenhagen", color: "#e64980" },
  },
  {
    ...dumbData,
    firstname: "Jen-Hsun",
    lastname: "Huang",
    position: "CEO Nvidia",
    template: { ...dumbData.template, name: "Aarhus", color: "#be4bdb" },
  },
  {
    ...dumbData,
    firstname: "Elon",
    lastname: "Musk",
    position: "CEO Tesla",
    photoUrl:
      "https://nationaltoday.com/wp-content/uploads/2022/05/123-Elon-Musk-150x150.jpg",
    template: { ...dumbData.template, name: "Copenhagen", color: "#7950f2" },
  },
  {
    ...dumbData,
    firstname: "David",
    lastname: "Hansson",
    position: "CEO Basecamp",
    template: { ...dumbData.template, name: "Aarhus", color: "#4c6ef5" },
  },
  {
    ...dumbData,
    firstname: "Seth",
    lastname: "Godin",
    position: "Marketing",
    template: { ...dumbData.template, name: "Aarhus", color: "#4c6ef5" },
  },
];

export function Login() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { create, loading } = useCreateResume();
  const { signIn } = useAuthActions();

  const resumeMarkup = useMemo(
    () =>
      resumes?.map((resume, index) => (
        <Carousel.Slide key={index}>
          <Flex direction="column" align="center" gap="xs">
            <Title order={4} c="gray.6" fw="500">
              {resume.title}
            </Title>

            <ClientOnly>
              {() => (
                <PDFViewer
                  data={resume}
                  height={400}
                  withControls={false}
                  withPagning={false}
                  withBorder={true}
                  shadow="sm"
                />
              )}
            </ClientOnly>
          </Flex>
        </Carousel.Slide>
      )),
    []
  );

  return (
    <Stack gap={rem(40)}>
      <Container size="lg">
        <Stack gap={rem(40)} mt={rem(20)}>
          <div>
            <Title ta="center" mb="md">
              Gratis CV Online
            </Title>
            <Text className={classes.description} ta="center">
              Create a CV quickly. Start by entering your details or uploading
              an existing PDF, then select a template that fits your style.
              Customize it to showcase your skills and personality, and download
              your CV as PDF!
            </Text>
          </div>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <CardButton
                title="Login with LinkedIn"
                text=" Save, organize, and access multiple CVs."
                onClick={() => {
                  signIn("linkedin");
                }}
                icon={
                  <FaLinkedin style={{ width: rem(24), height: rem(24) }} />
                }
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <CardButton
                title="Create CV without Login"
                text="Unique link to your CV to edit it anytime."
                onClick={create}
                loading={loading}
                icon={
                  <PiReadCvLogo style={{ width: rem(24), height: rem(24) }} />
                }
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>

      <Carousel
        withIndicators={resumes && resumes.length >= 2}
        withControls={resumes && resumes.length >= 2}
        height={420}
        slideSize={{
          base: "80%",
          sm: "40%",
          md: "25%",
        }}
        slideGap={{ base: "sm", sm: "md" }}
        loop={!isMobile}
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
