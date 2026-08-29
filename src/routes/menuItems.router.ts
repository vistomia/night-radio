import { Router } from "express"
import {
    deleteMenuItemById,
    getMenuItems,
    postMenuItem,
} from "../controllers/menuItem.controller.js"

const menuItemRouter = Router()

menuItemRouter.get("/", getMenuItems)
menuItemRouter.post("/", postMenuItem)
menuItemRouter.delete("/:id", deleteMenuItemById)

export default menuItemRouter
