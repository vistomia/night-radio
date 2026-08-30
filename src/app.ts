import express from "express"
import userRouter from "./routes/users.router.js"
import menuItemRouter from "./routes/menuItems.router.js"
import menuRouter from "./routes/menu.router.js"

const app = express()

const route = express.Router()

app.use(express.json())

route.get("/", (req, res) => {
    res.json({ message: "opa mundo" })
})

app.use(route)
app.use("/users", userRouter)
app.use("/menuItems", menuItemRouter)
app.use("/menus", menuRouter)

export default app
