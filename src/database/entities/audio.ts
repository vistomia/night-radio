import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { OneToMany } from "typeorm"
import AudioPlaylist from "./audioPlaylist.js"
import User from "./user.js"

@Entity()
export default class Audio {
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
    from_url!: string

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

    @OneToMany("AudioPlaylist", (audioPlaylist: AudioPlaylist) => audioPlaylist.audio)
    audioPlaylists!: AudioPlaylist[]
}
