import mongoose from "mongoose";

export const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "MESS_MANAGEMENT"
    }).then(() =>{
        console.log("Database is connected successfully!");
    }).catch((err)=>{
        console.log(`Some error occured while database connecting: ${err}`);
    })
}