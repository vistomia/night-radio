import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import Audio from "./audio.js"

@Entity()
export default class PlayoutQueue {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    position!: number

    @Column()
    status!: string

    @Column()
    duration_seconds!: number

    @OneToOne(() => Audio)
    @JoinColumn()
    audio!: Audio
}
