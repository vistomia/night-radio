import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Menu } from "./menu.js"
import { MenuItem } from "./menuItems.js"

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

	@ManyToOne("MenuItem", (menuItem: MenuItem) => menuItem.menuToMenuItems)
	menuItem: MenuItem

	@ManyToOne("Menu", (menu: Menu) => menu.menuToMenuItems)
	menu: Menu
}
