import {
  AppShell,
  Button,
  Card,
  Checkbox,
  Drawer,
  Flex,
  Grid,
  Group,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useDisclosure, useToggle } from "@mantine/hooks";

import { api } from "convex/_generated/api";

import { useMutation } from "convex/react";
import { useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { dumbData } from "~/components/dumbData";

import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { PDFContainer } from "~/components/PDFContainer";
import type { Route } from "./+types/dashboard.$id";

const TemplateList = [
  {
    color: "#eaeaea",
    fontFamily: "Open Sans",
    fontSize: "14",
    lineHeight: "",
    name: "Aarhus",
  },
  {
    color: "#fff66d",
    fontFamily: "Open Sans",
    fontSize: "14",
    lineHeight: "",
    name: "Copenhagen",
  },
];

export default function Templates() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const patch = useMutation(api.resumes.updateTemplate);
  const { data } = useOutletContext() as Route.ComponentProps["loaderData"] & {
    onNextStep: () => void;
  };
  const [value, toggle] = useToggle();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const markup = useMemo(
    () =>
      data &&
      TemplateList?.map((template) => (
        <Card
          key={template.name}
          onClick={() => {
            patch({ _id: data._id, template });
          }}
          variant="outline"
          w="50%"
        >
          <Title order={4} fw="400" ta="center" mb="xs">
            {template.name.charAt(0).toUpperCase() + template.name.slice(1)}
          </Title>

          <PDFContainer
            templateElement={
              <PDFContainer.Template
                data={{ ...dumbData, template: template }}
                template={template.name}
              />
            }
          >
            <PDFContainer.Viewer
              withBorder
              style={{
                boxSizing: "border-box",
                outline:
                  data.template.name === template.name
                    ? "3px solid #228be6"
                    : "none",
              }}
            />
          </PDFContainer>
        </Card>
      )),
    [data, patch]
  );

  return (
    <>
      <AppShell.Header>
        <Group h="100%" px="md">
          <Button onClick={() => navigate(-1)} leftSection={<FaArrowLeft />}>
            {t("makecv.footer.back")}
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Grid>
          <Grid.Col span={{ md: 6 }} visibleFrom="md">
            <Flex>{markup}</Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <PDFContainer
              templateElement={
                <PDFContainer.Template
                  data={value ? { ...dumbData, template: data.template } : data}
                />
              }
            >
              <PDFContainer.Viewer />

              <Flex justify="center" mt="xl">
                <Checkbox
                  checked={value}
                  onChange={(event) => toggle(event.currentTarget.checked)}
                  label="Preview data"
                  labelPosition="left"
                />
              </Flex>
            </PDFContainer>
          </Grid.Col>
        </Grid>
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          position="bottom"
          padding="md"
        >
          <ScrollArea>
            <Flex direction="column" align="center" gap="md">
              {markup}
            </Flex>
          </ScrollArea>
        </Drawer>
      </AppShell.Main>
      <AppShell.Footer p="xs" hiddenFrom="md">
        <Button onClick={toggleDrawer}>Open template list</Button>
      </AppShell.Footer>
    </>
  );
}
