import StudentModel from "../models/Student-Model.js";
import cron from 'node-cron';
import moment from 'moment-timezone';

export const MarkAttendanceController = async(req, res) =>{
    const {id} = req.params;

    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message: "Unauthorized! Please login again.",
            success: false
        });
    }

    try {
        const student = await StudentModel.findById(id);
        if(!student){
            return res.status(404).json({
                message: "Student not found!",
                success: false
            });
        }

        const today = new Date();
        const dateString = today.toISOString().split('T')[0]; // "2025-06-14"
        const dateParts = dateString.split('-'); // ["2025", "06", "14"]
        const date = dateParts.reverse().join('-'); // "14-06-2025"

        //get time
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const time =  `${hours}:${minutes}`;


        // Check if attendance for today is already marked
        if(student.daily_attendance.status === 'present' && student.daily_attendance.date === date) {
            return res.status(400).json({
                message: "You have already marked as attendance today!",
                daily_attendance: student.daily_attendance,
                success: false
            })
        }

        // Mark attendance
        student.daily_attendance.date = date;
        student.daily_attendance.time = time;
        student.daily_attendance.status = 'present';
        student.total_attendance += 1; // Increment total attendance count
        student.attendance_history.push({
            date: date,
            time: time,
            status: 'present'
        });
        await student.save();

        cron.schedule('0 1 * * *', async() =>{
            const currDate = moment().tz("Asia/Kolkata").format('DD-MM-YYYY');

            try {
                const students = await StudentModel.updateMany({} ,{
                    $set: {
                        daily_attendance: {
                            date: currDate,
                            status: 'absent'
                        }
                    }
                })
            } catch (error) {
                console.error("Error resetting attendance:", error);
            }

        },{
            timezone: "Asia/Kolkata"
        })


        return res.status(200).json({
            message: "Attendance marked successfully!",
            success: true,
            name: student.name,
            email: student.email,
            contact: student.contact,
            institute: student.institute,
            department: student.department,
            registration_no: student.registration_no,
            roll_no: student.roll_no,
            daily_attendance: student.daily_attendance,
            total_attendance: student.total_attendance,
            attendance_history: student.attendance_history,
            createdAt: student.createdAt
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}