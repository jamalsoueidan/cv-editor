import { Flex } from "@mantine/core";
import { PDFViewer } from "@react-pdf/renderer";
import { useParams } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { ClientOnly } from "remix-utils/client-only";

import { Quds } from "~/components/templates/Quds";

export default function ResumesIdViewer() {
  const params = useParams();
  const data = useQuery(api.resumes.get, { id: params.id as Id<"resumes"> });

  if (!data) {
    return <>Loading data</>;
  }

  return (
    <Flex h="100vh">
      <ClientOnly>
        {() => (
          <PDFViewer height="100%" width="100%">
            <Quds data={data} />
          </PDFViewer>
        )}
      </ClientOnly>
    </Flex>
  );
}
