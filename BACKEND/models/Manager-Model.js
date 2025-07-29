import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact:{
        type: String,
        required: true,
        unique: true
    },
    institute: {
        type: String,
        required: true
    },
    password:{
        type: String, 
        required: true
    },
    category:{
        type: String,
        default: "manager"
    },
})

const ManagerModel = mongoose.model('manager', ManagerSchema);
export default ManagerModel;