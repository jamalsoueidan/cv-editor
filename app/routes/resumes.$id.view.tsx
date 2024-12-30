import { PDFViewer } from "@react-pdf/renderer";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "react-router";
import { ClientOnly } from "remix-utils/client-only";
import { PDFContainer } from "~/components/PDFContainer";

export default function ResumesId() {
  const params = useParams();

  const data = useQuery(api.resumes.get, { id: params.id as Id<"resumes"> });

  if (!data) {
    return <>Loading data</>;
  }

  return (
    <ClientOnly>
      {() => (
        <PDFViewer height="100%" width="100%">
          <PDFContainer.Template data={data} />
        </PDFViewer>
      )}
    </ClientOnly>
  );
}
