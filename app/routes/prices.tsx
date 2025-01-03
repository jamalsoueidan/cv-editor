import {
  Box,
  Card,
  Container,
  Grid,
  List,
  rem,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { FaCheck } from "react-icons/fa";
import { Header } from "~/components/Header";
import PriceSVG from "~/components/PriceSVG";

export default function PrivacyPolicy() {
  return (
    <Container size="xl">
      <Header />
      <Box
        pos="fixed"
        top="0"
        left="60%"
        display="flex"
        w="3800"
        style={{ translate: "-50% 0", zIndex: -1 }}
      >
        <Box style={{ transform: "scaleX(-1)" }}>
          <PriceSVG />
        </Box>

        <Box>
          <PriceSVG />
        </Box>

        <Box style={{ transform: "scaleX(-1)" }}>
          <PriceSVG />
        </Box>
      </Box>
      <Title mt={rem(40)}>Priser</Title>
      <Grid justify="center" w="100%" mt={rem(180)}>
        <Grid.Col span={6}>
          <Card withBorder p="xl">
            <Stack gap="md">
              <div>
                <Title order={3} ta="center">
                  0,00 kr
                </Title>
                <Text c="dimmed" ta="center">
                  gratis plan
                </Text>
              </div>
              <List
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <FaCheck style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
              >
                <List.Item>Opret flere versioner</List.Item>
                <List.Item>Specialiserede sektioner</List.Item>
                <List.Item>Ubegrænsede sider</List.Item>
                <List.Item>Alle skrifttyper</List.Item>
                <List.Item>Alle skabeloner og farver</List.Item>
                <List.Item>Ubegrænset download af PDF'er</List.Item>
              </List>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card withBorder p="xl">
            <Stack gap="md">
              <div>
                <Title order={3} ta="center">
                  49 dKK
                </Title>
                <Text c="dimmed" ta="center">
                  AI hjælp
                </Text>
              </div>
              <List
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <FaCheck style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
              >
                <List.Item>Importere PDF</List.Item>
                <List.Item>Hjælp fra AI til rettelser</List.Item>
                <List.Item>Hjælp fra AI ifm job beskrivelse</List.Item>
              </List>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
