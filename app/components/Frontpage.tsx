import { Button, Card, Flex, Group, Tabs, Text, Title } from "@mantine/core";
import { GiPapers } from "react-icons/gi";
import { GoPlus } from "react-icons/go";
import { ResumesList } from "~/components/ResumesList";

export function FrontPage() {
  return (
    <>
      <Card bg="blue.1" radius="lg" my="xl">
        <Group>
          <GiPapers size="5rem" />
          <Flex direction="column" gap="xs">
            <Title order={4} fw="400">
              Opret dit cv
            </Title>
            <Text>Vi hjælper dig med at organisere din cv&apos;er online</Text>
          </Flex>
        </Group>
      </Card>

      <Title order={3} mb="xs">
        Dokumenter
      </Title>

      <Tabs defaultValue="resumes">
        <Tabs.List>
          <Tabs.Tab value="resumes">CV&apos;er</Tabs.Tab>
          <Tabs.Tab value="coverletters">Ansøgninger</Tabs.Tab>
          <Tabs.Tab value="account" ml="auto">
            <Button size="compact-sm" leftSection={<GoPlus />} fw="500">
              Opret ny(t)
            </Button>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="resumes" mt="xl">
          <ResumesList />
        </Tabs.Panel>

        <Tabs.Panel value="coverletters" mt="xl">
          ...
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
