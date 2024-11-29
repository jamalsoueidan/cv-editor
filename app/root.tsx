import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import "@mantine/carousel/styles.css";
import {
  ColorSchemeScript,
  createTheme,
  Input,
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/tiptap/styles.css";
import { ConvexReactClient } from "convex/react";
import { useEffect, useState } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

import { pdfjs } from "react-pdf";
import classes from "./Input.module.css";
import { configConsent } from "./cookieconsent-config";

//https://github.com/diegomura/react-pdf-site/blob/master/src/components/Repl/PDFViewer.js#L81
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export const links: LinksFunction = () => [];

export const meta: MetaFunction = () => {
  return [
    { title: "Gratis CV Online" },
    {
      property: "og:title",
      content: "Gratis CV Online",
    },
    {
      name: "description",
      content:
        "Create a CV quickly. Start by entering your details or uploading an existing PDF, then select a template that fits your style. Customize it to showcase your skills and personality, and download your CV as PDF!",
    },
  ];
};

export async function loader() {
  const CONVEX_URL = process.env["CONVEX_URL"]!;
  return json({ ENV: { CONVEX_URL } });
}

const theme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      classNames: {
        label: classes.label,
      },
    }),
  },
});

export function Layout({ children }: { children: React.ReactNode }) {
  const { ENV } = useLoaderData<typeof loader>();
  const [convex] = useState(() => new ConvexReactClient(ENV.CONVEX_URL));

  useEffect(() => {
    CookieConsent.run(configConsent);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <ModalsProvider>
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
