import { Box } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export function SSRPDF({
  renderValue,
  fit = "width",
  withBorder = false,
  style = {},
}: {
  renderValue: string;
  fit?: "width" | "height";
  withBorder?: boolean;
  style?: React.CSSProperties;
}) {
  const { width, height } = useViewportSize();
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const { width, height } = ref.current.getBoundingClientRect();

    setSize(fit === "width" ? width : height);
  }, [width, height]);

  return (
    <Box
      p="0"
      pos="relative"
      ref={ref}
      style={{
        overflow: "hidden",
        ...(withBorder
          ? {
              border: "1px solid gray",
              borderRadius: "14px",
            }
          : undefined),
        ...style,
      }}
    >
      <Box>
        <Document file={renderValue} loading={<> </>} noData={<></>}>
          <Page
            pageNumber={1}
            loading={<> </>}
            width={fit === "width" ? size : undefined}
            height={fit === "height" ? size : undefined}
          />
        </Document>
      </Box>
    </Box>
  );
}
