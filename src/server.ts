import app from "./app.js"
import { AppDataSource } from "./database/data-source.js"

const PORT = 3000

try {
    AppDataSource.initialize()
} catch (e) {
    console.log(e)
}

app.listen(PORT, () => {
    console.log("ligou!")
})
