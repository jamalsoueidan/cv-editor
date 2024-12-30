import { createFormContext } from "@mantine/form";
import { api } from "convex/_generated/api";
import { type FunctionReturnType } from "convex/server";

export const [FormProvider, useFormContext, useForm] =
  createFormContext<FunctionReturnType<typeof api.resumes.get>>();
