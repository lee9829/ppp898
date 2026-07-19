import type { MetadataRoute } from "next";
import { blogPosts, categories, legalPages } from "./site-data";
import { siteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-07-19T00:00:00+09:00");
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));
  const venuePages: MetadataRoute.Sitemap = categories.flatMap((category) =>
    category.venues.map((venue) => ({
      url: `${siteUrl}/${category.slug}/${venue.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/블로그/${post.slug}`,
    lastModified: new Date(`${post.isoDate}T00:00:00+09:00`),
    changeFrequency: "monthly",
    priority: 0.75,
  }));
  const legalPageEntries: MetadataRoute.Sitemap = Object.keys(legalPages).map((page) => ({
    url: `${siteUrl}/${page}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...categoryPages,
    ...venuePages,
    { url: `${siteUrl}/블로그`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    ...blogPages,
    ...legalPageEntries,
  ];
}
