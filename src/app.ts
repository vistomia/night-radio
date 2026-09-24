import express from "express"
import userRouter from "./routes/users.router.js"
import playoutQueueRouter from "./routes/playoutQueue.router.js"
import playlistRouter from "./routes/playlist.router.js"
import audioRouter from "./routes/audio.router.js"

const app = express()

const route = express.Router()

app.use(express.json())

route.get("/", (req, res) => {
    res.json({ message: "opa mundo" })
})

app.use(route)
app.use("/users", userRouter)
app.use("/playlists", playlistRouter)
app.use("/playoutQueue", playoutQueueRouter)
app.use("/audios", audioRouter)

export default app
