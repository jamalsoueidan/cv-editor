import {
  AppShell,
  Container,
  Flex,
  type AppShellFooterProps,
  type FlexProps,
} from "@mantine/core";

export const ShellFooter = (
  props: AppShellFooterProps & { upperSection?: React.ReactNode } & Pick<
      FlexProps,
      "justify"
    >
) => {
  const { children, upperSection, justify, ...rest } = props;

  return (
    <AppShell.Footer {...rest}>
      {upperSection}
      <Container fluid py="sm">
        <Flex justify={justify || "space-between"} align="center">
          {children}
        </Flex>
      </Container>
    </AppShell.Footer>
  );
};
