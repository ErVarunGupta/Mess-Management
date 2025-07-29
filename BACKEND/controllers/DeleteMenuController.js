import MenuModel from "../models/MenuModel.js"

export const DeleteMenuController = async(req, res) =>{
    try {
        const existingMenu = await MenuModel.findOne();
        if(!existingMenu){
            return res.status(404).json({
                message: "Menu is not exist!",
                success: false
            })
        }

        const deletedMenu = await MenuModel.findOneAndDelete();

        res.status(200).json({
            message: "Menu is deleted successfully!",
            success: true,
            deletedMenu
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            success: false
        })
    }
}