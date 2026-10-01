import { AppDataSource } from "../src/database/data-source.js"
import Audio from "../src/database/entities/audio.js"
import User from "../src/database/entities/user.js"

export async function getUser() {
	const repo = AppDataSource.getRepository(User)
	const menuItem = new User()
	menuItem.login = "victorfarias"
	menuItem.password = "123456"
	menuItem.email = "victorfarias@gmail.com"
	menuItem.type = "common"

	return await repo.save(menuItem)
}

export async function getAudio() {
	const repo = AppDataSource.getRepository(Audio)
	const audio = new Audio()
	audio.title = "Sample Audio"
	audio.path = "/path/to/audio.mp3"
	audio.duration_seconds = 120
	audio.type = "mp3"
	audio.from_url = "http://example.com/audio.mp3"
	audio.creator = "Carlos"
	audio.other_details = "Sample details"
	audio.message = "Sample message"
	audio.status = "active"

	return await repo.save(audio)
}

export function initializeDatabase() {
    AppDataSource.initialize()
}

export async function resetDatabase() {
    const entities = AppDataSource.entityMetadatas
	AppDataSource.query(`PRAGMA foreign_keys = OFF`) // para conseguir limpar as tabelas com FK

    for (const entity of entities) {
        const repository = AppDataSource.getRepository(entity.name)
        await repository.clear()
    }

	AppDataSource.query(`PRAGMA foreign_keys = ON`) // reativando a regra para os próximos testes

    await AppDataSource.query(`DELETE FROM sqlite_sequence;`) // para limpar os IDs do banco sqlite
}