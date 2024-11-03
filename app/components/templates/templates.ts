import { api } from "convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { Gaza } from "./Gaza";
import { TemplateLocale } from "./locales";
import { Quds } from "./Quds";

export const TEMPLATES: Record<
  string,
  React.ComponentType<{
    data: FunctionReturnType<typeof api.resumes.get>;
    lang: TemplateLocale;
  }>
> = {
  quds: Quds,
  gaza: Gaza,
};
