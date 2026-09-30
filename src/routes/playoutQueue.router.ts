import { Router } from "express"
import {
	deletePlayoutQueueById,
	getPlayoutQueueById,
	getPlayoutQueues,
	patchPlayoutQueueById,
	postPlayoutQueue,
	putPlayoutQueueById,
} from "../controllers/playoutQueue.controller.js"

const playoutQueueRouter = Router()

playoutQueueRouter.get("/", getPlayoutQueues)
playoutQueueRouter.get("/:id", getPlayoutQueueById)
playoutQueueRouter.post("/", postPlayoutQueue)
playoutQueueRouter.delete("/:id", deletePlayoutQueueById)
playoutQueueRouter.put("/:id", putPlayoutQueueById)
playoutQueueRouter.patch("/:id", patchPlayoutQueueById)

export default playoutQueueRouter
