import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    login!: string

    @Column()
    password!: string

    @Column()
    email!: string

    @Column()
    type!: string
}
