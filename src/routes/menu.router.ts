import { Router } from "express"
import {
    deleteMenuById,
    getMenuById,
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

export default menuRouter
