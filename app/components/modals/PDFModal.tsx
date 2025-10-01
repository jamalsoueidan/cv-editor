import { Button, Flex } from "@mantine/core";
import type { ContextModalProps } from "@mantine/modals";
import type { api } from "convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import { Link } from "react-router";
import { PDFContainer } from "../PDFContainer";

export const PDFModal = ({
  innerProps,
}: ContextModalProps<FunctionReturnType<typeof api.resumes.get>>) => (
  <>
    <PDFContainer templateElement={<PDFContainer.Template data={innerProps} />}>
      <Flex
        justify="space-between"
        align="center"
        direction="row"
        mb="sm"
        hiddenFrom="md"
      >
        <Button
          variant="outline"
          size="xs"
          component={Link}
          to={`/dashboard/${innerProps._id}/templates`}
        >
          Skift skabelon
        </Button>
        <PDFContainer.DownloadIcon
          title="Download PDF"
          variant="outline"
          size="md"
        />
      </Flex>
      <PDFContainer.Viewer />
      <Flex justify="center" mt="sm">
        <PDFContainer.Pagination size="xl" />
      </Flex>
    </PDFContainer>
  </>
);
