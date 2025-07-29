import StudentModel from "../models/Student-Model.js";

export const AllStudentsController = async (req, res) => {
    try {
        const students = await StudentModel.find({});

        if(students.length === 0){
            return res.status(404).json({
                message: "No students found!",
                success: false
            })
        }

        const studentData = students.map(student => ({
            name: student.name,
            email: student.email,
            contact: student.contact,
            institute: student.institute,
            department: student.department,
            semester: student.semester,
            registration_no: student.registration_no,
            total_attendance: student.total_attendance,
            daily_attendance: student.daily_attendance,
            roll_no: student.roll_no,
        }));

        res.status(200).json({
            message: "Students fetched successfully!",
            success: true,
            data: studentData
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!",
            success: false,
            error: error.message
        })
    }
}