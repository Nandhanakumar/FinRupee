import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { calculators } from "../lib/calculators";
import { blogPosts } from "../lib/blog-data";
import { qas } from "../lib/qa-data";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/calculators", changefreq: "weekly", priority: "0.9" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/qa", changefreq: "weekly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.4" },
          ...calculators.map((c) => ({
            path: `/calculators/${c.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
          })),
          ...blogPosts.map((p) => ({
            path: `/blog/${p.slug}`,
            lastmod: p.date,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
          ...qas.map((q) => ({
            path: `/qa/${q.slug}`,
            changefreq: "monthly" as const,
            priority: "0.6",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});