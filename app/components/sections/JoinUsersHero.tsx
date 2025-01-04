import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  rem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Trans, useTranslation } from "react-i18next";
import { useCreateResume } from "~/hooks/useCreateResume";

export function JoinUsersHero() {
  const { create, loading } = useCreateResume();
  const { t } = useTranslation();
  return (
    <Box>
      <Divider />
      <Container size="xl" my={rem(100)}>
        <Stack gap={rem(24)}>
          <Title ta="center" fw="800" c="blue" fz={rem(50)}>
            <Trans
              i18nKey="joinusershero.title"
              components={[
                <Text
                  size={rem(50)}
                  component="span"
                  fw={800}
                  variant="gradient"
                  gradient={{ from: "yellow", to: "blue", deg: 90 }}
                />,
              ]}
            />
          </Title>

          <Text ta="center">{t("joinusershero.description")}</Text>

          <Flex justify="center">
            <Button size="lg" onClick={create} loading={loading}>
              {t("joinusershero.action")}
            </Button>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}
