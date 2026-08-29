import { AppDataSource } from "../database/data-source.js"
import { MenuItem } from "../database/entities/menuItems.js"

export async function getMenuItems(req: any, res: any) {
    const menuItemRepo = AppDataSource.getRepository(MenuItem)

    const menuItems = await menuItemRepo.find({
        take: req.query.limit,
        skip: req.query.skip,
    })

    res.json({ menuItems: menuItems })
}

export async function getMenuItemById(req: any, res: any) {
    const menuItemRepo = AppDataSource.getRepository(MenuItem)

    try {
        const menuItem = await menuItemRepo.findOneBy({ id: req.params.id })
        if (menuItem === null) return res.status(404).json({ message: "MenuItem not found" })

        return res.json(menuItem)
    } catch (e) {
        console.log(e)
        return res.status(500).json("Internal Server Error")
    }
}

export async function postMenuItem(req: any, res: any) {
    const menuItemRepo = AppDataSource.getRepository(MenuItem)

    const menuItem = new MenuItem()
    menuItem.name = req.body.name
    menuItem.description = req.body.description
    menuItem.price = req.body.price

    const menuItemDB = await menuItemRepo.save(menuItem)

    res.status(201).json(menuItemDB)
}

export async function putMenuItemById(req: any, res: any) {
    try {
        const menuItemRepo = AppDataSource.getRepository(MenuItem)

        const menuItem = await menuItemRepo.findOneBy({ id: req.params.id })

        if (menuItem === null) {
            return res.status(404).send({ message: "MenuItem not found"})
        }   
        
        menuItemRepo.merge(menuItem, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        })

        const updatedMenuItem = await menuItemRepo.save(menuItem)
        
        res.json( updatedMenuItem )
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function deleteMenuItemById(req: any, res: any) {
    try {
        const menuItemRepo = AppDataSource.getRepository(MenuItem)
        const result = await menuItemRepo.delete({ id: req.params.id })
        if (result.affected === 0) {
            return res.status(404).json({ message: "MenuItem not found" })
        }

        res.json({ message: "MenuItem deleted" })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "Internal Server Error" })
    }
}
