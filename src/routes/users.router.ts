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

const userRouter = Router()

userRouter.get("/", getUsers)
userRouter.get("/:id", getUserById)
userRouter.post("/", validateBody(userCreate), postUser)
userRouter.delete("/:id", deleteUserById)
userRouter.put("/:id", validateBody(userCreate), putUserById)
userRouter.patch("/:id", validateBody(userCreatePartial), patchUserById)
userRouter.get("/:id/audios", getUserAudios)

export default userRouter
