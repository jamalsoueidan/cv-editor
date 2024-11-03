import { ActionIcon, Button, Card, Flex, Loader, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { pdf } from "@react-pdf/renderer";
import { Link } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaDownload,
  FaThList,
} from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import { DocumentCallback } from "react-pdf/dist/esm/shared/types.js";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import * as reactUse from "react-use";
import { MyDocument } from "./MyDocument";
import classes from "./PDFViewer.module.css";
const { useAsync } = reactUse;

//https://github.com/diegomura/react-pdf-site/blob/master/src/components/Repl/PDFViewer.js#L81
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export const PDFViewer = ({
  data,
  withControls = true,
  withPagning = true,
  percentage = 0.87,
}: {
  data: FunctionReturnType<typeof api.resumes.get>;
  withControls?: boolean;
  withPagning?: boolean;
  percentage?: number;
}) => {
  const { height } = useViewportSize();

  const [numPages, setNumPages] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [previousRenderValue, setPreviousRenderValue] = useState<
    null | string | undefined
  >(null);

  const render = useAsync(async () => {
    if (!data) return null;

    const blob = await pdf(<MyDocument data={data} />).toBlob();
    const url = URL.createObjectURL(blob);

    return url;
  }, [data]);

  const onPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const onNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const onDocumentLoad = (d: DocumentCallback) => {
    setNumPages(d.numPages);
    setCurrentPage((prev) => Math.min(prev, d.numPages));
  };

  const isFirstRendering = !previousRenderValue;

  const isLatestValueRendered = previousRenderValue === render.value;
  const isBusy = render.loading || !isLatestValueRendered;

  const shouldShowTextLoader = isFirstRendering && isBusy;
  const shouldShowPreviousDocument = !isFirstRendering && isBusy;

  return (
    <Flex direction="column" justify="center" align="center">
      {withControls ? (
        <Flex direction="row" justify="space-between" mb="lg" w="100%">
          <Button
            variant="transparent"
            component={Link}
            to="templates"
            c="white"
            leftSection={<FaThList />}
          >
            Skift skabelon
          </Button>
          <Button
            href={render.value || ""}
            component="a"
            download="cv.pdf"
            size="xs"
            leftSection={<FaDownload />}
          >
            Download (PDF)
          </Button>
        </Flex>
      ) : null}

      <Text hidden={!shouldShowTextLoader}>
        <Loader size="xl" />
      </Text>
      <Card radius="md" p="0" flex={1}>
        {shouldShowPreviousDocument && previousRenderValue ? (
          <Document
            key={previousRenderValue}
            className={classes.previousDocument}
            file={previousRenderValue}
            loading={null}
          >
            <Page
              key={currentPage}
              pageNumber={currentPage}
              height={height * percentage}
            />
          </Document>
        ) : null}
        <Document
          key={render.value}
          className={
            shouldShowPreviousDocument ? classes.renderingDocument : null
          }
          file={render.value}
          loading={null}
          onLoadSuccess={onDocumentLoad}
        >
          <Page
            key={currentPage}
            pageNumber={currentPage}
            onRenderSuccess={() => setPreviousRenderValue(render.value)}
            height={height * percentage}
          />
        </Document>
      </Card>

      {currentPage && numPages && withPagning ? (
        <Flex direction="row" gap="sm" align="center">
          <ActionIcon
            style={{ backgroundColor: "transparent" }}
            c="gray.4"
            disabled={currentPage <= 1}
            onClick={onPreviousPage}
          >
            <FaArrowLeft />
          </ActionIcon>
          <Text ta="center" c="white" fz="sm">
            {currentPage || (numPages ? 1 : "--")} / {numPages || "--"}
          </Text>
          <ActionIcon
            style={{ backgroundColor: "transparent" }}
            c="gray.4"
            disabled={currentPage >= numPages}
            onClick={onNextPage}
          >
            <FaArrowRight />
          </ActionIcon>
        </Flex>
      ) : null}
    </Flex>
  );
};