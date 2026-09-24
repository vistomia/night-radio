import { AppDataSource } from "../database/data-source.js"
import User from "../database/entities/user.js"
import UserService from "../services/user.service.js"

const userService = new UserService()

export async function getUsers(req: any, res: any) {
    const users = await userService.getUsers(req.query.limit, req.query.skip)

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

    const userDB = await userService.post(user)

    return res.status(201).json(userDB)
}

export async function putUserById(req: any, res: any) {
    try {
        const user = await userService.getById(req.params.id)

        if (user === null) return res.status(404).send({ message: "User not found" })

        userService.update(user, {
            login: req.body.login,
            password: req.body.password,
            email: req.body.email
        })

        userRepo.merge(user, {
            login: req.body.login,
            password: req.body.password,
            email: req.body.email
        })

        const updatedUser = await userRepo.save(user)

        return res.json(updatedUser)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function patchUserById(req: any, res: any) {
    try {
        const userRepo = AppDataSource.getRepository(User)
        const user = await userRepo.findOne( { where: { id: req.params.id }})

        if (user === null) return res.status(404).send({ message: "User not found" })

        userRepo.merge(user, req.body)

        const updatedUser = await userRepo.save(user)

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
