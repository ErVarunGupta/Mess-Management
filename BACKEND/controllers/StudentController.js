import StudentModel from "../models/Student-Model.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config({path: "./config/config.env"});


export const StudentSignup = async(req, res) =>{
    try {
        const {name, email, contact, institute, department, semester, registration_no, roll_no, password} = req.body;

        const student = await StudentModel.findOne({
            $or: [{email}, {contact}]
        })

        if(student){
            return res.status(403).json({
                message: "You are already registered!",
                success: false,
            })
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newStudent = new StudentModel({
            name, email, contact, institute, department, semester, registration_no, roll_no, password: hashedPass
        })

        await newStudent.save();

        return res.status(200).json({
            message: "Signup Successfully!",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!",
            success: false
        })
    }
}



export const StudentSignin = async(req, res) =>{
   try {
        const {identifier, password} = req.body;

        const student = await StudentModel.findOne({
            $or: [{email: identifier}, {contact: identifier}]
        })

        const errMsg = "Authentication failed!, email or contact or password is incorrect."

        if(!student){
            res.status(403).json({
                message: errMsg,
                success: false
            })
        }

        const isPassEqual = await bcrypt.compare(password, student.password);

        if(!isPassEqual){
            res.status(403).json({
                message: errMsg,
                success: false
            })
        }

        const token = jwt.sign(
            {id: student._id, email: student.email},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        )

        res.status(200).json({
            message: "Login Successfully!",
            success: true,
            name: student.name,
            email: student.email,
            contact: student.contact,
            institute: student.institute,
            department: student.department,
            registration_no: student.registration_no,
            roll_no: student.roll_no,
            category: student.category,
            token
        })
   } catch (error) {
        // console.log(error);
        res.status(500).json({
            message: "Internal Server Error!",
            success: false
        })
   }
}