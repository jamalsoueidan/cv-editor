import {
  AppShell,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  Progress,
  Stack,
  Text,
  Timeline,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";
import { FaDownload, FaHryvnia } from "react-icons/fa";
import { PiFileArchive } from "react-icons/pi";
import { TbFileCv } from "react-icons/tb";
import { useOutletContext } from "react-router";
import { Logo } from "~/components/Logo";
import { PDFContainer } from "~/components/PDFContainer";
import { ShellFooter } from "~/components/ShellFooter";
import type { Route } from "./+types/dashboard.$id";

export default function DashboardIndex() {
  const { t } = useTranslation();
  const { data } = useOutletContext() as Route.ComponentProps["loaderData"] & {
    onNextStep: () => void;
    onPrevStep: () => void;
  };

  return (
    <PDFContainer templateElement={<PDFContainer.Template data={data} />}>
      <AppShell.Header>
        <Group mih={64} align="center" px="xl">
          <Logo />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="xl">
          <Grid>
            <Grid.Col
              span={{ base: 12, md: 6 }}
              py={{ base: "md", md: "lg" }}
              px={{ base: "sm", md: "xl" }}
            >
              <Stack gap="xl">
                <Title order={1} fw="500">
                  Looking good! Your resume is optimized and{" "}
                  <strong>READY</strong> for you to download it
                </Title>

                <Timeline active={1} bulletSize={24} lineWidth={2}>
                  <Timeline.Item
                    bullet={<FaDownload size={12} />}
                    title="New branch"
                  >
                    <Text c="dimmed" size="sm">
                      Default bullet without anything
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item
                    bullet={<FaDownload size={12} />}
                    title="New branch"
                  >
                    <Text c="dimmed" size="sm">
                      Default bullet without anything
                    </Text>
                  </Timeline.Item>
                </Timeline>

                <Card bg="gray.1" radius="md">
                  <Stack>
                    <Group gap="xs">
                      <FaDownload />
                      <Text>Ubegrænset download af PDF'er</Text>
                    </Group>
                    <Group gap="xs">
                      <TbFileCv />
                      <Text>Ubegrænsede CV'er</Text>
                    </Group>
                    <Group gap="xs">
                      <PiFileArchive />
                      <Text>Ubegrænsede ansøgninger</Text>
                    </Group>
                    <Group gap="xs">
                      <FaHryvnia />
                      <Text>
                        Gratis kritisk feedback på dit cv fra vores HR-eksperter
                      </Text>
                    </Group>
                  </Stack>
                </Card>

                <PDFContainer.Download
                  variant="gradient"
                  size="lg"
                  visibleFrom="md"
                />
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <UnstyledButton
                w="100%"
                style={{ userSelect: "none" }}
                onClick={() =>
                  modals.openContextModal({
                    size: "90%",
                    modal: "pdfModal",
                    innerProps: data,
                  })
                }
              >
                <PDFContainer.Viewer fit="height" />
              </UnstyledButton>
              <Flex justify="center">
                <PDFContainer.Pagination />
              </Flex>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
      <ShellFooter
        hiddenFrom="md"
        upperSection={<Progress radius="0" size="md" value={100} />}
        justify="flex-end"
      >
        <PDFContainer.Download variant="gradient" size="md" />
      </ShellFooter>
    </PDFContainer>
  );
}
