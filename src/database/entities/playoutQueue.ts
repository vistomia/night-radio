import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}
