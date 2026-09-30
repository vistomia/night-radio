import { Router } from "express"
import {
    deletePlayoutQueueById,
    getPlayoutQueueById,
    getPlayoutQueues,
    patchPlayoutQueueById,
    postPlayoutQueue,
    putPlayoutQueueById,
    getCurrentPlayout,
    postRecorder,
} from "../controllers/playoutQueue.controller.js"

const playoutQueueRouter = Router()

playoutQueueRouter.get("/current", getCurrentPlayout)
playoutQueueRouter.post("/recorder", postRecorder)

playoutQueueRouter.get("/", getPlayoutQueues)
playoutQueueRouter.get("/:id", getPlayoutQueueById)
playoutQueueRouter.post("/", postPlayoutQueue)
playoutQueueRouter.delete("/:id", deletePlayoutQueueById)
playoutQueueRouter.put("/:id", putPlayoutQueueById)
playoutQueueRouter.patch("/:id", patchPlayoutQueueById)

export default playoutQueueRouter
