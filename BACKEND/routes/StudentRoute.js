import express from 'express';
import {StudentSignin, StudentSignup} from "../controllers/StudentController.js"
import { studentSigninValidation, studentSignupValidation } from '../middlewares/StudentValidation.js';
import { AllStudentsController } from '../controllers/AllStudentsController.js';
import { MarkAttendanceController } from '../controllers/MarkAttendanceController.js';

const router = express.Router();

router.post("/student-signup", studentSignupValidation, StudentSignup);
router.post("/student-signin", studentSigninValidation, StudentSignin);

router.get("/all", AllStudentsController);
router.post("/attendance/:id", MarkAttendanceController);

export default router;