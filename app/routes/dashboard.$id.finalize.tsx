import {
  AppShell,
  Flex,
  Grid,
  Group,
  Stack,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import { Logo } from "~/components/Logo";
import { PDFContainer } from "~/components/PDFContainer";
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
        <Grid>
          <Grid.Col
            span={{ base: 12, md: 6 }}
            py={{ base: "md", md: "lg" }}
            px={{ base: "sm", md: "xl" }}
          >
            <Stack>
              <Title order={2} fw="500">
                Looking good! Your resume is optimized and{" "}
                <strong>READY</strong> for you to download it
              </Title>

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
              <PDFContainer.Viewer />
            </UnstyledButton>
            <Flex justify="center">
              <PDFContainer.Pagination />
            </Flex>
          </Grid.Col>
        </Grid>
      </AppShell.Main>
      <AppShell.Footer p="xs" hiddenFrom="md">
        <Flex justify="center">
          <PDFContainer.Download variant="gradient" size="md" />
        </Flex>
      </AppShell.Footer>
    </PDFContainer>
  );
}
