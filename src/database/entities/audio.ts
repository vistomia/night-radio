import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { OneToMany } from "typeorm"
import AudioPlaylist from "./audio_playlist.js"

@Entity()
export default class User {
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	title!: string

	@Column()
	path!: string

	@Column()
	duration_seconds!: number

	@Column()
	type!: string

	@Column()
	from!: string

	@Column()
	creator!: string

	@Column()
	other_details!: string

	@Column()
	message!: string

	@Column()
	status!: string

	@OneToOne(() => User)
    user_validator!: User

	@OneToOne(() => User)
	user_requester!: User

	@OneToMany(() => AudioPlaylist, (audioPlaylist) => audioPlaylist.audio)
	audioPlaylists!: AudioPlaylist[]
}
