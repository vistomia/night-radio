import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import Playlist from "./playlist.js"
import Audio from "./audio.js"
@Entity()
export default class AudioPlaylist {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    position!: number

    @ManyToOne("Playlist", (playlist: Playlist) => playlist.audioPlaylists)
    playlist!: Playlist

    @ManyToOne("Audio", (audio: Audio) => audio.audioPlaylists)
    audio!: AudioPlaylist
}
