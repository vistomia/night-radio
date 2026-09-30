import { z } from "zod";
import { audioPublic } from "./audio.schema.js";

export const playoutQueueSchema = z.object({
    audio_id: z.number(),
    position: z.string(),
    duration_seconds: z.number()
});


export const playoutQueuePublic = z.object({
    id: z.number(),
    audio: audioPublic,
    position: z.string(), 
    status: z.string(),
    duration_seconds: z.number()
});

export const playoutQueueCreate = playoutQueuePublic.omit({ 
    id: true 
});

export const playoutQueueUpdate = playoutQueueCreate.partial();