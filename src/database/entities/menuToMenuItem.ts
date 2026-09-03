import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { MenuItem } from "./menuItems.js"
import { Menu } from "./menu.js"

@Entity()
export class MenuToMenuItem {
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	name!: string

	@Column()
	description!: string

	@Column()
	price!: number

	@ManyToOne(() => MenuItem, (menuItem) => menuItem.menuToMenuItems)
	menuItem: MenuItem

	@ManyToOne(() => Menu, (menu) => menu.menuToMenuItems)
	menu: Menu
}
