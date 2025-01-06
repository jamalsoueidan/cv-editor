import { useAuthActions } from "@convex-dev/auth/react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Overlay,
  rem,
  Stack,
  Title,
} from "@mantine/core";
import { FaHeart, FaLinkedin } from "react-icons/fa";
import { PiReadCvLogo } from "react-icons/pi";
import { useCreateResume } from "~/hooks/useCreateResume";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Document, Page } from "react-pdf";
import { CardButton } from "~/components/CardButton";
import { Logo } from "./Logo";
import { JoinUsersHero } from "./sections/JoinUsersHero";
import { WhyChooseUs } from "./sections/WhyChooseUs";

function base64ToBlob(base64: string, type = "application/octet-stream") {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], { type });
}

export function NotLoggedIn({ pdf }: { pdf: string }) {
  const { t } = useTranslation();

  const { create, loading } = useCreateResume();
  const { signIn } = useAuthActions();
  const pdfBlob = base64ToBlob(pdf);
  const pdfUrl = URL.createObjectURL(pdfBlob);

  return (
    <>
      <Stack gap={rem(40)}>
        <Container size="lg" mb={rem(40)}>
          <Stack gap={rem(40)}>
            <Stack gap="md">
              <div>
                <Flex justify="center" align="center" mb={rem(20)}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Logo />
                  </motion.div>
                </Flex>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Title
                    order={2}
                    ta="center"
                    fz={rem(44)}
                    mb="md"
                    maw={760}
                    m="auto"
                  >
                    {t("title")}
                  </Title>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Title
                  order={3}
                  ta="center"
                  fw="400"
                  fz={rem(18)}
                  maw={650}
                  m="auto"
                >
                  {t("description")}
                </Title>
              </motion.div>
            </Stack>

            <Grid gutter={rem(30)}>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  <CardButton
                    title="Login with LinkedIn"
                    text=" Save, organize, and access multiple CVs."
                    onClick={() => {
                      signIn("linkedin");
                    }}
                    icon={
                      <FaLinkedin style={{ width: rem(24), height: rem(24) }} />
                    }
                  />
                </motion.div>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  <CardButton
                    title="Create CV without Login"
                    text="Unique link to your CV to edit it anytime."
                    onClick={create}
                    loading={loading}
                    icon={
                      <PiReadCvLogo
                        style={{ width: rem(24), height: rem(24) }}
                      />
                    }
                  />
                </motion.div>
              </Grid.Col>
            </Grid>
          </Stack>
          <Flex justify="center" align="center" mt={rem(40)}>
            <Box
              pos="relative"
              mih={400}
              w={{ base: 600, md: 800 }}
              style={{ overflow: "hidden", borderRadius: rem(24) }}
            >
              <motion.div
                initial={{ y: 400, scale: 1 }}
                animate={{ y: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <Box pos="absolute" top={0} left={0} right={0} bottom={0}>
                  <Document file={pdfUrl}>
                    <Page pageNumber={1} width={800} />
                  </Document>
                </Box>
              </motion.div>
              <Overlay color="#000" backgroundOpacity={0} />
            </Box>
          </Flex>
        </Container>

        <WhyChooseUs />
        <JoinUsersHero />

        <Flex justify="center">
          <Button
            component="a"
            variant="subtle"
            href="https://www.linkedin.com/in/jamalsoueidan"
            target="_blank"
            rel="noreferrer"
            leftSection={<FaHeart color="red" />}
          >
            I&apos;m Available for hire
          </Button>
        </Flex>
      </Stack>
    </>
  );
}
