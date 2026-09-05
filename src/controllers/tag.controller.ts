import { AppDataSource } from "../database/data-source.js"
import { Tag } from "../database/entities/tag.js"

export async function getTags(req: any, res: any) {
	const tagRepo = AppDataSource.getRepository(Tag)

	const tags = await tagRepo.find({
		take: req.query.limit,
		skip: req.query.skip,
	})

	return res.json({ tags: tags })
}

export async function getTagById(req: any, res: any) {
	const tagRepo = AppDataSource.getRepository(Tag)

	try {
		const tag = await tagRepo.findOneBy({ id: req.params.id })

		if (tag === null) return res.status(404).json({ message: "tag not found" })

		return res.json(tag)
	} catch (e) {
		console.log(e)
		return res.status(500).json("Internal Server Error")
	}
}

export async function postTag(req: any, res: any) {
	const tagRepo = AppDataSource.getRepository(Tag)

	const tag = new Tag()
	tag.name = req.body.name

	const tagDB = await tagRepo.save(tag)

	return res.status(201).json(tagDB)
}

export async function putTagById(req: any, res: any) {
	try {
		const tagRepo = AppDataSource.getRepository(Tag)
		const tag = await tagRepo.findOneBy({ id: req.params.id })

		if (tag === null) return res.status(404).send({ message: "tag not found" })

		tagRepo.merge(tag, {
			name: req.body.name,
		})

		const updatedtag = await tagRepo.save(tag)

		return res.json(updatedtag)
	} catch (e) {
		console.error(e)
		return res.status(500).json({ message: "Internal Server Error" })
	}
}

export async function patchTagById(req: any, res: any) {
	try {
		const tagRepo = AppDataSource.getRepository(Tag)
		const tag = await tagRepo.findOneBy({ id: req.params.id })

		if (tag === null) return res.status(404).send({ message: "tag not found" })

		tagRepo.merge(tag, req.body)

		const updatedtag = await tagRepo.save(tag)

		return res.json(updatedtag)
	} catch (e) {
		console.error(e)
		return res.status(500).json({ message: "Internal Server Error" })
	}
}

export async function deleteTagById(req: any, res: any) {
	try {
		const tagRepo = AppDataSource.getRepository(Tag)
		const result = await tagRepo.delete({ id: req.params.id })

		if (result.affected === 0) return res.status(404).json({ message: "tag not found" })

		return res.json({ message: "tag deleted" })
	} catch (e) {
		console.error(e)
		return res.status(500).json({ message: "Internal Server Error" })
	}
}
