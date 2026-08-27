import request from "supertest"
import app from "../src/app.js"
import { AppDataSource } from "../src/database/data-source.js"

beforeAll(() => {
    AppDataSource.initialize()
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

    it("test 1", async function () {
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
})
