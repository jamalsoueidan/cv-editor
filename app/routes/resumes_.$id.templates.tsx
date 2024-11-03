import {
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Grid,
  Group,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useParams } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { FaArrowLeft } from "react-icons/fa";
import { ClientOnly } from "remix-utils/client-only";
import { DownloadButton } from "~/components/DownloadPDF";
import { PDFViewer } from "~/components/PDFViewer";

export default function Templates() {
  const params = useParams();

  const data = useQuery(api.resumes.get, { id: params.id as Id<"resumes"> });

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
        <Grid.Col span={3} p="lg" visibleFrom="md">
          asd
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, md: 9 }}
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
