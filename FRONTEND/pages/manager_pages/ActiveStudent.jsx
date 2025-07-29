import { useEffect, useState } from "react";
import { handleError } from "../../components/Layout/utils";

export const ActiveStudent = ()=>{

  const [students, setStudents] = useState([]);

  useEffect(() =>{
     const fetchData = async() =>{
       const token = localStorage.getItem('token');
        if(!token){
          handleError('You are not authorized!');
          return;
        }

        try {
          const url = 'http://localhost:8080/root/student/all';

          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`
            }

          })

          const data = await response.json();
          const { success, message, data: studentLists } = data;
          console.log(studentLists);
          if(success){
            const activeStudent = studentLists.filter(student => student.daily_attendance.status === 'present');
            setStudents(activeStudent);
            handleSuccess(message);
          }else{
            handleError(message);
          }
        } catch (error) {
          handleError('Something went wrong!');
          console.error(error);
        }
     }

     fetchData();
  },[])

  return (
    <>
      <section className='menu-section student-section'>
        <div className="menu-container student-container">
          <div className="table-wrapper">
            <table border="" className="menu-table student-table">
              <thead>
                  <tr>
                    <th colSpan={5}>Today Present Students</th>
                  </tr>
                  <tr>
                    <th colSpan={5} style={{ fontSize: '1.4rem', backgroundColor: 'green'}}><i>Total Students</i> : {students.length}</th>
                  </tr>
                  <tr>
                    <th>S.No.</th>
                    <th>Name</th>
                    <th>Registration Number </th>
                    <th>Semester</th>
                    <th>Status</th>
                  </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.registration_no}</td>
                      <td>{student.semester}</td>
                      <td>{student.daily_attendance.status}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
