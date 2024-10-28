import { usePDF } from "@react-pdf/renderer";

import { Document, Page, pdfjs } from "react-pdf";

import { Button, Card, Flex, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { DocumentCallback } from "react-pdf/dist/esm/shared/types.js";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { MyDocument } from "./MyDocument";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PDFViewerWithNoSSR = ({
  text,
}: {
  text: Array<any> | undefined;
}) => {
  const [numPages, setNumPages] = useState<null | number>(null);
  const [instance, updateInstance] = usePDF({
    document: <MyDocument text={text} />,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [renderedPageNumber, setRenderedPageNumber] = useState<null | number>(
    null
  );

  useEffect(() => {
    updateInstance(<MyDocument text={text} />);
  }, [text, updateInstance]);

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
      <Card withBorder shadow="sm">
        <Document file={instance.url} onLoadSuccess={onDocumentLoadSuccess}>
          {isLoading && renderedPageNumber ? (
            <Page
              key={renderedPageNumber}
              className="prevPage"
              pageNumber={renderedPageNumber}
              width={400}
            />
          ) : null}
          <Page
            key={pageNumber}
            pageNumber={pageNumber}
            onRenderSuccess={() => setRenderedPageNumber(pageNumber)}
            width={400}
          />
        </Document>
      </Card>

      {pageNumber && numPages ? (
        <Flex direction="column" gap="sm">
          <Text ta="center">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </Text>
          <Group>
            <Button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              size="compact-md"
            >
              Previous
            </Button>{" "}
            <Button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              size="compact-md"
            >
              Next
            </Button>
          </Group>
        </Flex>
      ) : null}
    </Flex>
  );
};
