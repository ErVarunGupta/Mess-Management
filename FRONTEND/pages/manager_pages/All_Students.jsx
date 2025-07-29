import { useEffect, useState } from "react"
import { handleError, handleSuccess } from "../../components/Layout/utils";
import { Show_Details } from "./Show_Details";
const URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const AllStudents = () => {

    const [students, setStudents] = useState([]);

    useEffect(() =>{
        const fetchStudent = async() =>{
            const category = localStorage.getItem('category');
            if(category !== 'manager'){
                handleError('You are not authorized!');
                return;
            }

            const token = localStorage.getItem('token');

            if(!token){
                handleError('You are not authorized or token is expired!');
                return;
            }

            try {
                const url = `${URL}/root/student/all`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `${token}`
                    }
                })

                const data = await response.json();
                // console.log(data);

                const { success, message, data: studentLists} = data;
                if (success) {
                    setStudents(studentLists);
                    handleSuccess(message);
                } else {
                    handleError(message)
                }
            } catch (error) {
                handleError(message.error || 'Something went wrong!');
            }
        }
        fetchStudent();
    },[])

    // console.log(students);

    // Sort students by registration_no before rendering
    const sortedStudents = [...students].sort((a, b) => {
        if (a.registration_no < b.registration_no) return -1;
        if (a.registration_no > b.registration_no) return 1;
        return 0;
    });

    return (
        <section className='menu-section student-section'>
            <div className="menu-container student-container">
                <div className="table-wrapper">
                    <table border="" className="menu-table student-table">
                        <thead>
                            <tr>
                                <th colSpan={5}>All Students</th>
                            </tr>
                            <tr>
                                <th>S.No.</th>
                                <th>Name of Student</th>
                                <th>Semester</th>
                                <th>Reg. Number</th>
                                <th>Show Details</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {sortedStudents.map((student, sortedIndex) => (
                                <tr key={student.registration_no }>
                                    <td>{sortedIndex + 1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.semester}</td>
                                    <td>{student.registration_no}</td>
                                    <td><Show_Details data={student} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}