import {
  ActionIcon,
  AppShell,
  Button,
  Card,
  Flex,
  Grid,
  rem,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId, useDebouncedCallback } from "@mantine/hooks";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/dashboard.$id";

import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaGripHorizontal, FaPlus, FaTrash } from "react-icons/fa";
import { PDFGridViewer } from "~/components/PDFGridViewer";
import {
  FormProvider,
  useFormContext,
} from "~/components/providers/CVFormProvider";
import { useRaisedShadow } from "~/hooks/useRaisedShadow";

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
      console.log(values);
      if (data) {
        save(values);
      }
    },
  });

  const socialProfiles = form.getValues().socialProfiles.map((item, index) => {
    return <Item item={item} key={item.key} index={index} />;
  });

  return (
    <>
      <AppShell.Main>
        <Grid>
          <Grid.Col span="auto" pr="md">
            <Grid gutter="xl">
              <Grid.Col span={12}>
                <Title order={2} fw="500">
                  Websites and Social links
                </Title>
                <Text size="lg">
                  You can add links you want hiring managers to see! Perhaps It
                  will be a link to your LinkedIn profile, or personal website.
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <FormProvider form={form}>
                  <form style={{ width: "100%" }}>
                    {socialProfiles.length > 0 && (
                      <Card withBorder p="0">
                        <Reorder.Group
                          axis="y"
                          values={form.getValues().socialProfiles}
                          onReorder={(items) => {
                            form.setValues({ socialProfiles: items });
                          }}
                          as="div"
                        >
                          {socialProfiles}
                        </Reorder.Group>
                      </Card>
                    )}
                    <Flex mt="md" gap="xs" wrap="wrap">
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() =>
                          form.insertListItem("socialProfiles", {
                            key: randomId(),
                            label: "",
                            url: "",
                          })
                        }
                        fullWidth
                        rightSection={<FaPlus />}
                      >
                        Add one more language
                      </Button>
                    </Flex>
                  </form>
                </FormProvider>
              </Grid.Col>
              <Grid.Col span={12}>
                <Flex justify="flex-end" align="center" visibleFrom="md">
                  <Button size="md" onClick={onNextStep}>
                    Færdig
                  </Button>
                </Flex>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <PDFGridViewer data={data} />
        </Grid>
      </AppShell.Main>
      <AppShell.Footer p="xs" hiddenFrom="md">
        <Flex justify="space-between" align="center">
          <Button variant="default" size="md" onClick={onPrevStep}>
            {t("makecv.footer.back")}
          </Button>
          <Button size="md" onClick={onNextStep}>
            Færdig
          </Button>
        </Flex>
      </AppShell.Footer>
    </>
  );
}

function Item({
  item,
  index,
}: {
  item: FunctionReturnType<typeof api.resumes.get>["socialProfiles"][0];
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
        <Stack>
          <Flex gap="md" align="center">
            <ActionIcon
              variant="subtle"
              color="gray"
              onPointerDown={(event) => controls.start(event)}
            >
              <FaGripHorizontal size={rem(20)} />
            </ActionIcon>
            <TextInput
              withAsterisk
              label="Label"
              variant="filled"
              w="100%"
              style={{ flex: 1 }}
              {...form.getInputProps(`socialProfiles.${index}.label`)}
            />
            <TextInput
              withAsterisk
              label="Link"
              variant="filled"
              placeholder="https://example.com"
              w="100%"
              style={{ flex: 1 }}
              {...form.getInputProps(`socialProfiles.${index}.url`)}
            />

            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => form.removeListItem("socialProfiles", index)}
              ml="lg"
            >
              <FaTrash size={rem(20)} />
            </ActionIcon>
          </Flex>
        </Stack>
      </Card>
    </Reorder.Item>
  );
}
