import { z } from "zod"


export const userSchema = z.object({
	login: z.string(),
	password: z.string()
})

export const userCreate = z.object({
	login: z.string(),
	password: z.string(),
	email: z.string()
})

export const userPublic = z.object({
	id: z.number(),
	login: z.string(),
	email: z.string()
})
