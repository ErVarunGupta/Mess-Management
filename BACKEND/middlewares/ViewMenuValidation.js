import MenuModel from "../models/MenuModel.js";

export const ViewMenuValidation = async(req, res, next) =>{
    try {
        const token = req.headers['authorization'];

        if(!token){
            return res.status(401).json({
                message: "You are not logged in or token is expired!",
                success: false
            })
        }

        const isExistMenu = await MenuModel.findOne();
        if(!isExistMenu){
            return res.status(403).json({
                message: "Menu is not exist!",
                success: false
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            success: false
        })
    }
}