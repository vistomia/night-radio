import { Router } from "express"
import {
	deletePlaylistById,
	getPlaylistById,
	getPlaylists,
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

export default playlistRouter
