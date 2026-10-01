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
import { validateBody } from "../middleware/validate.js"
import { playoutQueueCreate, playoutQueueSchema } from "../schemas/playoutQueue.schema.js"
import { playlistUpdate } from "../schemas/playlist.schema.js"

const playoutQueueRouter = Router()

playoutQueueRouter.get("/current", getCurrentPlayout)
playoutQueueRouter.post("/recorder", postRecorder)

playoutQueueRouter.get("/", getPlayoutQueues)
playoutQueueRouter.get("/:id", getPlayoutQueueById)
playoutQueueRouter.post("/", validateBody(playoutQueueSchema), postPlayoutQueue)
playoutQueueRouter.put("/:id", validateBody(playoutQueueCreate), putPlayoutQueueById)
playoutQueueRouter.patch("/:id", validateBody(playlistUpdate), patchPlayoutQueueById)
playoutQueueRouter.delete("/:id", deletePlayoutQueueById)

export default playoutQueueRouter
