import {
  ActionIcon,
  AppShell,
  Burger,
  Flex,
  Group,
  rem,
  ScrollArea,
  Stack,
  Stepper,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { preloadedQueryResult, preloadQuery } from "convex/nextjs";
import { useTranslation } from "react-i18next";
import {
  FaCopy,
  FaEye,
  FaMoon,
  FaStarAndCrescent,
  FaSun,
} from "react-icons/fa";
import { PiArrowLineLeft, PiArrowLineRight } from "react-icons/pi";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useQueryData } from "~/hooks/useQueryData";
import type { Route } from "./+types/dashboard.$id";

export async function loader({ params }: Route.LoaderArgs) {
  const url = process.env["CONVEX_URL"]!;
  const id = params.id as Id<"resumes">;
  const data = await preloadQuery(
    api.resumes.get,
    { id, secret: process.env["SECRET"] },
    { url }
  );

  return { data: preloadedQueryResult(data), id };
}

const steps = [
  "personal",
  "summary",
  "experiences",
  "educations",
  "skills",
  "languages",
  "links",
];

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { id } = loaderData;
  const { t } = useTranslation();
  const data = useQueryData(
    api.resumes.get,
    {
      id,
    },
    loaderData.data
  );

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const navigate = useNavigate();
  const location = useLocation();

  const onStepClick = (nextStep: number) => {
    if (nextStep === 0) {
      navigate("personal");
    } else if (nextStep === 1) {
      navigate("summary");
    } else if (nextStep === 2) {
      navigate("experiences");
    } else if (nextStep === 3) {
      navigate("educations");
    } else if (nextStep === 4) {
      navigate("skills");
    } else if (nextStep === 5) {
      navigate("languages");
    } else if (nextStep === 6) {
      navigate("links");
    } else if (nextStep === 7) {
      navigate("finalize");
    }
  };

  const active = steps.findIndex((s) => location.pathname.includes(s));

  const onNextStep = () => {
    onStepClick(active + 1);
  };

  const onPrevStep = () => {
    onStepClick(active - 1);
  };

  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{
        height: 60,
      }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: {
          mobile: active < 0 || !mobileOpened,
          desktop: active < 0 || !desktopOpened,
        },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />

          {!desktopOpened ? (
            <ActionIcon
              variant="transparent"
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="md"
              title="Show sidebar"
            >
              <PiArrowLineRight
                size={rem(28)}
                color={isDark ? "white" : "black"}
              />
            </ActionIcon>
          ) : null}

          <Group justify="center" align="center" gap="sm">
            <Title order={2} fw="600" hidden={active < 0}>
              {t(`makecv.navbar.${steps[active]}` as any)}
            </Title>
          </Group>
          <Group justify="flex-end" style={{ flex: 1 }}>
            <Group gap="xs">
              <ActionIcon
                variant="outline"
                color={isDark ? "white" : "black"}
                onClick={() =>
                  modals.openContextModal({
                    size: "lg",
                    fullScreen: true,
                    modal: "pdfModal",
                    innerProps: data,
                  })
                }
                title={t("makecv.header.previewcv")}
              >
                <FaCopy />
              </ActionIcon>
              <ActionIcon
                variant="outline"
                color={isDark ? "white" : "black"}
                onClick={() =>
                  modals.openContextModal({
                    size: "lg",
                    fullScreen: true,
                    modal: "pdfModal",
                    innerProps: data,
                  })
                }
                hiddenFrom="md"
                title={t("makecv.header.previewcv")}
              >
                <FaEye />
              </ActionIcon>
              <ActionIcon
                variant="outline"
                color={isDark ? "white" : "black"}
                onClick={() => setColorScheme(isDark ? "light" : "dark")}
                title={t("makecv.header.colorschema")}
              >
                {isDark ? (
                  <FaSun style={{ width: 18, height: 18 }} />
                ) : (
                  <FaMoon style={{ width: 18, height: 18 }} />
                )}
              </ActionIcon>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section>
          <Group hiddenFrom="sm">
            <Burger opened={mobileOpened} onClick={toggleMobile} size="md" />
          </Group>
          <Flex visibleFrom="sm" justify="flex-end">
            <ActionIcon
              onClick={toggleDesktop}
              variant="transparent"
              title="Hide sidebar"
            >
              <PiArrowLineLeft
                size={rem(32)}
                color={isDark ? "white" : "black"}
              />
            </ActionIcon>
          </Flex>
        </AppShell.Section>
        <AppShell.Section grow py={rem(30)} px={rem(6)} component={ScrollArea}>
          <Stepper
            active={active!}
            onStepClick={onStepClick}
            orientation="vertical"
            color="black"
            styles={{
              step: {
                minHeight: rem(50),
              },
              stepBody: {
                marginTop: rem(6),
              },
              verticalSeparator: {
                top: rem(40),
                insetInlineStart: rem(16),
              },
              stepLabel: {
                fontSize: "var(--mantine-font-size-md)",
              },
              stepIcon: { fontSize: "var(--mantine-font-size-md)" },
            }}
            size="xs"
          >
            <Stepper.Step label={t("makecv.navbar.personal")} />
            <Stepper.Step label={t("makecv.navbar.summary")} />
            <Stepper.Step label={t("makecv.navbar.experiences")} />
            <Stepper.Step label={t("makecv.navbar.educations")} />
            <Stepper.Step label={t("makecv.navbar.skills")} />
            <Stepper.Step label={t("makecv.navbar.languages")} />
            <Stepper.Step label={t("makecv.navbar.links")} />
            <Stepper.Step label={t("makecv.navbar.finalize")} />
          </Stepper>
        </AppShell.Section>
        <AppShell.Section pl="xs" pb={rem(6)}>
          <Group>
            <ActionIcon
              variant="outline"
              aria-label="Prices"
              radius="xl"
              color="gray"
            >
              <FaStarAndCrescent color={isDark ? "white" : "black"} />
            </ActionIcon>
            <Stack gap="0">
              <Text size="sm">View plans</Text>
              <Text size="xs" c="dimmed">
                Unlimited access
              </Text>
            </Stack>
          </Group>
        </AppShell.Section>
      </AppShell.Navbar>
      <Outlet context={{ data, id, onNextStep, onPrevStep }} />
    </AppShell>
  );
}
