import type { MetadataRoute } from "next";

const BASE_URL = "https://www.tronexa.com";

const staticRoutes = [
  "",
  "/about",
  "/careers",
  "/contact",
  "/legal",
  "/privacy-policy",
  "/terms",
  "/services",
  "/projects",
];

const serviceRoutes = [
  "ai-solutions",
  "app-development",
  "cloud-solutions",
  "computer-vision",
  "crm-solutions",
  "development",
  "digital-marketing",
  "erp-solutions",
  "game-development",
  "generative-ai",
  "iot-solutions",
  "nlp-solutions",
  "quality-assurance",
  "servicenow",
  "staffing",
  "web-development",
].map((slug) => `/services/${slug}`);

const projectRoutes = [
  "app-development",
  "cloud-solutions",
  "crm-solutions",
  "digital-marketing",
  "fintech-platform",
  "generative-ai",
  "iot-solutions",
  "little-butterfly-london",
  "quality-assurance",
  "small-packages",
  "tiny-tags",
].map((slug) => `/projects/${slug}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [...staticRoutes, ...serviceRoutes, ...projectRoutes];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.split("/").length > 2 ? 0.7 : 0.9,
  }));
}
