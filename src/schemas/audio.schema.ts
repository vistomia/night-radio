import { z } from "zod"

export const audioCreate = z.object({
	from_url: z.string(),
	message: z.string()
})

export const audioUpdate = z.object({
	status: z.string(),
	other_details: z.string()
})

export const audioPublic = z.object({
	id: z.number(),
	title: z.string(),
	path: z.string(),
	duration_seconds: z.number(),
	type: z.string(),
	from_url: z.string(),
	creator: z.string(),
	other_details: z.string(),
	message: z.string(),
	status: z.string(),
	user_validator: z.number().nullable(),
	user_requester: z.number()
})
