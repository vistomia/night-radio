import { z } from "zod"
import { audioPublic } from "./audio.schema.js"

export const audioPositionPublic = audioPublic.extend({
	position: z.number()
})

export const playlistCreate = z.object({
	title: z.string(),
	description: z.string(),
	photo: z.string().nullable()
})

export const playlistUpdate = z.object({
	status: z.string(),
	other_details: z.string()
})

export const playlistPublic = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	photo: z.string().nullable(),
	audioPlaylist: z.array(audioPositionPublic)
})
