import { ConvexAuthProvider } from "@convex-dev/auth/react";
import "@mantine/carousel/styles.css";
import {
  ColorSchemeScript,
  createTheme,
  mantineHtmlProps,
  MantineProvider,
  TextInput,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/tiptap/styles.css";
import { ConvexReactClient } from "convex/react";
import { useEffect, useState } from "react";
import type { LoaderFunctionArgs } from "react-router";
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import { useChangeLanguage } from "remix-i18next/react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { PDFModal } from "./components/modals/PDFModal";
import { configConsent } from "./cookieconsent.config";
import i18nServer, { localeCookie } from "./i18n/server";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      defaultProps: {
        size: "lg",
      },
    }),
  },
});

export const handle = { i18n: ["translation"] };

export async function loader({ request }: LoaderFunctionArgs) {
  const CONVEX_URL = process.env["CONVEX_URL"]!;
  const locale = await i18nServer.getLocale(request);
  return data(
    { ENV: { CONVEX_URL }, locale },
    { headers: { "Set-Cookie": await localeCookie.serialize(locale) } }
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { ENV, locale } = useLoaderData<typeof loader>();
  const [convex] = useState(() => new ConvexReactClient(ENV.CONVEX_URL));

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  useEffect(() => {
    CookieConsent.run(configConsent);
  }, []);

  return (
    <html lang={locale ?? "en"} {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <ModalsProvider modals={{ pdfModal: PDFModal }}>
            <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>
          </ModalsProvider>
        </MantineProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
