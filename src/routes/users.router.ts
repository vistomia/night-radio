import { Router } from "express"
import {
    deleteUserById,
    getUserById,
    getUsers,
    patchUserById,
    postUser,
    putUserById,
    getUserAudios,
} from "../controllers/user.controller.js"

import { validateBody } from "../middleware/validate.js"
import { userCreate, userCreatePartial } from "../schemas/user.schema.js"

const menuItemRouter = Router()

menuItemRouter.get("/", getUsers)
menuItemRouter.get("/:id", getUserById)
menuItemRouter.post("/", validateBody(userCreate), postUser)
menuItemRouter.delete("/:id", deleteUserById)
menuItemRouter.put("/:id", validateBody(userCreate), putUserById)
menuItemRouter.patch("/:id", validateBody(userCreatePartial), patchUserById)
menuItemRouter.get("/:id/audios", getUserAudios)

export default menuItemRouter
