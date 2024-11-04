import { createFormContext } from "@mantine/form";
import { api } from "convex/_generated/api";
import { FunctionReturnType } from "convex/server";

// createFormContext returns a tuple with 3 items:
// FormProvider is a component that sets form context
// useFormContext hook return form object that was previously set in FormProvider
// useForm hook works the same way as useForm exported from the package but has predefined type
export const [FormProvider, useFormContext, useForm] =
  createFormContext<FunctionReturnType<typeof api.resumes.get>>();
