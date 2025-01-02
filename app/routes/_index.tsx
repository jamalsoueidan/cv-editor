import { Box } from "@mantine/core";
import { Authenticated, Unauthenticated } from "convex/react";
import { LoggedIn } from "~/components/LoggedIn";

import { useTranslation } from "react-i18next";
import { Form } from "react-router";
import { NotLoggedIn } from "~/components/NotLoggedIn";
import i18nServer from "~/i18n/server";
import type { Route } from "../routes/+types/_index";

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18nServer.getFixedT(request);
  return { title: t("title"), description: t("description") };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation();

  return (
    <Box py="xl">
      <h1>{t("title")}</h1>
      <p>{loaderData.description}</p>

      <Form>
        <button type="submit" name="lng" value="es">
          Español
        </button>
        <button type="submit" name="lng" value="en">
          English
        </button>
      </Form>

      <Authenticated>
        <LoggedIn />
      </Authenticated>

      <Unauthenticated>
        <NotLoggedIn />
      </Unauthenticated>
    </Box>
  );
}
