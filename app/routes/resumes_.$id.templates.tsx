import {
  Box,
  Burger,
  Button,
  Card,
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
import { useDisclosure, useToggle } from "@mantine/hooks";
import { Link, useParams } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useMemo } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { ClientOnly } from "remix-utils/client-only";
import { DownloadButton } from "~/components/DownloadPDF";
import { dumbData } from "~/components/dumbData";
import { PDFViewer } from "~/components/PDFViewer";

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

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const markup = useMemo(
    () =>
      data &&
      TemplateList?.map((template) => (
        <UnstyledButton
          key={template.name}
          onClick={() => {
            patch({ _id: data._id, template });
          }}
          variant="outline"
        >
          <Flex justify="center">
            <Title order={4} fw="400">
              {template.name.charAt(0).toUpperCase() + template.name.slice(1)}
            </Title>
          </Flex>
          <Card
            pos="relative"
            style={{
              boxSizing: "border-box",
              outline:
                data.template.name === template.name
                  ? "3px solid #228be6"
                  : "none",
            }}
            withBorder
            radius="md"
            p="0"
          >
            <ClientOnly>
              {() => (
                <PDFViewer
                  data={{ ...dumbData, template: template }}
                  withControls={false}
                  withPagning={false}
                  height={300}
                  template={template.name}
                />
              )}
            </ClientOnly>
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
          </Card>
        </UnstyledButton>
      )),
    [data, patch]
  );

  if (!data) {
    return <>Loading data</>;
  }

  return (
    <>
      <Container fluid>
        <Group justify="space-between" mih={rem(60)}>
          <Button
            variant="transparent"
            component={Link}
            to={`/resumes/${params.id}`}
            leftSection={<FaArrowLeft />}
          >
            Back to editor
          </Button>

          <Group h="100%" gap={0} visibleFrom="sm"></Group>

          <Group visibleFrom="sm">
            <DownloadButton data={data} />
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
          <Flex gap="xl" justify="center" wrap="wrap">
            {markup}
          </Flex>
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, md: 7 }}
          bg="gray.6"
          pos="sticky"
          top="0"
          p="xl"
          h="calc(100vh - 61px)"
        >
          <Flex direction="column" justify="center">
            <ClientOnly>
              {() => (
                <PDFViewer
                  data={value ? { ...dumbData, template: data.template } : data}
                  withControls={false}
                  withPagning={false}
                  percentage={0.8}
                />
              )}
            </ClientOnly>
            <Flex align="center" gap="xs" justify="center" mt="xs">
              <Checkbox
                checked={value}
                onChange={(event) => toggle(event.currentTarget.checked)}
                label="Preview data"
                labelPosition="left"
              />
            </Flex>
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
    </>
  );
}
