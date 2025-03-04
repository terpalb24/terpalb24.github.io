import {defineCollection, z} from "astro:content";
import {glob} from "astro/loaders";

const member = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/members"}),
    schema: ({image}) => z.object({
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
})

export const collections = {member, album};