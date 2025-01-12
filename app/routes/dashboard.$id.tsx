import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  rem,
  ScrollArea,
  Stack,
  Stepper,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { preloadedQueryResult, preloadQuery } from "convex/nextjs";
import { useTranslation } from "react-i18next";
import { FaEye, FaMoon, FaStarAndCrescent, FaSun } from "react-icons/fa";
import { PiBook, PiBookOpen } from "react-icons/pi";
import { Outlet, useLocation, useNavigate } from "react-router";
import { PDFContainer } from "~/components/PDFContainer";
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

  const active = location.pathname.includes("summary")
    ? 1
    : location.pathname.includes("experiences")
    ? 2
    : location.pathname.includes("educations")
    ? 3
    : location.pathname.includes("skills")
    ? 4
    : location.pathname.includes("languages")
    ? 5
    : location.pathname.includes("links")
    ? 6
    : location.pathname.includes("finalize")
    ? 7
    : 0;

  const onNextStep = () => {
    onStepClick(active + 1);
  };

  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
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
              variant="white"
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="md"
              title="Show sidebar"
            >
              <PiBook size={rem(28)} color="black" />
            </ActionIcon>
          ) : (
            <ActionIcon
              onClick={toggleDesktop}
              visibleFrom="sm"
              variant="transparent"
              title="Hide sidebar"
            >
              <PiBookOpen size={rem(32)} color={isDark ? "white" : "black"} />
            </ActionIcon>
          )}

          <Group justify="flex-end" style={{ flex: 1 }}>
            <Group gap="xs">
              <PDFContainer
                templateElement={<PDFContainer.Template data={data} />}
              >
                <PDFContainer.DownloadIcon
                  variant="outline"
                  color={isDark ? "white" : "black"}
                  title={t("makecv.header.downloadcv")}
                />
              </PDFContainer>
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
          <Group justify="space-between">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="md"
            />
          </Group>
        </AppShell.Section>
        <AppShell.Section grow py={rem(40)} px={rem(6)} component={ScrollArea}>
          <Stepper
            active={active}
            onStepClick={onStepClick}
            orientation="vertical"
            color="black"
            styles={{
              step: {
                minHeight: rem(40),
              },
              stepBody: {
                marginTop: rem(4),
              },
              verticalSeparator: {
                top: rem(24 + 5),
                insetInlineStart: rem(10),
              },
              stepLabel: {
                fontSize: "var(--mantine-font-size-md)",
              },
              stepIcon: {
                width: rem(24),
                height: rem(24),
                minHeight: "unset",
                minWidth: "unset",
              },
            }}
            size="xs"
          >
            <Stepper.Step label={t("makecv.navbar.personal")} />
            <Stepper.Step label={t("makecv.navbar.profile")} />
            <Stepper.Step label={t("makecv.navbar.experience")} />
            <Stepper.Step label={t("makecv.navbar.education")} />
            <Stepper.Step label={t("makecv.navbar.skills")} />
            <Stepper.Step label={t("makecv.navbar.language")} />
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
      <Outlet context={{ data, id, onNextStep }} />
    </AppShell>
  );
}
