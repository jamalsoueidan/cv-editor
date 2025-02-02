import { api } from "convex/_generated/api";
import { type FunctionReturnType } from "convex/server";

import { Aarhus } from "./Aarhus";

import { Copenhagen } from "./Copenhagen";
import { type TemplateLocale } from "./locales";

export const TEMPLATES: Record<
  string,
  React.ComponentType<{
    data: FunctionReturnType<typeof api.resumes.get>;
    lang: TemplateLocale;
  }>
> = {
  copenhagen: Copenhagen,
  aarhus: Aarhus,
};
