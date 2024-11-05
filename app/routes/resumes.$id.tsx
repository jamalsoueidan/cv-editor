import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Group,
  LoadingOverlay,
  Modal,
  rem,
} from "@mantine/core";
import { Outlet, useNavigate, useOutlet, useParams } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useAction, useQuery } from "convex/react";
import { getDocument } from "pdfjs-dist";
import { TextItem } from "pdfjs-dist/types/src/display/api";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { pdfjs } from "react-pdf";
import { ClientOnly } from "remix-utils/client-only";
import { CVForm } from "~/components/CVForm";
import { PDFViewer } from "~/components/PDFViewer";
import { ResumeBurger } from "~/components/ResumeBurger";

//https://github.com/diegomura/react-pdf-site/blob/master/src/components/Repl/PDFViewer.js#L81
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export default function ResumesId() {
  const params = useParams();
  const outlet = !!useOutlet();
  const navigate = useNavigate();
  const destroy = useAction(api.resumes.asyncDestroy);
  const clone = useAction(api.resumes.clone);

  const [loadingPDF, setLoadingPDF] = useState<string | null>(null);
  const upload = useAction(api.openai.uploadPDF);

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

  const uploadAction = async (payload: File | File[] | null) => {
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
        id: params.id as Id<"resumes">,
      });
    } catch (e) {
      setLoadingPDF("Error");
    }

    window.location.reload();
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
