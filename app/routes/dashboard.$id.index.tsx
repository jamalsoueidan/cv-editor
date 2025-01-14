import {
  AppShell,
  Button,
  Card,
  Container,
  FileButton,
  Flex,
  Grid,
  Group,
  LoadingOverlay,
  rem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { HiOutlineDocument } from "react-icons/hi2";
import { PiUploadSimpleThin } from "react-icons/pi";
import { useOutletContext } from "react-router";
import { Logo } from "~/components/Logo";

import { api } from "convex/_generated/api";
import { useAction } from "convex/react";
import { FaCheckCircle } from "react-icons/fa";
import { useFilePDF } from "~/hooks/useFilePDF";
import type { Route } from "./+types/dashboard.$id";

export default function DashboardIndex() {
  const { onNextStep, id } =
    useOutletContext() as Route.ComponentProps["loaderData"] & {
      onNextStep: () => void;
    };

  const [state, setState] = useState<"cv" | "upload">("cv");
  const [isUploading, setIsUploading] = useState(false);
  const { file, setFile, text } = useFilePDF();
  const upload = useAction(api.openai.uploadPDF);

  const startUpload = () => {
    if (text) {
      upload({ content: text, id }).then(onNextStep);
      setIsUploading(true);
    }
  };

  useEffect(() => {
    if (text) {
      setState("upload");
    }
  }, [text]);

  return (
    <>
      <AppShell.Header>
        <Group h="100%" px="md">
          <Logo />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="xl">
          <Title ta="center" mt="xl" mb={rem(50)} fw="500">
            How do you want to start?
          </Title>
          <Grid justify="center">
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Card
                withBorder
                radius="md"
                p="xl"
                onClick={() => {
                  setState("cv");
                  setFile(null);
                }}
                style={
                  state === "cv"
                    ? {
                        boxShadow: "inset 0 0 0 5px rgba(150, 150, 150, 1)",
                      }
                    : {}
                }
              >
                <Flex
                  align="center"
                  justify="center"
                  direction="column"
                  mih={220}
                >
                  <HiOutlineDocument
                    size={100}
                    style={{
                      strokeWidth: 0.6,
                      stroke: "var(--mantine-color-blue-6)",
                    }}
                  />
                  <Stack align="center" gap="xs">
                    <Title fw="600">Create a new CV</Title>
                    <Text>We will help you create a CV - step by stpe</Text>
                  </Stack>
                </Flex>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <FileButton onChange={setFile} accept="application/pdf">
                {(props) => (
                  <Card
                    withBorder
                    radius="md"
                    p="xl"
                    style={
                      state === "upload"
                        ? {
                            boxShadow: "inset 0 0 0 5px rgba(150, 150, 150, 1)",
                          }
                        : {}
                    }
                    {...props}
                  >
                    <Flex
                      align="center"
                      justify="center"
                      direction="column"
                      mih={220}
                    >
                      <PiUploadSimpleThin
                        size={100}
                        style={{
                          strokeWidth: 0,
                          fill: "var(--mantine-color-blue-6)",
                        }}
                      />
                      <Stack align="center" gap="xs">
                        <Title fw="600">I already have a CV</Title>
                        <Text>
                          We&apos;ll reformat it and fill in your information.
                        </Text>
                        {file ? (
                          <>
                            <Group gap="xs">
                              <FaCheckCircle size={20} color="green" />
                              <Text>{file.name}</Text>
                              <Button size="compact-sm" variant="light">
                                Change file
                              </Button>
                            </Group>
                          </>
                        ) : null}
                      </Stack>
                    </Flex>
                  </Card>
                )}
              </FileButton>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
      <AppShell.Footer p="xs">
        <Flex justify="flex-end" align="center">
          {text ? (
            <Button size="md" onClick={() => startUpload()}>
              Næste
            </Button>
          ) : (
            <Button size="md" onClick={onNextStep}>
              Næste
            </Button>
          )}
        </Flex>
      </AppShell.Footer>
      {isUploading ? (
        <LoadingOverlay
          visible={isUploading}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
        />
      ) : null}
    </>
  );
}
