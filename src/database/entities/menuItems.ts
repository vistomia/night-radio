import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { MenuToMenuItem } from "./menuToMenuItem.js"

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

    @OneToMany(() => MenuToMenuItem, (menuToMenuItem) => menuToMenuItem.menuItem)
    menuToMenuItems!: MenuToMenuItem[]
}
