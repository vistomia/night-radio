import { AppDataSource } from "../database/data-source.js";
import PlayoutQueue from "../database/entities/playoutqueue.js";

export default AppDataSource.getRepository(PlayoutQueue);
