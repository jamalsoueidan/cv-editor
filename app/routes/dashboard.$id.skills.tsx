import {
  ActionIcon,
  AppShell,
  Button,
  Card,
  Flex,
  Grid,
  Rating,
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
import { FaGripHorizontal, FaPlus, FaTrash } from "react-icons/fa";
import { PDFGridViewer } from "~/components/PDFGridViewer";
import {
  FormProvider,
  useFormContext,
} from "~/components/providers/CVFormProvider";
import { useRaisedShadow } from "~/hooks/useRaisedShadow";

export default function DashboardIndex() {
  const { data, onNextStep } =
    useOutletContext() as Route.ComponentProps["loaderData"] & {
      onNextStep: () => void;
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

  const skills = form.getValues().skills.map((item, index) => {
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
                  What skills would you like to highlight?
                </Title>
                <Text size="lg">
                  Choose from our pre-written examples below or write your own.
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <FormProvider form={form}>
                  <form style={{ width: "100%" }}>
                    {skills.length > 0 && (
                      <Card withBorder p="0">
                        <Reorder.Group
                          axis="y"
                          values={form.getValues().skills}
                          onReorder={(items) => {
                            form.setValues({ skills: items });
                          }}
                          as="div"
                        >
                          {skills}
                        </Reorder.Group>
                      </Card>
                    )}
                    <Flex mt="md" gap="xs" wrap="wrap">
                      <Button
                        size="xs"
                        variant="light"
                        onClick={() =>
                          form.insertListItem("skills", {
                            key: randomId(),
                            title: "Teamwork Skills",
                            level: "3",
                          })
                        }
                        rightSection={<FaPlus />}
                      >
                        Teamwork Skills
                      </Button>
                      <Button
                        size="xs"
                        variant="light"
                        onClick={() =>
                          form.insertListItem("skills", {
                            key: randomId(),
                            title: "Critical Thinking",
                            level: "3",
                          })
                        }
                        rightSection={<FaPlus />}
                      >
                        Critical Thinking
                      </Button>
                      <Button
                        size="xs"
                        variant="light"
                        onClick={() =>
                          form.insertListItem("skills", {
                            key: randomId(),
                            title: "Customer Service",
                            level: "3",
                          })
                        }
                        rightSection={<FaPlus />}
                      >
                        Customer Service
                      </Button>
                      <Button
                        size="xs"
                        variant="light"
                        onClick={() =>
                          form.insertListItem("skills", {
                            key: randomId(),
                            title: "",
                            level: "3",
                          })
                        }
                        rightSection={<FaPlus />}
                      >
                        Add one more skill
                      </Button>
                    </Flex>
                  </form>
                </FormProvider>
              </Grid.Col>
              <Grid.Col span={12}>
                <Flex justify="flex-end" align="center" visibleFrom="md">
                  <Button size="md" onClick={onNextStep}>
                    Næste: Om dig selv
                  </Button>
                </Flex>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <PDFGridViewer data={data} />
        </Grid>
      </AppShell.Main>
      <AppShell.Footer p="xs" hiddenFrom="md">
        <Flex justify="flex-end" align="center">
          <Button size="md" onClick={onNextStep}>
            Næste: Om dig selv
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
  item: FunctionReturnType<typeof api.resumes.get>["skills"][0];
  index: number;
}) {
  const form = useFormContext();
  const controls = useDragControls();
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  const props = form.getInputProps(`skills.${index}.level`);

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
              variant="filled"
              w="100%"
              style={{ flex: 1 }}
              {...form.getInputProps(`skills.${index}.title`)}
            />

            <Rating
              size="lg"
              value={parseInt(props.defaultValue)}
              onChange={(value: number) => props.onChange(value.toString())}
            />

            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => form.removeListItem("skills", index)}
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
