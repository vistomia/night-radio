import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm"
import Audio from "./audio.js"

@Entity()
export default class PlayoutQueue {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    position!: string

    @Column()
    status!: string

    @Column()
    duration_seconds!: number

    @OneToOne(() => Audio)
    audio!: Audio
}
