import { usePDF } from "@react-pdf/renderer";

import { Document, Page, pdfjs } from "react-pdf";

import { Card } from "@mantine/core";
import { useEffect, useState } from "react";
import { DocumentCallback } from "react-pdf/dist/esm/shared/types.js";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { MyDocument } from "./MyDocument";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export const PDFRender = () => {
  const [, setNumPages] = useState<null | number>(null);
  const [instance, updateInstance] = usePDF({
    document: <MyDocument />,
  });
  const [pageNumber] = useState(1);
  const [renderedPageNumber, setRenderedPageNumber] = useState<null | number>(
    null
  );

  useEffect(() => {
    updateInstance(<MyDocument />);
  }, [updateInstance]);

  const onDocumentLoadSuccess = (document: DocumentCallback) => {
    setNumPages(document.numPages);
  };

  const isLoading = renderedPageNumber !== pageNumber;

  return (
    <Card withBorder shadow="sm">
      <Document file={instance.url} onLoadSuccess={onDocumentLoadSuccess}>
        {isLoading && renderedPageNumber ? (
          <Page
            key={renderedPageNumber}
            className="prevPage"
            pageNumber={renderedPageNumber}
            width={150}
          />
        ) : null}
        <Page
          key={pageNumber}
          pageNumber={pageNumber}
          onRenderSuccess={() => setRenderedPageNumber(pageNumber)}
          width={150}
        />
      </Document>
    </Card>
  );
};
