import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { MenuToMenuItem } from "./menuToMenuItem.js"
import { Tag } from "./tag.js"

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    menu_date!: string

    @OneToMany("MenuToMenuItem", (menuToMenuItem: MenuToMenuItem) => menuToMenuItem.menu, {
        cascade: true,
    })
    menuToMenuItems!: MenuToMenuItem[]
}
