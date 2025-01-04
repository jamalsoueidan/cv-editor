import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  Modal,
  rem,
  Text,
  Title,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { Form } from "react-router";
import { supportedLngs } from "../../i18n/config";
import classes from "./Footer.module.css";

const data = [
  {
    title: "Sammenligne",
    links: [
      { label: "Gratiscvonline vs cv.dk", link: "#" },
      { label: "Gratiscvonline vs cvmaker", link: "#" },
    ],
  },
  {
    title: "Jobsøgere",
    links: [
      { label: "Byt et CV", link: "#" },
      { label: "Eksempler på CV", link: "#" },
      { label: "CV-skabeloner", link: "#" },
    ],
  },
  {
    title: "Vores virksomhed",
    links: [
      { label: "Om os", link: "#" },
      { label: "Priser", link: "#" },
      { label: "Kontakt os", link: "#" },
      { label: "FAQ", link: "#" },
    ],
  },
];

export function Footer() {
  const [opened, { open, close }] = useDisclosure(false);
  const { t, i18n } = useTranslation();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <Grid.Col key={group.title} span={{ base: 12, sm: 6, md: 4 }}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </Grid.Col>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container>
        <Grid>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Text size="sm" c="dimmed" className={classes.description}>
              Opret dit professionelle CV og download det GRATIS.
            </Text>

            <Button
              variant="subtle"
              color="black"
              onClick={open}
              leftSection={
                <Image
                  w={25}
                  alt={t(("flag." + i18n.language) as any)}
                  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${t(
                    ("flag." + i18n.language) as any
                  ).toUpperCase()}.svg`}
                />
              }
            >
              {t(("footer.modal." + i18n.language) as never)}
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <Grid>{groups}</Grid>
          </Grid.Col>
        </Grid>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2025 Gratiscvonline.dk. All rights reserved.
        </Text>

        <Group gap={0} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <FaYoutube size={18} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <FaGithub size={18} />
          </ActionIcon>
        </Group>
      </Container>
      <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header pos="relative">
            <Modal.CloseButton
              style={{
                position: "absolute",
                right: rem(10),
                top: rem(10),
              }}
            />
          </Modal.Header>
          <Modal.Body px="xl" mb="xl">
            <Title ta="center" order={2} mb="xl">
              {t("footer.modal.title")}
            </Title>
            <Flex gap="xl">
              {supportedLngs.map((lng) => (
                <Flex key={lng}>
                  <Form>
                    <Button
                      variant="subtle"
                      color="black"
                      type="submit"
                      name="lng"
                      value={lng}
                      leftSection={
                        <Image
                          w={50}
                          alt={t(("flag." + lng) as any)}
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${t(
                            ("flag." + lng) as any
                          ).toUpperCase()}.svg`}
                        />
                      }
                    >
                      {t(("footer.modal." + lng) as never)}
                    </Button>
                  </Form>
                </Flex>
              ))}
            </Flex>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </footer>
  );
}
