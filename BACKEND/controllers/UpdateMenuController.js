import MenuModel from "../models/MenuModel.js";

export const UpdateMenuController = async(req, res) =>{
    try {
        const isExistMenu = await MenuModel.findOne();
        if(!isExistMenu){
            return res.status(400).json({
                message: "Menu is not exist. Please create new menu!",
                success: false
            })
        }

        const newMenu = await MenuModel.findOneAndUpdate({},
            req.body,           //update by client
            {
                new: true,          //return new menu
                runValidators: true //validate schema
            }
        );

        res.status(200).json({
            message: "Menu updated successfully!",
            success: true,
            newMenu
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            success: false
        })
    }
}