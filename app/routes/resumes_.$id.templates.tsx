import {
  Box,
  Burger,
  Button,
  Card,
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
import { useDisclosure } from "@mantine/hooks";
import { Link, useParams } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { ClientOnly } from "remix-utils/client-only";
import { DownloadButton } from "~/components/DownloadPDF";
import { PDFViewer } from "~/components/PDFViewer";

export default function Templates() {
  const params = useParams();
  const patch = useMutation(api.resumes.updateTemplate);
  const data = useQuery(api.resumes.get, { id: params.id as Id<"resumes"> });
  const templates = useQuery(api.templates.list);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

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
            Tilbage til redigering
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
            {templates?.map((template) => (
              <UnstyledButton
                key={template._id}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { _id, _creationTime, ...rest } = template;
                  patch({ _id: data._id, template: rest });
                }}
                variant="outline"
              >
                <Flex justify="center">
                  <Title order={4} fw="400">
                    {template.name.charAt(0).toUpperCase() +
                      template.name.slice(1)}
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
                        data={data}
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
                      <FaCheckCircle
                        size={rem(10)}
                        opacity=".5"
                        color="#228be6"
                      />
                    </Box>
                  )}
                </Card>
              </UnstyledButton>
            ))}
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
          <ClientOnly>
            {() => (
              <PDFViewer
                data={data}
                withControls={false}
                withPagning={false}
                percentage={0.85}
              />
            )}
          </ClientOnly>
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
          <Divider my="sm" />

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
}
