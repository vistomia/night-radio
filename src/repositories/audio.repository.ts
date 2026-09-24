import { AppDataSource } from "../database/data-source.js"
import Audio from "../database/entities/audio.js"

export default AppDataSource.getRepository(Audio)
