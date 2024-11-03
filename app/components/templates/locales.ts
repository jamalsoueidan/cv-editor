export interface TemplateLocale {
  details: string;
  profile: string;
  workExperience: string;
  education: string;
  links: string;
  skills: string;
}

export const templateEnglish: TemplateLocale = {
  details: "Details",
  profile: "Profile",
  workExperience: "Work Experience",
  education: "Education",
  links: "Links",
  skills: "Skills",
};

export const templateDanish: TemplateLocale = {
  details: "Detaljer",
  profile: "Profil",
  workExperience: "Erfaring",
  education: "Uddannelse",
  links: "Hjemmesider",
  skills: "Færdigheder",
};

export const LANGUAGES: Record<string, TemplateLocale> = {
  da: templateDanish,
  en: templateEnglish,
};
