import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "./entities/user.js"

const isTest = process.env.NODE_ENV === "test"

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: isTest ? ":memory:" : "database.sqlite",
    dropSchema: isTest,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
