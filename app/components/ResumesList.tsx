import {
  em,
  Flex,
  Grid,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { Link } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { ClientOnly } from "remix-utils/client-only";
import { PDFRender } from "./PDFRender";

export const ResumesList = () => {
  const resumes = useQuery(api.resumes.list);

  return (
    <Grid>
      {resumes?.map((resume) => {
        return (
          <Grid.Col span={6} key={resume._id}>
            <Flex direction="row" align="flex-start" gap="xs">
              <UnstyledButton component={Link} to={`/resumes/${resume._id}`}>
                <ClientOnly>{() => <PDFRender />}</ClientOnly>
              </UnstyledButton>
              <Stack gap={em(2)} flex={1}>
                <Title order={3}>{resume.title}</Title>
                <Text>asd</Text>
              </Stack>
            </Flex>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};
