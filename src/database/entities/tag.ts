import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm"

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string
}
