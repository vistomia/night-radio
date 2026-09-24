import type PlayoutQueue from "../database/entities/playoutQueue.js"
import playoutQueueRepository from "../repositories/playoutQueue.repository.js"
import { Repository } from "typeorm"

export default class PlayoutQueueService {
    repository: Repository<PlayoutQueue> = playoutQueueRepository

    async getAll(limit: number, skip: number) {
        const playoutQueues = await this.repository.find({
            take: limit,
            skip: skip,
        })

        return playoutQueues
    }

    async getById(id: number) {
        const playoutQueue = playoutQueueRepository.findOne({
            where: { id: id },
        })

        return playoutQueue
    }

    async deleteById(id: number) {
        return this.repository.delete({ id: id })
    }

    async post(playoutQueue: PlayoutQueue) {
        return this.repository.save(playoutQueue)
    }

    async patch(playoutQueue: PlayoutQueue, newPlayoutQueue: PlayoutQueue) {
        this.repository.merge(playoutQueue, newPlayoutQueue)

        const playoutQueue_db = await this.repository.save(playoutQueue)
        return playoutQueue_db
    }
}
