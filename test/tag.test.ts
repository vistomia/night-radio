import request from "supertest"
import app from "../src/app.js"
import { AppDataSource } from "../src/database/data-source.js"
import { Tag } from "../src/database/entities/tag.js"

async function getTag() {
    const repo = AppDataSource.getRepository(Tag)
    const tag = new Tag()
    tag.name = "test"

    return await repo.save(tag)
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

describe("GET /tags", function () {
    it("test 0", async function () {
        const response = await request(app).get("/tags")

        expect(response.status).toEqual(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({ tags: [] })
    })
})

describe("POST /tags", function () {
    it("test 0", async function () {
        const response = await request(app).post("/tags").send({
            name: "test"
        })

        expect(response.status).toEqual(201)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            id: 1,
            name: "test"
        })
    })

    it("test getById", async function () {
        await getTag()

        const response = await request(app).get("/tags/1")

        expect(response.status).toEqual(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            id: 1,
            name: "test"
        })
    })

    it("test 1", async function () {
        await getTag()

        const response = await request(app).get("/tags")

        expect(response.status).toEqual(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            tags: [
                {
                    id: 1,
                    name: "test"
                },
            ],
        })
    })

    it("test 2", async function () {
        await getTag()
        await request(app).delete("/tags/1")
        const response = await request(app).get("/tags")

        expect(response.status).toEqual(200)
        expect(response.header["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            tags: [],
        })
    })
})

describe("PATCH /tags/:id", function () {
    it("test 0", async function () {
        await getTag()
        const response = await request(app).patch("/tags/1").send({ price: 5 })
        const responseGet = await request(app).get("/tags/1")

        expect(response.status).toEqual(200)
        expect(response.header["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            id: 1,
            name: "test"
        })

        expect(responseGet.status).toEqual(200)
        expect(responseGet.header["content-type"]).toMatch(/json/)
        expect(responseGet.body).toEqual({
            id: 1,
            name: "test"
        })
    })
})
