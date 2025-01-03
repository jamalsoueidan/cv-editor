import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  route("api/locales", "./routes/api.locales.ts"),
  route("canvas", "./routes/canvas.tsx"),
  route("privacy", "./routes/privacy.tsx"),
  route("prices", "./routes/prices.tsx"),
  route("resume/:id/templates", "./routes/resumes_.$id.templates.tsx"),
  route("resume/:id", "./routes/resumes.$id.tsx", [
    route("upload", "./routes/resumes.$id.upload.tsx"),
    route("view", "./routes/resumes.$id.view.tsx"),
  ]),
  route("view/:id", "./routes/view.$id.tsx"),
] satisfies RouteConfig;
