import request from "supertest"
import app from "../src/app.js"
import { AppDataSource } from "../src/database/data-source.js"
import { Menu } from "../src/database/entities/menu.js"
import { MenuItem } from "../src/database/entities/menuItems.js"

async function getMenu() {
    const repo = AppDataSource.getRepository(Menu)
    const menu = new Menu()
    menu.name = "test"
    menu.menu_date = "2020-05-02"

    return await repo.save(menu)
}

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

    AppDataSource.query(`PRAGMA foreign_keys = OFF`) // para conseguir limpar as tabelas com FK

    for (const entity of entities) {
        const repository = AppDataSource.getRepository(entity.name)
        await repository.clear()
    }

    AppDataSource.query(`PRAGMA foreign_keys = ON`) // reativando a regra para os próximos testes

    await AppDataSource.query(`DELETE FROM sqlite_sequence;`) // para limpar os IDs do banco sqlite
})

describe("GET /menus", function () {
    it("test 0", async function () {
        const response = await request(app).get("/menus")

        expect(response.status).toEqual(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({ menus: [] })
    })
})

describe("POST /menus", function () {
    it("test 0", async function () {
        const response = await request(app).post("/menus").send({
            name: "test",
            menu_date: "2020-05-05",
        })

        expect(response.status).toEqual(201)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            id: 1,
            name: "test",
            menu_date: "2020-05-05",
        })
    })

    it("test getById", async function () {
        await getMenu()

        const response = await request(app).get("/menus/1")

        expect(response.status).toEqual(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            id: 1,
            name: "test",
            menu_date: "2020-05-02",
        })
    })

    it("test 1", async function () {
        await getMenu()

        const response = await request(app).get("/menus")

        expect(response.status).toEqual(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            menus: [
                {
                    id: 1,
                    name: "test",
                    menu_date: "2020-05-02",
                },
            ],
        })
    })

    it("test 2", async function () {
        await getMenu()
        await request(app).delete("/menus/1")
        const response = await request(app).get("/menus")

        expect(response.status).toEqual(200)
        expect(response.header["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            menus: [],
        })
    })
})

describe("PATCH /menus/:id", function () {
    it("test 0", async function () {
        await getMenu()
        const response = await request(app).patch("/menus/1").send({ name: "testa" })
        const responseGet = await request(app).get("/menus/1")

        expect(response.status).toEqual(200)
        expect(response.header["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            id: 1,
            name: "testa",
            menu_date: "2020-05-02",
        })

        expect(responseGet.status).toEqual(200)
        expect(responseGet.header["content-type"]).toMatch(/json/)
        expect(responseGet.body).toEqual({
            id: 1,
            name: "testa",
            menu_date: "2020-05-02",
        })
    })
})

describe("POST /menus/:id/items", function () {
    it("test 0", async function () {
        await getMenu()
        await getMenuItem()
        const response = await request(app)
            .post("/menus/1/items")
            .send({
                menuItems: [{ id: 1, price: 5 }],
            })

        expect(response.status).toEqual(201)
        expect(response.header["content-type"]).toMatch(/json/)
        expect(response.body).toEqual([
            {
                id: 1,
                menu: {
                    id: 1,
                    menu_date: "2020-05-02",
                    name: "test",
                },
                menuItem: {
                    description: "test",
                    id: 1,
                    name: "test",
                    price: 2,
                    tags: []
                },
                price: 5,
            },
        ])
    })
})
