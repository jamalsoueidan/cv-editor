export async function loader() {
  const content = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
      <loc>https://www.gratiscvonline.dk/</loc>
      <lastmod>2025-01-05T16:43:34.833Z</lastmod>
      </url>
      </urlset>
      `;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
}
