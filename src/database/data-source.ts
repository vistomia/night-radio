import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "./entities/user.js"
import PlayoutQueue from "./entities/playoutQueue.js"
import Playlist from "./entities/playlist.js"
import Audio from "./entities/audio.js"
import AudioPlaylist from "./entities/audioPlaylist.js"

const isTest = process.env.NODE_ENV === "test"

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: isTest ? ":memory:" : "database.sqlite",
    dropSchema: isTest,
    synchronize: true,
    logging: false,
    entities: [User, AudioPlaylist, PlayoutQueue, Playlist, Audio],
    migrations: [],
    subscribers: [],
})
