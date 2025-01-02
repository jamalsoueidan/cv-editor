import {
  ActionIcon,
  Button,
  Container,
  Grid,
  Group,
  Modal,
  Text,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Form } from "react-router";
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
            <Button variant="default" onClick={open}>
              {i18n.language}
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

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <FaTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <FaYoutube size={18} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <FaInstagram size={18} />
          </ActionIcon>
        </Group>
      </Container>
      <Modal opened={opened} onClose={close} title={t("footer.modal.title")}>
        <Form>
          <button type="submit" name="lng" value="da">
            {t("footer.modal.da")}
          </button>
          <button type="submit" name="lng" value="en">
            {t("footer.modal.en")}
          </button>
        </Form>
      </Modal>
    </footer>
  );
}
