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
import { FaEye, FaMoon, FaStarAndCrescent, FaSun } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { PiBook, PiBookOpen } from "react-icons/pi";
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

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { id } = loaderData;

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
            >
              <PiBookOpen size={rem(28)} color="black" />
            </ActionIcon>
          ) : null}

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
                hiddenFrom="md"
                title="Show pdf"
              >
                <FaEye />
              </ActionIcon>
              <ActionIcon
                variant="outline"
                color={isDark ? "white" : "black"}
                onClick={() => setColorScheme(isDark ? "light" : "dark")}
                title="Toggle colors"
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
            <ActionIcon
              onClick={toggleDesktop}
              visibleFrom="sm"
              variant="transparent"
            >
              <PiBook size={rem(32)} color={isDark ? "white" : "black"} />
            </ActionIcon>
            <ActionIcon visibleFrom="sm" variant="transparent">
              <GoHome size={rem(32)} color={isDark ? "white" : "black"} />
            </ActionIcon>
          </Group>
        </AppShell.Section>
        <AppShell.Section grow py={rem(22)} px={rem(6)} component={ScrollArea}>
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
            <Stepper.Step label="Personlig information" />
            <Stepper.Step label="Om dig selv" />
            <Stepper.Step label="Work history" />
            <Stepper.Step label="Education" />
            <Stepper.Step label="Skills" />
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
