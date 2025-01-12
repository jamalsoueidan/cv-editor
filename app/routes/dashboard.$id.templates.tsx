import { AppShell, Skeleton } from "@mantine/core";

export default function DashboardIndex() {
  return (
    <>
      <AppShell.Main>
        60 links in a scrollable section
        {Array(60)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Main>

      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </>
  );
}
