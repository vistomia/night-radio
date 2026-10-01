import Audio from "../database/entities/audio.js"
import AudioService from "../services/audio.service.js"

const audioService = new AudioService()

export async function getAudios(req: any, res: any) {
    const audios = await audioService.getAll(req.query.limit, req.query.skip)

    return res.json({ audios: audios })
}

export async function getAudioById(req: any, res: any) {
    try {
        const audio = await audioService.getById(req.params.id)

        if (audio === null) return res.status(404).json({ message: "Audio not found" })

        return res.json(audio)
    } catch (e) {
        console.log(e)
        return res.status(500).json("Internal Server Error")
    }
}

export async function postAudio(req: any, res: any) {
    try {
        const audio = new Audio()
        audio.from_url = req.body.from_url
        audio.message = req.body.message
        audio.status = "pending"

        const audioDB = await audioService.post(audio)

        return res.status(201).json(audioDB)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function putAudioById(req: any, res: any) {
    try {
        const audio = await audioService.getById(req.params.id)

        if (audio === null) return res.status(404).send({ message: "Audio not found" })

        const newAudio = new Audio()

        newAudio.title = req.body.title
        newAudio.path = req.body.path
        newAudio.duration_seconds = req.body.duration_seconds
        newAudio.type = req.body.type
        newAudio.from_url = req.body.from
        newAudio.creator = req.body.creator
        newAudio.other_details = req.body.other_details
        newAudio.message = req.body.message
        newAudio.status = req.body.status

        const updatedAudio = await audioService.patch(audio, newAudio)

        return res.json(updatedAudio)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function patchAudioById(req: any, res: any) {
    try {
        const audio = await audioService.getById(req.params.id)

        if (audio === null) return res.status(404).send({ message: "Audio not found" })

        const updatedAudio = await audioService.patch(audio, req.body)

        return res.json(updatedAudio)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function deleteAudioById(req: any, res: any) {
    try {
        const result = await audioService.deleteById(req.params.id)

        if (result.affected === 0) return res.status(404).json({ message: "Audio not found" })

        return res.json({ message: "Audio deleted" })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
