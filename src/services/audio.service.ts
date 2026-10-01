import type Audio from "../database/entities/audio.js"
import audioRepository from "../repositories/audio.repository.js"
import { Repository } from "typeorm"
import YtdlpService from "./ytdlp.service.js"

const ytdlp = new YtdlpService()

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
        const data = await ytdlp.getAudioFromYoutube(audio.from_url)

        audio.title = data.title;
        audio.path = data.path;
        audio.duration_seconds = data.duration;
        audio.from_url = data.from_url;
        audio.creator = data.channel;
        audio.type = "mp3"
        audio.other_details = JSON.stringify({
            duration_string: data.duration_string,
            thumbnail: data.thumbnail,
        });

        return this.repository.save(audio)
    }

    async patch(audio: Audio, newAudio: Audio) {
        this.repository.merge(audio, newAudio)

        const audio_db = await this.repository.save(audio)
        return audio_db
    }
}
