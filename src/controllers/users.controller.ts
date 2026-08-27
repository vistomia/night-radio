import { AppDataSource } from "../database/data-source.js"
import { User } from "../database/entities/user.js"

export async function getUsers(req: any, res: any) {
    try {
        const userRepo = AppDataSource.getRepository(User)
        const user = new User()
        user.firstName = "ado"
        user.lastName = "lado"
        user.age = 11

        await userRepo.save(user)
    } catch (e) {
        console.log(e)
    }

    res.send({ message: 0 })
}

export async function addUser(req: any, res: any) {
    res.send({ message: "adicionado" })
}
