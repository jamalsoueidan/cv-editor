import { usePDF } from "@react-pdf/renderer";

import { Document, Page, pdfjs } from "react-pdf";

import { Card } from "@mantine/core";
import { api } from "convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { useState } from "react";
import { DocumentCallback } from "react-pdf/dist/esm/shared/types.js";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { MyDocument } from "./MyDocument";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export const PDFRender = ({
  data,
  height,
  width,
}: {
  data: FunctionReturnType<typeof api.resumes.get>;
  width?: number | string;
  height?: number | string;
}) => {
  const [, setNumPages] = useState<null | number>(null);
  const [instance] = usePDF({
    document: <MyDocument data={data} />,
  });
  const [pageNumber] = useState(1);
  const [renderedPageNumber, setRenderedPageNumber] = useState<null | number>(
    null
  );

  const onDocumentLoadSuccess = (document: DocumentCallback) => {
    setNumPages(document.numPages);
  };

  const isLoading = renderedPageNumber !== pageNumber;

  return (
    <Card withBorder shadow="sm" p="0">
      <Document file={instance.url} onLoadSuccess={onDocumentLoadSuccess}>
        {isLoading && renderedPageNumber ? (
          <Page
            key={renderedPageNumber}
            className="prevPage"
            pageNumber={renderedPageNumber}
            height={height}
            width={width}
          />
        ) : null}
        <Page
          key={pageNumber}
          pageNumber={pageNumber}
          onRenderSuccess={() => setRenderedPageNumber(pageNumber)}
          height={height}
          width={width}
        />
      </Document>
    </Card>
  );
};
