import MenuModel from "../models/MenuModel.js"

export const ViewDayMenuController = async(req, res) =>{
    try {
        const day = req.params.day;

        const menu = await MenuModel.findOne();
        // console.log(day);

        const day_wise_menu = menu[day];    //day is variable so write menu[day] otherwise  menu.Monday
        // console.log(day_wise_menu);

        if(!day_wise_menu){
            return res.status(400).json({
                message: "Bad Request!",
                success: false
            })
        }

        res.status(200).json({
            message: `${day} menu fetched successfully!`,
            success: true,
            day_wise_menu
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            success: false
        })
    }
}