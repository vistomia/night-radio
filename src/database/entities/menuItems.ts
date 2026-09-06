import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { MenuToMenuItem } from "./menuToMenuItem.js"
import { Tag } from "./tag.js"

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

    @OneToMany("MenuToMenuItem", (menuToMenuItem: MenuToMenuItem) => menuToMenuItem.menuItem)
    menuToMenuItems!: MenuToMenuItem[]

    @ManyToMany(() => Tag)
    @JoinTable()
    tags!: Tag[]
}
