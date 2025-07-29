import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path: "./config/config.env"});

export const ProfileValidation = async(req, res, next) =>{
    const token = req.headers["authorization"];
    const user_id = req.params.id;
    // console.log(user_id);
    if(!token){
        return res.status(401).json({
            message: "Unauthorized!",
            success: false
        })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const token_id = decodedToken.id;
        // console.log(token_id);
        if(user_id != token_id){
            return res.status(401).json({
                message: "Invalid Token or Password",
                success: false
            })
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token!",
            success: false
        })
    }
}