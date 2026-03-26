import type { MetadataRoute } from "next";

const BASE_URL = "https://iiohr.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/doctors",
    "/consultants",
    "/admissions",
    "/apply",
    "/certification-framework",
    "/training-pathways",
    "/practical-fue",
    "/hair-loss-science",
    "/for-clinics",
    "/privacy-policy",
    "/terms-of-use",
    "/cookie-policy",
  ];

  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : path.startsWith("/privacy") || path.startsWith("/terms") || path.startsWith("/cookie") ? "yearly" as const : "monthly" as const,
    priority: path === "" ? 1 : path === "/apply" ? 0.9 : 0.8,
  }));
}
