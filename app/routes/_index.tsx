import { Box, getGradient, rem, useMantineTheme } from "@mantine/core";
import { Authenticated, Unauthenticated } from "convex/react";
import { LoggedIn } from "~/components/LoggedIn";

import { Header } from "~/components/Header";
import { NotLoggedIn } from "~/components/NotLoggedIn";
import i18nServer from "~/i18n/server";
import type { Route } from "../routes/+types/_index";

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18nServer.getFixedT(request);
  return { title: t("title"), description: t("description") };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const theme = useMantineTheme();

  return (
    <>
      <Box pos="relative">
        <Box
          pos="absolute"
          top="0"
          w="100%"
          h="80vh"
          style={{
            background: getGradient(
              { deg: 180, from: "blue.1", to: "white" },
              theme
            ),
            zIndex: -1,
          }}
          pb="xl"
        />
        <Authenticated>
          <Box pb={rem(40)} pt={rem(10)}>
            <Header />
            <LoggedIn />
          </Box>
        </Authenticated>

        <Unauthenticated>
          <Box py={rem(40)}>
            <NotLoggedIn />
          </Box>
        </Unauthenticated>
      </Box>
    </>
  );
}
