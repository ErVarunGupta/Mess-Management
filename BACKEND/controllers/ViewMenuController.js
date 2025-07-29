import MenuModel from "../models/MenuModel.js";

export const ViewMenuController = async (req, res) =>{
    try {

        const menu = await MenuModel.findOne();

        res.status(200).json({
            message: "Menu fetched successfully.",
            success: true,
            menu
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            success: false
        })
    }
}