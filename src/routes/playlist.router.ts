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

const playlistRouter = Router()

playlistRouter.get("/", getPlaylists)
playlistRouter.get("/:id", getPlaylistById)
playlistRouter.post("/", postPlaylist)
playlistRouter.delete("/:id", deletePlaylistById)
playlistRouter.put("/:id", putPlaylistById)
playlistRouter.patch("/:id", patchPlaylistById)

playlistRouter.post("/:id/audio", linkAudioToPlaylist)

export default playlistRouter
