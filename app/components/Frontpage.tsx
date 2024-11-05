import { useAuthActions } from "@convex-dev/auth/react";
import { Carousel } from "@mantine/carousel";
import {
  Container,
  Flex,
  Grid,
  rem,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { Link } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { IoMdLogOut } from "react-icons/io";
import { PiReadCvLogo } from "react-icons/pi";
import { ClientOnly } from "remix-utils/client-only";
import { useCreateResume } from "~/hooks/useCreateResume";
import { CardButton } from "./CardButton";
import classes from "./Login.module.css";
import { PDFViewer } from "./PDFViewer";

export function FrontPage() {
  const { signOut } = useAuthActions();
  const data = useQuery(api.auth.currentUser);
  const resumes = useQuery(api.resumes.list);
  const { create, loading } = useCreateResume();

  if (!data) return null;

  const resumeMarkup = resumes?.map((resume) => (
    <Carousel.Slide key={resume._id}>
      <Flex direction="column" align="center" gap="xs">
        <Title order={4} c="gray.6" fw="500">
          {resume.title}
        </Title>
        <UnstyledButton component={Link} to={`/resumes/${resume._id}`}>
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
        </UnstyledButton>
      </Flex>
    </Carousel.Slide>
  ));

  return (
    <Stack gap={rem(40)}>
      <Container size="lg">
        <Stack gap={rem(40)} mt={rem(20)}>
          <Text className={classes.description} ta="center">
            You are now logged in as <strong>{data?.name}</strong>
          </Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <CardButton
                title="Create a New CV"
                text="Start a new CV and add it to your saved list."
                onClick={create}
                loading={loading}
                icon={
                  <PiReadCvLogo style={{ width: rem(24), height: rem(24) }} />
                }
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <CardButton
                title="Log out"
                text="Log out of your account"
                onClick={signOut}
                loading={loading}
                icon={
                  <IoMdLogOut style={{ width: rem(24), height: rem(24) }} />
                }
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>

      <Carousel
        withIndicators={resumes && resumes.length >= 2}
        withControls={resumes && resumes.length >= 2}
        height={600}
        slideSize={{
          base: "60%",
          sm: "40%",
          md: "25%",
        }}
        slideGap={{ base: "sm", sm: "md" }}
      >
        {resumeMarkup}
      </Carousel>
    </Stack>
  );
}
