import {
  ActionIcon,
  AppShell,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Progress,
  rem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId, useDebouncedCallback } from "@mantine/hooks";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/dashboard.$id";

import { Input, TextInput } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";

import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useRaisedShadow } from "~/hooks/useRaisedShadow";

import { useTranslation } from "react-i18next";
import { FaGripHorizontal, FaPlus, FaTrash } from "react-icons/fa";
import {
  FormProvider,
  useFormContext,
} from "~/components/providers/CVFormProvider";
import { ShellFooter } from "~/components/ShellFooter";

export default function DashboardIndex() {
  const { t } = useTranslation();
  const { data, onNextStep, onPrevStep } =
    useOutletContext() as Route.ComponentProps["loaderData"] & {
      onNextStep: () => void;
      onPrevStep: () => void;
    };

  const patch = useMutation(api.resumes.update);

  const save = useDebouncedCallback(
    async (values: FunctionReturnType<typeof api.resumes.get>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _creationTime, userId, updatedTime, photoUrl, ...rest } = values;

      patch(rest);
    },
    250
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: data,
    onValuesChange(values) {
      if (data) {
        save(values);
      }
    },
  });

  const educations = form.getValues().educations.map((item, index) => {
    return <Item item={item} key={item.key} index={index} />;
  });

  return (
    <>
      <AppShell.Main>
        <FormProvider form={form}>
          <form style={{ width: "100%" }}>
            <Grid gutter="xl">
              <Grid.Col span={12}>
                <Title order={2} fw="500">
                  Tell us about your education
                </Title>
                <Text size="lg">
                  Enter your education experience so far, even if you are a
                  current student or did not graduate.
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Stack>
                  {educations.length > 0 && (
                    <Card withBorder p="0">
                      <Reorder.Group
                        axis="y"
                        values={form.getValues().educations}
                        onReorder={(items) => {
                          form.setValues({ educations: items });
                        }}
                        as="div"
                      >
                        {educations}
                      </Reorder.Group>
                    </Card>
                  )}
                  <Button
                    variant="outline"
                    onClick={() =>
                      form.insertListItem("educations", {
                        key: randomId(),
                      })
                    }
                    leftSection={<FaPlus />}
                    size="lg"
                    fullWidth
                  >
                    Add education
                  </Button>
                </Stack>
              </Grid.Col>
              <Grid.Col span={12}>
                <Flex justify="flex-end" align="center" visibleFrom="md">
                  <Button onClick={onNextStep}>
                    {t("makecv.footer.next")}
                  </Button>
                </Flex>
              </Grid.Col>
            </Grid>
          </form>
        </FormProvider>
      </AppShell.Main>

      <ShellFooter
        hiddenFrom="md"
        upperSection={<Progress radius="0" size="md" value={75} />}
      >
        <Button variant="subtle" onClick={onPrevStep}>
          {t("makecv.footer.back")}
        </Button>

        <Button onClick={onNextStep}>{t("makecv.footer.next")}</Button>
      </ShellFooter>
    </>
  );
}

function Item({
  item,
  index,
}: {
  item: FunctionReturnType<typeof api.resumes.get>["educations"][0];
  index: number;
}) {
  const form = useFormContext();
  const controls = useDragControls();
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item
      value={item}
      id={item}
      dragListener={false}
      dragControls={controls}
      style={{ boxShadow, y }}
      as="div"
    >
      <Card style={{ borderBottom: "1px solid #e9ecef" }}>
        <Grid>
          <Grid.Col span={12}>
            <Group justify="space-between">
              <ActionIcon
                variant="subtle"
                color="gray"
                onPointerDown={(event) => controls.start(event)}
              >
                <FaGripHorizontal size={rem(20)} />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => form.removeListItem("educations", index)}
                ml="lg"
              >
                <FaTrash size={rem(20)} />
              </ActionIcon>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              withAsterisk
              label="School"
              variant="filled"
              w="100%"
              style={{ flex: 1 }}
              {...form.getInputProps(`educations.${index}.school`)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              withAsterisk
              label="Degree"
              variant="filled"
              w="100%"
              style={{ flex: 1 }}
              {...form.getInputProps(`educations.${index}.degree`)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Flex direction="column" flex="1">
              <Input.Wrapper label="Start- & end date" size="lg">
                <Flex gap="md">
                  <MonthPickerInput
                    placeholder="MM / YYYY"
                    valueFormat="MM / YYYY"
                    w="50%"
                    variant="filled"
                    size="lg"
                    clearable
                    onChange={(value) => {
                      form.setFieldValue(
                        `educations.${index}.startDate`,
                        value?.getTime()
                      );
                    }}
                    value={item.startDate ? new Date(item.startDate) : null}
                  />
                  <MonthPickerInput
                    placeholder="MM / YYYY"
                    valueFormat="MM / YYYY"
                    w="50%"
                    size="lg"
                    variant="filled"
                    clearable
                    onChange={(value) => {
                      form.setFieldValue(
                        `educations.${index}.endDate`,
                        value?.getTime()
                      );
                    }}
                    value={item.endDate ? new Date(item.endDate) : null}
                  />
                </Flex>
              </Input.Wrapper>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              withAsterisk
              label="City"
              variant="filled"
              w="100%"
              style={{ flex: 1 }}
              {...form.getInputProps(`educations.${index}.city`)}
            />
          </Grid.Col>
        </Grid>
      </Card>
    </Reorder.Item>
  );
}
