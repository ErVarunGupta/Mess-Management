import ManagerModel from "../models/Manager-Model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path: "./config/config.env"});

export const managerSignup  = async (req, res) =>{
    try {
        const {name, email, contact, institute, password} = req. body;

        const manager = await ManagerModel.findOne({
            $or: [{email}, {contact}]
        });

        if(manager){
            return res.status(403).json({
                message: "You are already registered!",
                success: false
            })
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newManager = new ManagerModel({
            name, email, contact, institute, password: hashedPass
        })

        await newManager.save();

        return res.status(200).json({
            message: "Signup successfully!",
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error!",
            success: false
        })
    }
}



export const ManagerSignin = async(req, res) =>{
    try {
        const {identifier, password} = req.body;

        const manager = await ManagerModel.findOne({
            $or: [{email: identifier}, {contact: identifier}]
        });
        // console.log("debug1");
        const errMsg = "Authentication failed, contact or email or password is incorrect!"

        if(!manager){
            return res.status(403).json({
                message: errMsg,
                success: false
            })
        }
        // console.log("debug2");

        const isPassEqual = await bcrypt.compare(password, manager.password);

        if(!isPassEqual){
            return res.status(403).json({
                message: errMsg,
                success: false
            })
        }
        // console.log("debug3");

        const token = jwt.sign(
            {id: manager._id, email: manager.email},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        )

        return res.status(200).json({
            message: "Login Successfully!",
            success: true,
            name: manager.name,
            email: manager.email,
            contact: manager.contact,
            institute: manager.institute,
            category: manager.category,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!",
            success: false,
        })
    }
}