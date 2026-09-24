import { AppDataSource } from "../database/data-source.js"
import AudioPlaylist from "../database/entities/audioPlaylist.js"

export default AppDataSource.getRepository(AudioPlaylist)
