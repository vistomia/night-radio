import User from "../database/entities/user.js"
import UserService from "../services/user.service.js"
import { AppDataSource } from "../database/data-source.js"
import Audio from "../database/entities/audio.js"

const userService = new UserService()

export async function getUsers(req: any, res: any) {
    const users = await userService.getAll(req.query.limit, req.query.skip)

    return res.json({ users: users })
}

export async function getUserById(req: any, res: any) {
    try {
        const user = await userService.getById(req.params.id)

        if (user === null) return res.status(404).json({ message: "User not found" })

        return res.json(user)
    } catch (e) {
        console.log(e)
        return res.status(500).json("Internal Server Error")
    }
}

export async function postUser(req: any, res: any) {
    const user = new User()
    user.login = req.body.login
    user.password = req.body.password
    user.email = req.body.email
    user.type = "common"

    const userDB = await userService.post(user)

    return res.status(201).json(userDB)
}

export async function putUserById(req: any, res: any) {
    try {
        const user = await userService.getById(req.params.id)

        if (user === null) return res.status(404).send({ message: "User not found" })

        const newUser = new User()

        newUser.login = req.body.login
        newUser.password = req.body.password
        newUser.email = req.body.email

        const updatedUser = await userService.patch(user, newUser)

        return res.json(updatedUser)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function patchUserById(req: any, res: any) {
    try {
        const user = await userService.getById(req.params.id)

        if (user === null) return res.status(404).send({ message: "User not found" })

        const updatedUser = await userService.patch(user, req.body)

        return res.json(updatedUser)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function deleteUserById(req: any, res: any) {
    try {
        const result = await userService.deleteById(req.params.id)

        if (result.affected === 0) return res.status(404).json({ message: "User not found" })

        return res.json({ message: "User deleted" })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function getUserAudios(req: any, res: any) {
    try {
        const audioRepo = AppDataSource.getRepository(Audio)
        const audios = await audioRepo.find({
            where: { user_requester: { id: parseInt(req.params.id) } },
            relations: {"user_requester": true},
        })

        return res.json({ audios: audios })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
