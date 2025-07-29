import MenuModel from "../models/MenuModel.js";

export const MenuController = async(req, res) =>{
    try {
        const existMenu = await MenuModel.findOne();
        if(existMenu){
            return res.status(403).json({
                message: "Already exist menu!",
                success: false
            })
        }
        // console.log("debug1");

        const menu = new MenuModel(req.body);
        console.log(req.body);
        const menuData = await menu.save();

        res.status(200).json({
            message: "Menu created successfully!",
            success: true,
            menuData
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to create menu!",
            success: false,
            error: error.message
        })
    }
}