import { Router } from "express"
import { getMenuItems, postMenuItem } from "../controllers/menuItem.controller.js"

const menuItemRouter = Router()

menuItemRouter.get("/", getMenuItems)
menuItemRouter.post("/", postMenuItem)

export default menuItemRouter
