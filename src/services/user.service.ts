import type User from "../database/entities/user.js"
import userRepository from "../repositories/user.repository.js"
import { Repository } from "typeorm"

export default class UserService {
    repository: Repository<User> = userRepository

    async getAll(limit: number, skip: number) {
        const users = await this.repository.find({
            take: limit,
            skip: skip,
        })

        return users
    }

    async getById(id: number) {
        const user = userRepository.findOne({
            where: { id: id },
        })

        return user
    }

    async deleteById(id: number) {
        return this.repository.delete({ id: id })
    }

    async post(user: User) {
        return this.repository.save(user)
    }

    async patch(user: User, newUser: User) {
        this.repository.merge(user, newUser)

        const user_db = await this.repository.save(user)
        return user_db
    }
}
