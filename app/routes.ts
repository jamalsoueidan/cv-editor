import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  route("api/locales", "./routes/api.locales.ts"),
  route("robots.txt", "./routes/robots.ts"),
  route("sitemap.xml", "./routes/sitemap.ts"),
  route("canvas", "./routes/canvas.tsx"),
  route("privacy", "./routes/privacy.tsx"),
  route("prices", "./routes/prices.tsx"),
  route("dashboard/:id", "./routes/dashboard.$id.tsx", [
    index("./routes/dashboard.$id.index.tsx"),
    route("personal", "./routes/dashboard.$id.personal.tsx", [
      route("upload", "./routes/dashboard.$id.personal.upload.tsx"),
    ]),
    route("summary", "./routes/dashboard.$id.summary.tsx"),
    route("experiences", "./routes/dashboard.$id.experiences.tsx"),
    route("educations", "./routes/dashboard.$id.educations.tsx"),
    route("skills", "./routes/dashboard.$id.skills.tsx"),
    route("languages", "./routes/dashboard.$id.languages.tsx"),
    route("links", "./routes/dashboard.$id.links.tsx"),
    route("finalize", "./routes/dashboard.$id.finalize.tsx"),
    route("templates", "./routes/dashboard.$id.templates.tsx"),
  ]),
  route("resume/:id/templates", "./routes/resumes_.$id.templates.tsx"),
  route("resume/:id", "./routes/resumes.$id.tsx", [
    route("upload", "./routes/resumes.$id.upload.tsx"),
    route("view", "./routes/resumes.$id.view.tsx"),
  ]),
  route("view/:id", "./routes/view.$id.tsx"),
] satisfies RouteConfig;
