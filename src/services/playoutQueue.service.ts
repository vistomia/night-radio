import PlayoutQueue from "../database/entities/playoutQueue.js"
import playoutQueueRepository from "../repositories/playoutQueue.repository.js"
import { Repository, type FindOptionsRelations } from "typeorm"
import AudioService from "./audio.service.js"

export default class PlayoutQueueService {
    repository: Repository<PlayoutQueue> = playoutQueueRepository
    audio_service: AudioService = new AudioService()

    async getAll(limit: number, skip: number) {
        const playoutQueues = await this.repository.find({
            take: limit,
            skip: skip,
            relations: {"audio": true}
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
        const audio = await this.audio_service.getById(playoutQueue.audio.id)
        if (!audio) {
            throw new Error("Audio not found")
        }
        if (audio.status != "active") {
            throw new Error("Audio not active")
        }
        
        playoutQueue.audio = audio
        const savedQueue = await this.repository.save(playoutQueue)

        const completedQueue = await this.repository.findOne({where: {audio: savedQueue.audio}, relations: { "audio": true }})
        return completedQueue
    }

    async patch(playoutQueue: PlayoutQueue, newPlayoutQueue: PlayoutQueue) {
        this.repository.merge(playoutQueue, newPlayoutQueue)

        const playoutQueue_db = await this.repository.save(playoutQueue)
        return playoutQueue_db
    }

    async getCurrent() {
        return this.repository.findOne({ where: { status: "current" } })
    }

    async getNext() {
        return this.repository.findOne({
            where: { status: "not played" },
            order: { position: "ASC" },
        })
    }
}
