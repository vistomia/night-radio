import request from "supertest"
import app from "../src/app.js"
import { AppDataSource } from "../src/database/data-source.js"
import { MenuItem } from "../src/database/entities/menuItems.js"

async function getMenuItem() {
    const repo = AppDataSource.getRepository(MenuItem)
    const menuItem = new MenuItem()
    menuItem.name = "test"
    menuItem.description = "test"
    menuItem.price = 2

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

describe("GET /", function () {
    it("opa mundo", async function () {
        const response = await request(app).get("/")

        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual("opa mundo")
    })
})

describe("GET /users", function () {
    it("test 0", async function () {
        const response = await request(app).get("/users")

        expect(response.status).toEqual(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body.message).toEqual(0)
    })
})

describe("GET /menuItems", function () {
    it("test 0", async function () {
        const response = await request(app).get("/menuItems")

        expect(response.status).toEqual(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({ menuItems: [] })
    })
})

describe("POST /menuItems", function () {
    it("test 0", async function () {
        const response = await request(app).post("/menuItems").send({
            name: "test",
            description: "test",
            price: 2,
        })

        expect(response.status).toEqual(201)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            id: 1,
            name: "test",
            description: "test",
            price: 2,
        })
    })

    it("test getById", async function () {
        await getMenuItem()

        const response = await request(app).get("/menuItems/1")

        expect(response.status).toEqual(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            id: 1,
            name: "test",
            description: "test",
            price: 2,
        })
    })

    it("test 1", async function () {
        await getMenuItem()

        const response = await request(app).get("/menuItems")

        expect(response.status).toEqual(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            menuItems: [
                {
                    id: 1,
                    name: "test",
                    description: "test",
                    price: 2,
                },
            ],
        })
    })

    it("test 2", async function () {
        await getMenuItem()
        await request(app).delete("/menuItems/1")
        const response = await request(app).get("/menuItems")

        expect(response.status).toEqual(200)
        expect(response.header["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            menuItems: [],
        })
    })
})
