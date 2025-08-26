import { join } from "node:path";
import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import type { StaticImageData } from "next/image";
import { z } from "zod";

const imageTransform = (folder: string, directory: string, value: string) => {
  const imagePath = join(folder, directory, value);
  const image = createDefaultImport<StaticImageData>(`@/contents/${imagePath}`);

  return image;
};

const members = defineCollection({
  name: "members",
  directory: "src/contents/members",
  include: "**/*.md",
  parser: "frontmatter-only",
  schema: z.object({
    nim: z.number(),
    name: z.string(),
    quote: z.string(),
    photo: z.string().optional(),
    isLeader: z.boolean().optional(),
    socials: z.object({
      instagram: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
      facebook: z.string().optional(),
      website: z.string().optional(),
    }),
  }),
  transform: (data) => {
    return {
      ...data,
      photo: data.photo
        ? imageTransform("members", data._meta.directory, data.photo)
        : undefined,
    };
  },
});

const albums = defineCollection({
  name: "albums",
  directory: "src/contents/albums",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    location: z.string(),
    cover: z.string(),
    contents: z.array(z.string()),
  }),
  transform: async (data, context) => {
    const html = await compileMarkdown(context, data);
    return {
      ...data,
      cover: imageTransform("albums", data._meta.directory, data.cover),
      contents: data.contents.map((item) =>
        imageTransform("albums", data._meta.directory, item),
      ),
      date: new Date(data.date),
      html,
    };
  },
});

const lecturers = defineCollection({
  name: "lecturers",
  directory: "src/contents/lecturers",
  parser: "frontmatter-only",
  include: "**/*.md",
  schema: z.object({
    nik: z.number(),
    code: z.string(),
    name: z.string(),
    specialization: z.string(),
    isGuardianLecturer: z.boolean().optional(),
    photo: z.string().optional(),
  }),
  transform: (data) => ({
    ...data,
    photo: data.photo
      ? imageTransform("lecturers", data._meta.directory, data.photo)
      : undefined,
  }),
});

const subjects = defineCollection({
  name: "subjects",
  directory: "src/contents/subjects",
  parser: "frontmatter-only",
  include: "**/*.md",
  schema: z.object({
    code: z.string(),
    title: z.string(),
    theory: z.string().optional(),
    practice: z.string().optional(),
  }),
});

const projects = defineCollection({
  name: "projects",
  directory: "src/contents/projects",
  parser: "frontmatter-only",
  include: "**/*.md",
  schema: z.object({
    code: z.string(),
    name: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
    manpro: z.string(),
    cover: z.string(),
    link: z.string().optional(),
    teams: z.array(z.string()),
  }),
  transform: (data) => {
    return {
      ...data,
      cover: imageTransform("projects", data._meta.directory, data.cover),
    };
  },
});

const schedules = defineCollection({
  name: "schedules",
  directory: "src/contents/schedules",
  parser: "frontmatter-only",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    items: z.array(
      z.object({
        startAt: z.string(),
        endAt: z.string(),
        subjectCode: z.string(),
        type: z.enum(["theory", "practice"]),
        room: z.string(),
      }),
    ),
  }),
});

export default defineConfig({
  collections: [members, albums, lecturers, subjects, projects, schedules],
});
