import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Group,
  LoadingOverlay,
  Modal,
  rem,
  Stack,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

import { preloadedQueryResult, preloadQuery } from "convex/nextjs";
import { useAction } from "convex/react";
import { getDocument } from "pdfjs-dist";
import type { TextItem } from "pdfjs-dist/types/src/display/api";
import { useCallback, useState } from "react";
import { FaArrowLeft, FaEye, FaThList } from "react-icons/fa";
import { Link, Outlet, useNavigate, useOutlet } from "react-router";
import { PDFContainer } from "~/components/PDFContainer";
import { ResumeBurger } from "~/components/ResumeBurger";

import { CVForm } from "~/components/CVForm";
import { useQueryData } from "~/hooks/useQueryData";
import type { Route } from "./+types/resumes.$id";

export async function loader({ params }: Route.LoaderArgs) {
  const url = process.env["CONVEX_URL"]!;
  const id = params.id as Id<"resumes">;
  const data = await preloadQuery(
    api.resumes.get,
    { id, secret: process.env["SECRET"] },
    { url }
  );

  return { data: preloadedQueryResult(data), id };
}

export default function ResumesId({ loaderData }: Route.ComponentProps) {
  const { id } = loaderData;

  const data = useQueryData(
    api.resumes.get,
    {
      id,
    },
    loaderData.data
  );

  const isMobile = useMediaQuery("(max-width: 768px)");
  const outlet = !!useOutlet();
  const navigate = useNavigate();
  const destroy = useAction(api.resumes.asyncDestroy);
  const clone = useAction(api.resumes.clone);

  const [loadingPDF, setLoadingPDF] = useState<string | null>(null);
  const upload = useAction(api.openai.uploadPDF);

  const [cloneId, setCloneId] = useState<string | null>(null);

  const cloneAction = useCallback(async () => {
    const response = await clone({ id });
    setCloneId(response);
  }, [clone, id]);

  const destroyAction = useCallback(async () => {
    await destroy({ id });
    navigate("../");
  }, [destroy, navigate, id]);

  const uploadAction = useCallback(
    async (payload: File | File[] | null) => {
      if (!payload || (Array.isArray(payload) && payload.length === 0)) {
        console.log("No file uploaded");
        return;
      }

      setLoadingPDF("Reading PDF file...");
      const file = Array.isArray(payload) ? payload[0] : payload;

      const arrayBuffer = await file.arrayBuffer();

      const loadingTask = getDocument(arrayBuffer);

      setLoadingPDF("Extracting PDF text...");
      const pdf = await loadingTask.promise;
      let extractedText = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();

        const pageText = textContent.items
          .filter((item): item is TextItem => "str" in item)
          .map((item) => item.str)
          .join(" ");

        extractedText += pageText + " ";
      }

      setLoadingPDF("Asking AI to generate a cv...");
      try {
        await upload({
          content: extractedText,
          id,
        });
      } catch (e) {
        setLoadingPDF("Error");
      }

      window.location.reload();
    },
    [id, upload]
  );

  const gotoClone = useCallback(async () => {
    setCloneId(null);
    navigate(`/resume/${cloneId}`);
  }, [cloneId, navigate]);

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

              <ResumeBurger
                destroy={destroyAction}
                clone={cloneAction}
                upload={uploadAction}
              />
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
          px="md"
        >
          <PDFContainer templateElement={<PDFContainer.Template data={data} />}>
            <Flex h="100vh" align="center" direction="column" gap="0" mt="lg">
              <Flex direction="row" justify="space-between" w="100%" mb="lg">
                <Button
                  variant="white"
                  component={Link}
                  to={`/resume/${data._id}/templates`}
                  leftSection={<FaThList />}
                >
                  Select template
                </Button>
                <Group gap="xs" align="flex-start">
                  <Button
                    component={Link}
                    to={`/view/${data._id}`}
                    size="xs"
                    leftSection={<FaEye />}
                  >
                    View PDF
                  </Button>
                  <PDFContainer.Download />
                </Group>
              </Flex>

              <Flex h="82%" w="100%" justify="center" mb="sm">
                <PDFContainer.Viewer fit="height" />
              </Flex>
              <Flex w="100%" justify="center">
                <PDFContainer.Pagination />
              </Flex>
            </Flex>
          </PDFContainer>
        </Grid.Col>
      </Grid>

      <Modal
        opened={!!outlet}
        onClose={() => navigate("./")}
        fullScreen={isMobile}
      >
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
          <Stack align="flex-start" mr="xl">
            <Text>Dit CV er nu blevet klonet.</Text>
            <Button onClick={gotoClone}>Åbn klonet CV</Button>
          </Stack>
        </Modal>
      )}

      {loadingPDF && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ children: loadingPDF }}
        />
      )}
    </>
  );
}
