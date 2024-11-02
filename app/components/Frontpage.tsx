import { Carousel } from "@mantine/carousel";
import {
  Button,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { Link } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import { PDFRender } from "./PDFRender";

export function FrontPage() {
  const resumes = useQuery(api.resumes.list);
  const create = useMutation(api.resumes.create);
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    setLoading(true);
    const response = await create({ title: "Untitled" });
    console.log(response);
    setLoading(false);
  };

  const resumeMarkup = resumes?.map((resume) => (
    <Carousel.Slide key={resume._id}>
      <Flex direction="column" align="center" gap="xs">
        <Title order={3} c="gray.6" fw="500">
          {resume.title}
        </Title>
        <UnstyledButton component={Link} to={`/resumes/${resume._id}`}>
          <ClientOnly>
            {() => <PDFRender data={resume} height={500} />}
          </ClientOnly>
        </UnstyledButton>
      </Flex>
    </Carousel.Slide>
  ));

  return (
    <Stack gap="xl">
      <Stack>
        <Title ta="center">Vælg din CV</Title>

        <Flex justify="center">
          <Group>
            <Text ta="center" c="gray.6">
              Du kan også vælge at oprette en ny.
            </Text>
            <Button size="xs" onClick={onCreate} loading={loading}>
              Opret ny
            </Button>
          </Group>
        </Flex>
      </Stack>

      <Carousel
        withIndicators={resumes && resumes.length >= 3}
        withControls={resumes && resumes.length >= 3}
        height={600}
        slideSize={{
          base: "100%",
          sm: "50%",
          md: "33.333333%",
        }}
        slideGap={{ base: 0, sm: "md" }}
        loop
        align={resumes && resumes.length >= 3 ? "start" : "center"}
      >
        {resumeMarkup}
      </Carousel>
    </Stack>
  );
}
