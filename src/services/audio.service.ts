import type Audio from "../database/entities/audio.js"
import audioRepository from "../repositories/audio.repository.js"
import { Repository } from "typeorm"

export default class AudioService {
    repository: Repository<Audio> = audioRepository

    async getAll(limit: number, skip: number) {
        const audios = await this.repository.find({
            take: limit,
            skip: skip,
        })

        return audios
    }

    async getById(id: number) {
        const audio = audioRepository.findOne({
            where: { id: id },
        })

        return audio
    }

    async deleteById(id: number) {
        return this.repository.delete({ id: id })
    }

    async post(audio: Audio) {
        return this.repository.save(audio)
    }

    async patch(audio: Audio, newAudio: Audio) {
        this.repository.merge(audio, newAudio)

        const audio_db = await this.repository.save(audio)
        return audio_db
    }
}
