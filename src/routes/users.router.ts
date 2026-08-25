import { Router } from "express"
import { addUser, getUsers } from "../controllers/users.controller.js"

const userRouter = Router()

userRouter.get("/", getUsers)
userRouter.get("/add", addUser)

export default userRouter
