import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    contact:{
        type: String,
        required: true
    },
    institute: {
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    semester:{
        type: String,
        required: true
    },
    registration_no:{
        type: String,
        required: true
    },
    roll_no:{
        type: String,
        required: true
    },
    password:{
        type: String, 
        required: true
    },
    category:{
        type: String,
        default: "student"
    },
    daily_attendance:{
        date:{
            type: String,
            default: () => {
                const today = new Date();
                const dateString = today.toISOString().split('T')[0]; // "2025-06-14"
                const dateParts = dateString.split('-'); // ["2025", "06", "14"]
                const reversedDate = dateParts.reverse().join('-'); // "14-06-2025"
                return reversedDate;
            }
        },
        time:{
            type: String,
            default: () => {
                const today = new Date();
                const hours = String(today.getHours()).padStart(2, '0');
                const minutes = String(today.getMinutes()).padStart(2, '0');
                return `${hours}:${minutes}`;
            }
        },
        status:{
            type: String,
            default: "absent"
        }
    },
    total_attendance: {
        type: Number,
        default: 0
    },
    attendance_history:{
        type: Array,
        default: []
    },
    createdAt: {
        type: String,
        default: () => {
            const today = new Date();
            const dateString = today.toISOString().split('T')[0];
            const dateParts = dateString.split('-');
            const reversedDate = dateParts.reverse().join('-'); 
            return reversedDate;
        }
    }
})

const StudentModel = mongoose.model('student', StudentSchema);
export default StudentModel;