import { AppDataSource } from "../database/data-source.js";
import Playlist from "../database/entities/playlist.js";

export default AppDataSource.getRepository(Playlist);
