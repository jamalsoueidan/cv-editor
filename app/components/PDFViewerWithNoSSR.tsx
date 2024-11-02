import { usePDF } from "@react-pdf/renderer";

import { Document, Page, pdfjs } from "react-pdf";

import { Button, Card, Flex, Group, Text } from "@mantine/core";
import { api } from "convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { useEffect, useState } from "react";
import { FaDownload, FaSearchLocation } from "react-icons/fa";
import { DocumentCallback } from "react-pdf/dist/esm/shared/types.js";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { MyDocument } from "./MyDocument";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export const PDFViewerWithNoSSR = ({
  data,
}: {
  data: FunctionReturnType<typeof api.resumes.get>;
}) => {
  const [numPages, setNumPages] = useState<null | number>(null);
  const [instance, updateInstance] = usePDF({
    document: <MyDocument data={data} />,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [renderedPageNumber, setRenderedPageNumber] = useState<null | number>(
    null
  );

  useEffect(() => {
    updateInstance(<MyDocument data={data} />);
  }, [data, updateInstance]);

  const onDocumentLoadSuccess = (document: DocumentCallback) => {
    setNumPages(document.numPages);
  };

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const isLoading = renderedPageNumber !== pageNumber;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="lg"
      w="100%"
      h="100%"
    >
      <Group justify="space-between" w="100%">
        <Button
          variant="transparent"
          href={instance.url || ""}
          component="a"
          download="cv.pdf"
          leftSection={<FaSearchLocation />}
        >
          Skift skabelon
        </Button>
        <Button
          href={instance.url || ""}
          component="a"
          download="cv.pdf"
          leftSection={<FaDownload />}
        >
          Download (PDF)
        </Button>
      </Group>

      <Card withBorder shadow="sm" p="0">
        <Document file={instance.url} onLoadSuccess={onDocumentLoadSuccess}>
          {isLoading && renderedPageNumber ? (
            <Page
              key={renderedPageNumber}
              className="prevPage"
              pageNumber={renderedPageNumber}
              width={500}
            />
          ) : null}
          <Page
            key={pageNumber}
            pageNumber={pageNumber}
            onRenderSuccess={() => setRenderedPageNumber(pageNumber)}
            width={500}
          />
        </Document>
      </Card>

      {pageNumber && numPages ? (
        <Flex direction="row" gap="sm">
          <Button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            size="compact-md"
          >
            L
          </Button>
          <Text ta="center">
            {pageNumber || (numPages ? 1 : "--")} / {numPages || "--"}
          </Text>
          <Button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            size="compact-md"
          >
            R
          </Button>
        </Flex>
      ) : null}
    </Flex>
  );
};
