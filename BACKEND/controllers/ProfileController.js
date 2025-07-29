import ManagerModel from "../models/Manager-Model.js"
import StudentModel from "../models/Student-Model.js"

export const ProfileController = async (req, res) => {
    const userId = req.params.id;
    // console.log(userId);

    const manager = await ManagerModel.findById(userId);
    // console.log(manager);

    if(manager){
        try {
            res.status(200).json({
                message: "User Found!",
                success: true,
                data: manager
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error",
                success: false
            })
        }
    }

    const student = await StudentModel.findById(userId);
    // console.log(student);

    if(student){
        try {
            res.status(200).json({
                message: "User Found!",
                success: true,
                data: student
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error",
                message: false
            })
        }
    }
}