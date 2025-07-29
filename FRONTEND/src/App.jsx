import  {AppLayout}  from '../components/Layout/AppLayout';

import {ManagerSignin} from '../pages/manager_pages/ManagerSignin';
import {ManagerSignup} from '../pages/manager_pages/ManagerSignup';
import {StudentSignin} from '../pages/student_pages/StudentSignin';
import {StudentSignup} from '../pages/student_pages/StudentSignup';

import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ShowMenu } from '../pages/ShowMenu';
import { UpdateMenu } from '../pages/manager_pages/UpdateMenu';
import { CreateMenu } from '../pages/manager_pages/CreateMenu';
import { AllStudents } from '../pages/manager_pages/All_Students';
import { Home } from '../components/UI/Home';
import { AttendanceHistory } from '../pages/AttendanceHistory';
import { MarkAttendance } from '../pages/student_pages/Mark_Attendence';
import { ActiveStudent } from '../pages/manager_pages/ActiveStudent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "menu/show",
        element: <ShowMenu/>
      },
      {
        path: "menu/create",
        element: <CreateMenu/>
      },
      {
        path: "menu/update",
        element: <UpdateMenu/>
      },
      {
        path: "signup/student",
        element: <StudentSignup />
      },
      {
        path: "signup/manager",
        element: <ManagerSignup />
      },
      {
        path: "signin/student",
        element: <StudentSignin />
      },
      {
        path: "signin/manager",
        element: <ManagerSignin />
      },
      {
        path: "student/all",
        element: <AllStudents/>
      },
      {
        path: "student/active",
        element: <ActiveStudent/>
      },
      {
        path: "student/attendence",
        element: <MarkAttendance/>
      },
      {
        path: "student/attendence/history",
        element: <AttendanceHistory/>
      }
    ]
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
