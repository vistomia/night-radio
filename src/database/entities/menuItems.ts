import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class MenuItem {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    price!: number
}
