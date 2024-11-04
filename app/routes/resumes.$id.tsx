import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Group,
  Modal,
  rem,
} from "@mantine/core";
import { Outlet, useNavigate, useOutlet, useParams } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useAction, useQuery } from "convex/react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { ClientOnly } from "remix-utils/client-only";
import { CVForm } from "~/components/CVForm";
import { PDFViewer } from "~/components/PDFViewer";
import { ResumeBurger } from "~/components/ResumeBurger";

export default function ResumesId() {
  const params = useParams();
  const outlet = !!useOutlet();
  const navigate = useNavigate();
  const destroy = useAction(api.resumes.asyncDestroy);
  const clone = useAction(api.resumes.clone);
  const [cloneId, setCloneId] = useState<string | null>(null);

  const data = useQuery(api.resumes.get, { id: params.id as Id<"resumes"> });

  const cloneAction = async () => {
    const response = await clone({ id: params.id as Id<"resumes"> });
    setCloneId(response);
  };

  const destroyAction = async () => {
    await destroy({ id: params.id as Id<"resumes"> });
    navigate("../");
  };

  const gotoClone = async () => {
    setCloneId(null);
    navigate(`/resumes/${cloneId}`);
  };

  if (!data) {
    return <>Loading data</>;
  }

  return (
    <>
      <Grid gutter="0">
        <Grid.Col span={{ base: 12, md: 6 }} p={{ base: "xs", md: rem(40) }}>
          <Flex w="100%" pos="relative">
            <Flex pos="absolute" w="100%" justify="space-between">
              <ActionIcon
                variant="light"
                size="lg"
                onClick={() => navigate("../")}
              >
                <FaArrowLeft />
              </ActionIcon>

              <ResumeBurger destroy={destroyAction} clone={cloneAction} />
            </Flex>

            <CVForm data={data} />
          </Flex>
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

      {cloneId && (
        <Modal
          opened={cloneId !== null}
          withCloseButton
          onClose={() => setCloneId(null)}
          size="sm"
          shadow="md"
          radius="md"
        >
          <Group align="flex-start" mr="xl">
            <Button onClick={gotoClone}>Gå til ny klonet cv</Button>
          </Group>
        </Modal>
      )}
    </>
  );
}
