import { In, type FindOptionsRelations } from "typeorm"
import { AppDataSource } from "../database/data-source.js"
import { Menu } from "../database/entities/menu.js"
import { MenuItem } from "../database/entities/menuItems.js"
import { MenuToMenuItem } from "../database/entities/menuToMenuItem.js"

export async function getMenus(req: any, res: any) {
    const menuRepo = AppDataSource.getRepository(Menu)

    const menus = await menuRepo.find({
        take: req.query.limit,
        skip: req.query.skip,
    })

    return res.json({ menus: menus })
}

export async function getMenuById(req: any, res: any) {
    const menuRepo = AppDataSource.getRepository(Menu)

    try {
        const menu = await menuRepo.findOneBy({ id: req.params.id })

        if (menu === null) return res.status(404).json({ message: "menu not found" })

        return res.json(menu)
    } catch (e) {
        console.log(e)
        return res.status(500).json("Internal Server Error")
    }
}

export async function postMenu(req: any, res: any) {
    const menuRepo = AppDataSource.getRepository(Menu)

    const menu = new Menu()
    menu.name = req.body.name
    menu.menu_date = req.body.menu_date

    const menuDB = await menuRepo.save(menu)

    return res.status(201).json(menuDB)
}

export async function putMenuById(req: any, res: any) {
    try {
        const menuRepo = AppDataSource.getRepository(Menu)
        const menu = await menuRepo.findOneBy({ id: req.params.id })

        if (menu === null) return res.status(404).send({ message: "menu not found" })

        menuRepo.merge(menu, {
            name: req.body.name,
        })

        const updatedmenu = await menuRepo.save(menu)

        return res.json(updatedmenu)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function patchMenuById(req: any, res: any) {
    try {
        const menuRepo = AppDataSource.getRepository(Menu)
        const menu = await menuRepo.findOneBy({ id: req.params.id })

        if (menu === null) return res.status(404).send({ message: "menu not found" })

        menuRepo.merge(menu, req.body)

        const updatedmenu = await menuRepo.save(menu)

        return res.json(updatedmenu)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function deleteMenuById(req: any, res: any) {
    try {
        const menuRepo = AppDataSource.getRepository(Menu)
        const result = await menuRepo.delete({ id: req.params.id })

        if (result.affected === 0) return res.status(404).json({ message: "menu not found" })

        return res.json({ message: "menu deleted" })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function postMenuItemToMenu(req: any, res: any) {
    try {
        const menuRepo = AppDataSource.getRepository(Menu)
        const menuToMenuItemRepo = AppDataSource.getRepository(MenuToMenuItem)

        const menu = await menuRepo.findOneBy({ id: req.params.id })

        if (!menu) return res.status(404).send({ message: "Menu not found." })

        const menuItems = req.body.menuItems

        const menuItemsP = menuItems.map((el: any) => {
            const menuToMenuItem = new MenuToMenuItem()

            menuToMenuItem.price = el.price
            menuToMenuItem.menu = menu
            menuToMenuItem.menuItem = { id: Number(el.id) } as MenuItem

            return menuToMenuItem
        })

        const menuToMenuItemSaved = await menuToMenuItemRepo.save(menuItemsP)

        const menuToMenuItemPopulated = await menuToMenuItemRepo.find({
            relations: { menu: true, menuItem: {tags: true} } as FindOptionsRelations<MenuToMenuItem>,
            where: {
                id: In(menuToMenuItemSaved.map((el: any) => el.id)),
            },
        })

        return res.status(201).json(menuToMenuItemPopulated)
    } catch (e) {
        console.log(e)
    }
}

export async function getMenuItemFromMenu(req: any, res: any) {
    const menuRepo = AppDataSource.getMongoRepository(Menu)
    const menu = menuRepo.findOne(
        { where: { id: req.params.menuId }, relations: { menuToMenuItems: true }
    })

    return res.status(200).json({})
}