import { AppDataSource } from "../database/data-source.js";
import User from "../database/entities/user.js";

export default AppDataSource.getRepository(User);
