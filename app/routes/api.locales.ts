import { cacheHeader } from "pretty-cache-header";
import { resources } from "~/i18n/config";
import type { Route } from "./+types/api.locales";

export function headers(_: Route.HeadersArgs) {
  const headers = new Headers();

  // On production, we want to add cache headers to the response
  if (process.env.NODE_ENV === "production") {
    headers.set(
      "Cache-Control",
      cacheHeader({
        maxAge: "5m", // Cache in the browser for 5 minutes
        sMaxage: "1d", // Cache in the CDN for 1 day
        // Serve stale content while revalidating for 7 days
        staleWhileRevalidate: "7d",
        // Serve stale content if there's an error for 7 days
        staleIfError: "7d",
      })
    );
  }

  return headers;
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  // `resources` is only available server-side, but TS doesn't know so we have
  // to assert it's not undefined here and assign it to another constant to
  // avoid TS errors below
  const languages = resources!;

  const lng = url.searchParams.get("lng") || "en";

  const namespaces = languages[lng as never];

  const ns = url.searchParams.get("ns") || "translation";

  return Response.json(namespaces[ns]);
}
