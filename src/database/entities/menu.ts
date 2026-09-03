import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { MenuToMenuItem } from "./menuToMenuItem.js"

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    menu_date!: string

    @OneToMany("MenuToMenuItem", (menuToMenuItem: MenuToMenuItem) => menuToMenuItem.menu)
    menuToMenuItems!: MenuToMenuItem[]
}
