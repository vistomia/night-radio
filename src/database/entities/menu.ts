import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class MenuItem {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    menu_date!: string
}
