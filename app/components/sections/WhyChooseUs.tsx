import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  rem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { CgLivePhoto } from "react-icons/cg";
import { CiCreditCardOff } from "react-icons/ci";
import { FaFileImport } from "react-icons/fa";
import { FcPrivacy } from "react-icons/fc";
import { IoDocumentsOutline } from "react-icons/io5";
import { RiLetterSpacing2 } from "react-icons/ri";

export function WhyChooseUs() {
  const { t } = useTranslation();
  return (
    <Box>
      <Divider />
      <Container size="xl" my={rem(100)}>
        <Stack gap={rem(60)}>
          <Title ta="center" fw="700">
            {t("whychooseus.title")}
          </Title>

          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <Flex gap="md">
                <div>
                  <CiCreditCardOff
                    size={60}
                    color="var(--mantine-color-blue-6)"
                  />
                </div>

                <Box my={rem(2)}>
                  <Title order={3} c="blue">
                    {t("whychooseus.1.title")}
                  </Title>
                  <Text>{t("whychooseus.1.text")}</Text>
                </Box>
              </Flex>
            </Grid.Col>{" "}
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <Flex gap="md">
                <div>
                  <CgLivePhoto size={60} color="var(--mantine-color-green-6)" />
                </div>

                <Box my={rem(2)}>
                  <Title order={3} c="blue">
                    {t("whychooseus.2.title")}
                  </Title>
                  <Text>{t("whychooseus.2.text")}</Text>
                </Box>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <Flex gap="md">
                <div>
                  <IoDocumentsOutline
                    size={60}
                    color="var(--mantine-color-pink-6)"
                  />
                </div>

                <Box my={rem(2)}>
                  <Title order={3} c="blue">
                    {t("whychooseus.3.title")}
                  </Title>
                  <Text>{t("whychooseus.3.text")}</Text>
                </Box>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <Flex gap="md">
                <div>
                  <FcPrivacy size={60} color="var(--mantine-color-blue-6)" />
                </div>

                <Box my={rem(2)}>
                  <Title order={3} c="blue">
                    {t("whychooseus.4.title")}
                  </Title>
                  <Text>{t("whychooseus.4.text")}</Text>
                </Box>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <Flex gap="md">
                <div>
                  <RiLetterSpacing2
                    size={60}
                    color="var(--mantine-color-red-6)"
                  />
                </div>

                <Box my={rem(2)}>
                  <Title order={3} c="blue">
                    {t("whychooseus.5.title")}
                  </Title>
                  <Text>{t("whychooseus.5.text")}</Text>
                </Box>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <Flex gap="md">
                <div>
                  <FaFileImport
                    size={60}
                    color="var(--mantine-color-yellow-6)"
                  />
                </div>

                <Box my={rem(2)}>
                  <Title order={3} c="blue">
                    {t("whychooseus.6.title")}
                  </Title>
                  <Text>{t("whychooseus.6.text")}</Text>
                </Box>
              </Flex>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
