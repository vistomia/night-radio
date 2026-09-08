import { Router } from "express"
import {
    deleteTagById,
    getTagById,
    getTags,
    patchTagById,
    postTag,
    putTagById,
} from "../controllers/tag.controller.js"

const tagRouter = Router()

tagRouter.get("/", getTags)
tagRouter.get("/:id", getTagById)
tagRouter.post("/", postTag)
tagRouter.delete("/:id", deleteTagById)
tagRouter.put("/:id", putTagById)
tagRouter.patch("/:id", patchTagById)

export default tagRouter
