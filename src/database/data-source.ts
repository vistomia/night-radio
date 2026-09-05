import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/user.js"
import { MenuItem } from "./entities/menuItems.js"
import { MenuToMenuItem } from "./entities/menuToMenuItem.js"
import { Menu } from "./entities/menu.js"
import { Tag } from "./entities/tag.js"

const isTest = process.env.NODE_ENV === "test"

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: isTest ? ":memory:" : "database.sqlite",
    dropSchema: isTest,
    synchronize: true,
    logging: false,
    entities: [User, MenuToMenuItem, MenuItem, Menu, Tag],
    migrations: [],
    subscribers: [],
})
