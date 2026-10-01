import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import AudioPlaylist from "./audioPlaylist.js"

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

    @OneToMany("AudioPlaylist", (audioPlaylist: AudioPlaylist) => audioPlaylist.playlist, { cascade: true })
    audioPlaylists!: AudioPlaylist[]
}
