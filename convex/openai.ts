import { ConvexError, v } from "convex/values";

import { internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { actionWithUser } from "./auth";

type Data = Doc<"resumes">;

export const dumbData: Omit<
  Data,
  "_id" | "_creationTime" | "photo" | "userId" | "updatedTime"
> = {
  title: "",
  position: "Software Engineer",
  firstname: "John",
  lastname: "Doe",
  email: "johndoe@example.com",
  phone: "+1234567890",
  country: "USA",
  city: "New York",
  content:
    "Passionate software developer with a strong background in full-stack development.",
  hobbies: "Reading, Hiking, Traveling",
  workExperiences: [
    {
      key: "exp1",
      position: "Senior Developer",
      company: "Tech Solutions",
      startDate: 1622505600000,
      endDate: 1654041600000,
      city: "San Francisco",
      description: "Led a team of developers to build scalable applications.",
    },
    {
      key: "exp2",
      position: "Junior Developer",
      company: "Web Innovations",
      startDate: 1577836800000,
      endDate: 1609459200000,
      city: "Los Angeles",
      description: "Developed and maintained web applications for clients.",
    },
  ],
  educations: [
    {
      key: "edu1",
      school: "State University",
      degree: "Bachelor of Science in Computer Science",
      startDate: 1504224000000,
      endDate: 1567296000000,
      city: "New York",
      description: "Focused on software engineering and data science.",
    },
  ],
  socialProfiles: [
    {
      key: "social1",
      label: "LinkedIn",
      url: "https://linkedin.com/in/johndoe",
    },
    {
      key: "social2",
      label: "GitHub",
      url: "https://github.com/johndoe",
    },
  ],
  socialProfilesVisible: true,
  languages: [
    {
      key: "lang1",
      language: "English",
      level: "5",
    },
    {
      key: "lang2",
      language: "Spanish",
      level: "4",
    },
    {
      key: "lang2",
      language: "Arabisk",
      level: "3",
    },
    {
      key: "lang2",
      language: "Dansk",
      level: "2",
    },
  ],
  languagesVisible: true,
  skills: [
    {
      key: "lang1",
      title: "React",
      level: "5",
    },
    {
      key: "lang2",
      title: "Frontend",
      level: "4",
    },
    {
      key: "lang2",
      title: "Backend",
      level: "3",
    },
    {
      key: "lang2",
      title: "C#",
      level: "2",
    },
  ],
  skillsVisible: true,
  references: [
    {
      key: "ref1",
      fullname: "Jane Smith",
      company: "Tech Solutions",
      phone: "+1987654321",
      email: "janesmith@example.com",
    },
  ],
  referencesVisible: true,
  courses: [
    {
      key: "course1",
      institution: "Online Academy",
      source: "Data Science Certification",
      startDate: 1609459200000,
      endDate: 1612137600000,
    },
  ],
  coursesVisible: true,
  internships: [
    {
      key: "intern1",
      position: "Software Engineering Intern",
      company: "Startup Hub",
      startDate: 1483228800000,
      endDate: 1491004800000,
      city: "Austin",
      description:
        "Assisted in the development of a web-based platform for e-commerce.",
    },
  ],
  internshipsVisible: true,
  template: {
    name: "Quds",
    color: "#ffe14c",
    lineHeight: "1.5",
    fontSize: "12",
    fontFamily: "Arial",
  },
};

export const uploadPDF = actionWithUser({
  args: {
    content: v.string(),
    id: v.id("resumes"),
  },
  handler: async (ctx, args) => {
    const { content } = args;

    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAPI}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant that converts extracted resume text into a structured JSON format.
        Use the following schema:
        - Fill in the extracted details in the predefined fields such as 'firstname', 'lastname', 'email', etc.
        - Work experiences should be an array with each job position's details.
        - Only include properties that match the schema.

        Here is a example: ${JSON.stringify(dumbData)}

        Keep in mind the level property is from 1 to 5, 5 is the best`,
          },
          { role: "user", content },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "response",
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                updatedTime: { type: "integer" },
                userId: { type: "string" },
                position: { type: "string" },
                firstname: { type: "string" },
                lastname: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                country: { type: "string" },
                city: { type: "string" },
                content: { type: "string" },
                hobbies: { type: "string" },
                workExperiences: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      key: { type: "string" },
                      position: { type: "string" },
                      company: { type: "string" },
                      startDate: { type: "integer" },
                      endDate: { type: "integer" },
                      city: { type: "string" },
                      description: { type: "string" },
                    },
                    required: [
                      "key",
                      "position",
                      "company",
                      "startDate",
                      "endDate",
                      "city",
                      "description",
                    ],
                  },
                },
                educations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      key: { type: "string" },
                      school: { type: "string" },
                      degree: { type: "string" },
                      startDate: { type: "integer" },
                      endDate: { type: "integer" },
                      city: { type: "string" },
                      description: { type: "string" },
                    },
                    required: [
                      "key",
                      "school",
                      "degree",
                      "startDate",
                      "endDate",
                      "city",
                      "description",
                    ],
                  },
                },
                socialProfiles: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      key: { type: "string" },
                      label: { type: "string" },
                      url: { type: "string" },
                    },
                    required: ["key", "label", "url"],
                  },
                },
                socialProfilesVisible: { type: "boolean" },
                languages: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      key: { type: "string" },
                      language: { type: "string" },
                      level: { type: "string" },
                    },
                    required: ["key", "language", "level"],
                  },
                },
                languagesVisible: { type: "boolean" },
                skills: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      key: { type: "string" },
                      title: { type: "string" },
                      level: { type: "string" },
                    },
                    required: ["key", "title", "level"],
                  },
                },
                skillsVisible: { type: "boolean" },
                references: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      key: { type: "string" },
                      fullname: { type: "string" },
                      company: { type: "string" },
                      phone: { type: "string" },
                      email: { type: "string" },
                    },
                    required: ["key", "fullname", "company", "phone", "email"],
                  },
                },
                referencesVisible: { type: "boolean" },
                courses: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      key: { type: "string" },
                      institution: { type: "string" },
                      source: { type: "string" },
                      startDate: { type: "integer" },
                      endDate: { type: "integer" },
                    },
                    required: [
                      "key",
                      "institution",
                      "source",
                      "startDate",
                      "endDate",
                    ],
                  },
                },
                coursesVisible: { type: "boolean" },
                internships: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      key: { type: "string" },
                      position: { type: "string" },
                      company: { type: "string" },
                      startDate: { type: "integer" },
                      endDate: { type: "integer" },
                      city: { type: "string" },
                      description: { type: "string" },
                    },
                    required: [
                      "key",
                      "position",
                      "company",
                      "startDate",
                      "endDate",
                      "city",
                      "description",
                    ],
                  },
                },
                internshipsVisible: { type: "boolean" },
                template: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    color: { type: "string" },
                    lineHeight: { type: "string" },
                    fontSize: { type: "string" },
                    fontFamily: { type: "string" },
                  },
                  required: [
                    "name",
                    "color",
                    "lineHeight",
                    "fontSize",
                    "fontFamily",
                  ],
                },
              },
              required: [
                "title",
                "updatedTime",
                "userId",
                "position",
                "firstname",
                "lastname",
                "email",
                "phone",
                "country",
                "city",
                "content",
                "hobbies",
                "photo",
                "photoUrl",
                "workExperiences",
                "educations",
                "socialProfiles",
                "socialProfilesVisible",
                "languages",
                "languagesVisible",
                "skills",
                "skillsVisible",
                "references",
                "referencesVisible",
                "courses",
                "coursesVisible",
                "internships",
                "internshipsVisible",
                "template",
              ],
            },
          },
        },
      }),
    });

    const json: ChatGPTResponse = await response.json();

    if (json.error) {
      throw new ConvexError(json.error);
    }

    const pdf = JSON.parse(json.choices[0].message.content);

    await ctx.runMutation(internal.resumes.updateInternal, {
      _id: args.id,
      userId: ctx.user,
      ...pdf,
      template: {
        name: "Gaza",
        color: "#ffe14c",
        lineHeight: "1.5",
        fontSize: "12",
        fontFamily: "Arial",
      },
    });
  },
});

interface ChatGPTResponse {
  error?: string;
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
  system_fingerprint: string;
}
interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  completion_tokens_details: Completiontokensdetails;
}

interface Completiontokensdetails {
  reasoning_tokens: number;
}

interface Choice {
  index: number;
  message: Message;
  finish_reason: string;
}

interface Message {
  role: string;
  content: string;
}
