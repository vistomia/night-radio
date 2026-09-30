import PlayoutQueue from "../database/entities/playoutQueue.js"
import PlayoutQueueService from "../services/playoutQueue.service.js"
import { AppDataSource } from "../database/data-source.js"
import type Audio from "../database/entities/audio.js"

const playoutQueueService = new PlayoutQueueService()

export async function getPlayoutQueues(req: any, res: any) {
    const playoutQueue = await playoutQueueService.getAll(req.query.limit, req.query.skip)

    return res.json({ playoutQueue: playoutQueue })
}

export async function getPlayoutQueueById(req: any, res: any) {
    try {
        const playoutQueue = await playoutQueueService.getById(req.params.id)

        if (playoutQueue === null)
            return res.status(404).json({ message: "PlayoutQueue not found" })

        return res.json(playoutQueue)
    } catch (e) {
        console.log(e)
        return res.status(500).json("Internal Server Error")
    }
}

export async function postPlayoutQueue(req: any, res: any) {
    try {
        const playoutQueue = new PlayoutQueue()

        playoutQueue.audio = { id: Number(req.body.audio_id) } as Audio
        playoutQueue.duration_seconds = req.body.duration_seconds
        playoutQueue.status = req.body.status
        playoutQueue.position = req.body.position

        const playoutQueueDB = await playoutQueueService.post(playoutQueue)

        return res.status(201).json(playoutQueueDB)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function putPlayoutQueueById(req: any, res: any) {
    try {
        const playoutQueue = await playoutQueueService.getById(req.params.id)

        if (playoutQueue === null)
            return res.status(404).send({ message: "PlayoutQueue not found" })

        const newPlayoutQueue = new PlayoutQueue()

        newPlayoutQueue.position = req.body.position
        newPlayoutQueue.status = req.body.status
        newPlayoutQueue.duration_seconds = req.body.duration_seconds

        const updatedPlayoutQueue = await playoutQueueService.patch(playoutQueue, newPlayoutQueue)

        return res.json(updatedPlayoutQueue)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function patchPlayoutQueueById(req: any, res: any) {
    try {
        const playoutQueue = await playoutQueueService.getById(req.params.id)

        if (playoutQueue === null)
            return res.status(404).send({ message: "PlayoutQueue not found" })

        const updatedPlayoutQueue = await playoutQueueService.patch(playoutQueue, req.body)

        return res.json(updatedPlayoutQueue)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function deletePlayoutQueueById(req: any, res: any) {
    try {
        const result = await playoutQueueService.deleteById(req.params.id)

        if (result.affected === 0)
            return res.status(404).json({ message: "PlayoutQueue not found" })

        return res.json({ message: "PlayoutQueue deleted" })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function getCurrentPlayout(req: any, res: any) {
    try {
        const queueRepo = AppDataSource.getRepository(PlayoutQueue)

        const current = await queueRepo.findOne({
            where: { status: "playing" },
        })

        if (!current) return res.status(404).json({ message: "Nenhum áudio a tocar no momento" })

        return res.json(current)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function postRecorder(req: any, res: any) {
    try {
        const queueRepo = AppDataSource.getRepository(PlayoutQueue)

        // Simula a entrada de um aviso urgente
        const gravacao = queueRepo.create({
            position: "0",
            status: "playing",
            duration_seconds: req.body.duration_seconds || 30,
        })

        const avisoSalvo = await queueRepo.save(gravacao)

        return res.status(201).json(avisoSalvo)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
