export interface TemplateLocale {
  details: string;
}

export const templateEnglish: TemplateLocale = {
  details: "Details",
};

export const templateDanish: TemplateLocale = {
  details: "Detaljer",
};

export const LANGUAGES: Record<string, TemplateLocale> = {
  da: templateDanish,
  en: templateEnglish,
};
