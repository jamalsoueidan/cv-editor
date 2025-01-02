import { useAuthActions } from "@convex-dev/auth/react";
import {
  Box,
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
import { useTranslation } from "react-i18next";
import { IoMdLogOut } from "react-icons/io";
import { PiReadCvLogo } from "react-icons/pi";
import { Link } from "react-router";
import { useCreateResume } from "~/hooks/useCreateResume";
import { CardButton } from "./CardButton";
import classes from "./NotLoggedIn.module.css";
import { PDFContainer } from "./PDFContainer";

export function LoggedIn() {
  const { i18n } = useTranslation();
  const { signOut } = useAuthActions();
  const data = useQuery(api.auth.currentUser);
  const resumes = useQuery(api.resumes.list);
  const { create, loading } = useCreateResume();

  if (!data) return null;

  return (
    <>
      <Container size="lg">
        <Stack gap={rem(40)} mt={rem(20)}>
          <Text className={classes.description} ta="center">
            You are now logged in as <strong>{data?.name}</strong>
          </Text>
          <Grid justify="center" align="stretch">
            <Grid.Col span={{ base: 12, md: 4 }}>
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
            <Grid.Col span={{ base: 12, md: 4 }}>
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

      <Container size="xl" mt={rem(40)}>
        <Grid gutter="lg">
          {resumes?.map((resume) => (
            <Grid.Col
              span={{ base: 12, sm: 6 }}
              display="flex"
              key={resume._id}
              style={{ flexDirection: "column" }}
            >
              <PDFContainer
                templateElement={<PDFContainer.Template data={resume} />}
              >
                <Card p="xs">
                  <Flex direction="row">
                    <Box w="50%" component={Link} to={`/resume/${resume._id}`}>
                      <PDFContainer.Viewer />
                    </Box>
                    <Flex direction="column" align="flex-start" w="50%" p="md">
                      <Title order={2} fz="xl" c="gray.8" fw="500" ta="center">
                        {resume.title}
                      </Title>

                      <Text c="dimmed" size="sm">
                        Opdateret{" "}
                        {new Intl.DateTimeFormat(i18n.language, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date(resume.updatedTime))}
                      </Text>

                      <PDFContainer.Download
                        variant="transparent"
                        size="md"
                        px="0"
                      />
                    </Flex>
                  </Flex>
                </Card>
              </PDFContainer>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
}
