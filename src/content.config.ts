import {defineCollection, reference, z} from "astro:content";
import {glob} from "astro/loaders";

const member = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/members"}),
    schema: ({image}) => z.object({
        nim: z.number(),
        name: z.string(),
        quote: z.string(),
        photo: image(),
        isLeader: z.boolean().optional(),
        socials: z.object({
            instagram: z.string().optional(),
            github: z.string().optional(),
            linkedin: z.string().optional(),
            facebook: z.string().optional(),
        })
    })
});

const album = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/albums"}),
    schema: ({image}) => z.object({
        title: z.string(),
        date: z.date(),
        location: z.string(),
        cover: image(),
        contents: z.array(image())
    })
});

const lecturer = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/lecturers"}),
    schema: ({image}) => z.object({
        nik: z.number(),
        name: z.string(),
        specialization: z.string(),
        isGuardianLecturer: z.boolean().optional(),
        photo: image(),
        subjects: z.array(z.object({
            name: z.string(),
            code: z.string(),
            type: z.enum(['Theory', 'Practice', 'Theory & Practice']),
        })).optional()
    })
});

const project = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/projects"}),
    schema: ({image}) => z.object({
        code: z.string(),
        name: z.string(),
        title: z.string(),
        tags: z.array(z.string()),
        manpro: reference("lecturer"),
        cover: image(),
        team: z.array(reference("member")),
    })
});

export const collections = {member, album, lecturer, project};