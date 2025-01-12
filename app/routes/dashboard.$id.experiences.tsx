import {
  Accordion,
  AppShell,
  Button,
  Flex,
  Grid,
  Input,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { randomId, useDebouncedCallback } from "@mantine/hooks";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useOutletContext } from "react-router";
import {
  FormProvider,
  useFormContext,
} from "~/components/providers/CVFormProvider";
import { useRaisedShadow } from "~/hooks/useRaisedShadow";

import { AccordionControlDrag } from "~/components/form/AccordionControlDrag";
import { EditorInput } from "~/components/form/EditorInput";
import { PDFGridViewer } from "~/components/PDFGridViewer";
import type { Route } from "./+types/dashboard.$id";

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
      if (data) {
        save(values);
      }
    },
  });

  const workExperiences = form
    .getValues()
    .workExperiences.map((item, index) => {
      return <Item item={item} key={item.key} index={index} />;
    });

  return (
    <>
      <AppShell.Main>
        <Grid>
          <Grid.Col span="auto" pr="md">
            <FormProvider form={form}>
              <form style={{ width: "100%" }}>
                <Grid gutter="xl">
                  <Grid.Col span={12}>
                    <Title order={2} fw="500">
                      Tell us about your most recent job
                    </Title>
                    <Text size="lg">We’ll start there and work backward.</Text>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Stack>
                      {workExperiences.length > 0 && (
                        <Reorder.Group
                          axis="y"
                          values={form.getValues().workExperiences}
                          onReorder={(items) => {
                            form.setValues({ workExperiences: items });
                          }}
                          as="div"
                        >
                          <Accordion variant="separated" chevronPosition="left">
                            {workExperiences}
                          </Accordion>
                        </Reorder.Group>
                      )}

                      <Button
                        onClick={() =>
                          form.insertListItem("workExperiences", {
                            key: randomId(),
                          })
                        }
                        leftSection={<FaPlus />}
                        fullWidth
                        size="lg"
                        variant="outline"
                      >
                        Add new position
                      </Button>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </form>
            </FormProvider>
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
  item: FunctionReturnType<typeof api.resumes.get>["workExperiences"][0];
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
      <Accordion.Item value={item.key}>
        <AccordionControlDrag
          dragControls={controls}
          onDestroy={() => form.removeListItem("workExperiences", index)}
        >
          {item.position ? item.position : "(ikke angivet)"}
        </AccordionControlDrag>
        <Accordion.Panel>
          <Stack>
            <Flex gap="xl">
              <TextInput
                withAsterisk
                label="Job Title"
                variant="filled"
                w="100%"
                style={{ flex: 1 }}
                {...form.getInputProps(`workExperiences.${index}.position`)}
              />
              <TextInput
                withAsterisk
                label="Employer"
                variant="filled"
                w="100%"
                style={{ flex: 1 }}
                {...form.getInputProps(`workExperiences.${index}.company`)}
              />
            </Flex>
            <Flex gap="xl">
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
                          `workExperiences.${index}.startDate`,
                          value?.getTime()
                        );
                      }}
                      value={item.startDate ? new Date(item.startDate) : null}
                    />
                    <MonthPickerInput
                      placeholder="MM / YYYY"
                      valueFormat="MM / YYYY"
                      w="50%"
                      variant="filled"
                      size="lg"
                      clearable
                      onChange={(value) => {
                        form.setFieldValue(
                          `workExperiences.${index}.endDate`,
                          value?.getTime()
                        );
                      }}
                      value={item.endDate ? new Date(item.endDate) : null}
                    />
                  </Flex>
                </Input.Wrapper>
              </Flex>
              <TextInput
                withAsterisk
                label="City"
                variant="filled"
                w="100%"
                style={{ flex: 1 }}
                {...form.getInputProps(`workExperiences.${index}.city`)}
              />
            </Flex>
            <EditorInput
              label="Description"
              size="lg"
              description="Recruiter tip: write 200+ characters to increase interview chances"
              {...form.getInputProps(`workExperiences.${index}.description`)}
            />
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Reorder.Item>
  );
}
