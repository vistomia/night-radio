import Playlist from "../database/entities/playlist.js"
import PlaylistService from "../services/playlist.service.js"

const playlistService = new PlaylistService()

export async function getPlaylists(req: any, res: any) {
    const playlists = await playlistService.getAll(req.query.limit, req.query.skip)

    return res.json({ playlists: playlists })
}

export async function getPlaylistById(req: any, res: any) {
    try {
        const playlist = await playlistService.getById(req.params.id)

        if (playlist === null) return res.status(404).json({ message: "Playlist not found" })

        return res.json(playlist)
    } catch (e) {
        console.log(e)
        return res.status(500).json("Internal Server Error")
    }
}

export async function postPlaylist(req: any, res: any) {
    try {
        const playlist = new Playlist()

        playlist.title = req.body.title
        playlist.description = req.body.description
        playlist.photo = req.body.photo

        const playlistDB = await playlistService.post(playlist)

        return res.status(201).json(playlistDB)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function putPlaylistById(req: any, res: any) {
    try {
        const playlist = await playlistService.getById(req.params.id)

        if (playlist === null) return res.status(404).send({ message: "Playlist not found" })

        const newPlaylist = new Playlist()

        newPlaylist.title = req.body.title
        newPlaylist.description = req.body.description
        newPlaylist.photo = req.body.photo

        const updatedPlaylist = await playlistService.patch(playlist, newPlaylist)

        return res.json(updatedPlaylist)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function patchPlaylistById(req: any, res: any) {
    try {
        const playlist = await playlistService.getById(req.params.id)

        if (playlist === null) return res.status(404).send({ message: "Playlist not found" })

        const updatedPlaylist = await playlistService.patch(playlist, req.body)

        return res.json(updatedPlaylist)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function deletePlaylistById(req: any, res: any) {
    try {
        const result = await playlistService.deleteById(req.params.id)

        if (result.affected === 0) return res.status(404).json({ message: "Playlist not found" })

        return res.json({ message: "Playlist deleted" })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function linkAudioToPlaylist(req: any, res: any) {
    try {
        const playlistId = parseInt(req.params.id)
        const audioId = req.body.audioId

        if (isNaN(playlistId) || !audioId) {
            return res.status(400).json({ message: "Invalid playlist ID or audio ID" })
        }

        const updatedPlaylist = await playlistService.linkAudioToPlaylist(playlistId, audioId)

        return res.json(updatedPlaylist)
    } catch (e: any) {
        console.error(e)
        if (e.message === "Playlist not found") {
            return res.status(404).json({ message: e.message })
        }
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
