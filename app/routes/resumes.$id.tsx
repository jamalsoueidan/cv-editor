import { ActionIcon, Grid, Modal, rem } from "@mantine/core";
import { Outlet, useNavigate, useOutlet, useParams } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { FaArrowLeft } from "react-icons/fa";
import { ClientOnly } from "remix-utils/client-only";
import { CVForm } from "~/components/CVForm";
import { PDFViewer } from "~/components/PDFViewer";

export default function Test() {
  const params = useParams();
  const outlet = !!useOutlet();
  const navigate = useNavigate();
  const data = useQuery(api.resumes.get, { id: params.id as Id<"resumes"> });

  if (!data) {
    return <>Loading data</>;
  }

  return (
    <>
      <Grid gutter="0">
        <Grid.Col span={{ base: 12, md: 6 }} p={{ base: "xl", md: rem(40) }}>
          <CVForm data={data} />
          <ActionIcon
            variant="light"
            pos="absolute"
            size="lg"
            top="1rem"
            left="2rem"
            onClick={() => navigate("../")}
          >
            <FaArrowLeft />
          </ActionIcon>
        </Grid.Col>
        <Grid.Col
          span={6}
          h="100vh"
          bg="gray.6"
          pos="sticky"
          top="0"
          visibleFrom="md"
          p="md"
        >
          <ClientOnly>{() => <PDFViewer data={data} />}</ClientOnly>
        </Grid.Col>
      </Grid>
      <Modal opened={!!outlet} onClose={() => navigate("./")}>
        <Outlet context={{ data }} />
      </Modal>
    </>
  );
}
