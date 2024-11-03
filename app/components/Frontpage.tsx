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
import { Link, useNavigate } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import { PDFViewer } from "./PDFViewer";

export function FrontPage() {
  const resumes = useQuery(api.resumes.list);
  const create = useMutation(api.resumes.create);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const response = await create({ title: "Untitled" });
    navigate(`/resumes/${response}`);
  };

  const resumeMarkup = resumes?.map((resume) => (
    <Carousel.Slide key={resume._id}>
      <Flex direction="column" align="center" gap="xs">
        <Title order={4} c="gray.6" fw="500">
          {resume.title}
        </Title>
        <UnstyledButton component={Link} to={`/resumes/${resume._id}`}>
          <ClientOnly>
            {() => (
              <PDFViewer
                data={resume}
                height={500}
                withControls={false}
                withPagning={false}
                withBorder={true}
                shadow="sm"
              />
            )}
          </ClientOnly>
        </UnstyledButton>
      </Flex>
    </Carousel.Slide>
  ));

  return (
    <Stack gap="xl">
      <Stack>
        <Title ta="center">Choose Your CV</Title>

        <Flex justify="center">
          <Group>
            <Text ta="center" c="gray.6">
              You can also choose to ...
            </Text>
            <Button size="xs" onClick={onCreate} loading={loading}>
              Create a new CV!
            </Button>
          </Group>
        </Flex>
      </Stack>

      <Carousel
        withIndicators={resumes && resumes.length >= 2}
        withControls={resumes && resumes.length >= 2}
        height={540}
        slideSize={{
          base: "60%",
          sm: "40%",
          md: "25%",
        }}
        slideGap={{ base: "sm", sm: "md" }}
      >
        {resumeMarkup}
      </Carousel>
    </Stack>
  );
}
