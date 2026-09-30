import { Router } from "express"
import {
    deleteAudioById,
    getAudioById,
    getAudios,
    patchAudioById,
    postAudio,
    putAudioById,
} from "../controllers/audio.controller.js"

const audioRouter = Router()

audioRouter.get("/", getAudios)
audioRouter.get("/:id", getAudioById)
audioRouter.post("/", postAudio)
audioRouter.delete("/:id", deleteAudioById)
audioRouter.put("/:id", putAudioById)
audioRouter.patch("/:id", patchAudioById)

export default audioRouter
