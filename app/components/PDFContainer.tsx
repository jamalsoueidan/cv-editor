import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Text,
  type ActionIconProps,
  type ButtonProps,
} from "@mantine/core";
import { useElementSize, useViewportSize } from "@mantine/hooks";
import { pdf, type DocumentProps } from "@react-pdf/renderer";
import type { api } from "convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import { createContext, use, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaDownload } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import type { DocumentCallback } from "react-pdf/dist/esm/shared/types.js";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useAsync } from "~/hooks/useAsync";
import { Copenhagen } from "./templates/Copenhagen";
import { LANGUAGES } from "./templates/locales";
import { TEMPLATES } from "./templates/templates";

//https://github.com/diegomura/react-pdf-site/blob/master/src/components/Repl/PDFViewer.js#L81
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

type PDFContainer = {
  isLoading: boolean;
  onDocumentLoad: (d: DocumentCallback) => void;
  gotoPreviousPage: () => void;
  gotoNextPage: () => void;
  currentPage: number;
  numPages: number;
  renderValue?: string;
};

const PDFContainerContext = createContext<PDFContainer | null>(null);

type PDFContainerProps = {
  templateElement: React.ReactElement<DocumentProps>;
  children?: React.ReactNode;
};

export function PDFContainer({ templateElement, children }: PDFContainerProps) {
  const [numPages, setNumPages] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState(1);

  const render = useAsync(async () => {
    const blob = await pdf(templateElement).toBlob();
    const url = URL.createObjectURL(blob);

    return url;
  }, [templateElement]);

  const onDocumentLoad = (d: DocumentCallback) => {
    setNumPages(d.numPages);
    setCurrentPage((prev) => Math.min(prev, d.numPages));
  };

  const gotoPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const gotoNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const isLoading = render.loading;

  return (
    <PDFContainerContext.Provider
      value={{
        isLoading,
        onDocumentLoad,
        gotoPreviousPage,
        gotoNextPage,
        currentPage,
        numPages,
        renderValue: render.value,
      }}
    >
      {children}
    </PDFContainerContext.Provider>
  );
}

function Viewer({
  fit = "width",
  withBorder = false,
  style = {},
}: {
  fit?: "width" | "height";
  withBorder?: boolean;
  style?: React.CSSProperties;
}) {
  const ctx = use(PDFContainerContext);

  if (!ctx) {
    throw new Error("PDFContainer.Viewer must be used inside PDFContainer");
  }

  const { ref, width: elWidth, height: elHeight } = useElementSize();
  const { width: viewWidth, height: viewHeight } = useViewportSize();

  const [size, setSize] = useState(0);
  const [canvases, setCanvases] = useState<
    Array<{ renderValue: string; isRendering: boolean }>
  >([]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const { width, height } = ref.current.getBoundingClientRect();
    if (size !== width) {
      setSize(fit === "width" ? width : height);
    }
  }, [viewWidth, viewHeight]);

  useEffect(() => {
    const renderValue = ctx.renderValue;
    if (renderValue) {
      setCanvases((prev) => {
        if (prev.includes({ renderValue, isRendering: true })) {
          return prev;
        }
        return [...prev, { renderValue, isRendering: true }];
      });
    }
  }, [ctx.renderValue]);

  const onRenderSuccess = () => {
    if (canvases.length > 3) {
      setCanvases((prev) => prev.slice(-1));
    }
    setCanvases((prev) => {
      return prev.map((canvas) => {
        return { ...canvas, isRendering: false };
      });
    });
  };

  const isLoading =
    canvases.length === 0 || canvases.some((c) => c.isRendering);

  return (
    <Box
      p="0"
      pos="relative"
      ref={ref}
      style={{
        overflow: "hidden",
        ...(withBorder && !isLoading
          ? {
              border: "1px solid gray",
              borderRadius: "14px",
            }
          : undefined),
        ...style,
      }}
    >
      {canvases.map(({ renderValue, isRendering }, index) => (
        <Box
          key={renderValue + index}
          pos={index > 0 ? "absolute" : undefined}
          top={0}
          left={0}
          style={{ zIndex: isRendering ? 0 : index }}
        >
          <Document
            onLoadSuccess={ctx.onDocumentLoad}
            file={renderValue}
            loading={<> </>}
            noData={<></>}
          >
            <Page
              pageNumber={ctx.currentPage}
              onRenderSuccess={onRenderSuccess}
              loading={<> </>}
              width={fit === "width" ? size : undefined}
              height={fit === "height" ? size : undefined}
            />
          </Document>
        </Box>
      ))}
    </Box>
  );
}

function Template({
  data,
  template,
  language,
}: {
  data: FunctionReturnType<typeof api.resumes.get>;
  template?: string;
  language?: string;
}) {
  const TemplateComponent = template
    ? TEMPLATES[template.toLowerCase()]
    : data.template.name
    ? TEMPLATES[data.template.name.toLowerCase()]
    : Copenhagen;

  const templateLanguage = language
    ? LANGUAGES[language.toLowerCase()]
    : data.templateLanguage
    ? LANGUAGES[data.templateLanguage.toLowerCase()]
    : LANGUAGES["en"];

  return <TemplateComponent data={data} lang={templateLanguage} />;
}

function Download(props: ButtonProps) {
  const ctx = use(PDFContainerContext);
  if (!ctx) {
    throw new Error("PDFContainer.Viewer must be used inside PDFContainer");
  }

  return (
    <Button
      href={ctx.renderValue}
      component="a"
      download={`cv.pdf`}
      size="xs"
      leftSection={<FaDownload />}
      {...props}
    >
      Download (PDF)
    </Button>
  );
}

function DownloadIcon(props: ActionIconProps & { title: string }) {
  const ctx = use(PDFContainerContext);
  if (!ctx) {
    throw new Error("PDFContainer.Viewer must be used inside PDFContainer");
  }

  return (
    <ActionIcon
      href={ctx.renderValue}
      component="a"
      download={`cv.pdf`}
      size="md"
      {...props}
    >
      <FaDownload />
    </ActionIcon>
  );
}

function Pagination(props: ActionIconProps) {
  const ctx = use(PDFContainerContext);
  if (!ctx) {
    throw new Error("PDFContainer.Viewer must be used inside PDFContainer");
  }

  const size = props.size || "lg";

  if (ctx.numPages === 1) return null;

  return (
    <Flex direction="row" gap="sm" align="center" justify="center" w="100%">
      <ActionIcon
        variant="outline"
        disabled={ctx.currentPage <= 1}
        onClick={ctx.gotoPreviousPage}
        radius="lg"
        size={size}
      >
        <FaArrowLeft />
      </ActionIcon>
      <Text ta="center" fz={size} c="white">
        {ctx.currentPage || (ctx.numPages ? 1 : "--")} / {ctx.numPages || "--"}
      </Text>
      <ActionIcon
        variant="outline"
        disabled={ctx.currentPage >= ctx.numPages}
        onClick={ctx.gotoNextPage}
        radius="lg"
        size={size}
      >
        <FaArrowRight />
      </ActionIcon>
    </Flex>
  );
}

PDFContainer.Pagination = Pagination;
PDFContainer.Template = Template;
PDFContainer.Viewer = Viewer;
PDFContainer.Download = Download;
PDFContainer.DownloadIcon = DownloadIcon;
