import { useAuthActions } from "@convex-dev/auth/react";
import {
  Card,
  Container,
  Flex,
  Grid,
  rem,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { IoMdLogOut } from "react-icons/io";
import { PiReadCvLogo } from "react-icons/pi";
import { Link } from "react-router";
import { useCreateResume } from "~/hooks/useCreateResume";
import { CardButton } from "./CardButton";
import classes from "./NotLoggedIn.module.css";
import { PDFContainer } from "./PDFContainer";

export function LoggedIn() {
  const { signOut } = useAuthActions();
  const data = useQuery(api.auth.currentUser);
  const resumes = useQuery(api.resumes.list);
  const { create, loading } = useCreateResume();

  if (!data) return null;

  const resumeMarkup = resumes?.map((resume) => (
    <Grid.Col
      span={{ base: 12, sm: 4 }}
      display="flex"
      key={resume._id}
      style={{ flexDirection: "column" }}
    >
      <PDFContainer templateElement={<PDFContainer.Template data={resume} />}>
        <Card
          component={Link}
          to={`/resumes/${resume._id}`}
          withBorder
          pb={rem(40)}
        >
          <Title order={4} c="gray.6" fw="500" ta="center">
            {resume.title}
          </Title>

          <PDFContainer.Viewer />
          <Flex
            justify="center"
            pos="absolute"
            bottom="15px"
            right="0"
            left="0"
          >
            <PDFContainer.Download />
          </Flex>
        </Card>
      </PDFContainer>
    </Grid.Col>
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

      <Grid mx="xl">{resumeMarkup}</Grid>
    </Stack>
  );
}
