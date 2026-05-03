import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const sponsors = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/sponsors" }),
  schema: z.object({
    url: z.string(),
    logo: z.string(),
    recolor: z.boolean().default(true),
    order: z.number().default(0),
  }),
});

export const collections = { sponsors };
