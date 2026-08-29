import { Router } from "express"
import {
    deleteMenuItemById,
    getMenuItemById,
    getMenuItems,
    postMenuItem,
} from "../controllers/menuItem.controller.js"

const menuItemRouter = Router()

menuItemRouter.get("/", getMenuItems)
menuItemRouter.get("/:id", getMenuItemById)
menuItemRouter.post("/", postMenuItem)
menuItemRouter.delete("/:id", deleteMenuItemById)

export default menuItemRouter
