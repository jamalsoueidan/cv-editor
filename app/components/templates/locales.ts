export interface TemplateLocale {
  details: string;
  profile: string;
  workExperience: string;
}

export const templateEnglish: TemplateLocale = {
  details: "Details",
  profile: "Profile",
  workExperience: "Work Experience",
};

export const templateDanish: TemplateLocale = {
  details: "Detaljer",
  profile: "Profil",
  workExperience: "Erfaring",
};

export const LANGUAGES: Record<string, TemplateLocale> = {
  da: templateDanish,
  en: templateEnglish,
};
