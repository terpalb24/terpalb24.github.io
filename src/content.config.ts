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
            website: z.string().optional(),
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
        code: z.string(),
        name: z.string(),
        specialization: z.string(),
        isGuardianLecturer: z.boolean().optional(),
        photo: image(),
    })
});

const subject = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/subjects"}),
    schema: z.object({
        code: z.string(),
        title: z.string(),
        theory: reference("lecturer"),
        practice: reference("lecturer").optional(),
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
        link: z.string().optional(),
        team: z.array(reference("member")),
    })
});

const schedule = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/schedules"}),
    schema: ({image}) => z.object({
        title: z.string(),
        items: z.array(z.object({
            startAt: z.string(),
            endAt: z.string(),
            subjectCode: reference("subject"),
            type: z.enum(['theory', 'practice']),
            room: z.string(),
        }))
    })
})

export const collections = {member, album, lecturer, subject, project, schedule};