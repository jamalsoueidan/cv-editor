import { useAuthActions } from "@convex-dev/auth/react";
import {
  Button,
  Container,
  Flex,
  Grid,
  rem,
  Stack,
  Title,
} from "@mantine/core";
import { FaHeart, FaLinkedin } from "react-icons/fa";
import { PiReadCvLogo } from "react-icons/pi";
import { useCreateResume } from "~/hooks/useCreateResume";

import { useTranslation } from "react-i18next";
import { CardButton } from "~/components/CardButton";
import { Logo } from "./Logo";
import { CVCarousel } from "./sections/CVCarousel";
import { JoinUsersHero } from "./sections/JoinUsersHero";
import { WhyChooseUs } from "./sections/WhyChooseUs";

export function NotLoggedIn() {
  const { t } = useTranslation();

  const { create, loading } = useCreateResume();
  const { signIn } = useAuthActions();

  return (
    <>
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

        <CVCarousel />
        <WhyChooseUs />
        <JoinUsersHero />

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
    </>
  );
}
