import { Box, getGradient, rem, useMantineTheme } from "@mantine/core";
import { Authenticated, Unauthenticated } from "convex/react";
import { LoggedIn } from "~/components/LoggedIn";

import { pdf } from "@react-pdf/renderer";
import { LoginHeader } from "~/components/LoginHeader";
import { NotLoggedIn } from "~/components/NotLoggedIn";
import { PDFContainer } from "~/components/PDFContainer";
import { resumes } from "~/components/sections/CVCarousel";
import i18nServer from "~/i18n/server";
import type { Route } from "../routes/+types/_index";

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18nServer.getFixedT(request);

  const blob = await pdf(<PDFContainer.Template data={resumes[0]} />).toBlob();
  const arrayBuffer = await blob.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  return { title: t("title"), description: t("description"), pdf: base64 };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const theme = useMantineTheme();

  return (
    <>
      <Box pos="relative" pb={rem(40)} pt={rem(20)}>
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
          <LoginHeader />
          <LoggedIn />
        </Authenticated>

        <Unauthenticated>
          <NotLoggedIn pdf={loaderData.pdf} />
        </Unauthenticated>
      </Box>
    </>
  );
}
