import { Table } from "convex-helpers/server";
import { v } from "convex/values";

export const Resume = Table("resumes", {
  title: v.string(),
  position: v.optional(v.string()),
  firstname: v.optional(v.string()),
  lastname: v.optional(v.string()),
  email: v.optional(v.string()),
  phone: v.optional(v.string()),
  country: v.optional(v.string()),
  city: v.optional(v.string()),
  content: v.optional(v.string()),
  hobbies: v.optional(v.string()),
  photo: v.optional(v.id("_storage")),
  workExperiences: v.array(
    v.object({
      key: v.string(),
      order: v.optional(v.number()),
      position: v.optional(v.string()),
      company: v.optional(v.string()),
      startDate: v.optional(v.number()),
      endDate: v.optional(v.number()),
      city: v.optional(v.string()),
      description: v.optional(v.string()),
    })
  ),
  educations: v.array(
    v.object({
      key: v.string(),
      order: v.optional(v.number()),
      school: v.optional(v.string()),
      degree: v.optional(v.string()),
      startDate: v.optional(v.number()),
      endDate: v.optional(v.number()),
      city: v.optional(v.string()),
      description: v.optional(v.string()),
    })
  ),
  socialProfiles: v.array(
    v.object({
      key: v.string(),
      order: v.optional(v.number()),
      label: v.string(),
      url: v.string(),
    })
  ),
  socialProfilesVisible: v.boolean(),
  languages: v.array(
    v.object({
      key: v.string(),
      order: v.optional(v.number()),
      language: v.string(),
      level: v.string(),
    })
  ),
  languagesVisible: v.boolean(),
  skills: v.array(
    v.object({
      key: v.string(),
      order: v.optional(v.number()),
      title: v.string(),
      level: v.string(),
    })
  ),
  skillsVisible: v.boolean(),
  references: v.array(
    v.object({
      key: v.string(),
      order: v.optional(v.number()),
      fullname: v.string(),
      company: v.string(),
      phone: v.string(),
      email: v.string(),
    })
  ),
  referencesVisible: v.boolean(),
  courses: v.array(
    v.object({
      key: v.string(),
      order: v.optional(v.number()),
      institution: v.string(),
      source: v.optional(v.string()),
      startDate: v.optional(v.number()),
      endDate: v.optional(v.number()),
    })
  ),
  coursesVisible: v.boolean(),
  internships: v.array(
    v.object({
      key: v.string(),
      order: v.optional(v.number()),
      position: v.optional(v.string()),
      company: v.optional(v.string()),
      startDate: v.optional(v.number()),
      endDate: v.optional(v.number()),
      city: v.optional(v.string()),
      description: v.optional(v.string()),
    })
  ),
  internshipsVisible: v.boolean(),
  updatedTime: v.number(),
  template: v.object({
    name: v.string(),
    color: v.string(),
    lineHeight: v.string(),
    fontSize: v.string(),
    fontFamily: v.string(),
  }),
  templateLanguage: v.optional(v.string()),
  userId: v.optional(v.id("users")),
});
