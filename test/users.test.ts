import request from "supertest"
import app from "../src/app.js"
import { getUser, initializeDatabase, resetDatabase } from "./fixtures.js"

beforeAll(initializeDatabase)

afterEach(resetDatabase)

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
        await getUser()
        const response = await request(app).get("/users")

        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.status).toEqual(200)
        expect(response.body).toEqual({
            users: [
                {
                    id: 1,
                    login: "victorfarias",
                    email: "victorfarias@gmail.com",
                    type: "common"
                },
            ],
        })
    })
})
