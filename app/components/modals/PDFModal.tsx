import type { ContextModalProps } from "@mantine/modals";
import type { api } from "convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import { PDFContainer } from "../PDFContainer";

export const PDFModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<FunctionReturnType<typeof api.resumes.get>>) => (
  <>
    <PDFContainer templateElement={<PDFContainer.Template data={innerProps} />}>
      <PDFContainer.Viewer />
    </PDFContainer>
  </>
);
