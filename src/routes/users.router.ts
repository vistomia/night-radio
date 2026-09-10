import { Router } from "express"
import {
    deleteUserById,
    getUserById,
    getUsers,
    patchUserById,
    postUser,
    putUserById,
} from "../controllers/user.controller.js"

const menuItemRouter = Router()

menuItemRouter.get("/", getUsers)
menuItemRouter.get("/:id", getUserById)
menuItemRouter.post("/", postUser)
menuItemRouter.delete("/:id", deleteUserById)
menuItemRouter.put("/:id", putUserById)
menuItemRouter.patch("/:id", patchUserById)

export default menuItemRouter
