import type { Doc } from "convex/_generated/dataModel";

type Data = Doc<"resumes"> & { photoUrl: string };

export const dumbData: Data = {
  _id: "" as any,
  key: "",
  title: "",
  _creationTime: 0,
  updatedTime: 0,
  userId: "" as any,
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
  photo: "photo_id_123" as any,
  photoUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXjTsCHHsbmGchZnRSej06SejBufyYxTMkQ&s",
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
    name: "Copenhagen",
    color: "#ffe14c",
    lineHeight: "1.5",
    fontSize: "12",
    fontFamily: "Arial",
  },
};
