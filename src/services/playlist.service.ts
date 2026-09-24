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
		})

		return playlist
	}

	async deleteById(id: number) {
		return this.repository.delete({ id: id })
	}

	async post(playlist: Playlist) {
		return this.repository.save(playlist)
	}

	async patch(playlist: Playlist, newPlaylist: Playlist) {
		this.repository.merge(playlist, newPlaylist)

		const playlist_db = await this.repository.save(playlist)
		return playlist_db
	}
}
