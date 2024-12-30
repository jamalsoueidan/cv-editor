import { PDFViewer } from "@react-pdf/renderer";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "react-router";

import { ClientOnly } from "remix-utils/client-only";
import { LANGUAGES } from "~/components/templates/locales";
import { TEMPLATES } from "~/components/templates/templates";

export default function ResumesIdViewer() {
  const params = useParams();
  const data = useQuery(api.resumes.get, { id: params.id as Id<"resumes"> });

  if (!data) {
    return <>Loading data</>;
  }

  const TemplateComponent = TEMPLATES[data.template.name.toLowerCase()];

  const templateLanguage =
    LANGUAGES[
      data.templateLanguage ? data.templateLanguage.toLowerCase() : "en"
    ];

  return (
    <ClientOnly>
      {() => (
        <PDFViewer>
          <TemplateComponent data={data} lang={templateLanguage} />
        </PDFViewer>
      )}
    </ClientOnly>
  );
}
