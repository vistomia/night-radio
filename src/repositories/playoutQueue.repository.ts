import { AppDataSource } from "../database/data-source.js"
import PlayoutQueue from "../database/entities/playoutQueue.js"

export default AppDataSource.getRepository(PlayoutQueue)
