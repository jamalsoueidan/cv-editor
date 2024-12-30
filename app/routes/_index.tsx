import { Box } from "@mantine/core";
import { Authenticated, Unauthenticated } from "convex/react";
import { LoggedIn } from "~/components/LoggedIn";

import { NotLoggedIn } from "~/components/NotLoggedIn";

export default function Index() {
  return (
    <Box py="xl">
      <Authenticated>
        <LoggedIn />
      </Authenticated>

      <Unauthenticated>
        <NotLoggedIn />
      </Unauthenticated>
    </Box>
  );
}
