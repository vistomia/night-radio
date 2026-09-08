import { Router } from "express"
import {
    deleteMenuById,
    getMenuById,
    getMenuItemFromMenu,
    getMenus,
    patchMenuById,
    postMenu,
    postMenuItemToMenu,
    putMenuById,
} from "../controllers/menu.controller.js"

const menuRouter = Router()

menuRouter.get("/", getMenus)
menuRouter.get("/:id", getMenuById)
menuRouter.post("/", postMenu)
menuRouter.delete("/:id", deleteMenuById)
menuRouter.put("/:id", putMenuById)
menuRouter.patch("/:id", patchMenuById)

menuRouter.post("/:id/items", postMenuItemToMenu)
menuRouter.get("/:menuId/items/:itemId", getMenuItemFromMenu)

export default menuRouter
