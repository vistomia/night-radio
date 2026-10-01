import type Audio from "../database/entities/audio.js"
import type AudioPlaylist from "../database/entities/audioPlaylist.js"
import type Playlist from "../database/entities/playlist.js"
import playlistRepository from "../repositories/playlist.repository.js"
import { Repository } from "typeorm"

export default class PlaylistService {
    repository: Repository<Playlist> = playlistRepository

    async getAll(limit: number, skip: number) {
        const playlists = await this.repository.find({
            take: limit,
            skip: skip,
        })

        return playlists
    }

    async getById(id: number) {
        const playlist = playlistRepository.findOne({
            where: { id: id },
            relations: { audioPlaylists: true },
        })

        return playlist
    }

    async deleteById(id: number) {
        return this.repository.delete({ id: id })
    }

    async post(playlist: Playlist) {
        return this.repository.save(playlist)
    }

    async linkAudioToPlaylist(playlistId: number, audioId: number) {
        const playlist = await this.repository.findOne({
            where: { id: playlistId },
            relations: { audioPlaylists: true },
        })

        if (!playlist) {
            throw new Error("Playlist not found")
        }

        const position = playlist.audioPlaylists.length + 1

        playlist.audioPlaylists.push({
            audio: { id: audioId } as Audio,
            position: position,
        } as AudioPlaylist)

        await this.repository.save(playlist)

        return playlist
    }

    async patch(playlist: Playlist, newPlaylist: Playlist) {
        this.repository.merge(playlist, newPlaylist)

        const playlist_db = await this.repository.save(playlist)
        return playlist_db
    }
}
