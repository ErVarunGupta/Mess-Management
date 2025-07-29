import MenuModel from "../models/MenuModel.js"

export const UpdateDayMenuController = async(req, res) =>{
    try {
        const isExistMenu = await MenuModel.findOne();

        if(!isExistMenu){
            return res.status(400).json({
                message: "Menu is not exist!",
                success: false
            })
        }

        const day = req.params.day;

        const menu = await MenuModel.findOne();

        menu[day] = req.body;

        const updatedMenu = await MenuModel.findOneAndUpdate({},
            menu,
            {
                new: true,
                runValidators: true
            }
        )

        res.status(200).json({
            message: `${day} menu is updated successfully!`,
            success: true,
            day_menu: menu[day],
            updatedMenu
        })

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            success: false
        })
    }
}