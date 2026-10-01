import { Router } from "express"
import {
    deletePlaylistById,
    getPlaylistById,
    getPlaylists,
    linkAudioToPlaylist,
    patchPlaylistById,
    postPlaylist,
    putPlaylistById,
} from "../controllers/playlist.controller.js"
import { validateBody } from "../middleware/validate.js"
import { playlistCreate, playlistPublic, playlistUpdate } from "../schemas/playlist.schema.js"

const playlistRouter = Router()

playlistRouter.get("/", getPlaylists)
playlistRouter.get("/:id", getPlaylistById)
playlistRouter.post("/", validateBody(playlistPublic), postPlaylist)
playlistRouter.put("/:id", validateBody(playlistCreate), putPlaylistById)
playlistRouter.patch("/:id", validateBody(playlistUpdate), patchPlaylistById)
playlistRouter.delete("/:id", deletePlaylistById)

playlistRouter.post("/:id/audio", linkAudioToPlaylist)

export default playlistRouter
