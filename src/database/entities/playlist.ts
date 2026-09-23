import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import AudioPlaylist from "./audio_playlist.js"

@Entity()
export default class Playlist {
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	title!: string

	@Column()
	description!: string

	@Column()
	photo!: string

	@OneToMany(() => AudioPlaylist, (audioPlaylist) => audioPlaylist.playlist)
	audioPlaylists!: AudioPlaylist[]
}
