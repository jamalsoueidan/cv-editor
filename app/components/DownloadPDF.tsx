import { Button, ButtonProps } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { api } from "convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { FaDownload } from "react-icons/fa";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import * as reactUse from "react-use";
import { Quds } from "~/components/templates/Quds";
import { LANGUAGES } from "./templates/locales";
import { TEMPLATES } from "./templates/templates";

const { useAsync } = reactUse;

//https://github.com/diegomura/react-pdf-site/blob/master/src/components/Repl/PDFViewer.js#L81
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export const DownloadButton = ({
  data,
  template,
  language,
  ...props
}: {
  data: FunctionReturnType<typeof api.resumes.get>;
  template?: string;
  language?: string;
} & ButtonProps) => {
  const TemplateComponent = template
    ? TEMPLATES[template.toLowerCase()]
    : data.template.name
    ? TEMPLATES[data.template.name.toLowerCase()]
    : Quds;

  const templateLanguage = language
    ? LANGUAGES[language.toLowerCase()]
    : data.templateLanguage
    ? LANGUAGES[data.templateLanguage.toLowerCase()]
    : LANGUAGES["en"];

  const render = useAsync(async () => {
    if (!data) return null;

    const blob = await pdf(
      <TemplateComponent data={data} lang={templateLanguage} />
    ).toBlob();
    const url = URL.createObjectURL(blob);

    return url;
  }, [data]);

  return (
    <Button
      href={render.value || ""}
      component="a"
      download="cv.pdf"
      size="xs"
      leftSection={<FaDownload />}
      {...props}
    >
      Download (PDF)
    </Button>
  );
};
