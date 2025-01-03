import { useAuthActions } from "@convex-dev/auth/react";
import { Carousel } from "@mantine/carousel";
import {
  Button,
  Container,
  Flex,
  Grid,
  rem,
  Stack,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FaHeart, FaLinkedin } from "react-icons/fa";
import { PiReadCvLogo } from "react-icons/pi";
import { useCreateResume } from "~/hooks/useCreateResume";

import { useTranslation } from "react-i18next";
import { CardButton } from "~/components/CardButton";
import { dumbData } from "~/components/dumbData";
import { PDFContainer } from "~/components/PDFContainer";
import { Logo } from "./Logo";

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

export function NotLoggedIn() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { create, loading } = useCreateResume();
  const { signIn } = useAuthActions();

  return (
    <Stack gap={rem(40)}>
      <Container size="lg" mb={rem(40)}>
        <Stack gap={rem(40)} maw={700} m="auto">
          <Stack gap="md">
            <div>
              <Flex justify="center" align="center" mb={rem(20)}>
                <Logo />
              </Flex>
              <Title order={2} ta="center" fz={rem(36)} mb="md">
                {t("title")}
              </Title>
            </div>
            <Title order={3} ta="center" fw="400" fz={rem(20)}>
              {t("description")}
            </Title>
          </Stack>

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
        slideSize={{
          base: "80%",
          sm: "40%",
          md: "25%",
        }}
        slideGap={{ base: "sm", sm: "md" }}
        loop={!isMobile}
      >
        {resumes?.map((resume, index) => (
          <Carousel.Slide key={index}>
            <PDFContainer
              templateElement={<PDFContainer.Template data={resume} />}
            >
              <PDFContainer.Viewer withBorder />
            </PDFContainer>
          </Carousel.Slide>
        ))}
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
