import { Box } from "@mantine/core";
import { Authenticated, Unauthenticated } from "convex/react";
import { LoggedIn } from "~/components/LoggedIn";

import { useTranslation } from "react-i18next";
import { Footer } from "~/components/Footer";
import { NotLoggedIn } from "~/components/NotLoggedIn";
import i18nServer from "~/i18n/server";
import type { Route } from "../routes/+types/_index";

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18nServer.getFixedT(request);
  const locale = await i18nServer.getLocale(request);
  return { title: t("title"), description: t("description"), locale };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation();

  return (
    <>
      <Box py="xl">
        <Authenticated>
          <LoggedIn />
        </Authenticated>

        <Unauthenticated>
          <NotLoggedIn />
        </Unauthenticated>
      </Box>
      <Footer />
    </>
  );
}
