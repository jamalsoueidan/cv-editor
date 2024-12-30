import {
  Box,
  Burger,
  Button,
  Checkbox,
  Container,
  Divider,
  Drawer,
  Flex,
  Grid,
  Group,
  ScrollArea,
  Title,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useDisclosure, useMediaQuery, useToggle } from "@mantine/hooks";

import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

import { useMutation, useQuery } from "convex/react";
import { useMemo } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router";
import { dumbData } from "~/components/dumbData";

import { PDFContainer } from "~/components/PDFContainer";

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
  const params = useParams();
  const patch = useMutation(api.resumes.updateTemplate);
  const data = useQuery(api.resumes.get, { id: params.id as Id<"resumes"> });
  const [value, toggle] = useToggle();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const markup = useMemo(
    () =>
      data &&
      TemplateList?.map((template) => (
        <Grid.Col span={6} p="xl" visibleFrom="md">
          <UnstyledButton
            key={template.name}
            onClick={() => {
              patch({ _id: data._id, template });
            }}
            variant="outline"
            w="100%"
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

            {data.template.name === template.name && (
              <Box
                pos="absolute"
                top="50%"
                left="50%"
                style={{
                  transform: "translate(-50%, -50%)",
                }}
              >
                <FaCheckCircle size={rem(10)} opacity=".5" color="#228be6" />
              </Box>
            )}
          </UnstyledButton>
        </Grid.Col>
      )),
    [data, patch]
  );

  if (!data) {
    return <>Loading data</>;
  }

  return (
    <PDFContainer
      templateElement={
        <PDFContainer.Template
          data={value ? { ...dumbData, template: data.template } : data}
        />
      }
    >
      <Container fluid>
        <Group justify="space-between" mih={rem(60)}>
          <Button
            variant="transparent"
            component={Link}
            to={`/resume/${params.id}`}
            leftSection={<FaArrowLeft />}
          >
            Back to editor
          </Button>

          <Group h="100%" gap={0} visibleFrom="sm"></Group>

          <Group visibleFrom="sm">
            <PDFContainer.Download />
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </Container>

      <Divider />

      <Grid gutter="0">
        <Grid.Col span={5} p="xl" visibleFrom="md">
          <Grid gutter="0">{markup}</Grid>
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, md: 7 }}
          bg="gray.6"
          pos="sticky"
          top="0"
          p="xl"
          h="calc(100vh - 61px)"
        >
          <Flex h="96%" w="100%" justify="center" mb="sm">
            <PDFContainer.Viewer fit="height" />
          </Flex>
          <Flex w="100%" justify="center">
            <Checkbox
              checked={value}
              onChange={(event) => toggle(event.currentTarget.checked)}
              label="Preview data"
              labelPosition="left"
            />
          </Flex>
        </Grid.Col>
      </Grid>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        position="bottom"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(40vh - ${rem(80)})`} mx="-md">
          <Flex direction="column" align="center" gap="md">
            {markup}
          </Flex>
        </ScrollArea>
      </Drawer>
    </PDFContainer>
  );
}
