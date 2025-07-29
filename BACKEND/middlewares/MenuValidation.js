import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path: "./config/config.env"});
import ManagerModel from '../models/Manager-Model.js';

export const MenuValidation = async(req, res, next) =>{
    try {
        const token = req.headers['authorization'];
        // console.log(token);

        if(!token){
            return res.status(403).json({
                message: "You are not logged in or token is expired!",
                success: false
            })
        }

        const decodedToken =  jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedToken.id;
        // console.log(id);

        const manager = await ManagerModel.findById(id);
        if(!manager){
            return res.status(401).json({
                message: "You are not authorized!",
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