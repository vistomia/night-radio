import request from "supertest"
import app from "../src/app.js"
import { AppDataSource } from "../src/database/data-source.js"
import User from "../src/database/entities/user.js"

async function getUser() {
    const repo = AppDataSource.getRepository(User)
    const menuItem = new User()
    menuItem.login = "victorfarias"
    menuItem.password = "123456"
    menuItem.email = "victorfarias@gmail.com"

    return await repo.save(menuItem)
}

beforeAll(() => {
    AppDataSource.initialize()
})

afterEach(async () => {
    const entities = AppDataSource.entityMetadatas

    for (const entity of entities) {
        const repository = AppDataSource.getRepository(entity.name)
        await repository.clear()
    }

    await AppDataSource.query(`DELETE FROM sqlite_sequence;`) // para limpar os IDs do banco sqlite
})

describe("GET /users", function () {
    it("empty", async function () {
        const response = await request(app).get("/users")

        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.status).toEqual(200)
        expect(response.body).toEqual({
            users: [],
        })
    })

    it("one user", async function () {
        getUser()
        const response = await request(app).get("/users")

        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.status).toEqual(200)
        expect(response.body).toEqual({
            users: [
                {
                    id: 1,
                    login: "victorfarias",
                    email: "victorfarias@gmail.com",
                    password: "123456",
                },
            ],
        })
    })
})
