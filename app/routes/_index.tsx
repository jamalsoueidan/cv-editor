import { Box } from "@mantine/core";
import { Authenticated, Unauthenticated } from "convex/react";
import { FrontPage } from "~/components/Frontpage";
import { Login } from "~/components/Login";

export default function Index() {
  return (
    <Box py="xl">
      <Authenticated>
        <FrontPage />
      </Authenticated>

      <Unauthenticated>
        <Login />
      </Unauthenticated>
    </Box>
  );
}
