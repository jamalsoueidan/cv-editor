import { useParams } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { pdfjs } from "react-pdf";
import { ClientOnly } from "remix-utils/client-only";
import { PDFViewer } from "~/components/PDFViewer";

//https://github.com/diegomura/react-pdf-site/blob/master/src/components/Repl/PDFViewer.js#L81
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export default function ResumesId() {
  const params = useParams();

  const data = useQuery(api.resumes.get, { id: params.id as Id<"resumes"> });

  if (!data) {
    return <>Loading data</>;
  }

  return (
    <ClientOnly>{() => <PDFViewer data={data} height={500} />}</ClientOnly>
  );
}
